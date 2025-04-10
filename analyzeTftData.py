import mysql.connector
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter, defaultdict
import json
import os
from datetime import datetime

# 設置中文顯示
plt.rcParams['font.sans-serif'] = ['Arial Unicode MS']  # macOS適用
plt.rcParams['axes.unicode_minus'] = False

# 資料庫連線配置
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Tim0986985588=',
    'database': 'TFT_db'
}

# 建立連線
def connect_to_db():
    try:
        conn = mysql.connector.connect(**db_config)
        print("成功連接到資料庫")
        return conn
    except mysql.connector.Error as e:
        print(f"資料庫連接失敗: {e}")
        return None

def get_database_stats(conn):
    """獲取資料庫基本統計信息"""
    cursor = conn.cursor()
    stats = {}
    
    # 獲取比賽數量
    cursor.execute("SELECT COUNT(*) FROM matches")
    stats['total_matches'] = cursor.fetchone()[0]
    
    # 獲取玩家數量
    cursor.execute("SELECT COUNT(*) FROM players")
    stats['total_players'] = cursor.fetchone()[0]
    
    # 獲取唯一特質數量
    cursor.execute("SELECT COUNT(DISTINCT trait_name) FROM traits")
    stats['unique_traits'] = cursor.fetchone()[0]
    
    # 獲取唯一英雄數量
    cursor.execute("SELECT COUNT(DISTINCT character_id) FROM units")
    stats['unique_champions'] = cursor.fetchone()[0]
    
    # 獲取平均每場比賽的玩家數
    cursor.execute("SELECT AVG(player_count) FROM (SELECT match_id, COUNT(*) as player_count FROM players GROUP BY match_id) as subquery")
    stats['avg_players_per_match'] = cursor.fetchone()[0]
    
    return stats

def analyze_popular_traits(conn):
    """分析最受歡迎的特質及其勝率"""
    query = """
    SELECT 
        t.trait_name, 
        COUNT(*) as frequency, 
        AVG(CASE WHEN p.placement <= 4 THEN 1 ELSE 0 END) as top4_rate,
        AVG(CASE WHEN p.placement = 1 THEN 1 ELSE 0 END) as win_rate
    FROM 
        traits t
    JOIN 
        players p ON t.player_id = p.player_id
    GROUP BY 
        t.trait_name
    HAVING 
        frequency > 100
    ORDER BY 
        frequency DESC
    """
    
    df = pd.read_sql(query, conn)
    
    # 清理特質名稱，移除前綴
    df['trait_display_name'] = df['trait_name'].str.replace('TFT14_', '', regex=True)
    
    return df

def analyze_popular_champions(conn):
    """分析最受歡迎的英雄及其勝率"""
    query = """
    SELECT 
        u.character_id, 
        COUNT(*) as frequency, 
        AVG(CASE WHEN p.placement <= 4 THEN 1 ELSE 0 END) as top4_rate,
        AVG(CASE WHEN p.placement = 1 THEN 1 ELSE 0 END) as win_rate
    FROM 
        units u
    JOIN 
        players p ON u.player_id = p.player_id
    GROUP BY 
        u.character_id
    HAVING 
        frequency > 50
    ORDER BY 
        frequency DESC
    """
    
    df = pd.read_sql(query, conn)
    
    # 清理英雄名稱，移除前綴
    df['champion_display_name'] = df['character_id'].str.replace('TFT14_', '', regex=True)
    
    return df

