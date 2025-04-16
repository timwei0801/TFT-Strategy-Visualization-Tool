import requests
import json
import pandas as pd
import time
import os
import mysql.connector
import random
from datetime import datetime, timedelta
from dotenv import load_dotenv

# 載入環境變數
load_dotenv()

# API設定
api_key = os.getenv("RIOT_API_KEY", "RGAPI-96ca7ed8-dec3-40ab-ab9e-8b3d50e5997f")  # 優先使用環境變數

# 擴展伺服器設定 - 增加更多區域
regions_league = ["tw2", "kr", "jp1", "euw1", "na1", "br1", "la1", "la2", "oc1", "ru", "tr1"]
regions_match = {
    "tw2": "sea", "jp1": "sea",
    "kr": "asia",
    "euw1": "europe", "eun1": "europe", "ru": "europe", "tr1": "europe",
    "na1": "americas", "br1": "americas", "la1": "americas", "la2": "americas", "oc1": "americas"
}

# 擴大收集段位範圍
league_tiers = ["challenger", "grandmaster", "master"]

# MySQL 資料庫設定
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Tim0986985588=',
    'database': 'TFT_db'
}

# 控制參數
MAX_PLAYERS_PER_TIER = 50  # 每個段位最多收集的玩家數
MATCHES_PER_PLAYER = 20    # 每位玩家收集的比賽數
MAX_RETRIES = 3            # API請求失敗時的重試次數
RETRY_DELAY = 2            # 重試間隔(秒)
REQUEST_DELAY = 1.2        # 標準請求間隔(秒)

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

# 增強的初始化資料庫函數
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
    
    # 按順序刪除表格 - 如果是增量更新模式則不刪除表格
    if not os.getenv("INCREMENTAL_UPDATE", "False").lower() in ["true", "1", "yes"]:
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
        
        # 建立比賽表
        try:
            cursor.execute('''
            CREATE TABLE matches (
                match_id VARCHAR(50) PRIMARY KEY,
                game_version VARCHAR(150),
                game_length INT,
                game_datetime BIGINT,
                region VARCHAR(10),
                FOREIGN KEY (game_version) REFERENCES game_versions(version_id)
            )
            ''')
            print("已建立matches表，game_version長度為VARCHAR(150)")
        except Exception as e:
            print(f"建立matches表時出錯: {e}")
        
        # 建立玩家表
        try:
            cursor.execute('''
            CREATE TABLE players (
                player_id INT AUTO_INCREMENT PRIMARY KEY,
                puuid VARCHAR(78),
                summoner_name VARCHAR(100),
                tier VARCHAR(20),
                match_id VARCHAR(50),
                placement INT,
                last_round INT,
                FOREIGN KEY (match_id) REFERENCES matches(match_id)
            )
            ''')
            print("已建立players表")
        except Exception as e:
            print(f"建立players表時出錯: {e}")
        
        # 建立單位表
        try:
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
        
        # 建立特質表
        try:
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
    else:
        print("增量更新模式: 保留現有資料表結構")
    
    # 檢查hacks表是否存在，如果不存在則創建
    try:
        cursor.execute("SHOW TABLES LIKE 'hacks'")
        if not cursor.fetchone():
            cursor.execute('''
            CREATE TABLE hacks (
                hack_id INT AUTO_INCREMENT PRIMARY KEY,
                match_id VARCHAR(50),
                hack_type VARCHAR(100),
                hack_description TEXT,
                hack_time INT,
                FOREIGN KEY (match_id) REFERENCES matches(match_id)
            )
            ''')
            print("已建立hacks表")
    except Exception as e:
        print(f"檢查或建立hacks表時出錯: {e}")

    # 檢查augments表是否存在，如果不存在則創建
    try:
        cursor.execute("SHOW TABLES LIKE 'augments'")
        if not cursor.fetchone():
            cursor.execute('''
            CREATE TABLE augments (
                augment_id INT AUTO_INCREMENT PRIMARY KEY,
                player_id INT,
                match_id VARCHAR(50),
                augment_name VARCHAR(100),
                augment_type VARCHAR(50),
                selection_time INT,
                FOREIGN KEY (player_id) REFERENCES players(player_id),
                FOREIGN KEY (match_id) REFERENCES matches(match_id)
            )
            ''')
            print("已建立augments表")
    except Exception as e:
        print(f"檢查或建立augments表時出錯: {e}")
    
    connection.commit()
    return True

