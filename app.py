from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from tftDataProcessor import TFTDataProcessor
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

load_dotenv()  # 載入.env文件中的環境變數

# 資料庫配置
db_config = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'TFT_db')
}

# 初始化資料處理器
data_processor = TFTDataProcessor(db_config)

# 定義靜態文件路由，使它們可以從任何目錄結構中訪問
@app.route('/assets/js/<path:filename>')
def serve_js(filename):
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frontend/assets/js'), filename)

@app.route('/assets/css/<path:filename>')
def serve_css(filename):
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frontend/assets/css'), filename)

@app.route('/assets/data/<path:filename>')
def serve_data(filename):
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frontend/assets/data'), filename)

@app.route('/')
def index():
    """首頁"""
    return render_template('network.html')

@app.route('/network')
def network():
    """網絡圖頁面"""
    return render_template('network.html')

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
    # 明確設定模板和靜態文件夾路徑
    current_dir = os.path.dirname(os.path.abspath(__file__))
    app.template_folder = os.path.join(current_dir, 'frontend')
    app.static_folder = os.path.join(current_dir, 'frontend/assets')
    app.run(debug=True, port=5000)