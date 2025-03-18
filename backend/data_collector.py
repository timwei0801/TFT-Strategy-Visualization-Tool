import requests
import json
import os
import time
from dotenv import load_dotenv

# 載入環境變數
load_dotenv()
API_KEY = os.getenv("RGAPI-5b202bc9-b19c-4105-9956-1d802345a9e6")

BASE_URL = "https://tw2.api.riotgames.com/tft/league/v1"
MATCH_URL = "https://asia.api.riotgames.com/tft/match/v1"

def get_challenger_players():
    """獲取宗師階級玩家列表"""
    url = f"{BASE_URL}/challenger"
    headers = {"X-Riot-Token": API_KEY}
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        return [entry["summonerId"] for entry in data["entries"][:20]]  # 限制數量避免超出API限制
    else:
        print(f"獲取宗師玩家失敗: {response.status_code}")
        return []

def get_player_puuid(summoner_id):
    """通過summoner ID獲取PUUID"""
    url = f"https://tw2.api.riotgames.com/tft/summoner/v1/summoners/{summoner_id}"
    headers = {"X-Riot-Token": API_KEY}
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()["puuid"]
    else:
        print(f"獲取PUUID失敗: {response.status_code}")
        return None

def get_match_ids(puuid, count=5):
    """獲取玩家最近的對戰ID"""
    url = f"{MATCH_URL}/matches/by-puuid/{puuid}/ids?count={count}"
    headers = {"X-Riot-Token": API_KEY}
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"獲取對戰ID失敗: {response.status_code}")
        return []

def get_match_details(match_id):
    """獲取對戰詳情"""
    url = f"{MATCH_URL}/matches/{match_id}"
    headers = {"X-Riot-Token": API_KEY}
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"獲取對戰詳情失敗: {response.status_code}, {match_id}")
        return None

def collect_s13_data(output_file="tft_data/s13_matches.json"):
    """收集S13賽季資料並儲存"""
    # 獲取高端玩家
    challenger_ids = get_challenger_players()
    all_matches = []
    
    for summoner_id in challenger_ids:
        # 獲取PUUID
        puuid = get_player_puuid(summoner_id)
        if not puuid:
            continue
        
        # 獲取對戰ID
        match_ids = get_match_ids(puuid)
        
        # 獲取對戰詳情
        for match_id in match_ids:
            match_data = get_match_details(match_id)
            if match_data:
                # 確認是S13的對戰
                if "info" in match_data and "game_version" in match_data["info"]:
                    if "S13" in match_data["info"]["game_version"]:
                        all_matches.append(match_data)
            
            # 等待一下避免超出API限制
            time.sleep(1.2)
    
    # 儲存資料
    with open(output_file, 'w') as f:
        json.dump(all_matches, f, indent=2)
    
    print(f"已收集 {len(all_matches)} 場S13對戰，儲存至 {output_file}")
    return all_matches

if __name__ == "__main__":
    collect_s13_data()