# 獲取已收集的比賽ID列表
def get_collected_match_ids(connection):
    cursor = connection.cursor()
    cursor.execute("SELECT match_id FROM matches")
    result = cursor.fetchall()
    return [match[0] for match in result]

# 增強的API請求功能，加入重試機制
def make_api_request(url, params):
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(url, params=params)
            
            # 對於429錯誤（請求過多），等待並重試
            if response.status_code == 429:
                retry_after = int(response.headers.get('Retry-After', RETRY_DELAY * 2))
                print(f"API請求限制，等待 {retry_after} 秒後重試...")
                time.sleep(retry_after)
                continue
                
            # 對於其他非成功狀態碼，可能需要處理
            if response.status_code != 200:
                print(f"API請求失敗，狀態碼: {response.status_code}, 內容: {response.text[:200]}...")
                if attempt < MAX_RETRIES - 1:
                    print(f"等待 {RETRY_DELAY} 秒後重試...")
                    time.sleep(RETRY_DELAY)
                    continue
                return None
                
            # 成功
            return response.json()
                
        except Exception as e:
            print(f"API請求異常: {e}")
            if attempt < MAX_RETRIES - 1:
                print(f"等待 {RETRY_DELAY} 秒後重試...")
                time.sleep(RETRY_DELAY)
                continue
            return None
    
    return None

# 從指定段位獲取高端玩家資料
def get_high_ranking_players(region, league_type="challenger"):
    url = f"https://{region}.api.riotgames.com/tft/league/v1/{league_type}"
    params = {"api_key": api_key}
    
    print(f"請求 {region} 區域的 {league_type} 段位玩家資料...")
    data = make_api_request(url, params)
    
    if data:
        print(f"成功從 {region} 獲取 {league_type} 段位玩家資料，總計 {len(data.get('entries', []))} 位玩家")
        return data.get('entries', [])
    else:
        print(f"無法從 {region} 獲取 {league_type} 段位玩家資料")
        return []

# 獲取玩家的PUUID
def get_summoner_detail(summoner_id, region):
    url = f"https://{region}.api.riotgames.com/tft/summoner/v1/summoners/{summoner_id}"
    params = {"api_key": api_key}
    
    return make_api_request(url, params)

# 獲取玩家比賽記錄
def get_player_matches(puuid, region, count=20):
    url = f"https://{region}.api.riotgames.com/tft/match/v1/matches/by-puuid/{puuid}/ids"
    params = {
        "api_key": api_key,
        "count": count
    }
    
    matches = make_api_request(url, params)
    return matches if matches else []

# 獲取比賽詳情
def get_match_details(match_id, region):
    url = f"https://{region}.api.riotgames.com/tft/match/v1/matches/{match_id}"
    params = {"api_key": api_key}
    
    return make_api_request(url, params)

