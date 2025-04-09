import requests
import json
import pandas as pd
import time
import os
import mysql.connector
from datetime import datetime
from dotenv import load_dotenv

# 載入環境變數
load_dotenv()

# API設定
api_key = os.getenv("RIOT_API_KEY", "RGAPI-6a3bb895-db2d-4d7a-9182-3723e7a01034")  # 優先使用環境變數

# 伺服器設定 - 增加多個區域
regions_league = ["tw2", "kr", "jp1"]  # 獲取玩家基本資料的區域
regions_match = ["sea", "asia"]  # 獲取比賽資料的區域映射

# MySQL 資料庫設定
db_config = {
    'host': 'localhost',
    'user': 'root',  # 更改為你的MySQL使用者名稱
    'password': 'Tim0986985588=',  # 更改為你的MySQL密碼
    'database': 'TFT_db'  # 需要先創建此資料庫
}

def get_first_match_version(puuid, match_region):
    """獲取一場比賽，檢查版本字串長度"""
    try:
        match_ids = get_player_matches(puuid, match_region, 1)
        if match_ids:
            match_data = get_match_details(match_ids[0], match_region)
            if match_data:
                version = match_data['info']['game_version']
                print(f"檢測到遊戲版本字串: {version} (長度: {len(version)})")
                return version
    except Exception as e:
        print(f"檢查版本時出錯: {e}")
    return None

# 建立資料庫連接
def create_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as error:
        print(f"MySQL連接失敗: {error}")
        return None

def initialize_database(connection):
    if connection is None:
        return False
    
    cursor = connection.cursor()
    
    # 先獲取並刪除所有外鍵約束
    try:
        cursor.execute("""
            SELECT TABLE_NAME, CONSTRAINT_NAME 
            FROM information_schema.TABLE_CONSTRAINTS 
            WHERE CONSTRAINT_TYPE = 'FOREIGN KEY' 
            AND TABLE_SCHEMA = %s
        """, (db_config['database'],))
        
        constraints = cursor.fetchall()
        
        # 刪除每個外鍵約束
        for table_name, constraint_name in constraints:
            cursor.execute(f"ALTER TABLE {table_name} DROP FOREIGN KEY {constraint_name}")
        
        connection.commit()
        print("已刪除所有外鍵約束")
    except Exception as e:
        print(f"刪除外鍵約束時發生錯誤: {e}")
    
    # 按順序刪除表格
    tables = ["traits", "units", "players", "matches", "game_versions"]
    for table in tables:
        try:
            cursor.execute(f"DROP TABLE IF EXISTS {table}")
            print(f"已刪除表格 {table}")
        except Exception as e:
            print(f"刪除表格 {table} 時發生錯誤: {e}")
    
    # 建立遊戲版本表 - 增加版本ID長度至150
    try:
        cursor.execute('''
        CREATE TABLE game_versions (
            version_id VARCHAR(150) PRIMARY KEY,
            release_date DATE
        )
        ''')
        print("已建立game_versions表，版本ID長度為VARCHAR(150)")
    except Exception as e:
        print(f"建立game_versions表時出錯: {e}")
    
    # 修改或創建matches表
    try:
        cursor.execute("DROP TABLE IF EXISTS matches")
        cursor.execute('''
        CREATE TABLE matches (
            match_id VARCHAR(50) PRIMARY KEY,
            game_version VARCHAR(100),
            game_length INT,
            game_datetime BIGINT,
            region VARCHAR(10),
            FOREIGN KEY (game_version) REFERENCES game_versions(version_id)
        )
        ''')
        print("已建立matches表，game_version長度為VARCHAR(100)")
    except Exception as e:
        print(f"建立matches表時出錯: {e}")
    
    # 修改或創建其他表格
    try:
        cursor.execute("DROP TABLE IF EXISTS players")
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
        print("已建立players表")
    except Exception as e:
        print(f"建立players表時出錯: {e}")
    
    try:
        cursor.execute("DROP TABLE IF EXISTS units")
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
        print("已建立units表")
    except Exception as e:
        print(f"建立units表時出錯: {e}")
    
    try:
        cursor.execute("DROP TABLE IF EXISTS traits")
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
        print("已建立traits表")
    except Exception as e:
        print(f"建立traits表時出錯: {e}")
    
    connection.commit()
    return True

