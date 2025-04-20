// util.js
// TFT S14「機動魔都」公用資料轉換函數

const TFTUtils = {
    // 英雄ID轉中文名稱
    getHeroChineseName: function(heroId) {
        const heroNames = {
            "Alistar": "亞歷斯塔",
            "Nidalee": "奈德麗",
            "Kog'Maw": "寇格魔",
            "Zyra": "枷蘿",
            "Poppy": "波比",
            "Seraphine": "瑟菈紛",
            "Vi": "菲艾",
            "DrMundo": "蒙多醫生",
            "Shaco": "薩科",
            "Jax": "賈克斯",
            "Sylas": "賽勒斯",
            "Kindred": "鏡爪",
            "Morgana": "魔甘娜",
            "Illaoi": "伊羅旖",
            "Rhaast": "勒哈斯特",
            "LeBlanc": "勒布朗",
            "Skarner": "史加納",
            "Naafiri": "娜菲芮",
            "Shyvana": "希瓦娜",
            "Vayne": "汎",
            "Jhin": "燼",
            "Veigar": "維迦",
            "Ekko": "艾克",
            "Graves": "葛雷夫",
            "Twisted Fate": "逆命",
            "Darius": "達瑞斯",
            "Elise": "伊莉絲",
            "Galio": "加里歐",
            "Gragas": "古拉格斯",
            "Jinx": "吉茵珂絲",
            "Jarvan IV": "嘉文四世",
            "Senna": "姍娜",
            "Braum": "布朗姆",
            "Yuumi": "悠咪",
            "Varus": "法洛士",
            "Fiddlesticks": "費德提克",
            "Draven": "達瑞文",
            "Rengar": "雷葛爾",
            "Mordekaiser": "魔鬥凱薩",
            "Aphelios": "亞菲利歐",
            "Xayah": "剎雅",
            "Zed": "劫",
            "Sejuani": "史瓦妮",
            "Miss Fortune": "好運姐",
            "Neeko": "妮可",
            "Zeri": "婕莉",
            "Annie": "安妮",
            "Brand": "布蘭德",
            "Ziggs": "希格斯",
            "Cho'Gath": "科加斯",
            "Vex": "薇可斯",
            "Leona": "雷歐娜",
            "Zac": "札克",
            "Kobuko": "柯布柯",
            "Aurora": "歐羅拉",
            "Urgot": "烏爾加特",
            "Samira": "煞蜜拉",
            "Viego": "維爾戈",
            "Garen": "蓋倫",
            "Renekton": "雷尼克頓"
        };
        
        // 處理可能的前綴
        const cleanId = heroId.replace("TFT14_", "");
        return heroNames[cleanId] || cleanId;
    },
    
    // 中文名稱轉英雄ID
    getHeroId: function(heroName) {
        const heroIds = {
            "亞歷斯塔": "Alistar",
            "奈德麗": "Nidalee",
            "寇格魔": "Kog'Maw",
            "枷蘿": "Zyra",
            "波比": "Poppy",
            "瑟菈紛": "Seraphine",
            "菲艾": "Vi",
            "蒙多醫生": "DrMundo",
            "薩科": "Shaco",
            "賈克斯": "Jax",
            "賽勒斯": "Sylas",
            "鏡爪": "Kindred",
            "魔甘娜": "Morgana",
            "伊羅旖": "Illaoi",
            "勒哈斯特": "Rhaast",
            "勒布朗": "LeBlanc",
            "史加納": "Skarner",
            "娜菲芮": "Naafiri",
            "希瓦娜": "Shyvana",
            "汎": "Vayne",
            "燼": "Jhin",
            "維迦": "Veigar",
            "艾克": "Ekko",
            "葛雷夫": "Graves",
            "逆命": "Twisted Fate",
            "達瑞斯": "Darius",
            "伊莉絲": "Elise",
            "加里歐": "Galio",
            "古拉格斯": "Gragas",
            "吉茵珂絲": "Jinx",
            "嘉文四世": "Jarvan IV",
            "姍娜": "Senna",
            "布朗姆": "Braum",
            "悠咪": "Yuumi",
            "法洛士": "Varus",
            "費德提克": "Fiddlesticks",
            "達瑞文": "Draven",
            "雷葛爾": "Rengar",
            "魔鬥凱薩": "Mordekaiser",
            "亞菲利歐": "Aphelios",
            "剎雅": "Xayah",
            "劫": "Zed",
            "史瓦妮": "Sejuani",
            "好運姐": "Miss Fortune",
            "妮可": "Neeko",
            "婕莉": "Zeri",
            "安妮": "Annie",
            "布蘭德": "Brand",
            "希格斯": "Ziggs",
            "科加斯": "Cho'Gath",
            "薇可斯": "Vex",
            "雷歐娜": "Leona",
            "札克": "Zac",
            "柯布柯": "Kobuko",
            "歐羅拉": "Aurora",
            "烏爾加特": "Urgot",
            "煞蜜拉": "Samira",
            "維爾戈": "Viego",
            "蓋倫": "Garen",
            "雷尼克頓": "Renekton"
        };
        
        return heroIds[heroName] || heroName;
    },
    
    // 羈絆ID轉中文名稱
    getTraitChineseName: function(traitId) {
        const traitNames = {
            'Vanguar': '先鋒戰士',
            'Techie': '技師',
            'Slayer': '殺戮者',
            'Rapidfire': '速射',
            'Bastion': '堡壘衛士',
            'Divinicorp': '神諭集團',
            'Nitro': '爆燃戰隊',
            'Anima Squad': '百獸特攻隊',
            'Street Demon': '街頭狂魔',
            'A.M.P.': 'A.M.P.',
            'Marksman': '射手',
            'BoomBot': '末日機器人',
            'Exotech': '極限科技',
            'Dynamo': '發電機',
            'Cypher': '破譯師',
            'Syndicate': '罪惡集團',
            'Cyberboss': '賽博霸主',
            'Golden Ox': '開運金牛',
            'Executioner': '處刑者',
            'Strategist': '戰略軍師',
            'Bruiser': '蠻勇鬥士',
            'Soul Killer': '靈魂殺手',
            'Overlord': '主宰',
            'God of the Net': '網路之神',
            'Virus': '病毒'
        };
        
        // 處理可能的前綴
        const cleanId = traitId.replace('TFT14_', '');
        return traitNames[cleanId] || cleanId;
    },
    
    // 獲取羈絆顏色
    getTraitColor: function(traitId) {
        const traitColors = {
            'Cyberboss': '#ff6b6b',       // 賽博霸主
            'A.M.P.': '#4ecdc4',          // A.M.P.
            'Street Demon': '#ffe66d',     // 街頭狂魔
            'Exotech': '#6a0572',         // 極限科技
            'Divinicorp': '#1a535c',      // 神諭集團
            'Anima Squad': '#f72585',     // 百獸特攻隊
            'Cypher': '#6c757d',          // 破譯師
            'Nitro': '#ff9a3c',           // 爆燃戰隊
            'Golden Ox': '#ffc107',       // 開運金牛
            'Syndicate': '#dc3545',       // 罪惡集團
            'BoomBot': '#17a2b8',         // 末日機器人
            'Virus': '#7209b7',           // 病毒
            'Soul Killer': '#560bad',     // 靈魂殺手
            'Overlord': '#3a0ca3',        // 主宰
            'God of the Net': '#4361ee',  // 網路之神
            'Bruiser': '#a48e5c',         // 蠻勇鬥士
            'Bastion': '#4b9263',         // 堡壘衛士
            'Strategist': '#9c6644',      // 戰略軍師
            'Marksman': '#e63946',        // 射手
            'Techie': '#2a9d8f',          // 技師
            'Executioner': '#e76f51',     // 處刑者
            'Vanguar': '#457b9d',         // 先鋒戰士
            'Dynamo': '#80b918',          // 發電機
            'Rapidfire': '#fb8500',       // 速射
            'Slayer': '#d00000',          // 殺戮者
        };
        
        // 處理可能的前綴
        const cleanId = traitId.replace('TFT14_', '');
        return traitColors[cleanId] || '#ccc'; // 默認灰色
    },
    
    // 格式化陣容數據，統一處理前綴和格式
    formatCompData: function(compData) {
        if (!compData) return null;
        
        // 處理英雄列表
        if (compData.heroes) {
            compData.heroes = compData.heroes.map(hero => {
                // 如果是ID，轉成中文名
                if (hero.startsWith('TFT14_')) {
                    return this.getHeroChineseName(hero);
                }
                return hero;
            });
        }
        
        // 處理羈絆
        if (compData.active_traits) {
            compData.active_traits = compData.active_traits.map(trait => {
                return {
                    ...trait,
                    name: this.getTraitChineseName(trait.name),
                    color: this.getTraitColor(trait.name)
                };
            });
        }
        
        return compData;
    },
    
    // 取得英雄費用
    getHeroCost: function(heroId) {
        const heroCosts = {
            // 1費英雄
            'Alistar': 1, 'Nidalee': 1, "Kog'Maw": 1, 'Zyra': 1, 'Poppy': 1, 
            'Seraphine': 1, 'Vi': 1, 'DrMundo': 1, 'Shaco': 1, 'Jax': 1, 
            'Sylas': 1, 'Kindred': 1, 'Morgana': 1,
            
            // 2費英雄
            'Illaoi': 2, 'Rhaast': 2, 'LeBlanc': 2, 'Naafiri': 2, 'Shyvana': 2,
            'Vayne': 2, 'Jhin': 2, 'Veigar': 2, 'Ekko': 2, 'Graves': 2,
            'Twisted Fate': 2, 'Darius': 2,
            
            // 3費英雄
            'Elise': 3, 'Galio': 3, 'Gragas': 3, 'Jinx': 3, 'Jarvan IV': 3,
            'Senna': 3, 'Braum': 3, 'Yuumi': 3, 'Varus': 3, 'Draven': 3,
            'Rengar': 3, 'Mordekaiser': 3,
            
            // 4費英雄
            'Aphelios': 4, 'Xayah': 4, 'Zed': 4, 'Sejuani': 4, 'Miss Fortune': 4,
            'Neeko': 4, 'Zeri': 4, 'Annie': 4, 'Brand': 4, 'Ziggs': 4,
            'Vex': 4, 'Leona': 4,
            
            // 5費英雄
            'Zac': 5, 'Kobuko': 5, 'Aurora': 5, 'Samira': 5, 'Viego': 5,
            'Garen': 5, 'Renekton': 5
        };
        
        // 移除前綴
        const cleanId = heroId.replace('TFT14_', '');
        return heroCosts[cleanId] || 0;
    },
    
    // 依照羈絆獲取英雄列表
    getHeroesByTrait: function(traitId) {
        const traitHeroMappings = {
            'Cyberboss': ['Poppy', 'Veigar', 'Ziggs', 'Kobuko'],
            'A.M.P.': ['Nidalee', 'Naafiri', 'Yuumi', 'Annie', 'Samira'],
            'Street Demon': ['DrMundo', 'Zyra', 'Ekko', 'Jinx', 'Rengar', 'Brand', 'Neeko', 'Samira'],
            'Exotech': ['Jax', 'Jhin', 'Naafiri', 'Mordekaiser', 'Varus', 'Sejuani', 'Zeri'],
            'Divinicorp': ['Morgana', 'Rhaast', 'Gragas', 'Senna', 'Vex', 'Renekton'],
            'Anima Squad': ['Seraphine', 'Sylas', 'Illaoi', 'Yuumi', 'Xayah', 'Leona', 'Aurora'],
            'Cypher': ['Vi', 'LeBlanc', 'Galio', 'Draven', 'Zed'],
            'Nitro': ['Nidalee', 'Kindred', 'Shyvana', 'Elise'],
            'Golden Ox': ['Alistar', 'Graves', 'Jarvan IV', 'Annie', 'Aphelios', 'Viego'],
            'Syndicate': ['Shaco', 'Twisted Fate', 'Darius', 'Braum', 'Miss Fortune'],
            'BoomBot': ["Kog'Maw", 'Skarner', 'Fiddlesticks', "Cho'Gath", 'Urgot'],
            'Virus': ['Zac'],
            'Soul Killer': ['Viego'],
            'Overlord': ['Renekton'],
            'God of the Net': ['Garen'],
            'Bruiser': ['DrMundo', 'Darius', 'Gragas', 'Mordekaiser', 'Kobuko'],
            'Bastion': ['Poppy', 'Illaoi', 'Jax', 'Shyvana', 'Galio', 'Sejuani', 'Leona', 'Renekton'],
            'Strategist': ['LeBlanc', 'Ekko', 'Yuumi', 'Ziggs', 'Neeko'],
            'Marksman': ['Kindred', 'Jinx', 'Jhin', 'Aphelios', 'Xayah'],
            'Techie': ['Zyra', 'Veigar', 'Seraphine', 'Shyvana', 'Mordekaiser', 'Brand', 'Ziggs'],
            'Executioner': ['Graves', 'Rengar', 'Varus', 'Vex', 'Urgot'],
            'Vanguar': ['Vi', 'Sylas', 'Rhaast', 'Skarner', 'Jarvan IV', 'Braum', 'Leona'],
            'Dynamo': ['Morgana', 'Elise', 'Jinx', 'Miss Fortune', 'Aurora'],
            'Rapidfire': ["Kog'Maw", 'Kindred', 'Twisted Fate', 'Draven', 'Zeri'],
            'Slayer': ['DrMundo', 'Shaco', 'Vayne', 'Senna', 'Jarvan IV', 'Zed']
        };
        
        // 移除前綴
        const cleanId = traitId.replace('TFT14_', '');
        const heroes = traitHeroMappings[cleanId] || [];
        
        // 返回中文名稱
        return heroes.map(hero => this.getHeroChineseName(hero));
    }
};

// 如果在Node.js環境中，導出模塊
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TFTUtils;
}