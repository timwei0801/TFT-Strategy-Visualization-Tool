// 陣容推薦系統 - 根據棋盤上的英雄推薦陣容

// 加載陣容數據
async function loadCompData() {
    try {
        const response = await fetch('assets/data/opgg_template.json');
        if (!response.ok) {
            console.warn('無法獲取陣容數據，使用備用數據');
            return getFallbackCompData();
        }
        return await response.json();
    } catch (error) {
        console.error('加載陣容數據時發生錯誤:', error);
        return getFallbackCompData();
    }
}

// 備用陣容數據
function getFallbackCompData() {
    return {
        comps: [
            {
                comp_name: "賽博霸主",
                traits: {
                    "賽博霸主": 4,
                    "堡壘衛士": 2,
                    "技師": 2
                },
                heroes: [
                    { name: "波比", cost: 1 },
                    { name: "維迦", cost: 2 },
                    { name: "希格斯", cost: 4 },
                    { name: "柯布柯", cost: 5 }
                ],
                score: 8.5,
                avg_placement: 3.2
            },
            {
                comp_name: "百獸特攻隊",
                traits: {
                    "百獸特攻隊": 5,
                    "戰略軍師": 3
                },
                heroes: [
                    { name: "瑟菈紛", cost: 1 },
                    { name: "悠咪", cost: 3 },
                    { name: "雷歐娜", cost: 4 },
                    { name: "歐羅拉", cost: 5 },
                    { name: "伊羅旖", cost: 2 }
                ],
                score: 9.0,
                avg_placement: 2.8
            },
            {
                comp_name: "街頭狂魔",
                traits: {
                    "街頭狂魔": 7,
                    "A.M.P.": 3
                },
                heroes: [
                    { name: "蒙多醫生", cost: 1 },
                    { name: "枷蘿", cost: 1 },
                    { name: "艾克", cost: 2 },
                    { name: "吉茵珂絲", cost: 3 },
                    { name: "雷葛爾", cost: 3 },
                    { name: "布蘭德", cost: 4 },
                    { name: "妮可", cost: 4 },
                    { name: "煞蜜拉", cost: 5 }
                ],
                score: 8.8,
                avg_placement: 3.0
            }
        ]
    };
}

// 根據棋盤上的英雄找到最匹配的陣容
async function findMatchingComps() {
    // 獲取棋盤上的英雄
    const boardHeroes = selectedHeroes || [];
    
    if (boardHeroes.length === 0) {
        return [];
    }
    
    // 加載陣容數據
    let matchedCompData = compData;
    if (!matchedCompData) {
        try {
            matchedCompData = await loadCompData();
        } catch (error) {
            console.error('加載陣容數據時發生錯誤:', error);
            return [];
        }
    }
    
    if (!matchedCompData || !matchedCompData.comps || !Array.isArray(matchedCompData.comps)) {
        console.error('陣容數據格式不正確');
        return [];
    }
    
    // 計算每個陣容與當前棋盤的匹配度
    const matchedComps = matchedCompData.comps.map(comp => {
        // 提取陣容中的英雄
        let compHeroes = [];
        
        if (comp.units && Array.isArray(comp.units)) {
            compHeroes = comp.units.map(unit => {
                // 移除星級標記，例如"維迦(3★)" => "維迦"
                return unit.hero_name ? unit.hero_name.replace(/\([^\)]+\)/g, '').trim() : '';
            }).filter(hero => hero); // 過濾掉空值
        } else if (comp.heroes && Array.isArray(comp.heroes)) {
            compHeroes = comp.heroes.map(hero => {
                // 移除星級標記
                return hero.name ? hero.name.replace(/\([^\)]+\)/g, '').trim() : '';
            }).filter(hero => hero); // 過濾掉空值
        }
        
        // 計算匹配的英雄數量
        const matchedHeroes = boardHeroes.filter(hero => 
            compHeroes.includes(hero)
        );
        
        // 計算匹配分數（匹配英雄數 / 棋盤英雄總數）
        const matchScore = boardHeroes.length > 0 ? 
            matchedHeroes.length / boardHeroes.length : 0;
        
        return {
            comp: comp,
            matchedHeroes: matchedHeroes,
            matchScore: matchScore,
            remainingHeroes: compHeroes.filter(hero => !boardHeroes.includes(hero))
        };
    });
    
    // 過濾並排序匹配的陣容
    return matchedComps
        .filter(match => match.matchedHeroes.length > 0)
        .sort((a, b) => {
            // 首先按匹配英雄數排序
            if (b.matchedHeroes.length !== a.matchedHeroes.length) {
                return b.matchedHeroes.length - a.matchedHeroes.length;
            }
            // 然後按匹配分數排序
            return b.matchScore - a.matchScore;
        })
        .slice(0, 3); // 只返回前3個最佳匹配
}