# 從指定區域獲取高端玩家資料
def get_challenger_players(region, league_type="challenger"):
    # 修正URL格式，確保與最新的Riot API匹配
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
            print(f"響應內容: {response.text[:200]}...")  # 打印部分響應內容以幫助診斷
            return []
        elif response.status_code == 401:
            print(f"API金鑰無效或已過期")
            return []
        elif response.status_code == 429:
            print(f"API請求次數超過限制")
            return []
        else:
            print(f"未知錯誤: {response.status_code}")
            print(f"響應內容: {response.text[:200]}...")  # 打印部分響應內容以幫助診斷
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
        
        # 檢查並插入遊戲版本
        cursor.execute("SELECT 1 FROM game_versions WHERE version_id = %s", (game_version,))
        if not cursor.fetchone():
            release_date = datetime.now().strftime('%Y-%m-%d')  # 使用當前日期作為版本發布日期
            cursor.execute("INSERT INTO game_versions (version_id, release_date) VALUES (%s, %s)", 
                          (game_version, release_date))
        
        # 插入比賽資訊
        cursor.execute("INSERT IGNORE INTO matches (match_id, game_version, game_length, game_datetime, region) VALUES (%s, %s, %s, %s, %s)", 
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
        return True
        
    except Exception as e:
        print(f"存儲比賽資料時發生錯誤: {e}")
        connection.rollback()
        return False

def main():
    print("TFT資料收集器啟動中...")
    
    # 檢查API金鑰
    if not api_key or api_key.startswith("RGAPI-"):
        print(f"使用的API金鑰: {api_key[:10]}...")
        print("注意: 開發用API金鑰有效期為24小時，請確保金鑰有效")
    
    # 建立資料庫連接
    connection = create_db_connection()
    if connection is None:
        print("無法連接到資料庫，程式終止")
        return
    
    # 初始化資料庫結構
    print("初始化資料庫結構...")
    if not initialize_database(connection):
        print("資料庫初始化失敗，程式終止")
        connection.close()
        return
    
    print("資料庫初始化成功！")
    
    # 嘗試使用不同的TFT API區域格式
    regions_to_try = ["tw2", "kr", "jp1", "tw", "kr", "jp", "asia", "sea"]
    
    all_players = []
    for region in regions_to_try:
        print(f"\n嘗試從 {region} 區域收集高端玩家資料...")
        players = get_challenger_players(region)
        
        if players:
            print(f"成功從 {region} 收集到 {len(players)} 位高端玩家")
            print(f"有效的區域代碼: {region}")
            
            # 取前10名玩家
            players = sorted(players, key=lambda x: x.get('leaguePoints', 0), reverse=True)[:10]
            
            # 獲取PUUID
            for i, player in enumerate(players):
                print(f"收集玩家 {i+1}/10 的詳細資料...")
                summoner_data = get_summoner_detail(player['summonerId'], region)
                if summoner_data:
                    player_name = summoner_data.get('name', 'Unknown')
                    all_players.append({
                        'puuid': summoner_data.get('puuid'),
                        'summonerName': player_name,  # 確保有名稱
                        'region': region
                    })
                    print(f"成功獲取玩家資料: {player_name}")
                time.sleep(1.2)
            
            # 在開始收集比賽前，檢查版本字串長度
            if all_players:
                print("\n正在檢查遊戲版本字串長度...")
                first_player = all_players[0]
                match_region = "sea" if first_player['region'] in ["tw2", "jp1", "tw", "jp"] else "asia"
                get_first_match_version(first_player['puuid'], match_region)
            
            # 收集比賽資料部分的玩家名稱顯示
            for i, player in enumerate(all_players):
                puuid = player['puuid']
                player_name = player['summonerName'] or "未知玩家"  # 避免None顯示
                print(f"\n正在處理玩家 {i+1}/{len(all_players)}: {player_name}...")
            
            # 如果已找到有效區域並收集到玩家，不再嘗試其他區域
            if all_players:
                break
    
    print(f"\n已收集到 {len(all_players)} 位玩家的詳細資料")
    
    # 收集比賽資料 - 這是缺少的部分
    match_ids_set = set()  # 用於去重
    matches_per_player = 5  # 每位玩家收集的比賽數量
    
    for i, player in enumerate(all_players):
        puuid = player['puuid']
        print(f"\n正在處理玩家 {i+1}/{len(all_players)}: {player['summonerName']}...")
        
        # 根據區域選擇適當的match區域
        match_region = "sea" if player['region'] in ["tw2", "jp1", "tw", "jp"] else "asia"
        
        # 獲取比賽記錄
        match_ids = get_player_matches(puuid, match_region, matches_per_player)
        print(f"已獲取 {len(match_ids)} 場比賽記錄")
        
        for match_id in match_ids:
            if match_id in match_ids_set:
                print(f"比賽 {match_id} 已處理過，跳過")
                continue
                
            match_ids_set.add(match_id)
            print(f"收集比賽 {match_id} 的數據...")
            
            # 獲取比賽詳情
            match_data = get_match_details(match_id, match_region)
            
            if match_data:
                # 存入資料庫
                if save_match_to_database(match_data, connection, player['region']):
                    print(f"成功存儲比賽 {match_id} 的數據")
                else:
                    print(f"存儲比賽 {match_id} 數據失敗")
            
            time.sleep(1.5)  # 避免API限制
    
    # 關閉資料庫連接
    connection.close()
    print("\n資料收集完成！")
    print(f"共收集了 {len(match_ids_set)} 場比賽的數據")

if __name__ == "__main__":
    main()