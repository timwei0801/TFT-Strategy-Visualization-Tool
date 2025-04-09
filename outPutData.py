import mysql.connector
import pandas as pd

# 資料庫連線配置
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Tim0986985588=',
    'database': 'TFT_db'
}

# 建立連線
conn = mysql.connector.connect(**db_config)

# 查詢並輸出結果
queries = {
    "比賽數量": "SELECT COUNT(*) as total_matches FROM matches",
    "版本分佈": "SELECT game_version, COUNT(*) as count FROM matches GROUP BY game_version",
    "玩家數量": "SELECT COUNT(*) as total_players FROM players",
    "熱門特質": "SELECT trait_name, COUNT(*) as count FROM traits GROUP BY trait_name ORDER BY count DESC LIMIT 20",
    "熱門英雄": "SELECT character_id, COUNT(*) as count FROM units GROUP BY character_id ORDER BY count DESC LIMIT 20"
}

for name, query in queries.items():
    print(f"\n=== {name} ===")
    df = pd.read_sql(query, conn)
    print(df)

conn.close()