def analyze_winning_comps(conn):
    """分析獲勝陣容組合（特質+英雄）"""
    query_top_placements = """
    SELECT 
        p.player_id, 
        p.match_id, 
        p.placement
    FROM 
        players p
    WHERE 
        p.placement <= 4
    ORDER BY 
        p.placement ASC
    LIMIT 1000
    """
    
    top_placements = pd.read_sql(query_top_placements, conn)
    
    # 獲取這些玩家的特質
    player_traits = {}
    for _, row in top_placements.iterrows():
        player_id = row['player_id']
        
        # 獲取玩家激活的特質
        cursor = conn.cursor()
        cursor.execute("""
            SELECT trait_name, tier_current 
            FROM traits 
            WHERE player_id = %s AND tier_current > 0
        """, (player_id,))
        
        traits = cursor.fetchall()
        active_traits = [trait[0].replace('TFT14_', '') for trait in traits if trait[1] > 0]
        
        # 獲取玩家使用的英雄
        cursor.execute("""
            SELECT character_id, tier 
            FROM units 
            WHERE player_id = %s
        """, (player_id,))
        
        units = cursor.fetchall()
        champions = [unit[0].replace('TFT14_', '') for unit in units]
        
        player_traits[player_id] = {
            'placement': row['placement'],
            'traits': active_traits,
            'champions': champions
        }
    
    # 分析特質組合
    trait_combinations = []
    for player_id, data in player_traits.items():
        if data['placement'] <= 4:  # Top 4
            traits = frozenset(data['traits'])
            if len(traits) >= 2:  # 至少有2個特質
                trait_combinations.append((traits, data['placement']))
    
    # 計算每種特質組合的出現次數和平均名次
    trait_combo_stats = {}
    for traits, placement in trait_combinations:
        if len(traits) < 2:
            continue
        traits_str = ", ".join(sorted(traits))
        if traits_str not in trait_combo_stats:
            trait_combo_stats[traits_str] = {'count': 0, 'placements': []}
        trait_combo_stats[traits_str]['count'] += 1
        trait_combo_stats[traits_str]['placements'].append(placement)
    
    # 計算平均名次
    for combo, stats in trait_combo_stats.items():
        stats['avg_placement'] = sum(stats['placements']) / len(stats['placements'])
    
    # 過濾出現次數大於3次的特質組合
    popular_combos = {k: v for k, v in trait_combo_stats.items() if v['count'] > 3}
    
    # 按出現次數排序
    sorted_combos = sorted(popular_combos.items(), key=lambda x: x[1]['count'], reverse=True)
    
    return sorted_combos, player_traits

def analyze_trait_synergies(conn):
    """分析特質之間的協同效應"""
    query = """
    SELECT 
        p.player_id, 
        t.trait_name,
        t.tier_current,
        p.placement
    FROM 
        traits t
    JOIN 
        players p ON t.player_id = p.player_id
    WHERE 
        t.tier_current > 0
    """
    
    df = pd.read_sql(query, conn)
    
    # 清理特質名稱
    df['trait_name'] = df['trait_name'].str.replace('TFT14_', '', regex=True)
    
    # 獲取所有活躍特質
    all_traits = df['trait_name'].unique()
    
    # 為每個玩家創建特質列表
    player_traits = df.groupby('player_id').apply(
        lambda x: [(row['trait_name'], row['tier_current']) for _, row in x.iterrows()]
    ).to_dict()
    
    # 獲取每個玩家的名次
    player_placements = df[['player_id', 'placement']].drop_duplicates().set_index('player_id')['placement'].to_dict()
    
    # 計算特質對的協同效應
    trait_pairs = []
    for player_id, traits in player_traits.items():
        trait_names = [t[0] for t in traits]
        placement = player_placements[player_id]
        
        # 生成所有特質對
        for i in range(len(trait_names)):
            for j in range(i + 1, len(trait_names)):
                trait_pair = tuple(sorted([trait_names[i], trait_names[j]]))
                trait_pairs.append((trait_pair, placement))
    
    # 計算每個特質對的平均名次
    pair_stats = {}
    for (trait1, trait2), placement in trait_pairs:
        pair = f"{trait1} + {trait2}"
        if pair not in pair_stats:
            pair_stats[pair] = {'count': 0, 'placements': []}
        pair_stats[pair]['count'] += 1
        pair_stats[pair]['placements'].append(placement)
    
    # 計算平均名次，並轉換為勝率（前4名）
    for pair, stats in pair_stats.items():
        stats['avg_placement'] = sum(stats['placements']) / len(stats['placements'])
        stats['top4_rate'] = sum(1 for p in stats['placements'] if p <= 4) / len(stats['placements'])
    
    # 過濾出現次數大於10次的特質對
    popular_pairs = {k: v for k, v in pair_stats.items() if v['count'] > 10}
    
    # 按top4率排序
    sorted_pairs = sorted(popular_pairs.items(), key=lambda x: x[1]['top4_rate'], reverse=True)
    
    return sorted_pairs

