from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from dotenv import load_dotenv

# 載入環境變數
load_dotenv()

app = Flask(__name__)
CORS(app)  # 啟用跨域請求支援

# 測試API是否運作
@app.route('/api/test', methods=['GET'])
def test_api():
    return jsonify({
        "status": "success",
        "message": "TFT戰術推薦系統API已成功啟動！"
    })

# 獲取英雄資料
@app.route('/api/champions', methods=['GET'])
def get_champions():
    try:
        # 從前端的資料文件讀取
        with open('../frontend/assets/data/champions.json', 'r', encoding='utf-8') as f:
            champions = json.load(f)
        return jsonify(champions)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 獲取推薦陣容
@app.route('/api/recommend', methods=['POST'])
def recommend_comps():
    try:
        data = request.json
        selected_champions = data.get('champions', [])
        
        # 測試用資料 - 在實際應用中會替換為真實推薦算法
        mock_recommendations = [
            {
                "name": "K/DA組合",
                "traits": ["K/DA", "刺客", "法師"],
                "champions": [
                    {"name": "阿璃", "id": "TFT10_Ahri", "owned": "阿璃" in selected_champions},
                    {"name": "阿卡莉", "id": "TFT10_Akali", "owned": "阿卡莉" in selected_champions},
                    {"name": "伊芙琳", "id": "TFT10_Evelynn", "owned": "伊芙琳" in selected_champions},
                    {"name": "希維爾", "id": "TFT10_Sivir", "owned": False},
                    {"name": "凱莎", "id": "TFT10_Kaisa", "owned": False}
                ],
                "similarity": len([c for c in selected_champions if c in ["阿璃", "阿卡莉", "伊芙琳", "希維爾", "凱莎"]]) / 5 * 100,
                "avgPlacement": 2.3,
                "winRate": 18.5
            },
            {
                "name": "龐克搖滾",
                "traits": ["龐克搖滾", "魔槍", "鬥士"],
                "champions": [
                    {"name": "庫奇", "id": "TFT10_Corki", "owned": "庫奇" in selected_champions},
                    {"name": "艾克", "id": "TFT10_Ekko", "owned": "艾克" in selected_champions},
                    {"name": "蓋倫", "id": "TFT10_Garen", "owned": "蓋倫" in selected_champions},
                    {"name": "莫德凱薩", "id": "TFT10_Mordekaiser", "owned": False},
                    {"name": "伊澤瑞爾", "id": "TFT10_Ezreal", "owned": False}
                ],
                "similarity": len([c for c in selected_champions if c in ["庫奇", "艾克", "蓋倫", "莫德凱薩", "伊澤瑞爾"]]) / 5 * 100,
                "avgPlacement": 3.1,
                "winRate": 12.8
            },
            {
                "name": "射手陣容",
                "traits": ["射手", "熱血", "真傷"],
                "champions": [
                    {"name": "燼", "id": "TFT10_Jhin", "owned": "燼" in selected_champions},
                    {"name": "亞菲利歐", "id": "TFT10_Aphelios", "owned": "亞菲利歐" in selected_champions},
                    {"name": "庫奇", "id": "TFT10_Corki", "owned": "庫奇" in selected_champions},
                    {"name": "蓋倫", "id": "TFT10_Garen", "owned": "蓋倫" in selected_champions},
                    {"name": "桑坦", "id": "TFT10_KSante", "owned": "桑坦" in selected_champions}
                ],
                "similarity": len([c for c in selected_champions if c in ["燼", "亞菲利歐", "庫奇", "蓋倫", "桑坦"]]) / 5 * 100,
                "avgPlacement": 2.8,
                "winRate": 15.2
            }
        ]
        
        # 根據相似度排序
        mock_recommendations.sort(key=lambda x: x['similarity'], reverse=True)
        
        return jsonify(mock_recommendations)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("正在啟動TFT戰術推薦系統API服務...")
    app.run(debug=True, port=5000)