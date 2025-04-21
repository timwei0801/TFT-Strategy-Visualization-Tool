import csv
import json
import os
import sys
from pathlib import Path
from typing import Dict, List, Any, Optional
from datetime import datetime

def convert_csv_to_json(csv_file_path: str, output_json_path: Optional[str] = None) -> str:
    """
    將TFT陣容CSV檔案轉換成結構化JSON格式
    
    Args:
        csv_file_path: CSV檔案路徑
        output_json_path: 輸出JSON檔案路徑，如果未提供則使用CSV檔名加上.json後綴
        
    Returns:
        輸出的JSON檔案路徑
    """
    print(f"開始處理檔案: {csv_file_path}")
    
    if not os.path.exists(csv_file_path):
        raise FileNotFoundError(f"找不到CSV檔案: {csv_file_path}")
    
    # 如果未提供輸出路徑，則使用原檔名加上.json後綴
    if output_json_path is None:
        base_path = Path(csv_file_path).with_suffix('')
        output_json_path = f"{base_path}.json"
    
    # 檢查檔案編碼並嘗試自動偵測分隔符號
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        first_line = file.readline().strip()
        # 檢查是否為逗號分隔
        if ',' in first_line and '\t' not in first_line:
            delimiter = ','
        else:
            delimiter = '\t'
    
    print(f"使用 '{delimiter}' 作為分隔符號")
    
    # 讀取CSV檔案
    data = []
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        # 使用偵測到的分隔符
        csv_reader = csv.reader(file, delimiter=delimiter)
        for row in csv_reader:
            data.append(row)
    
    if not data:
        raise ValueError("CSV檔案是空的或格式不正確")
    
    headers = data[0]
    rows = data[1:]
    
    # 清理標題列
    cleaned_headers = []
    for header in headers:
        # 移除空白並分割可能連在一起的標題
        if ',' in header and delimiter != ',':
            # 如果標題中包含逗號但分隔符不是逗號，可能是整行都被當作一個欄位
            cleaned_headers.extend([h.strip() for h in header.split(',')])
        else:
            cleaned_headers.append(header.strip())
    
    # 打印清理後的標題
    print(f"清理後的標題: {cleaned_headers}")
    
    # 確認欄位名稱
    expected_headers = [
        "comp_name", "score", "avg_placement", "top4_rate", "top1_rate", "pick_rate", 
        "difficulty", "popularity", "pickcard_level", "hero_name", "position", 
        "main_items", "other_recommendation_items", "core", "trait", "positioning", 
        "Extra_items", "Prerequisites", "Other_descriptions", "early_game", "mid_game"
    ]
    
    # 檢查清理後的標題是否與期望的標題匹配
    if len(cleaned_headers) != len(expected_headers) or not all(header in cleaned_headers for header in expected_headers):
        print("警告：CSV欄位不完全符合預期格式。")
        print(f"預期欄位: {expected_headers}")
        print(f"實際欄位: {cleaned_headers}")
        
        # 如果標題不匹配，嘗試使用逗號分隔符重新讀取
        if delimiter != ',' and len(cleaned_headers) != len(expected_headers):
            print("嘗試使用逗號分隔符重新讀取CSV...")
            return convert_csv_with_alternate_delimiter(csv_file_path, ',', output_json_path)
        
        # 即使標題不匹配，也嘗試繼續處理
        header_indices = {header: i for i, header in enumerate(cleaned_headers) if header in expected_headers}
        
        # 如果關鍵欄位缺失，添加默認索引
        for key_header in ["comp_name", "hero_name", "position", "trait"]:
            if key_header not in header_indices and len(cleaned_headers) > 0:
                print(f"警告: 關鍵欄位 '{key_header}' 缺失，使用默認索引")
                if key_header == "comp_name":
                    header_indices[key_header] = 0
                elif key_header == "hero_name":
                    header_indices[key_header] = min(9, len(cleaned_headers) - 1)
                elif key_header == "position":
                    header_indices[key_header] = min(10, len(cleaned_headers) - 1)
                elif key_header == "trait":
                    header_indices[key_header] = min(14, len(cleaned_headers) - 1)
    else:
        # 如果欄位名稱都存在，創建索引映射
        header_indices = {header: cleaned_headers.index(header) for header in expected_headers}
    
    # 打印欄位索引映射
    print("欄位索引映射:")
    for header, index in header_indices.items():
        print(f"  {header}: {index}")
    
    # 檢查行數據長度
    max_row_length = max(len(row) for row in rows) if rows else 0
    if max_row_length < len(cleaned_headers):
        print(f"警告: 資料行({max_row_length})短於標題行({len(cleaned_headers)})，嘗試修正...")
        
        # 嘗試修復數據行
        fixed_rows = []
        for row in rows:
            # 擴展行長度以匹配標題行
            while len(row) < len(cleaned_headers):
                row.append('')
            fixed_rows.append(row)
        rows = fixed_rows
    
    # 建立資料結構
    comps = []
    current_comp = None
    
    for row in rows:
        # 跳過空白行
        if not row or all(cell.strip() == '' for cell in row):
            continue
        
        # 確保行的長度至少與欄位數量相同
        while len(row) < len(cleaned_headers):
            row.append('')
        
        # 如果comp_name有值，表示這是一個新的陣容開始
        comp_name_idx = header_indices.get("comp_name", 0)
        if comp_name_idx < len(row) and row[comp_name_idx].strip() != '':
            # 如果已有現有陣容，存入結果
            if current_comp is not None:
                comps.append(current_comp)
            
            # 建立新陣容
            current_comp = {
                "comp_name": row[header_indices.get("comp_name", 0)] if "comp_name" in header_indices and header_indices["comp_name"] < len(row) else "Unknown",
                "score": safe_float(row[header_indices.get("score", 1)] if "score" in header_indices and header_indices["score"] < len(row) else 0),
                "avg_placement": safe_float(row[header_indices.get("avg_placement", 2)] if "avg_placement" in header_indices and header_indices["avg_placement"] < len(row) else 0),
                "top4_rate": safe_float(row[header_indices.get("top4_rate", 3)] if "top4_rate" in header_indices and header_indices["top4_rate"] < len(row) else 0),
                "top1_rate": safe_float(row[header_indices.get("top1_rate", 4)] if "top1_rate" in header_indices and header_indices["top1_rate"] < len(row) else 0),
                "pick_rate": safe_float(row[header_indices.get("pick_rate", 5)] if "pick_rate" in header_indices and header_indices["pick_rate"] < len(row) else 0),
                "difficulty": row[header_indices.get("difficulty", 6)] if "difficulty" in header_indices and header_indices["difficulty"] < len(row) else "",
                "popularity": row[header_indices.get("popularity", 7)] if "popularity" in header_indices and header_indices["popularity"] < len(row) else "",
                "pickcard_level": safe_float(row[header_indices.get("pickcard_level", 8)] if "pickcard_level" in header_indices and header_indices["pickcard_level"] < len(row) else 0),
                "positioning": row[header_indices.get("positioning", 15)] if "positioning" in header_indices and header_indices["positioning"] < len(row) else "",
                "prerequisites": row[header_indices.get("Prerequisites", 17)] if "Prerequisites" in header_indices and header_indices["Prerequisites"] < len(row) else "",
                "other_descriptions": row[header_indices.get("Other_descriptions", 18)] if "Other_descriptions" in header_indices and header_indices["Other_descriptions"] < len(row) else "",
                "early_game": row[header_indices.get("early_game", 19)] if "early_game" in header_indices and header_indices["early_game"] < len(row) else "",
                "mid_game": row[header_indices.get("mid_game", 20)] if "mid_game" in header_indices and header_indices["mid_game"] < len(row) else "",
                "units": []
            }
        
        # 如果有hero_name，添加單位資訊
        hero_name_idx = header_indices.get("hero_name", 9)
        if hero_name_idx < len(row) and row[hero_name_idx].strip() and current_comp is not None:
            # 獲取各個單位屬性，並確保索引在有效範圍內
            position_idx = header_indices.get("position", 10)
            main_items_idx = header_indices.get("main_items", 11)
            other_items_idx = header_indices.get("other_recommendation_items", 12)
            extra_items_idx = header_indices.get("Extra_items", 16)
            core_idx = header_indices.get("core", 13)
            trait_idx = header_indices.get("trait", 14)
            
            unit = {
                "hero_name": row[hero_name_idx] if hero_name_idx < len(row) else "",
                "position": row[position_idx] if position_idx < len(row) else "",
                "main_items": parse_items(row[main_items_idx] if main_items_idx < len(row) else ""),
                "other_recommendation_items": parse_items(row[other_items_idx] if other_items_idx < len(row) else ""),
                "extra_items": parse_items(row[extra_items_idx] if extra_items_idx < len(row) else ""),
                "core": row[core_idx] if core_idx < len(row) else "",
                "trait": row[trait_idx] if trait_idx < len(row) else ""
            }
            current_comp["units"].append(unit)
    
    # 添加最後一個陣容
    if current_comp is not None:
        comps.append(current_comp)
    
    # 處理最終資料結構
    result = {
        "meta": {
            "version": "S14",
            "patch": "14.1",
            "update_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "data_source": "tft_data"
        },
        "comps": comps
    }
    
    # 輸出JSON檔案
    with open(output_json_path, 'w', encoding='utf-8') as json_file:
        json.dump(result, json_file, ensure_ascii=False, indent=2)
    
    print(f"已成功將CSV轉換為JSON，共處理 {len(comps)} 個陣容")
    print(f"JSON檔案已儲存至: {output_json_path}")
    
    return output_json_path


