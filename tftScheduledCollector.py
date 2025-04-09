# 創建新文件: tftScheduledCollector.py
import requests
import json
import mysql.connector
import time
import os
import schedule
from datetime import datetime, timedelta
from dotenv import load_dotenv

# 載入環境變數
load_dotenv()

# API設定
api_key = os.getenv("RIOT_API_KEY", "YOUR_API_KEY")  # 優先使用環境變數

# MySQL 資料庫設定
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Tim0986985588=',
    'database': 'TFT_db'
}

# 建立資料庫連接
def create_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as error:
        print(f"MySQL連接失敗: {error}")
        return None

# 初始化或重建資料庫表格
def reset_database(connection, force_reset=False):
    if connection is None:
        return False
    
    cursor = connection.cursor()
    
    # 檢查是否需要重建數據庫
    if not force_reset:
        # 檢查version_id欄位長度
        try:
            cursor.execute("SHOW COLUMNS FROM game_versions LIKE 'version_id'")
            column_info = cursor.fetchone()
            if column_info and 'varchar(100)' in column_info[1].lower():
                print("數據庫結構已正確設置")
                return True
        except:
            pass  # 如果表不存在，繼續重建
    
    print("開始重建數據庫表格結構...")
    
    # 以正確順序刪除表格 (從子表到父表)
    try:
        # 關閉外鍵檢查
        cursor.execute("SET FOREIGN_KEY_CHECKS = 0")
        
        # 刪除表格
        tables_to_drop = ["traits", "units", "players", "matches", "game_versions"]
        for table in tables_to_drop:
            cursor.execute(f"DROP TABLE IF EXISTS {table}")
            print(f"已刪除表格 {table} (如果存在)")
        
        # 重新啟用外鍵檢查
        cursor.execute("SET FOREIGN_KEY_CHECKS = 1")
    except Exception as e:
        print(f"刪除表格時出錯: {e}")
        return False
    
    # 以正確順序創建表格 (從父表到子表)
    try:
        # 遊戲版本表
        cursor.execute('''
        CREATE TABLE game_versions (
            version_id VARCHAR(200) PRIMARY KEY,
            release_date DATE,
            is_current BOOLEAN DEFAULT FALSE
        )
        ''')
        print("已創建 game_versions 表 (版本ID長度為200)")
        
        # 比賽表
        cursor.execute('''
        CREATE TABLE matches (
            match_id VARCHAR(50) PRIMARY KEY,
            game_version VARCHAR(200),
            game_length INT,
            game_datetime BIGINT,
            region VARCHAR(10),
            collection_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (game_version) REFERENCES game_versions(version_id)
        )
        ''')
        print("已創建 matches 表")
        
        # 玩家表
        cursor.execute('''
        CREATE TABLE players (
            player_id INT AUTO_INCREMENT PRIMARY KEY,
            puuid VARCHAR(78),
            summoner_name VARCHAR(50),
            match_id VARCHAR(50),
            placement INT,
            last_round INT,
            FOREIGN KEY (match_id) REFERENCES matches(match_id)
        )
        ''')
        print("已創建 players 表")
        
        # 英雄單位表
        cursor.execute('''
        CREATE TABLE units (
            unit_id INT AUTO_INCREMENT PRIMARY KEY,
            player_id INT,
            match_id VARCHAR(50),
            character_id VARCHAR(50),
            tier INT,
            items VARCHAR(200),
            FOREIGN KEY (player_id) REFERENCES players(player_id),
            FOREIGN KEY (match_id) REFERENCES matches(match_id)
        )
        ''')
        print("已創建 units 表")
        
        # 特質表
        cursor.execute('''
        CREATE TABLE traits (
            trait_id INT AUTO_INCREMENT PRIMARY KEY,
            player_id INT,
            match_id VARCHAR(50),
            trait_name VARCHAR(50),
            tier_current INT,
            tier_total INT,
            FOREIGN KEY (player_id) REFERENCES players(player_id),
            FOREIGN KEY (match_id) REFERENCES matches(match_id)
        )
        ''')
        print("已創建 traits 表")
        
        connection.commit()
        print("數據庫表格結構重建完成！")
        return True
    except Exception as e:
        print(f"創建表格時出錯: {e}")
        connection.rollback()
        return False
    
# 添加這些函數在reset_database函數後面

