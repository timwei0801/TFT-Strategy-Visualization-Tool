import json
import pandas as pd
import numpy as np

def load_match_data(file_path="tft_data/s13_matches.json"):
    """載入對戰資料"""
    with open(file_path, 'r') as f:
        matches = json.load(f)
    return matches

def extract_compositions(matches):
    """從對戰資料中提取陣容組合"""
    compositions = []
    
    for match in matches:
        if "info" not in match or "participants" not in match["info"]:
            continue
            
        for participant in match["info"]["participants"]:
            # 只考慮前4名的陣容
            if participant["placement"] <= 4:
                comp = {
                    "placement": participant["placement"],
                    "champions": [],
                    "traits": [],
                    "augments": participant.get("augments", [])
                }
                
                # 獲取英雄資訊
                for unit in participant.get("units", []):
                    champion = {
                        "name": unit["character_id"],
                        "tier": unit.get("tier", 1),
                        "items": unit.get("items", [])
                    }
                    comp["champions"].append(champion)
                
                # 獲取特質資訊
                for trait in participant.get("traits", []):
                    if trait["tier_current"] > 0:  # 只考慮已激活的特質
                        comp["traits"].append({
                            "name": trait["name"],
                            "tier": trait["tier_current"],
                            "num_units": trait["num_units"]
                        })
                
                compositions.append(comp)
    
    return compositions

def analyze_compositions(compositions):
    """分析陣容數據，找出熱門陣容"""
    # 按特質組合分組
    trait_comps = {}
    
    for comp in compositions:
        # 獲取主要特質（按照tier和num_units排序）
        main_traits = sorted(
            comp["traits"], 
            key=lambda x: (x["tier"], x["num_units"]), 
            reverse=True
        )[:3]  # 只取前3個主要特質
        
        trait_key = "-".join([t["name"] for t in main_traits])
        
        if trait_key not in trait_comps:
            trait_comps[trait_key] = {
                "count": 0,
                "placements": [],
                "champions": {},
                "traits": main_traits,
                "augments": {}
            }
        
        # 更新統計
        trait_comps[trait_key]["count"] += 1
        trait_comps[trait_key]["placements"].append(comp["placement"])
        
        # 統計英雄使用情況
        for champ in comp["champions"]:
            if champ["name"] not in trait_comps[trait_key]["champions"]:
                trait_comps[trait_key]["champions"][champ["name"]] = 0
            trait_comps[trait_key]["champions"][champ["name"]] += 1
        
        # 統計增幅裝置使用情況
        for augment in comp["augments"]:
            if augment not in trait_comps[trait_key]["augments"]:
                trait_comps[trait_key]["augments"][augment] = 0
            trait_comps[trait_key]["augments"][augment] += 1
    
    # 計算平均排名並排序
    for key, data in trait_comps.items():
        data["avg_placement"] = sum(data["placements"]) / len(data["placements"])
        
        # 找出最常用的8個英雄
        data["core_champions"] = sorted(
            data["champions"].items(), 
            key=lambda x: x[1], 
            reverse=True
        )[:8]
    
    # 按使用率排序
    popular_comps = sorted(
        trait_comps.items(), 
        key=lambda x: x[1]["count"], 
        reverse=True
    )
    
    return popular_comps

def export_popular_comps(popular_comps, output_file="frontend/assets/data/popular_comps.json"):
    """導出熱門陣容資料為JSON"""
    result = []
    
    for comp_name, comp_data in popular_comps:
        # 只保留出現10次以上的陣容
        if comp_data["count"] < 10:
            continue
            
        clean_comp = {
            "name": comp_name,
            "count": comp_data["count"],
            "avg_placement": comp_data["avg_placement"],
            "traits": [{"name": t["name"], "tier": t["tier"]} for t in comp_data["traits"]],
            "core_champions": [{"name": c[0], "frequency": c[1]} for c in comp_data["core_champions"]],
            "popular_augments": sorted(comp_data["augments"].items(), key=lambda x: x[1], reverse=True)[:3]
        }
        result.append(clean_comp)
    
    # 確保目錄存在
    import os
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    # 寫入檔案
    with open(output_file, 'w') as f:
        json.dump(result, f, indent=2)
    
    return result

def process_data():
    """處理資料主函數"""
    matches = load_match_data()
    compositions = extract_compositions(matches)
    popular_comps = analyze_compositions(compositions)
    export_popular_comps(popular_comps)
    print("資料處理完成!")

if __name__ == "__main__":
    process_data()