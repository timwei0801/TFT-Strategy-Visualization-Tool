import requests
import json
import pandas as pd
import time

# 設定基本參數
api_key = "RGAPI-e38b5f01-bdd8-4cb8-9eb4-ce7e00bd8b4b"  # 替換成你的API金鑰
region = "tw2"  # 台灣伺服器用tw2，可依需求更改

# 構建請求URL (以取得高端玩家列表為例)
base_url = f"https://{region}.api.riotgames.com"
endpoint = "/tft/league/v1/challenger"
url = base_url + endpoint

# 設定請求參數
params = {
    "api_key": api_key
}

# 發送請求
response = requests.get(url, params=params)

# 檢查回應狀態
if response.status_code == 200:
    data = response.json()
    print("成功取得資料!")
else:
    print(f"請求失敗，錯誤碼: {response.status_code}")


if response.status_code == 200:
    data = response.json()
    
    # 將完整資料保存為JSON檔案，方便後續查看
    with open('challenger_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, ensure_ascii=False, fp=f, indent=4)
    
    # 提取玩家資訊
    players = data.get('entries', [])
    
    # 創建玩家資訊的DataFrame
    player_data = []
    for player in players:
        player_info = {
            'summonerName': player.get('summonerName'),
            'summonerId': player.get('summonerId'),
            'leaguePoints': player.get('leaguePoints'),
            'wins': player.get('wins'),
            'losses': player.get('losses')
        }
        player_data.append(player_info)
    
    # 轉換為DataFrame並排序
    players_df = pd.DataFrame(player_data)
    players_df = players_df.sort_values(by='leaguePoints', ascending=False)
    
    # 顯示前10名玩家
    print("高端玩家排名前10名：")
    print(players_df.head(10))
    
    # 將玩家資料保存為CSV
    players_df.to_csv('challenger_players.csv', index=False, encoding='utf-8-sig')
    print("已將玩家資料保存至 challenger_players.csv")


# 從已保存的CSV讀取玩家ID
players_df = pd.read_csv('challenger_players.csv')

# 建立一個函數來獲取玩家的詳細資訊
def get_summoner_detail(summoner_id, region):
    summoner_url = f"https://{region}.api.riotgames.com/tft/summoner/v1/summoners/{summoner_id}"
    response = requests.get(summoner_url, params={"api_key": api_key})
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"無法獲取玩家資料，錯誤碼: {response.status_code}")
        return None

# 取得前10位玩家的詳細資訊
detailed_players = []
for i, row in players_df.head(10).iterrows():
    summoner_id = row['summonerId']
    print(f"獲取玩家 {i+1}/10 的資料...")
    
    summoner_data = get_summoner_detail(summoner_id, region)
    if summoner_data:
        detailed_players.append({
            'summonerId': summoner_id,
            'summonerName': summoner_data.get('name'),
            'puuid': summoner_data.get('puuid'),
            'leaguePoints': row['leaguePoints']
        })
    
    # 限制API請求速率，避免超過限制
    time.sleep(1.5)

# 創建詳細玩家資訊的DataFrame
detailed_df = pd.DataFrame(detailed_players)
print("\n已獲取玩家詳細資訊：")
print(detailed_df)

# 保存詳細資訊
detailed_df.to_csv('challenger_detailed.csv', index=False, encoding='utf-8-sig')
print("已將詳細玩家資料保存至 challenger_detailed.csv")

# 載入已獲取的玩家資料
detailed_df = pd.read_csv('challenger_detailed.csv')

# 選擇第一位玩家進行測試
test_player = detailed_df.iloc[0]
puuid = test_player['puuid']

# TFT比賽記錄需要使用不同的路由值
# 注意：亞洲區域應使用「sea.api.riotgames.com」或「asia.api.riotgames.com」
match_url = f"https://sea.api.riotgames.com/tft/match/v1/matches/by-puuid/{puuid}/ids"
params = {
    "api_key": api_key,
    "count": 5  # 只取最近5場比賽
}

print(f"正在獲取玩家比賽記錄...")
match_response = requests.get(match_url, params=params)

if match_response.status_code == 200:
    match_ids = match_response.json()
    print(f"成功獲取到 {len(match_ids)} 場比賽記錄")
    
    # 獲取第一場比賽的詳細資訊
    if match_ids:
        first_match_id = match_ids[0]
        match_detail_url = f"https://sea.api.riotgames.com/tft/match/v1/matches/{first_match_id}"
        match_detail_response = requests.get(match_detail_url, params={"api_key": api_key})
        
        if match_detail_response.status_code == 200:
            match_data = match_detail_response.json()
            
            # 保存完整比賽數據以供分析
            with open('tft_match_sample.json', 'w', encoding='utf-8') as f:
                json.dump(match_data, fp=f, ensure_ascii=False, indent=4)
            
            # 顯示基本比賽資訊
            print("\n比賽基本資訊:")
            print(f"比賽ID: {first_match_id}")
            print(f"遊戲版本: {match_data.get('info', {}).get('game_version')}")
            print(f"遊戲時長: {match_data.get('info', {}).get('game_length')} 秒")
            
            # 顯示參與者數量
            participants = match_data.get('info', {}).get('participants', [])
            print(f"參與者數量: {len(participants)}")
            
            print("\n已將完整比賽數據保存至 tft_match_sample.json")
        else:
            print(f"無法獲取比賽詳情，錯誤碼: {match_detail_response.status_code}")
else:
    print(f"無法獲取比賽記錄，錯誤碼: {match_response.status_code}")