# 從指定區域獲取高端玩家資料
def get_challenger_players(region, league_type="challenger"):
    url = f"https://{region}.api.riotgames.com/tft/league/v1/{league_type}"
    params = {"api_key": api_key}
    
    try:
        response = requests.get(url, params=params)
        print(f"API請求URL: {url} (不包含API金鑰)")
        print(f"響應狀態碼: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            return data.get('entries', [])
        elif response.status_code == 400:
            print(f"請求格式錯誤，請確認區域代碼和API端點格式")
            return []
        elif response.status_code == 401:
            print(f"API金鑰無效或已過期")
            return []
        elif response.status_code == 429:
            print(f"API請求次數超過限制")
            return []
        else:
            print(f"未知錯誤: {response.status_code}")
            return []
    except Exception as e:
        print(f"請求異常: {e}")
        return []

# 獲取玩家的PUUID
def get_summoner_detail(summoner_id, region):
    url = f"https://{region}.api.riotgames.com/tft/summoner/v1/summoners/{summoner_id}"
    params = {"api_key": api_key}
    
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"無法獲取玩家資料，錯誤碼: {response.status_code}")
        return None

# 獲取玩家比賽記錄
def get_player_matches(puuid, region, count=20):
    url = f"https://{region}.api.riotgames.com/tft/match/v1/matches/by-puuid/{puuid}/ids"
    params = {
        "api_key": api_key,
        "count": count
    }
    
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"無法獲取比賽記錄，錯誤碼: {response.status_code}")
        return []

# 獲取比賽詳情
def get_match_details(match_id, region):
    url = f"https://{region}.api.riotgames.com/tft/match/v1/matches/{match_id}"
    params = {"api_key": api_key}
    
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"無法獲取比賽詳情，錯誤碼: {response.status_code}")
        return None

# 將比賽資料存入資料庫
def save_match_to_database(match_data, connection, region_code):
    if connection is None or not match_data:
        return False
    
    cursor = connection.cursor()
    
    try:
        # 獲取比賽基本資訊
        match_id = match_data['metadata']['match_id']
        game_version = match_data['info']['game_version']
        game_length = match_data['info']['game_length']
        game_datetime = match_data['info']['game_datetime']
        
        # 檢查是否已存在此比賽
        cursor.execute("SELECT 1 FROM matches WHERE match_id = %s", (match_id,))
        if cursor.fetchone():
            print(f"比賽 {match_id} 已在資料庫中，跳過")
            return True
        
        # 檢查並插入遊戲版本
        cursor.execute("SELECT 1 FROM game_versions WHERE version_id = %s", (game_version,))
        if not cursor.fetchone():
            release_date = datetime.now().strftime('%Y-%m-%d')
            cursor.execute("INSERT INTO game_versions (version_id, release_date) VALUES (%s, %s)", 
                          (game_version, release_date))
        
        # 插入比賽資訊
        cursor.execute("INSERT INTO matches (match_id, game_version, game_length, game_datetime, region) VALUES (%s, %s, %s, %s, %s)", 
                      (match_id, game_version, game_length, game_datetime, region_code))
        
        # 處理參與者資料
        for participant in match_data['info']['participants']:
            puuid = participant['puuid']
            placement = participant['placement']
            last_round = participant.get('last_round', 0)
            summoner_name = participant.get('name', '')
            
            # 插入玩家資料
            cursor.execute("INSERT INTO players (puuid, summoner_name, match_id, placement, last_round) VALUES (%s, %s, %s, %s, %s)", 
                          (puuid, summoner_name, match_id, placement, last_round))
            player_id = cursor.lastrowid
            
            # 插入特質資料
            for trait in participant.get('traits', []):
                trait_name = trait['name']
                tier_current = trait.get('tier_current', 0)
                tier_total = trait.get('tier_total', 0)
                
                cursor.execute("INSERT INTO traits (player_id, match_id, trait_name, tier_current, tier_total) VALUES (%s, %s, %s, %s, %s)", 
                              (player_id, match_id, trait_name, tier_current, tier_total))
            
            # 插入英雄單位資料
            for unit in participant.get('units', []):
                character_id = unit['character_id']
                tier = unit.get('tier', 1)
                items = ','.join(map(str, unit.get('items', [])))
                
                cursor.execute("INSERT INTO units (player_id, match_id, character_id, tier, items) VALUES (%s, %s, %s, %s, %s)", 
                              (player_id, match_id, character_id, tier, items))
        
        connection.commit()
        print(f"成功存儲比賽 {match_id} 的數據")
        return True
        
    except Exception as e:
        print(f"存儲比賽資料時發生錯誤: {e}")
        connection.rollback()
        return False

# 從所有支持的區域收集高端玩家資料
def collect_high_rank_players():
    regions = ["kr"]  # 可以添加更多區域："tw2", "jp1"等
    match_regions = {"kr": "asia", "tw2": "sea", "jp1": "sea"}
    
    all_players = []
    for region in regions:
        players = get_challenger_players(region)
        if players:
            # 取前20名玩家
            players = sorted(players, key=lambda x: x.get('leaguePoints', 0), reverse=True)[:20]
            
            for player in players:
                summoner_data = get_summoner_detail(player['summonerId'], region)
                if summoner_data:
                    all_players.append({
                        'puuid': summoner_data.get('puuid'),
                        'summonerName': summoner_data.get('name', 'Unknown'),
                        'region': region,
                        'match_region': match_regions.get(region, 'sea')
                    })
                time.sleep(1.2)  # 避免API限制
    
    return all_players

