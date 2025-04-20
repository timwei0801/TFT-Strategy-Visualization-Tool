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
        mapping = {
            # 依照paste.txt中的資料
            'Alistar': ['Golden Ox', 'Bruiser'],
            'Nidalee': ['Nitro', 'A.M.P.'],
            "Kog'Maw": ['BoomBot', 'Rapidfire'],
            'Zyra': ['Street Demon', 'Techie'],
            'Poppy': ['Cyberboss', 'Bastion'],
            'Seraphine': ['Anima Squad', 'Techie'],
            'Vi': ['Cypher', 'Vanguar'],
            'DrMundo': ['Street Demon', 'Bruiser', 'Slayer'],
            'Shaco': ['Syndicate', 'Slayer'],
            'Jax': ['Exotech', 'Bastion'],
            'Sylas': ['Anima Squad', 'Vanguar'],
            'Kindred': ['Nitro', 'Rapidfire', 'Marksman'],
            'Morgana': ['Divinicorp', 'Dynamo'],
            'Illaoi': ['Anima Squad', 'Bastion'],
            'Rhaast': ['Divinicorp', 'Vanguar'],
            'LeBlanc': ['Cypher', 'Strategist'],
            'Skarner': ['Vanguar', 'BoomBot'],
            'Naafiri': ['Exotech', 'A.M.P.'],
            'Shyvana': ['Nitro', 'Bastion', 'Techie'],
            'Vayne': ['Slayer', 'Anima Squad'],
            'Jhin': ['Exotech', 'Marksman', 'Dynamo'],
            'Veigar': ['Cyberboss', 'Techie'],
            'Ekko': ['Street Demon', 'Strategist'],
            'Graves': ['Golden Ox', 'Executioner'],
            'Twisted Fate': ['Syndicate', 'Rapidfire'],
            'Darius': ['Syndicate', 'Bruiser'],
            'Elise': ['Nitro', 'Dynamo'],
            'Galio': ['Cypher', 'Bastion'],
            'Gragas': ['Divinicorp', 'Bruiser'],
            'Jinx': ['Street Demon', 'Marksman'],
            'Jarvan IV': ['Golden Ox', 'Vanguar', 'Slayer'],
            'Senna': ['Divinicorp', 'Slayer'],
            'Braum': ['Syndicate', 'Vanguar'],
            'Yuumi': ['Anima Squad', 'A.M.P.', 'Strategist'],
            'Varus': ['Exotech', 'Executioner'],
            'Fiddlesticks': ['BoomBot', 'Techie'],
            'Draven': ['Cypher', 'Rapidfire'],
            'Rengar': ['Street Demon', 'Executioner'],
            'Mordekaiser': ['Exotech', 'Bruiser', 'Techie'],
            'Aphelios': ['Golden Ox', 'Marksman'],
            'Xayah': ['Anima Squad', 'Marksman'],
            'Zed': ['Cypher', 'Slayer'],
            'Sejuani': ['Exotech', 'Bastion'],
            'Miss Fortune': ['Syndicate', 'Dynamo'],
            'Neeko': ['Street Demon', 'Strategist'],
            'Zeri': ['Exotech', 'Rapidfire'],
            'Annie': ['Golden Ox', 'A.M.P.'],
            'Brand': ['Street Demon', 'Techie'],
            'Ziggs': ['Cyberboss', 'Strategist'],
            "Cho'Gath": ['BoomBot', 'Bruiser'],
            'Vex': ['Divinicorp', 'Executioner'],
            'Leona': ['Anima Squad', 'Vanguar'],
            'Zac': ['Virus'],
            'Kobuko': ['Cyberboss', 'Bruiser'],
            'Aurora': ['Anima Squad', 'Dynamo'],
            'Urgot': ['Executioner', 'BoomBot'],
            'Samira': ['Street Demon', 'A.M.P.'],
            'Viego': ['Soul Killer', 'Golden Ox', 'Techie'],
            'Garen': ['God of the Net'],
            'Renekton': ['Overlord', 'Divinicorp', 'Bastion'],
        }
        
        # 將字典的鍵和值添加TFT14_前綴以匹配系統格式
        formatted_mapping = {}
        for hero, traits in mapping.items():
            hero_key = f"TFT14_{hero}"
            trait_values = [f"TFT14_{trait}" for trait in traits]
            formatted_mapping[hero_key] = trait_values
        
        return formatted_mapping
    
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
        hero_names = {
            "Alistar": "亞歷斯塔",
            "Nidalee": "奈德麗",
            "Kog'Maw": "寇格魔",
            "Zyra": "枷蘿",
            "Poppy": "波比",
            "Seraphine": "瑟菈紛",
            "Vi": "菲艾",
            "DrMundo": "蒙多醫生",
            "Shaco": "薩科",
            "Jax": "賈克斯",
            "Sylas": "賽勒斯",
            "Kindred": "鏡爪",
            "Morgana": "魔甘娜",
            "Illaoi": "伊羅旖",
            "Rhaast": "勒哈斯特",
            "LeBlanc": "勒布朗",
            "Skarner": "史加納",
            "Naafiri": "娜菲芮",
            "Shyvana": "希瓦娜",
            "Vayne": "汎",
            "Jhin": "燼",
            "Veigar": "維迦",
            "Ekko": "艾克",
            "Graves": "葛雷夫",
            "Twisted Fate": "逆命",
            "Darius": "達瑞斯",
            "Elise": "伊莉絲",
            "Galio": "加里歐",
            "Gragas": "古拉格斯",
            "Jinx": "吉茵珂絲",
            "Jarvan IV": "嘉文四世",
            "Senna": "姍娜",
            "Braum": "布朗姆",
            "Yuumi": "悠咪",
            "Varus": "法洛士",
            "Fiddlesticks": "費德提克",
            "Draven": "達瑞文",
            "Rengar": "雷葛爾",
            "Mordekaiser": "魔鬥凱薩",
            "Aphelios": "亞菲利歐",
            "Xayah": "剎雅",
            "Zed": "劫",
            "Sejuani": "史瓦妮",
            "Miss Fortune": "好運姐",
            "Neeko": "妮可",
            "Zeri": "婕莉",
            "Annie": "安妮",
            "Brand": "布蘭德",
            "Ziggs": "希格斯",
            "Cho'Gath": "科加斯",
            "Vex": "薇可斯",
            "Leona": "雷歐娜",
            "Zac": "札克",
            "Kobuko": "柯布柯",
            "Aurora": "歐羅拉",
            "Urgot": "烏爾加特",
            "Samira": "煞蜜拉",
            "Viego": "維爾戈",
            "Garen": "蓋倫",
            "Renekton": "雷尼克頓",
        }
        # 移除TFT14_前綴以匹配字典
        clean_id = hero_id.replace("TFT14_", "")
        return hero_names.get(clean_id, hero_id)

    
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
        hero_ids = {
            "亞歷斯塔": "Alistar",
            "奈德麗": "Nidalee",
            "寇格魔": "Kog'Maw",
            "枷蘿": "Zyra",
            "波比": "Poppy",
            "瑟菈紛": "Seraphine",
            "菲艾": "Vi",
            "蒙多醫生": "DrMundo",
            "薩科": "Shaco",
            "賈克斯": "Jax",
            "賽勒斯": "Sylas",
            "鏡爪": "Kindred",
            "魔甘娜": "Morgana",
            "伊羅旖": "Illaoi",
            "勒哈斯特": "Rhaast",
            "勒布朗": "LeBlanc",
            "史加納": "Skarner",
            "娜菲芮": "Naafiri",
            "希瓦娜": "Shyvana",
            "汎": "Vayne",
            "燼": "Jhin",
            "維迦": "Veigar",
            "艾克": "Ekko",
            "葛雷夫": "Graves",
            "逆命": "Twisted Fate",
            "達瑞斯": "Darius",
            "伊莉絲": "Elise",
            "加里歐": "Galio",
            "古拉格斯": "Gragas",
            "吉茵珂絲": "Jinx",
            "嘉文四世": "Jarvan IV",
            "姍娜": "Senna",
            "布朗姆": "Braum",
            "悠咪": "Yuumi",
            "法洛士": "Varus",
            "費德提克": "Fiddlesticks",
            "達瑞文": "Draven",
            "雷葛爾": "Rengar",
            "魔鬥凱薩": "Mordekaiser",
            "亞菲利歐": "Aphelios",
            "剎雅": "Xayah",
            "劫": "Zed",
            "史瓦妮": "Sejuani",
            "好運姐": "Miss Fortune",
            "妮可": "Neeko",
            "婕莉": "Zeri",
            "安妮": "Annie",
            "布蘭德": "Brand",
            "希格斯": "Ziggs",
            "科加斯": "Cho'Gath",
            "薇可斯": "Vex",
            "雷歐娜": "Leona",
            "札克": "Zac",
            "柯布柯": "Kobuko",
            "歐羅拉": "Aurora",
            "烏爾加特": "Urgot",
            "煞蜜拉": "Samira",
            "維爾戈": "Viego",
            "蓋倫": "Garen",
            "雷尼克頓": "Renekton",
        }
        hero_id = hero_ids.get(hero_name, hero_name)
        # 添加TFT14_前綴以符合系統格式
        return f"TFT14_{hero_id}" if not hero_id.startswith("TFT14_") else hero_id