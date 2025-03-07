# TFT Strategy Visualization Tool

## 設置開發環境

1. 克隆儲存庫
2. 安裝所需依賴：`pip install -r requirements.txt`
3. 創建`.env`檔案在專案根目錄，添加以下設置：
RIOT_API_KEY=您的Riot API密鑰
DB_HOST=localhost
DB_NAME=TFT_db
DB_USER=您的數據庫用戶名
DB_PASSWORD=您的數據庫密碼
4. 創建MySQL數據庫：`CREATE DATABASE TFT_db;`
5. 運行設置腳本：`python setup.py`