# 檢測和記錄當前遊戲版本
def detect_current_version(connection):
    players = collect_high_rank_players()
    if not players:
        print("無法收集玩家資料，無法檢測當前版本")
        return None
    
    # 獲取一個比賽來檢測版本
    puuid = players[0]['puuid']
    match_region = players[0]['match_region']
    
    match_ids = get_player_matches(puuid, match_region, 1)
    if not match_ids:
        print("無法獲取比賽記錄")
        return None
    
    match_data = get_match_details(match_ids[0], match_region)
    if not match_data:
        print("無法獲取比賽詳情")
        return None
    
    current_version = match_data['info']['game_version']
    print(f"檢測到當前遊戲版本: {current_version}")
    
    # 更新資料庫中的版本信息
    cursor = connection.cursor()
    try:
        # 重置所有版本為非當前版本
        cursor.execute("UPDATE game_versions SET is_current = FALSE")
        
        # 檢查並插入當前版本
        cursor.execute("SELECT 1 FROM game_versions WHERE version_id = %s", (current_version,))
        if not cursor.fetchone():
            cursor.execute(
                "INSERT INTO game_versions (version_id, release_date, is_current) VALUES (%s, %s, TRUE)",
                (current_version, datetime.now().date())
            )
        else:
            cursor.execute(
                "UPDATE game_versions SET is_current = TRUE WHERE version_id = %s",
                (current_version,)
            )
        
        connection.commit()
        print(f"已更新當前版本: {current_version}")
        return current_version
    except Exception as e:
        print(f"更新版本信息時出錯: {e}")
        connection.rollback()
        return None

# 定時收集數據的主函數
def scheduled_data_collection():
    print(f"\n=== 開始定時數據收集 ({datetime.now()}) ===")
    
    connection = create_db_connection()
    if not connection:
        print("無法連接到數據庫，終止本次收集")
        return
    
    # 檢測當前版本
    current_version = detect_current_version(connection)
    if not current_version:
        print("無法檢測當前版本，使用現有版本")
    
    # 收集玩家數據
    players = collect_high_rank_players()
    print(f"已收集 {len(players)} 位高端玩家資訊")
    
    # 收集每個玩家的比賽數據
    match_count = 0
    matches_per_player = 5
    
    for i, player in enumerate(players):
        print(f"處理玩家 {i+1}/{len(players)}: {player['summonerName']}")
        
        match_ids = get_player_matches(puuid=player['puuid'], 
                                       region=player['match_region'], 
                                       count=matches_per_player)
        
        for match_id in match_ids:
            match_data = get_match_details(match_id, player['match_region'])
            if match_data:
                if save_match_to_database(match_data, connection, player['region']):
                    match_count += 1
            time.sleep(1.2)  # 避免API限制
    
    connection.close()
    print(f"=== 數據收集完成，成功收集 {match_count} 場比賽數據 ===")

# 設置定時任務
def setup_schedule():
    # 每天凌晨3點執行一次完整收集
    schedule.every().day.at("03:00").do(scheduled_data_collection)
    
    # 每隔4小時檢測一次版本變更
    schedule.every(4).hours.do(check_version_changes)
    
    print("已設置定時任務：")
    print("- 每天凌晨3點：完整數據收集")
    print("- 每4小時：版本變更檢測")
    
    while True:
        schedule.run_pending()
        time.sleep(60)

# 檢測版本變更
def check_version_changes():
    print(f"\n=== 檢測版本變更 ({datetime.now()}) ===")
    
    connection = create_db_connection()
    if not connection:
        print("無法連接到數據庫，終止檢測")
        return
    
    # 獲取記錄的當前版本
    cursor = connection.cursor()
    cursor.execute("SELECT version_id FROM game_versions WHERE is_current = TRUE")
    result = cursor.fetchone()
    recorded_version = result[0] if result else None
    
    # 檢測實際當前版本
    actual_version = detect_current_version(connection)
    
    if actual_version and recorded_version != actual_version:
        print(f"檢測到版本變更：{recorded_version} -> {actual_version}")
        print("觸發額外數據收集...")
        scheduled_data_collection()
    else:
        print("未檢測到版本變更")
    
    connection.close()

if __name__ == "__main__":
    # 啟動時先執行一次完整收集
    print("程式啟動，執行初始數據收集...")
    scheduled_data_collection()
    
    # 然後設置定時任務
    setup_schedule()