def analyze_champion_items(conn):
    """分析英雄與物品的搭配情況"""
    query = """
    SELECT 
        u.character_id, 
        u.items,
        p.placement
    FROM 
        units u
    JOIN 
        players p ON u.player_id = p.player_id
    WHERE 
        u.items != ''
    """
    
    df = pd.read_sql(query, conn)
    
    # 清理英雄名稱
    df['champion'] = df['character_id'].str.replace('TFT14_', '', regex=True)
    
    # 解析物品列表
    df['item_list'] = df['items'].apply(lambda x: [int(i) for i in x.split(',') if i.strip()])
    
    # 計算每個英雄-物品組合的出現次數和勝率
    champion_item_stats = {}
    
    for _, row in df.iterrows():
        champion = row['champion']
        items = row['item_list']
        placement = row['placement']
        
        for item in items:
            key = (champion, item)
            if key not in champion_item_stats:
                champion_item_stats[key] = {'count': 0, 'placements': []}
            champion_item_stats[key]['count'] += 1
            champion_item_stats[key]['placements'].append(placement)
    
    # 計算平均名次和TOP4率
    for key, stats in champion_item_stats.items():
        stats['avg_placement'] = sum(stats['placements']) / len(stats['placements'])
        stats['top4_rate'] = sum(1 for p in stats['placements'] if p <= 4) / len(stats['placements'])
    
    # 過濾出現次數大於5次的組合
    popular_combinations = {k: v for k, v in champion_item_stats.items() if v['count'] > 5}
    
    # 按出現次數排序
    sorted_combinations = sorted(popular_combinations.items(), key=lambda x: x[1]['count'], reverse=True)
    
    return sorted_combinations

