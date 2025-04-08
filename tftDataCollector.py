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
api_key = os.getenv("RIOT_API_KEY", "RGAPI-53320ed0-05ff-4768-b15c-84edd4834595")  # 優先使用環境變數

# 伺服器設定 - 增加多個區域
regions_league = ["tw2", "kr", "jp1"]  # 獲取玩家基本資料的區域
regions_match = ["sea", "asia"]  # 獲取比賽資料的區域映射

# MySQL 資料庫設定
db_config = {
    'host': 'localhost',
    'user': 'root',  # 更改為你的MySQL使用者名稱
    'password': 'Tim0986985588=',  # 更改為你的MySQL密碼
    'database': 'TFT_analysis'  # 需要先創建此資料庫
}

# 建立資料庫連接
def create_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as error:
        print(f"MySQL連接失敗: {error}")
        return None

# 初始化資料庫表格
def initialize_database(connection):
    if connection is None:
        return False
    
    cursor = connection.cursor()
    
    # 建立遊戲版本表
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS game_versions (
        version_id VARCHAR(20) PRIMARY KEY,
        release_date DATE
    )
    ''')
    
    # 建立比賽資訊表
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS matches (
        match_id VARCHAR(50) PRIMARY KEY,
        game_version VARCHAR(20),
        game_length INT,
        game_datetime BIGINT,
        region VARCHAR(10),
        FOREIGN KEY (game_version) REFERENCES game_versions(version_id)
    )
    ''')
    
    # 建立玩家資訊表
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS players (
        player_id INT AUTO_INCREMENT PRIMARY KEY,
        puuid VARCHAR(78),
        summoner_name VARCHAR(50),
        match_id VARCHAR(50),
        placement INT,
        last_round INT,
        FOREIGN KEY (match_id) REFERENCES matches(match_id)
    )
    ''')
    
    # 建立英雄單位表
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS units (
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
    
    # 建立特質資訊表
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS traits (
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
    
    connection.commit()
    return True

# 從指定區域獲取高端玩家資料
def get_challenger_players(region, league_type="challenger"):
    url = f"https://{region}.api.riotgames.com/tft/league/v1/{league_type}"
    params = {"api_key": api_key}
    
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json().get('entries', [])
    else:
        print(f"無法獲取{region}區域高端玩家資料，錯誤碼: {response.status_code}")
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