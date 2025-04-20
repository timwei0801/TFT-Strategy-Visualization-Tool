import pandas as pd
import numpy as np
import mysql.connector
from collections import defaultdict

class TFTDataProcessor:
    def __init__(self, db_config):
        self.db_config = db_config
        self.hero_trait_mapping = self._load_hero_trait_mapping()
        
    def _load_hero_trait_mapping(self):
        # S14「機動魔都」英雄與羈絆對應關係
        # 這裡可以擴充為從檔案或資料庫讀取
        mapping = {
            # 賽博霸主 (Cyber Overlords)
            "TFT14_Poppy": ["TFT14_CyberOverlords", "TFT14_Bastion"],
            "TFT14_Veigar": ["TFT14_CyberOverlords", "TFT14_Spellweaver"],
            "TFT14_Ziggs": ["TFT14_CyberOverlords", "TFT14_Strategist"],
            "TFT14_KogMaw": ["TFT14_CyberOverlords", "TFT14_Bruiser"],
            
            # A.M.P.
            "TFT14_Nidalee": ["TFT14_AMP", "TFT14_Burnout"],
            "TFT14_Nami": ["TFT14_AMP", "TFT14_HyperTech"],
            "TFT14_Yuumi": ["TFT14_AMP", "TFT14_BehemothSquad", "TFT14_Strategist"],
            "TFT14_Annie": ["TFT14_AMP", "TFT14_BigShot"],
            "TFT14_Samira": ["TFT14_AMP", "TFT14_StreetPunk"],
            
            # 街頭狂魔 (Street Punk)
            "TFT14_DrMundo": ["TFT14_StreetPunk", "TFT14_Bruiser", "TFT14_Executioner"],
            "TFT14_Jinx": ["TFT14_StreetPunk", "TFT14_Spellweaver"],
            "TFT14_Ekko": ["TFT14_StreetPunk", "TFT14_Strategist"],
            "TFT14_Jhin": ["TFT14_StreetPunk", "TFT14_Gunner"],
            "TFT14_Rengar": ["TFT14_StreetPunk", "TFT14_Executioner"],
            
            # 更多英雄對應可以添加...
        }
        return mapping
    
    def connect_to_db(self):
        """連接到資料庫"""
        return mysql.connector.connect(**self.db_config)
    
    def get_trait_data(self):
        """獲取羈絆資料"""
        connection = self.connect_to_db()
        query = """
        SELECT t.trait_id, t.player_id, t.match_id, t.trait_name, 
               t.tier_current, t.tier_total, p.placement
        FROM traits t
        JOIN players p ON t.player_id = p.player_id AND t.match_id = p.match_id
        """
        df = pd.read_sql(query, connection)
        connection.close()
        return df
    
    def get_units_data(self):
        """獲取英雄單位資料"""
        connection = self.connect_to_db()
        query = """
        SELECT u.unit_id, u.player_id, u.match_id, u.character_id, 
               u.tier, u.items, p.placement
        FROM units u
        JOIN players p ON u.player_id = p.player_id AND u.match_id = p.match_id
        """
        df = pd.read_sql(query, connection)
        connection.close()
        return df
    
    def calculate_trait_strength(self):
        """計算各羈絆的強度"""
        traits_df = self.get_trait_data()
        
        # 按羈絆分組計算勝率
        trait_stats = traits_df.groupby('trait_name').agg({
            'placement': ['mean', 'count'],
            'tier_current': 'mean'
        }).reset_index()
        
        # 計算勝率分數 (前4名比例)
        placement_counts = traits_df.groupby(['trait_name', 'placement']).size().unstack(fill_value=0)
        
        # 如果有1-4名的列，計算勝率
        top4_cols = [col for col in placement_counts.columns if col <= 4]
        if top4_cols:
            placement_counts['top4'] = placement_counts[top4_cols].sum(axis=1)
            placement_counts['total'] = placement_counts.sum(axis=1)
            placement_counts['win_rate'] = placement_counts['top4'] / placement_counts['total']
            
            # 合併到統計資料
            win_rates = placement_counts['win_rate'].reset_index()
            trait_stats = trait_stats.merge(win_rates, on='trait_name')
        
        return trait_stats
    
    def calculate_hero_synergies(self):
        """計算英雄之間的協同關係"""
        units_df = self.get_units_data()
        
        # 獲取每個對局中的英雄組合
        comps = units_df.groupby(['match_id', 'player_id']).agg({
            'character_id': list,
            'placement': 'first'
        }).reset_index()
        
        # 建立英雄協同矩陣
        heroes = units_df['character_id'].unique()
        synergy_matrix = pd.DataFrame(0, index=heroes, columns=heroes)
        win_matrix = pd.DataFrame(0, index=heroes, columns=heroes)
        
        # 計算協同出現次數和勝率
        for _, row in comps.iterrows():
            heroes_in_comp = row['character_id']
            for i, hero1 in enumerate(heroes_in_comp):
                for hero2 in heroes_in_comp[i+1:]:
                    synergy_matrix.loc[hero1, hero2] += 1
                    synergy_matrix.loc[hero2, hero1] += 1
                    
                    # 計算前4名的勝率
                    if row['placement'] <= 4:
                        win_matrix.loc[hero1, hero2] += 1
                        win_matrix.loc[hero2, hero1] += 1
        
        # 避免除以零
        win_rate_matrix = win_matrix / (synergy_matrix + 0.001)
        
        # 轉換為網絡圖所需的節點和邊
        nodes = []
        links = []
        
        # 添加節點
        for hero in heroes:
            hero_stats = units_df[units_df['character_id'] == hero]
            
            # 計算使用率和勝率
            usage_count = hero_stats.shape[0]
            win_count = hero_stats[hero_stats['placement'] <= 4].shape[0]
            win_rate = win_count / max(usage_count, 1)
            
            # 獲取英雄所屬羈絆
            traits = self.hero_trait_mapping.get(hero, ["Unknown"])
            
            nodes.append({
                "id": hero,
                "name": self._get_hero_chinese_name(hero),
                "traits": traits,
                "primary_trait": traits[0] if traits else "Unknown",
                "win_rate": win_rate,
                "usage_count": usage_count,
                "avg_placement": hero_stats['placement'].mean()
            })
        
        # 添加邊 (協同關係)
        for i, hero1 in enumerate(heroes):
            for hero2 in heroes[i+1:]:
                synergy_count = synergy_matrix.loc[hero1, hero2]
                
                # 過濾低協同度的連線
                if synergy_count > 5:  # 出現至少5次
                    win_rate = win_rate_matrix.loc[hero1, hero2]
                    
                    # 判斷是否為同羈絆
                    hero1_traits = set(self.hero_trait_mapping.get(hero1, []))
                    hero2_traits = set(self.hero_trait_mapping.get(hero2, []))
                    shared_traits = hero1_traits.intersection(hero2_traits)
                    
                    links.append({
                        "source": hero1,
                        "target": hero2,
                        "value": synergy_count * win_rate * 10,  # 綜合協同強度
                        "win_rate": float(win_rate),
                        "synergy_count": int(synergy_count),
                        "type": "same_trait" if shared_traits else "cross_trait",
                        "shared_traits": list(shared_traits)
                    })
        
        return {"nodes": nodes, "links": links}
    
    def _get_hero_chinese_name(self, hero_id):
        """獲取英雄的中文名稱"""
        # 這裡應該實現英雄ID轉換為中文名的邏輯
        # 範例映射
        hero_names = {
            "TFT14_Poppy": "波比",
            "TFT14_Veigar": "維迦",
            "TFT14_Ziggs": "希格斯",
            "TFT14_KogMaw": "柯布柯",
            "TFT14_Nidalee": "奈德麗",
            "TFT14_Yuumi": "悠咪",
            "TFT14_Annie": "安妮",
            "TFT14_Samira": "煞蜜拉",
            # 其他英雄名稱可以添加...
        }
        return hero_names.get(hero_id, hero_id)
    
    def recommend_comp(self, current_heroes):
        """根據當前英雄推薦最佳陣容"""
        units_df = self.get_units_data()
        traits_df = self.get_trait_data()
        
        # 將當前英雄轉換為ID格式
        current_hero_ids = [self._get_hero_id(hero) for hero in current_heroes]
        
        # 查找包含這些英雄的成功陣容
        successful_comps = []
        
        # 按對局分組
        match_comps = units_df.groupby(['match_id', 'player_id']).agg({
            'character_id': list,
            'placement': 'first'
        }).reset_index()
        
        # 篩選前4名的陣容
        top_comps = match_comps[match_comps['placement'] <= 4]
        
        # 計算與當前英雄的重疊
        for _, comp in top_comps.iterrows():
            heroes_in_comp = comp['character_id']
            overlap = len(set(current_hero_ids) & set(heroes_in_comp))
            
            # 如果有重疊，添加到候選陣容
            if overlap > 0:
                successful_comps.append({
                    'heroes': heroes_in_comp,
                    'placement': comp['placement'],
                    'overlap': overlap,
                    'match_id': comp['match_id'],
                    'player_id': comp['player_id']
                })
        
        # 按重疊度和名次排序
        successful_comps.sort(key=lambda x: (x['overlap'], -x['placement']), reverse=True)
        
        # 提取前10個最佳推薦陣容
        recommendations = []
        for comp in successful_comps[:10]:
            # 獲取該陣容的羈絆資料
            comp_traits = traits_df[(traits_df['match_id'] == comp['match_id']) & 
                                   (traits_df['player_id'] == comp['player_id'])]
            
            active_traits = []
            for _, trait in comp_traits.iterrows():
                if trait['tier_current'] > 0:
                    active_traits.append({
                        'name': trait['trait_name'],
                        'level': trait['tier_current'],
                        'max_level': trait['tier_total']
                    })
            
            # 獲取推薦添加的英雄
            recommended_heroes = list(set(comp['heroes']) - set(current_hero_ids))
            
            recommendations.append({
                'full_comp': comp['heroes'],
                'recommended_heroes': recommended_heroes,
                'active_traits': active_traits,
                'placement': comp['placement'],
                'match_id': comp['match_id']
            })
        
        return recommendations
    
    def _get_hero_id(self, hero_name):
        """從中文名稱獲取英雄ID"""
        # 這裡應該實現中文名轉換為英雄ID的邏輯
        # 範例映射
        hero_ids = {
            "波比": "TFT14_Poppy",
            "維迦": "TFT14_Veigar",
            "希格斯": "TFT14_Ziggs",
            "柯布柯": "TFT14_KogMaw",
            "奈德麗": "TFT14_Nidalee",
            "悠咪": "TFT14_Yuumi",
            "安妮": "TFT14_Annie",
            "煞蜜拉": "TFT14_Samira",
            # 其他英雄名稱可以添加...
        }
        return hero_ids.get(hero_name, hero_name)