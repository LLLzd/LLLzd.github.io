#!/usr/bin/env python3
"""
更新 images_data.json 文件
"""

import os
import json

def generate_images_data():
    """生成图片数据"""
    data = {
        "works": [],
        "exhibitions": [],
        "honors": []
    }
    
    # 处理书法作品
    works_dir = "images/works"
    if os.path.exists(works_dir):
        for filename in os.listdir(works_dir):
            if filename.endswith(('.jpg', '.jpeg', '.png', '.JPG')):
                name = os.path.splitext(filename)[0]
                data["works"].append({
                    "filename": filename,
                    "name": name
                })
    
    # 处理展览照片
    exhibitions_dir = "images/exhibitions"
    if os.path.exists(exhibitions_dir):
        for filename in os.listdir(exhibitions_dir):
            if filename.endswith(('.jpg', '.jpeg', '.png', '.JPG')):
                name = os.path.splitext(filename)[0]
                data["exhibitions"].append({
                    "filename": filename,
                    "name": name
                })
    
    # 处理荣誉奖项
    honors_dir = "images/honors"
    if os.path.exists(honors_dir):
        for root, dirs, files in os.walk(honors_dir):
            for filename in files:
                if filename.endswith(('.jpg', '.jpeg', '.png', '.JPG')):
                    # 计算相对路径
                    rel_path = os.path.relpath(os.path.join(root, filename), honors_dir)
                    name = os.path.splitext(filename)[0]
                    data["honors"].append({
                        "path": rel_path,
                        "name": name
                    })
    
    return data

def main():
    """主函数"""
    data = generate_images_data()
    
    # 写入文件
    with open("images_data.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print("✅ images_data.json 更新完成！")
    print(f"📸 书法作品: {len(data['works'])}张")
    print(f"🏛️ 展览照片: {len(data['exhibitions'])}张")
    print(f"🏆 荣誉奖项: {len(data['honors'])}张")

if __name__ == "__main__":
    main()