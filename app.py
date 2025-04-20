from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from tftDataProcessor import TFTDataProcessor

app = Flask(__name__)
CORS(app)  # 允許跨域請求

# 資料庫配置
db_config = {
    'host': 'localhost',
    'user': 'your_username',
    'password': 'your_password',
    'database': 'TFT_db'
}

# 初始化資料處理器
data_processor = TFTDataProcessor(db_config)

@app.route('/')
def index():
    """首頁"""
    return render_template('index.html')

@app.route('/api/synergy_network', methods=['GET'])
def get_synergy_network():
    """獲取協同網絡數據"""
    network_data = data_processor.calculate_hero_synergies()
    return jsonify(network_data)

@app.route('/api/trait_strength', methods=['GET'])
def get_trait_strength():
    """獲取羈絆強度數據"""
    trait_data = data_processor.calculate_trait_strength()
    return jsonify(trait_data.to_dict(orient='records'))

@app.route('/api/recommend', methods=['POST'])
def get_recommendations():
    """根據當前英雄推薦陣容"""
    current_heroes = request.json.get('heroes', [])
    recommendations = data_processor.recommend_comp(current_heroes)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True, port=5000)