def generate_html_report(stats, popular_traits, popular_champions, winning_comps, trait_synergies, champion_items):
    """生成HTML格式的分析報告"""
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>TFT S14「機動魔都」數據分析報告</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 20px; }}
            h1 {{ color: #333; }}
            h2 {{ color: #555; margin-top: 30px; }}
            table {{ border-collapse: collapse; width: 100%; margin-top: 10px; }}
            th, td {{ padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }}
            th {{ background-color: #f2f2f2; }}
            tr:hover {{ background-color: #f5f5f5; }}
            .highlight {{ background-color: #ffd700; }}
            .container {{ margin-bottom: 40px; }}
        </style>
    </head>
    <body>
        <h1>TFT S14「機動魔都」數據分析報告</h1>
        <p>報告生成時間: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
        
        <div class="container">
            <h2>數據總覽</h2>
            <table>
                <tr><th>指標</th><th>數值</th></tr>
                <tr><td>比賽總數</td><td>{stats['total_matches']}</td></tr>
                <tr><td>玩家總數</td><td>{stats['total_players']}</td></tr>
                <tr><td>不同特質數量</td><td>{stats['unique_traits']}</td></tr>
                <tr><td>不同英雄數量</td><td>{stats['unique_champions']}</td></tr>
                <tr><td>每場平均玩家數</td><td>{stats['avg_players_per_match']:.2f}</td></tr>
            </table>
        </div>
        
        <div class="container">
            <h2>熱門特質分析</h2>
            <table>
                <tr>
                    <th>特質名稱</th>
                    <th>出現次數</th>
                    <th>TOP4率</th>
                    <th>勝率</th>
                </tr>
    """
    
    # 添加熱門特質數據
    for _, row in popular_traits.head(20).iterrows():
        html += f"""
                <tr>
                    <td>{row['trait_display_name']}</td>
                    <td>{row['frequency']}</td>
                    <td>{row['top4_rate']:.2%}</td>
                    <td>{row['win_rate']:.2%}</td>
                </tr>
        """
    
    html += """
            </table>
        </div>
        
        <div class="container">
            <h2>熱門英雄分析</h2>
            <table>
                <tr>
                    <th>英雄名稱</th>
                    <th>出現次數</th>
                    <th>TOP4率</th>
                    <th>勝率</th>
                </tr>
    """
    
    # 添加熱門英雄數據
    for _, row in popular_champions.head(20).iterrows():
        html += f"""
                <tr>
                    <td>{row['champion_display_name']}</td>
                    <td>{row['frequency']}</td>
                    <td>{row['top4_rate']:.2%}</td>
                    <td>{row['win_rate']:.2%}</td>
                </tr>
        """
    
    html += """
            </table>
        </div>
        
        <div class="container">
            <h2>優勢陣容分析</h2>
            <table>
                <tr>
                    <th>特質組合</th>
                    <th>出現次數</th>
                    <th>平均名次</th>
                </tr>
    """
    
    # 添加優勢陣容數據
    for combo, stats in winning_comps[:20]:
        html += f"""
                <tr>
                    <td>{combo}</td>
                    <td>{stats['count']}</td>
                    <td>{stats['avg_placement']:.2f}</td>
                </tr>
        """
    
    html += """
            </table>
        </div>
        
        <div class="container">
            <h2>特質協同效應</h2>
            <table>
                <tr>
                    <th>特質組合</th>
                    <th>出現次數</th>
                    <th>TOP4率</th>
                    <th>平均名次</th>
                </tr>
    """
    
    # 添加特質協同數據
    for pair, stats in trait_synergies[:20]:
        html += f"""
                <tr>
                    <td>{pair}</td>
                    <td>{stats['count']}</td>
                    <td>{stats['top4_rate']:.2%}</td>
                    <td>{stats['avg_placement']:.2f}</td>
                </tr>
        """
    
    html += """
            </table>
        </div>
        
        <div class="container">
            <h2>英雄與裝備分析</h2>
            <table>
                <tr>
                    <th>英雄</th>
                    <th>裝備ID</th>
                    <th>出現次數</th>
                    <th>TOP4率</th>
                    <th>平均名次</th>
                </tr>
    """
    
    # 添加英雄與裝備數據
    for (champion, item), stats in champion_items[:30]:
        html += f"""
                <tr>
                    <td>{champion}</td>
                    <td>{item}</td>
                    <td>{stats['count']}</td>
                    <td>{stats['top4_rate']:.2%}</td>
                    <td>{stats['avg_placement']:.2f}</td>
                </tr>
        """
    
    html += """
            </table>
        </div>
    </body>
    </html>
    """
    
    # 儲存HTML報告
    with open('tft_analysis_report.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    print("已生成HTML分析報告: tft_analysis_report.html")

def visualize_trait_popularity(popular_traits):
    """繪製特質熱門程度與勝率的關係圖"""
    plt.figure(figsize=(12, 8))
    
    # 繪製散點圖
    plt.scatter(
        popular_traits['frequency'], 
        popular_traits['top4_rate'], 
        s=popular_traits['frequency']/10,  # 點的大小與出現頻率成正比
        alpha=0.7
    )
    
    # 標記前10位熱門特質
    for i, row in popular_traits.head(10).iterrows():
        plt.annotate(
            row['trait_display_name'],
            xy=(row['frequency'], row['top4_rate']),
            xytext=(5, 5),
            textcoords='offset points'
        )
    
    plt.title('特質熱門程度與TOP4率關係')
    plt.xlabel('出現次數')
    plt.ylabel('TOP4率')
    plt.grid(True, linestyle='--', alpha=0.7)
    
    # 保存圖片
    plt.tight_layout()
    plt.savefig('trait_popularity_vs_performance.png', dpi=300)
    plt.close()

def main():
    """主函數"""
    print("TFT資料分析開始...")
    
    # 連接資料庫
    conn = connect_to_db()
    if conn is None:
        return
    
    # 獲取基本統計數據
    print("獲取資料庫統計信息...")
    stats = get_database_stats(conn)
    print(f"共有 {stats['total_matches']} 場比賽，{stats['total_players']} 位玩家")
    
    # 分析熱門特質
    print("分析熱門特質...")
    popular_traits = analyze_popular_traits(conn)
    print(f"已分析 {len(popular_traits)} 個特質")
    
    # 分析熱門英雄
    print("分析熱門英雄...")
    popular_champions = analyze_popular_champions(conn)
    print(f"已分析 {len(popular_champions)} 個英雄")
    
    # 分析獲勝陣容
    print("分析獲勝陣容組合...")
    winning_comps, player_traits = analyze_winning_comps(conn)
    print(f"已分析 {len(winning_comps)} 個陣容組合")
    
    # 分析特質協同效應
    print("分析特質協同效應...")
    trait_synergies = analyze_trait_synergies(conn)
    print(f"已分析 {len(trait_synergies)} 個特質對")
    
    # 分析英雄與裝備
    print("分析英雄與裝備搭配...")
    champion_items = analyze_champion_items(conn)
    print(f"已分析 {len(champion_items)} 個英雄-裝備組合")
    
    # 生成HTML報告
    print("生成HTML分析報告...")
    generate_html_report(stats, popular_traits, popular_champions, winning_comps, trait_synergies, champion_items)
    
    # 視覺化分析
    print("生成視覺化圖表...")
    visualize_trait_popularity(popular_traits)
    
    # 關閉資料庫連接
    conn.close()
    print("TFT資料分析完成！")

if __name__ == "__main__":
    main()