# 將比賽資料存入資料庫
def save_match_to_database(match_data, connection, region_code, tier="unknown"):
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
        
        # 插入比賽資訊 - 使用 INSERT IGNORE 避免重複
        cursor.execute("INSERT IGNORE INTO matches (match_id, game_version, game_length, game_datetime, region) VALUES (%s, %s, %s, %s, %s)", 
                      (match_id, game_version, game_length, game_datetime, region_code))
        
        # 如果此比賽已存在，直接返回True
        if cursor.rowcount == 0:
            print(f"比賽 {match_id} 已存在於資料庫中，跳過")
            return True
            
        # 處理參與者資料
        for participant in match_data['info']['participants']:
            puuid = participant['puuid']
            placement = participant['placement']
            last_round = participant.get('last_round', 0)
            summoner_name = participant.get('name', '')
            
            # 插入玩家資料
            cursor.execute("INSERT INTO players (puuid, summoner_name, tier, match_id, placement, last_round) VALUES (%s, %s, %s, %s, %s, %s)", 
                          (puuid, summoner_name, tier, match_id, placement, last_round))
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
                
            # 處理增幅裝置資料
            if 'augments' in participant:
                for i, augment in enumerate(participant['augments']):
                    augment_name = augment
                    augment_type = 'standard'  # 預設值
                    # 增幅裝置通常在2-1, 3-2, 4-2回合選擇
                    selection_times = [7, 15, 22]  
                    selection_time = selection_times[i] if i < len(selection_times) else i * 7
                    
                    cursor.execute("INSERT INTO augments (player_id, match_id, augment_name, augment_type, selection_time) VALUES (%s, %s, %s, %s, %s)",
                                  (player_id, match_id, augment_name, augment_type, selection_time))
        
        # 處理駭入系統資料
        try:
            # 檢查game_info中可能包含駭入資訊的欄位
            # 注意：由於API可能沒有明確提供駭入系統資訊，我們需要探索可能的位置
            
            # 方法1：直接檢查tft_game_state
            if 'tft_game_state' in match_data['info'] and isinstance(match_data['info']['tft_game_state'], dict):
                game_state = match_data['info']['tft_game_state']
                if 'hacks' in game_state and isinstance(game_state['hacks'], list):
                    for hack in game_state['hacks']:
                        hack_type = hack.get('type', 'unknown')
                        hack_description = hack.get('description', '')
                        hack_time = hack.get('time', 0)
                        
                        cursor.execute("INSERT INTO hacks (match_id, hack_type, hack_description, hack_time) VALUES (%s, %s, %s, %s)",
                                      (match_id, hack_type, hack_description, hack_time))
            
            # 方法2：檢查tft_set_data
            if 'tft_set_data' in match_data['info'] and isinstance(match_data['info']['tft_set_data'], dict):
                set_data = match_data['info']['tft_set_data']
                if 'hacks' in set_data and isinstance(set_data['hacks'], list):
                    for hack in set_data['hacks']:
                        hack_type = hack.get('type', 'unknown')
                        hack_description = hack.get('description', '')
                        hack_time = hack.get('round', 0)
                        
                        cursor.execute("INSERT INTO hacks (match_id, hack_type, hack_description, hack_time) VALUES (%s, %s, %s, %s)",
                                      (match_id, hack_type, hack_description, hack_time))
            
            # 方法3：檢查tft_hacks專門欄位
            if 'tft_hacks' in match_data['info'] and isinstance(match_data['info']['tft_hacks'], list):
                for hack in match_data['info']['tft_hacks']:
                    hack_type = hack.get('type', 'unknown')
                    hack_description = hack.get('description', '')
                    hack_time = hack.get('time', 0)
                    
                    cursor.execute("INSERT INTO hacks (match_id, hack_type, hack_description, hack_time) VALUES (%s, %s, %s, %s)",
                                  (match_id, hack_type, hack_description, hack_time))
                                  
            # 將完整的match_data保存到日誌，以便後續分析找出駭入資訊
            if random.random() < 0.05:  # 隨機保存5%的match資料用於分析
                try:
                    with open(f"match_data_{match_id}.json", "w", encoding="utf-8") as f:
                        json.dump(match_data, f, ensure_ascii=False, indent=2)
                        print(f"已保存match_id {match_id}的完整資料以供分析")
                except Exception as e:
                    print(f"保存match資料時出錯: {e}")
                    
        except Exception as e:
            print(f"處理駭入系統資料時出錯: {e}")
            # 不要因為駭入系統資料處理錯誤而中斷整個處理流程
        
        connection.commit()
        return True
        
    except Exception as e:
        print(f"存儲比賽資料時發生錯誤: {e}")
        connection.rollback()
        return False

def get_match_stats(connection):
    """獲取資料庫中已收集的比賽數量統計"""
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT COUNT(*) FROM matches")
        match_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM players")
        player_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(DISTINCT match_id) FROM matches WHERE game_datetime > %s", 
                      (int((datetime.now() - timedelta(days=7)).timestamp() * 1000),))
        recent_match_count = cursor.fetchone()[0]
        
        return {
            "total_matches": match_count,
            "total_players": player_count,
            "recent_matches": recent_match_count
        }
    except Exception as e:
        print(f"獲取統計資料時出錯: {e}")
        return {"total_matches": 0, "total_players": 0, "recent_matches": 0}

