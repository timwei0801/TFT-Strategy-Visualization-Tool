import json
import os

def load_champions_data():
    """載入英雄資料"""
    with open("tft_data/champions.json", 'r', encoding='utf-8') as f:
        return json.load(f)

def load_comps_data():
    """載入熱門陣容資料"""
    with open("frontend/assets/data/popular_comps.json", 'r') as f:
        return json.load(f)

def get_champion_traits(champion_name, champions_data):
    """獲取英雄所屬特質"""
    for champ in champions_data:
        if champ["name"] == champion_name:
            return champ["traits"]
    return []

def calculate_comp_similarity(selected_champions, comp, champions_data):
    """計算選中的英雄與陣容的相似度"""
    # 如果沒有選擇英雄，返回0相似度
    if not selected_champions:
        return 0
        
    # 獲取所選英雄的特質
    selected_traits = []
    for champ in selected_champions:
        selected_traits.extend(get_champion_traits(champ, champions_data))
    
    # 計算特質重疊度
    comp_traits = [trait["name"] for trait in comp["traits"]]
    overlap = len(set(selected_traits) & set(comp_traits))
    
    # 計算英雄重疊度
    comp_champions = [champ["name"] for champ in comp["core_champions"]]
    champ_overlap = len(set(selected_champions) & set(comp_champions))
    
    # 綜合計算相似度分數
    similarity = (overlap * 2 + champ_overlap * 3) / (len(comp_traits) * 2 + len(comp_champions))
    return similarity

def recommend_comps(selected_champions, top_n=3):
    """根據選中的英雄推薦陣容"""
    champions_data = load_champions_data()
    comps_data = load_comps_data()
    
    # 計算每個陣容的相似度
    scored_comps = []
    for comp in comps_data:
        similarity = calculate_comp_similarity(selected_champions, comp, champions_data)
        scored_comps.append((comp, similarity))
    
    # 按相似度排序
    scored_comps.sort(key=lambda x: x[1], reverse=True)
    
    # 返回前N個推薦
    recommendations = []
    for comp, score in scored_comps[:top_n]:
        recommendations.append({
            "comp": comp,
            "similarity_score": score,
            "recommended_next": recommend_next_champions(selected_champions, comp)
        })
    
    return recommendations

def recommend_next_champions(selected_champions, comp):
    """推薦下一步應該購買的英雄"""
    core_champions = [champ["name"] for champ in comp["core_champions"]]
    
    # 找出尚未獲得的核心英雄
    missing_champions = [champ for champ in core_champions if champ not in selected_champions]
    
    # 按照在核心英雄中的重要性排序
    sorted_missing = []
    for champ in missing_champions:
        for core in comp["core_champions"]:
            if core["name"] == champ:
                sorted_missing.append({
                    "name": champ,
                    "importance": core["frequency"]
                })
                break
    
    sorted_missing.sort(key=lambda x: x["importance"], reverse=True)
    return sorted_missing[:3]  # 返回前3個最重要的缺失英雄