def convert_csv_with_alternate_delimiter(csv_file_path: str, delimiter: str, output_json_path: Optional[str] = None) -> str:
    """使用替代分隔符重新嘗試CSV轉換"""
    print(f"嘗試使用 '{delimiter}' 作為分隔符重新讀取CSV...")
    
    # 讀取CSV檔案
    data = []
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        csv_reader = csv.reader(file, delimiter=delimiter)
        for row in csv_reader:
            data.append(row)
    
    if not data:
        raise ValueError("CSV檔案是空的或格式不正確")
    
    headers = data[0]
    rows = data[1:]
    
    # 清理標題列
    cleaned_headers = [header.strip() for header in headers]
    
    # 打印清理後的標題
    print(f"使用替代分隔符 '{delimiter}' 後的標題: {cleaned_headers}")
    
    # 重新遞歸調用主轉換函數
    return convert_csv_to_json(csv_file_path, output_json_path)


def safe_float(value: str) -> float:
    """安全地轉換字串為浮點數，如果轉換失敗則返回0.0"""
    try:
        return float(value)
    except (ValueError, TypeError):
        return 0.0


def parse_items(items_str: str) -> List[str]:
    """解析道具字串，將其轉換為道具列表"""
    if not items_str or items_str.strip() == '':
        return []
    
    # 分割道具字串，處理不同的分隔符情況
    items = []
    for separator in [',', '、', '，']:
        if separator in items_str:
            for item in items_str.split(separator):
                item = item.strip()
                if item:
                    items.append(item)
            return items
    
    # 如果沒有找到分隔符，將整個字串作為一個道具
    if items_str.strip():
        items.append(items_str.strip())
    
    return items


if __name__ == "__main__":
    # 如果有命令列參數，使用參數作為輸入檔案
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
        output_file = sys.argv[2] if len(sys.argv) > 2 else None
        try:
            convert_csv_to_json(input_file, output_file)
        except Exception as e:
            print(f"處理過程中發生錯誤: {e}")
            import traceback
            traceback.print_exc()
    else:
        # 沒有指定檔案時，提示使用方式
        print("使用方式: python csv_to_json.py <csv檔案路徑> [輸出json檔案路徑]")
        
        # 互動式提示
        input_file = input("請輸入CSV檔案路徑: ").strip()
        if input_file:
            output_file = input("請輸入輸出JSON檔案路徑 (留空使用預設): ").strip() or None
            try:
                convert_csv_to_json(input_file, output_file)
            except Exception as e:
                print(f"處理過程中發生錯誤: {e}")
                import traceback
                traceback.print_exc()