def get_hack_stats(connection):
    """獲取資料庫中駭入系統的統計資料"""
    cursor = connection.cursor()
    try:
        # 檢查hacks表是否存在
        cursor.execute("SHOW TABLES LIKE 'hacks'")
        if cursor.fetchone():
            cursor.execute("""
                SELECT 
                    hack_type, 
                    COUNT(*) as count 
                FROM hacks 
                GROUP BY hack_type 
                ORDER BY count DESC 
                LIMIT 10
            """)
            hack_stats = cursor.fetchall()
        else:
            hack_stats = []
        
        # 檢查augments表是否存在
        cursor.execute("SHOW TABLES LIKE 'augments'")
        if cursor.fetchone():
            cursor.execute("""
                SELECT 
                    augment_name, 
                    COUNT(*) as count,
                    AVG(p.placement) as avg_placement
                FROM augments a
                JOIN players p ON a.player_id = p.player_id
                GROUP BY augment_name
                HAVING count >= 10
                ORDER BY count DESC
                LIMIT 20
            """)
            augment_stats = cursor.fetchall()
        else:
            augment_stats = []
        
        return {
            "hack_stats": hack_stats,
            "augment_stats": augment_stats
        }
    except Exception as e:
        print(f"獲取駭入系統統計資料時出錯: {e}")
        return {"hack_stats": [], "augment_stats": []}

