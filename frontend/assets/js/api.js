// API 處理模塊

// 全局 API 端點
const API_ENDPOINT = 'http://localhost:5000/api';

// 獲取英雄資料
async function fetchChampions() {
    try {
        // 在實際應用中，這裡應該使用 fetch 或 axios 調用真實 API
        // 現在我們先使用模擬數據
        // return await fetch(`${API_ENDPOINT}/champions`).then(res => res.json());
        
        return new Promise(resolve => {
            setTimeout(() => {
                // 模擬英雄數據
                resolve([
                    // 這裡使用你 tft_data/Hero 目錄中的英雄名稱
                    { id: "TFT_Aatrox", name: "厄薩斯", cost: 4, traits: ["魔王", "挑戰者"] },
                    { id: "TFT_Ahri", name: "阿璃", cost: 5, traits: ["靈魂使者", "魔導士"] },
                    { id: "TFT_Akali", name: "阿卡莉", cost: 4, traits: ["真實傷害", "刺客"] },
                    { id: "TFT_Annie", name: "安妮", cost: 2, traits: ["星守", "魔法師"] },
                    { id: "TFT_Aphelios", name: "亞菲利歐", cost: 4, traits: ["暗影", "神射手"] },
                    { id: "TFT_Ashe", name: "艾希", cost: 3, traits: ["寒冰", "神射手"] },
                    { id: "TFT_Azir", name: "阿祈爾", cost: 4, traits: ["蒼鑽", "皇帝"] },
                    { id: "TFT_Bard", name: "巴德", cost: 3, traits: ["遊者", "輔助"] },
                    { id: "TFT_Blitzcrank", name: "布里茨", cost: 2, traits: ["機械", "護衛"] },
                    // 添加更多英雄...
                ]);
            }, 500);
        });
    } catch (error) {
        console.error('獲取英雄資料失敗:', error);
        return [];
    }
}

// 獲取特質資料
async function fetchTraits() {
    try {
        // 在實際應用中，這裡應該使用 fetch 或 axios 調用真實 API
        // 現在我們先使用模擬數據
        // return await fetch(`${API_ENDPOINT}/traits`).then(res => res.json());
        
        return new Promise(resolve => {
            setTimeout(() => {
                // 模擬特質數據
                resolve({
                    "魔王": { 
                        name: "魔王", 
                        description: "魔王英雄獲得額外魔法抗性", 
                        thresholds: [1, 2, 4],
                        effects: ["基礎效果", "強化效果", "最高效果"]
                    },
                    "挑戰者": { 
                        name: "挑戰者", 
                        description: "挑戰者獲得額外攻擊速度", 
                        thresholds: [2, 4, 6, 8],
                        effects: ["低效果", "中效果", "高效果", "終極效果"]
                    },
                    "靈魂使者": { 
                        name: "靈魂使者", 
                        description: "靈魂使者獲得額外法力", 
                        thresholds: [3, 5, 7],
                        effects: ["基礎效果", "強化效果", "終極效果"]
                    },
                    "刺客": { 
                        name: "刺客", 
                        description: "刺客獲得額外暴擊機率和暴擊傷害", 
                        thresholds: [2, 4, 6],
                        effects: ["20%暴擊率", "50%暴擊率", "80%暴擊率"]
                    },
                    "魔法師": { 
                        name: "魔法師", 
                        description: "魔法師增加全隊法術傷害", 
                        thresholds: [2, 4, 6],
                        effects: ["15%法傷", "40%法傷", "70%法傷"]
                    },
                    // 添加更多特質...
                });
            }, 500);
        });
    } catch (error) {
        console.error('獲取特質資料失敗:', error);
        return {};
    }
}

