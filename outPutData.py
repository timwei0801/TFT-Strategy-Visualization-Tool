import pandas as pd
import mysql.connector
import matplotlib.pyplot as plt
import seaborn as sns

# 資料庫連線配置
conn = mysql.connector.connect(
    host= 'localhost',
    user= 'root',
    password= 'Tim0986985588=',
    database= 'TFT_db'
)

# 1. 玩家段位分布
query = """
SELECT 
    tier, 
    COUNT(*) as count 
FROM players 
GROUP BY tier 
ORDER BY CASE 
    WHEN tier = 'CHALLENGER' THEN 1
    WHEN tier = 'GRANDMASTER' THEN 2
    WHEN tier = 'MASTER' THEN 3
    WHEN tier = 'DIAMOND' THEN 4
    WHEN tier = 'PLATINUM' THEN 5
    WHEN tier = 'GOLD' THEN 6
    WHEN tier = 'SILVER' THEN 7
    WHEN tier = 'BRONZE' THEN 8
    ELSE 9
END;
"""
df_tiers = pd.read_sql(query, conn)
print("=== 玩家段位分布 ===")
print(df_tiers)

# 2. 駭入系統相關數據
query = """
SELECT 
    hack_type, 
    COUNT(*) as count 
FROM hacks 
GROUP BY hack_type 
ORDER BY count DESC 
LIMIT 10;
"""
try:
    df_hacks = pd.read_sql(query, conn)
    print("\n=== 駭入類型分布 ===")
    print(df_hacks)
except:
    print("\n資料庫中似乎沒有駭入相關表格")

# 3. 陣容勝率分析
query = """
WITH trait_combinations AS (
    SELECT 
        p.match_id,
        p.player_id,
        p.placement,
        GROUP_CONCAT(t.trait_name ORDER BY t.tier_current DESC SEPARATOR ', ') as comp
    FROM players p
    JOIN traits t ON p.player_id = t.player_id AND p.match_id = t.match_id
    WHERE t.tier_current > 0
    GROUP BY p.match_id, p.player_id, p.placement
)
SELECT 
    comp,
    COUNT(*) as total_games,
    AVG(placement) as avg_placement,
    SUM(CASE WHEN placement = 1 THEN 1 ELSE 0 END) as first_places,
    SUM(CASE WHEN placement <= 4 THEN 1 ELSE 0 END) as top4_finishes,
    SUM(CASE WHEN placement <= 4 THEN 1 ELSE 0 END) / COUNT(*) as top4_rate
FROM trait_combinations
GROUP BY comp
HAVING COUNT(*) >= 20
ORDER BY avg_placement ASC
LIMIT 15;
"""
df_comps = pd.read_sql(query, conn)
print("\n=== 熱門陣容勝率 (平均名次排序) ===")
print(df_comps)

# 4. 各特質的平均名次
query = """
SELECT 
    t.trait_name,
    AVG(p.placement) as avg_placement,
    COUNT(DISTINCT p.player_id) as frequency
FROM traits t
JOIN players p ON t.player_id = p.player_id AND t.match_id = p.match_id
WHERE t.tier_current > 0
GROUP BY t.trait_name
HAVING frequency >= 50
ORDER BY avg_placement ASC;
"""
df_trait_performance = pd.read_sql(query, conn)
print("\n=== 各特質平均名次 ===")
print(df_trait_performance)

# 關閉連接
conn.close()