def main():
    print("=========================================")
    print("TFT資料收集器 - S14機動魔都版本啟動中...")
    print(f"時間: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=========================================")
    
    # 設置增量更新模式，確保不刪除現有資料
    os.environ["INCREMENTAL_UPDATE"] = "True"
    print("已設置增量更新模式，不會刪除現有資料")
    
    # 增量更新模式檢查
    incremental_mode = os.getenv("INCREMENTAL_UPDATE", "False").lower() in ["true", "1", "yes"]
    if incremental_mode:
        print("運行模式: 增量更新 (只收集新資料)")
    else:
        print("運行模式: 完全重建 (清空並重建資料庫)")
    
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
    
    # 如果是增量模式，獲取已收集的比賽ID
    collected_match_ids = []
    if incremental_mode:
        collected_match_ids = get_collected_match_ids(connection)
        print(f"增量模式: 已收集 {len(collected_match_ids)} 場比賽")
    
    # 收集玩家統計資料
    all_players = []
    
    # 為每個區域和段位收集玩家
    valid_regions = []
    for region in regions_league:
        valid_region = False
        for tier in league_tiers:
            players = get_high_ranking_players(region, tier)
            if players:
                valid_region = True
                print(f"成功從 {region} 的 {tier} 段位收集到 {len(players)} 位玩家")
                
                # 按分數排序並選取前N名
                players = sorted(players, key=lambda x: x.get('leaguePoints', 0), reverse=True)[:MAX_PLAYERS_PER_TIER]
                
                # 獲取PUUID
                for i, player in enumerate(players):
                    if i % 10 == 0:
                        print(f"收集 {tier} 段位玩家 {i+1}/{len(players)} 的詳細資料...")
                    
                    summoner_data = get_summoner_detail(player['summonerId'], region)
                    if summoner_data:
                        player_name = summoner_data.get('name', 'Unknown')
                        all_players.append({
                            'puuid': summoner_data.get('puuid'),
                            'summonerName': player_name,
                            'region': region,
                            'tier': tier
                        })
                    
                    # 控制API請求頻率
                    time.sleep(REQUEST_DELAY)
            else:
                print(f"無法從 {region} 的 {tier} 段位收集玩家資料")
        
        if valid_region:
            valid_regions.append(region)
    
    # 打亂玩家順序，避免集中於特定地區
    random.shuffle(all_players)
    print(f"\n已收集到 {len(all_players)} 位玩家的詳細資料，來自 {len(valid_regions)} 個有效區域")
    
    # 在開始收集比賽前，檢查版本字串長度
    if all_players:
        print("\n正在檢查遊戲版本字串長度...")
        first_player = all_players[0]
        match_region = regions_match.get(first_player['region'], "sea")
        get_first_match_version(first_player['puuid'], match_region)
    
    # 收集比賽資料
    match_ids_set = set(collected_match_ids)  # 用於去重，包含已收集的比賽ID
    total_new_matches = 0
    api_limit_warnings = 0
    
    print("\n開始收集比賽資料...")
    for i, player in enumerate(all_players):
        puuid = player['puuid']
        player_name = player.get('summonerName', 'Unknown')
        tier = player.get('tier', 'unknown')
        
        if i % 10 == 0 or i == len(all_players) - 1:
            # 每處理10位玩家，或是最後一位玩家時顯示進度
            stats = get_match_stats(connection)
            print(f"\n進度：已處理 {i+1}/{len(all_players)} 位玩家")
            print(f"目前資料庫狀態：{stats['total_matches']} 場比賽，{stats['total_players']} 位參與者")
            print(f"本次新增：{total_new_matches} 場比賽")
        
        print(f"\n正在處理玩家 {player_name} ({tier})...")
        
        # 根據區域選擇適當的match區域
        match_region = regions_match.get(player['region'], "sea")
        
        # 獲取比賽記錄
        match_ids = get_player_matches(puuid, match_region, MATCHES_PER_PLAYER)
        new_match_count = sum(1 for mid in match_ids if mid not in match_ids_set)
        print(f"已獲取 {len(match_ids)} 場比賽記錄，其中 {new_match_count} 場為新比賽")
        
        # 如果沒有新比賽，考慮跳過
        if new_match_count == 0 and i > len(all_players) // 4:
            print("此玩家無新比賽，跳到下一位")
            continue
        
        player_matches_added = 0
        for match_id in match_ids:
            if match_id in match_ids_set:
                continue
                
            match_ids_set.add(match_id)
            print(f"收集比賽 {match_id} 的數據...")
            
            # 獲取比賽詳情
            match_data = get_match_details(match_id, match_region)
            
            if match_data:
                # 存入資料庫
                if save_match_to_database(match_data, connection, player['region'], tier):
                    print(f"成功存儲比賽 {match_id} 的數據")
                    total_new_matches += 1
                    player_matches_added += 1
                else:
                    print(f"存儲比賽 {match_id} 數據失敗")
            
            # 控制API請求頻率，每5次請求增加延遲
            delay = REQUEST_DELAY * (1 + (player_matches_added % 5 == 0))
            time.sleep(delay)
            
            # 如果遇到太多API限制警告，暫停一段時間
            if api_limit_warnings > 5:
                print("API限制警告過多，暫停60秒...")
                time.sleep(60)
                api_limit_warnings = 0
        
        # 每處理10個玩家，顯示一次進度
        if (i + 1) % 10 == 0:
            print(f"\n已處理 {i+1}/{len(all_players)} 位玩家，已收集 {total_new_matches} 場新比賽")
    
    # 顯示駭入系統統計資料
    try:
        hack_stats = get_hack_stats(connection)
        
        print("\n駭入系統與增幅裝置統計資料:")
        print("========================")
        
        if hack_stats["hack_stats"]:
            print("熱門駭入類型：")
            for hack_type, count in hack_stats["hack_stats"]:
                print(f"  {hack_type}: {count}次")
        else:
            print("目前尚未收集到駭入資料")
        
        if hack_stats["augment_stats"]:
            print("\n熱門增幅裝置：")
            for augment_name, count, avg_placement in hack_stats["augment_stats"]:
                print(f"  {augment_name}: 出現{count}次，平均名次{avg_placement:.2f}")
        else:
            print("目前尚未收集到增幅裝置資料")
    except Exception as e:
        print(f"顯示駭入系統統計資料時出錯: {e}")
    
    # 關閉資料庫連接
    connection.close()
    
    # 顯示最終統計資料
    print("\n=========================================")
    print("資料收集完成！")
    print(f"本次收集了 {total_new_matches} 場新比賽")
    print(f"完成時間: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=========================================")

if __name__ == "__main__":
    main()