import os
import json
import pandas as pd
import numpy as np
from collections import Counter

# 創建儲存分析結果的資料夾
os.makedirs('tft_data/results', exist_ok=True)

# 讀取所有分析檔案並整合數據
compositions_data = []
analysis_files = os.listdir('tft_data/analysis')

print(f"正在分析 {len(analysis_files)} 個比賽檔案...")

for file_name in analysis_files:
    if not file_name.endswith('_analysis.json'):
        continue
        
    file_path = os.path.join('tft_data/analysis', file_name)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        match_compositions = json.load(f)
        compositions_data.extend(match_compositions)

print(f"已讀取 {len(compositions_data)} 個玩家陣容資料")

# 建立陣容統計資料
trait_stats = Counter()
trait_placements = {}
champion_stats = Counter()
champion_placements = {}
synergy_stats = {}

# 分析所有陣容
for comp in compositions_data:
    placement = comp['placement']
    
    # 計算特質出現次數和平均名次
    for trait in comp['traits']:
        trait_name = trait['name']
        trait_tier = trait['tier_current']
        trait_key = f"{trait_name}_{trait_tier}"
        
        # 計算特質出現次數
        trait_stats[trait_key] += 1
        
        # 計算特質的平均名次
        if trait_key not in trait_placements:
            trait_placements[trait_key] = []
        trait_placements[trait_key].append(placement)
    
    # 計算英雄出現次數和平均名次
    for unit in comp['champions']:
        champ_name = unit['character_id']
        champ_tier = unit['tier']
        champ_key = f"{champ_name}_{champ_tier}"
        
        # 計算英雄出現次數
        champion_stats[champ_key] += 1
        
        # 計算英雄的平均名次
        if champ_key not in champion_placements:
            champion_placements[champ_key] = []
        champion_placements[champ_key].append(placement)
        
        # 計算裝備使用情況
        # 這部分可以在後續分析中擴展

# 計算特質的平均名次
trait_avg_placement = {}
for trait, placements in trait_placements.items():
    trait_avg_placement[trait] = sum(placements) / len(placements)

# 計算英雄的平均名次
champion_avg_placement = {}
for champ, placements in champion_placements.items():
    champion_avg_placement[champ] = sum(placements) / len(placements)

# 找出最常用的前10個特質及其平均名次
top_traits = trait_stats.most_common(10)
top_traits_data = []
for trait, count in top_traits:
    avg_place = trait_avg_placement[trait]
    trait_name, tier = trait.rsplit('_', 1)
    top_traits_data.append({
        '特質名稱': trait_name,
        '特質等級': tier,
        '出現次數': count,
        '平均名次': round(avg_place, 2)
    })

# 找出最常用的前15個英雄及其平均名次
top_champions = champion_stats.most_common(15)
top_champions_data = []
for champ, count in top_champions:
    avg_place = champion_avg_placement[champ]
    champ_name, tier = champ.rsplit('_', 1)
    top_champions_data.append({
        '英雄名稱': champ_name,
        '星級': tier,
        '出現次數': count,
        '平均名次': round(avg_place, 2)
    })

# 轉換為DataFrame並排序
top_traits_df = pd.DataFrame(top_traits_data)
top_traits_df = top_traits_df.sort_values(by='平均名次')

top_champions_df = pd.DataFrame(top_champions_data)
top_champions_df = top_champions_df.sort_values(by='平均名次')

# 輸出結果
print("\n最常用的前10個特質及其效能:")
print(top_traits_df)

print("\n最常用的前15個英雄及其效能:")
print(top_champions_df)

# 保存分析結果
top_traits_df.to_csv('tft_data/results/top_traits.csv', index=False, encoding='utf-8-sig')
top_champions_df.to_csv('tft_data/results/top_champions.csv', index=False, encoding='utf-8-sig')

print("\n分析完成！結果已保存至 tft_data/results 資料夾")