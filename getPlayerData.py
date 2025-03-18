import requests
import json
import pandas as pd
import time
import os
from datetime import datetime

# 創建資料夾儲存數據
os.makedirs('tft_data', exist_ok=True)
os.makedirs('tft_data/matches', exist_ok=True)
os.makedirs('tft_data/analysis', exist_ok=True)

# API設定
api_key = "RGAPI-e38b5f01-bdd8-4cb8-9eb4-ce7e00bd8b4b"  # 請替換成你的API金鑰
regions = ["sea"]  # 可以添加多個區域

# 載入已獲取的高端玩家資料
detailed_df = pd.read_csv('challenger_detailed.csv')

# 創建函數來獲取玩家的比賽記錄
def get_player_matches(puuid, region, count=20):
    match_url = f"https://{region}.api.riotgames.com/tft/match/v1/matches/by-puuid/{puuid}/ids"
    params = {
        "api_key": api_key,
        "count": count
    }
    
    response = requests.get(match_url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"無法獲取比賽記錄，錯誤碼: {response.status_code}")
        return []

# 創建函數獲取比賽詳情
def get_match_details(match_id, region):
    match_url = f"https://{region}.api.riotgames.com/tft/match/v1/matches/{match_id}"
    params = {
        "api_key": api_key
    }
    
    response = requests.get(match_url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"無法獲取比賽 {match_id} 詳情，錯誤碼: {response.status_code}")
        return None

# 設定收集的玩家數量和每位玩家的比賽數量
player_count = 5  # 收集前5名玩家
matches_per_player = 3  # 每位玩家收集3場比賽

# 收集數據
match_ids_collected = set()  # 用於追蹤已收集的比賽ID

for idx, player in detailed_df.head(player_count).iterrows():
    puuid = player['puuid']
    print(f"\n正在處理玩家 {idx+1}/{player_count}...")
    
    # 獲取比賽記錄
    match_ids = get_player_matches(puuid, regions[0], matches_per_player)
    
    for match_id in match_ids:
        if match_id in match_ids_collected:
            print(f"比賽 {match_id} 已經收集，跳過")
            continue
            
        match_ids_collected.add(match_id)
        print(f"正在收集比賽 {match_id} 的數據...")
        
        # 獲取比賽詳情
        match_data = get_match_details(match_id, regions[0])
        
        if match_data:
            # 儲存完整比賽數據
            file_path = f"tft_data/matches/{match_id}.json"
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(match_data, fp=f, ensure_ascii=False, indent=4)
                
            # 簡單分析數據並提取有效信息
            participants = match_data.get('info', {}).get('participants', [])
            compositions = []
            
            for participant in participants:
                placement = participant.get('placement')
                level = participant.get('level')
                
                # 提取特質資訊
                traits = participant.get('traits', [])
                active_traits = [
                    {
                        'name': trait.get('name'),
                        'num_units': trait.get('num_units'),
                        'tier_current': trait.get('tier_current')
                    }
                    for trait in traits if trait.get('tier_current') > 0
                ]
                
                # 提取英雄資訊
                units = participant.get('units', [])
                champion_info = [
                    {
                        'character_id': unit.get('character_id'),
                        'tier': unit.get('tier'),
                        'items': unit.get('items', [])
                    }
                    for unit in units
                ]
                
                # 組合資訊
                comp_info = {
                    'match_id': match_id,
                    'placement': placement,
                    'level': level,
                    'traits': active_traits,
                    'champions': champion_info
                }
                
                compositions.append(comp_info)
            
            # 儲存分析結果
            analysis_path = f"tft_data/analysis/{match_id}_analysis.json"
            with open(analysis_path, 'w', encoding='utf-8') as f:
                json.dump(compositions, fp=f, ensure_ascii=False, indent=4)
            
        # 限制API請求頻率
        time.sleep(1.2)

# 產生彙總報告
print("\n數據收集完成！")
print(f"共收集了 {len(match_ids_collected)} 場比賽的數據")
print(f"數據已儲存至 tft_data 資料夾")