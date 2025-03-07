import requests
import time
import mysql.connector
from mysql.connector import Error

# API配置
API_KEY = "RGAPI-08cf032e-bf49-4065-8856-e19e1b62b7b0"
REGION = "tw2"  # 台灣伺服器
ASIA_REGION = "asia"  # 亞洲區域接口

# 資料庫配置
DB_CONFIG = {
    'host': 'localhost',
    'database': 'TFT_db',
    'user': 'root',
    'password': 'Tim0986985588='
}

# 資料庫連線函數
def create_db_connection():
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Error as e:
        print(f"資料庫連線錯誤: {e}")
        return None

# API請求函數
def make_request(url, params=None):
    headers = {"X-Riot-Token": API_KEY}
    try:
        print(f"發送請求: {url}")
        response = requests.get(url, headers=headers, params=params)
        
        # 輸出完整回應狀態
        print(f"回應狀態: {response.status_code}")
        
        # 處理API請求限制
        if response.status_code == 429:
            retry_after = int(response.headers.get('Retry-After', 10))
            print(f"請求限制超過，等待 {retry_after} 秒。")
            time.sleep(retry_after)
            return make_request(url, params)
        
        if response.status_code != 200:
            print(f"API錯誤: {response.status_code}")
            print(f"回應內容: {response.text}")
            return None
        
        data = response.json()
        return data
    except Exception as e:
        print(f"請求錯誤: {e}")
        return None

# 獲取高分段玩家列表
def get_challenger_players():
    url = f"https://{REGION}.api.riotgames.com/tft/league/v1/challenger"
    data = make_request(url)
    if not data:
        return []
    
    return [entry['summonerId'] for entry in data['entries']]

# 獲取玩家PUUID
def get_player_puuid(summoner_id):
    url = f"https://{REGION}.api.riotgames.com/tft/summoner/v1/summoners/{summoner_id}"
    data = make_request(url)
    if not data:
        return None
    
    return data['puuid']

# 獲取玩家最近比賽
def get_match_ids(puuid, count=20):
    url = f"https://{ASIA_REGION}.api.riotgames.com/tft/match/v1/matches/by-puuid/{puuid}/ids"
    params = {
        "count": count,
    }
    
    print(f"請求URL: {url}")
    print(f"請求參數: {params}")
    
    response = make_request(url, params)
    
    if response is None:
        print("API返回為空")
        return None
    
    if isinstance(response, list) and len(response) == 0:
        print("API返回空列表 (沒有比賽記錄)")
        return None
    
    print(f"成功獲取 {len(response)} 場比賽")
    return response

# 獲取比賽詳情
def get_match_details(match_id):
    url = f"https://{ASIA_REGION}.api.riotgames.com/tft/match/v1/matches/{match_id}"
    return make_request(url)

# 存儲比賽基本資訊
def store_match(conn, match_data):
    if not match_data:
        return None
    
    cursor = conn.cursor()
    match_id = match_data['metadata']['match_id']
    game_version = match_data['info']['game_version']
    game_length = match_data['info']['game_length']
    game_datetime = match_data['info']['game_datetime']

    # 檢查版本是否存在，不存在則添加
    try:
        cursor.execute("SELECT version_id FROM game_versions WHERE version_id = %s", (game_version,))
        if not cursor.fetchone():
            cursor.execute("INSERT INTO game_versions (version_id, release_date) VALUES (%s, CURDATE())", 
                          (game_version,))
    except Error as e:
        print(f"版本儲存錯誤: {e}")
    
    # 存儲比賽資訊
    try:
        cursor.execute("INSERT INTO matches (match_id, game_version, game_length, game_datetime) VALUES (%s, %s, %s, %s)",
                     (match_id, game_version, game_length, game_datetime))
    except Error as e:
        print(f"比賽儲存錯誤: {e}")
        cursor.close()
        return None
    
    conn.commit()
    cursor.close()
    return match_id

# 存儲玩家資訊
def store_player(conn, match_id, participant):
    cursor = conn.cursor()
    
    puuid = participant['puuid']
    placement = participant['placement']
    last_round = participant.get('last_round', 0)
    
    try:
        cursor.execute("INSERT INTO players (puuid, match_id, placement, last_round) VALUES (%s, %s, %s, %s)",
                     (puuid, match_id, placement, last_round))
        player_id = cursor.lastrowid
    except Error as e:
        print(f"玩家儲存錯誤: {e}")
        cursor.close()
        return None
    
    conn.commit()
    cursor.close()
    return player_id

# 存儲英雄單位資訊
def store_units(conn, player_id, match_id, units):
    cursor = conn.cursor()
    
    for unit in units:
        character_id = unit['character_id']
        tier = unit['tier']
        items = ','.join(map(str, unit.get('items', [])))
        
        try:
            cursor.execute("INSERT INTO units (player_id, match_id, character_id, tier, items) VALUES (%s, %s, %s, %s, %s)",
                        (player_id, match_id, character_id, tier, items))
        except Error as e:
            print(f"單位儲存錯誤: {e}")
    
    conn.commit()
    cursor.close()

# 存儲特質資訊
def store_traits(conn, player_id, match_id, traits):
    cursor = conn.cursor()
    
    for trait in traits:
        trait_name = trait['name']
        tier_current = trait['tier_current']
        tier_total = trait.get('tier_total', 0)
        
        try:
            cursor.execute("INSERT INTO traits (player_id, match_id, trait_name, tier_current, tier_total) VALUES (%s, %s, %s, %s, %s)",
                        (player_id, match_id, trait_name, tier_current, tier_total))
        except Error as e:
            print(f"特質儲存錯誤: {e}")
    
    conn.commit()
    cursor.close()

# 處理並儲存比賽數據
def process_match(conn, match_data):
    if not match_data:
        print("比賽數據為空")
        return False
    
    # 添加調試信息
    try:
        match_id = match_data['metadata']['match_id']
        print(f"處理比賽 {match_id}...")
    except KeyError:
        print("比賽數據格式錯誤")
        print(match_data)  # 輸出收到的數據結構
        return False

# 主程序
def collect_data():
    conn = create_db_connection()
    if not conn:
        print("無法連接到資料庫")
        return
    
    # 獲取高端玩家
    challenger_ids = get_challenger_players()
    print(f"找到 {len(challenger_ids)} 位宗師玩家")
    
    processed_matches = set()
    
    try:
        for i, player_id in enumerate(challenger_ids[:10]):  # 從前10名開始
            print(f"處理第 {i+1}/10 位玩家 {player_id}...")
            puuid = get_player_puuid(player_id)
            if not puuid:
                print(f"無法獲取玩家 {player_id} 的PUUID")
                continue
            
            print(f"成功獲取PUUID: {puuid}")    
            match_ids = get_match_ids(puuid, 5)  # 每位玩家獲取5場比賽
            if not match_ids:
                print(f"無法獲取玩家 {player_id} 的比賽")
                continue
            
            print(f"成功獲取 {len(match_ids)} 場比賽")
    finally:
        conn.close()

if __name__ == "__main__":
    collect_data()