// 獲取推薦陣容
async function fetchRecommendations(champions) {
    try {
        // 在實際應用中，這裡應該使用 fetch 或 axios 發送當前選擇的英雄到 API
        // const response = await fetch(`${API_ENDPOINT}/recommendations`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ champions })
        // });
        // return await response.json();
        
        return new Promise(resolve => {
            setTimeout(() => {
                // 模擬推薦算法生成的結果
                // 在實際應用中，這將由後端 API 根據實際的高端玩家數據計算得出
                
                // 檢查選擇的英雄中的特質
                const activeTraits = {};
                champions.forEach(champion => {
                    champion.traits.forEach(trait => {
                        if (!activeTraits[trait]) {
                            activeTraits[trait] = 0;
                        }
                        activeTraits[trait]++;
                    });
                });
                
                // 根據特質生成推薦陣容
                const recommendations = [];
                
                if (Object.keys(activeTraits).length > 0) {
                    // 找出最多的特質
                    const primaryTrait = Object.keys(activeTraits).reduce(
                        (a, b) => activeTraits[a] > activeTraits[b] ? a : b
                    );
                    
                    // 為該特質生成推薦陣容
                    recommendations.push({
                        name: `${primaryTrait} 主攻陣容`,
                        description: `以${primaryTrait}為核心的強力陣容，適合中後期發力`,
                        traits: { 
                            [primaryTrait]: 6, 
                            "挑戰者": primaryTrait === "挑戰者" ? 4 : 2,
                            "刺客": primaryTrait === "刺客" ? 4 : 0
                        },
                        champions: [
                            "TFT_Aatrox", "TFT_Ahri", "TFT_Akali", "TFT_Annie", 
                            "TFT_Aphelios", "TFT_Ashe", "TFT_Azir", "TFT_Bard"
                        ],
                        winRate: 58.3,
                        averagePlacement: 3.2,
                        difficulty: "中等",
                        stageStrength: {
                            early: 40,
                            mid: 65,
                            late: 85
                        },
                        keyItems: [
                            { champion: "TFT_Ahri", items: ["rabadons", "jeweled_gauntlet", "infinity_edge"] },
                            { champion: "TFT_Aatrox", items: ["titans_resolve", "bloodthirster", "infinity_edge"] }
                        ],
                        counters: [
                            { comp: "刺客速攻", effectiveness: 30 },
                            { comp: "魔法師集火", effectiveness: 45 }
                        ]
                    });
                    
                    // 添加第二個推薦
                    recommendations.push({
                        name: `混合 ${primaryTrait} 陣容`,
                        description: `結合${primaryTrait}和其他特質的靈活陣容，適應性強`,
                        traits: { 
                            [primaryTrait]: 4, 
                            "魔法師": 2,
                            "神射手": 2
                        },
                        champions: [
                            "TFT_Annie", "TFT_Ahri", "TFT_Ashe", "TFT_Aphelios", 
                            "TFT_Azir", "TFT_Akali", "TFT_Bard"
                        ],
                        winRate: 52.7,
                        averagePlacement: 3.8,
                        difficulty: "簡單",
                        stageStrength: {
                            early: 55,
                            mid: 60,
                            late: 70
                        },
                        keyItems: [
                            { champion: "TFT_Ashe", items: ["giant_slayer", "runaans_hurricane", "infinity_edge"] },
                            { champion: "TFT_Annie", items: ["morellonomicon", "rabadons", "archangels_staff"] }
                        ],
                        counters: [
                            { comp: "坦克陣容", effectiveness: 65 },
                            { comp: "魔王終極體", effectiveness: 40 }
                        ]
                    });
                    
                    // 如果特質選擇較多，添加更多推薦
                    if (Object.keys(activeTraits).length >= 2) {
                        const secondaryTrait = Object.keys(activeTraits)
                            .filter(t => t !== primaryTrait)
                            .reduce((a, b) => activeTraits[a] > activeTraits[b] ? a : b, null);
                        
                        if (secondaryTrait) {
                            recommendations.push({
                                name: `${primaryTrait}/${secondaryTrait} 雙特質陣容`,
                                description: `結合${primaryTrait}和${secondaryTrait}的強力組合，後期無敵`,
                                traits: { 
                                    [primaryTrait]: 4, 
                                    [secondaryTrait]: 4,
                                    "輔助": 2
                                },
                                champions: [
                                    "TFT_Aatrox", "TFT_Ahri", "TFT_Akali", "TFT_Bard", 
                                    "TFT_Azir", "TFT_Ashe", "TFT_Aphelios", "TFT_Annie"
                                ],
                                winRate: 61.2,
                                averagePlacement: 3.0,
                                difficulty: "困難",
                                stageStrength: {
                                    early: 35,
                                    mid: 55,
                                    late: 95
                                },
                                keyItems: [
                                    { champion: "TFT_Akali", items: ["infinity_edge", "bloodthirster", "guardian_angel"] },
                                    { champion: "TFT_Azir", items: ["rabadons", "jeweled_gauntlet", "archangels_staff"] }
                                ],
                                counters: [
                                    { comp: "刺客突襲", effectiveness: 50 },
                                    { comp: "神射手陣容", effectiveness: 35 }
                                ]
                            });
                        }
                    }
                } else {
                    // 如果沒有選擇英雄，提供熱門陣容
                    recommendations.push({
                        name: "真實傷害陣容",
                        description: "當前版本最強勢的陣容之一，適合有經驗的玩家",
                        traits: { 
                            "真實傷害": 6, 
                            "刺客": 2,
                            "魔法師": 2
                        },
                        champions: [
                            "TFT_Akali", "TFT_Ahri", "TFT_Annie", "TFT_Aatrox", 
                            "TFT_Ashe", "TFT_Azir", "TFT_Aphelios", "TFT_Bard"
                        ],
                        winRate: 62.1,
                        averagePlacement: 2.9,
                        difficulty: "中等",
                        stageStrength: {
                            early: 45,
                            mid: 70,
                            late: 90
                        },
                        keyItems: [
                            { champion: "TFT_Akali", items: ["infinity_edge", "jeweled_gauntlet", "guardian_angel"] },
                            { champion: "TFT_Ahri", items: ["rabadons", "archangels_staff", "blue_buff"] }
                        ],
                        counters: [
                            { comp: "神盾防禦陣", effectiveness: 45 },
                            { comp: "魔道陣容", effectiveness: 55 }
                        ]
                    });
                    
                    recommendations.push({
                        name: "坦克控制陣容",
                        description: "穩定的陣容，適合新手玩家，容易組成且穩定",
                        traits: { 
                            "護衛": 4, 
                            "魔法師": 4,
                            "輔助": 2
                        },
                        champions: [
                            "TFT_Annie", "TFT_Bard", "TFT_Blitzcrank", "TFT_Aatrox", 
                            "TFT_Ahri", "TFT_Ashe", "TFT_Azir"
                        ],
                        winRate: 54.8,
                        averagePlacement: 3.3,
                        difficulty: "簡單",
                        stageStrength: {
                            early: 60,
                            mid: 65,
                            late: 75
                        },
                        keyItems: [
                            { champion: "TFT_Blitzcrank", items: ["warmogs", "dragons_claw", "gargoyle_stoneplate"] },
                            { champion: "TFT_Ahri", items: ["rabadons", "morellonomicon", "archangels_staff"] }
                        ],
                        counters: [
                            { comp: "大魔傷陣容", effectiveness: 60 },
                            { comp: "真實傷害陣", effectiveness: 45 }
                        ]
                    });
                }
                
                resolve(recommendations);
            }, 1000);
        });
    } catch (error) {
        console.error('獲取推薦陣容失敗:', error);
        return [];
    }
}

// 導出 API 功能
export { fetchChampions, fetchTraits, fetchRecommendations };