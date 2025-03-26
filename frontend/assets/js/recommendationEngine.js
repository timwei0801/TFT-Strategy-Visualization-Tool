// 定義您擁有的圖片資源
const availableImages = {
    champions: [
        'Alistar', 'Nidalee', "Kog'Maw", 'Zyra', 'Poppy', 'Seraphine', 'Vi', 'Dr. Mundo',
        'Shaco', 'Jax', 'Sylas', 'Kindred', 'Morgana',
        'Illaoi', 'Rhaast', 'LeBlanc', 'Skarner', 'Naafiri', 'Shyvana', 'Vayne',
        'Jhin', 'Veigar', 'Ekko', 'Graves', 'Twisted Fate', 'Darius',
        'Elise', 'Galio', 'Gragas', 'Jinx', 'Jarvan IV', 'Senna', 'Braum',
        'Yuumi', 'Varus', 'Fiddlesticks', 'Draven', 'Rengar', 'Mordekaiser',
        'Aphelios', 'Xayah', 'Zed', 'Sejuani', 'Miss Fortune', 'Neeko', 'Zeri',
        'Annie', 'Brand', 'Ziggs', "Cho'Gath", 'Vex', 'Leona',
        'Zac', 'Kobuko', 'Aurora', 'Urgot', 'Samira', 'Viego', 'Garen', 'Renekton'
    ],
    items: [
        'Fist of Fairness','Covalent Spark','Crest of Cinders',"Jak'sho the Protean","Statikk's Favor",
        "Sterak's Megashield","Bulwark's Oath","Warmog's Pride",'Dvarapala Stoneplate','Equinox',
        'Zenith Edge','Legacy of the Colossus',"The Baron's Gift",'Spear of Hirana',"Rascal's Gloves",
        'Sunlight Cape','Quickestsilver','More More-ellonomicon','Eternal Whisper',"Titan's Vow",
        'Hextech Lifebalade','Demonslayer','Rosethorn Vest','Royal Crownshield','Willbreaker',
        'Blessed Bloodthirster','Blue Blessing','Luminous Deathblade',"Runaan's Tempest",'Absolution',
        "Urf-Angel's Staff","Rabadon's Ascended Deathcap","Guinsoo's Reckoning",'Glamorous Gauntlet',
        'Brink of Dawn',"Dragon's Will",'Hextech Lifeblade','Demonslayer','Rosethorn Vest','Royal Crownshield',

        'Anima Visage','Spectral Cutlass','Manazane',"Zhonya's Paradox",'Lightshield Crest','Deathfire Grasp',
        "Suspicious Trench Coat","Sniper's Focus","Lich Bane","Fishbones","Seeker's Armguard","Innervsting Locket",
        'Talisman Of Ascension',"Wit's End",'Blighting Jewel',"Mogul's Mail","Trickster's Glass","Death's Defiance",
        'Eternal Winter',"Prowler's Claw",'Infinity Force','Unending Despair',"Thief's Gloves",'Gold Collector',
        'Silvermere Dawn',"Blacksmith's Gloves",'Diamond Hands','Spectral Cutlass','Rapid firecannon','Corrupt Vampiric Scepter',

        'Protector\'s Vow','Bramble Vest','Statikk Shiv',"Sterak's Gage","Bloodthirster","Evenshroud","Steadfast Heart",
        "Edge of Night","Archangel's Staff","Warmog's Armor","Jeweled Gauntlet","Giant Slayer","Sunfire Cape",
        "Last Whisper","Tactician's Shield","Tactician's Cape","Tactician's Crown","Hand Of Justice","Rabadon's Deathcap",
        "Deathblade","Quicksilver","Titan's Resolve","Hextech Gunblade","Infinity Edge","CrownGuard","Gargoyle Stoneplate",
        "Guardbreaker","Thief's Gloves","Spear of Shojin","Red buff","Nashor's Tooth","Runaan's Hurricane","Redemption",

        'Anima Squad Emblem','Bastion Emblem','BoomBot Emblem','Ctpher Emblem','Cyberboss Emblem','Divinicorp Emblem',
        'Dynamo Emblem','Exotech Emblem','Golden Ox Emblem','Marksman Emblem','Nitro Emblem','Overlord Emblem',
        'Rapidfire Emblem','Slayer Emblem','Stree Demon Emblem','Techie Emblem','Vanguar Emblem','Virus Emblem',

        'Aegis of the Legion','Banshee\'s Veil', 'Chalice of Power', 'Knight\'s Vow', 'Locket of the Iron Solari',
        'Moonstone Renewer', 'Needlessly Big Gem', 'Obsidian Cleaver', 'Randuin\'s Omen', 'Shroud of Stillness',
        'Spite', 'The Eternal Flame', 'Unstable Treasure Chest', 'Virtue of the Martyr', 'Zephyr','Zz\'Rot Portal',
        'Zeke\'s Herald',
        
        'Guiding Hex', 'Ani-Mines', 'Searning Shortbow', 'The Annihilator', 'Final City Transit', 'Tornadoes',
        "Blade-o-rang", "Gating Bunny-Guns", "Surprise Supply Drop", "UwU Blasters", "Vortex Glove", "Repulsor Lantern",
        "Nullifier Lantern", "Pulse Stabilizer", "Pulse Silencer", "Kingpin Hat", "Kingpin Hat R", "Corrupted Chassis",
        "Harmonized Chassis", "Hyper Fangs", "Apex-Fangs", "Cybercoil", "Hijacked Cybercoil", "Holobow", "Scoped Holobow",
        "Flux Capacitor", "Fully-Charged Flux Capacitor",

        "Recurve Bow", "Tear of the Goddess", "Giant's Belt", "Needlessly Large Rod", "Frying Pan", "B.F Sword",
        "Sparring Gloves", "Negatron Cloak", "Spatula", "Chain Vest",
    ],
    traits: [],
    augments: []
};

// 檢查圖片是否可用
function isImageAvailable(type, id) {
    return availableImages[type] && availableImages[type].includes(id);
}

// 模擬數據 - 實際應用中會從API獲取
const championData = [
    { id: 'Alistar', name: '亞歷斯塔', cost: 1, traits: ['開運金牛', '蠻勇鬥士'], distence: 1}, 
    { id: 'Nidalee', name: '奈德麗', cost: 1, traits: ['爆燃戰隊', 'A.M.P.'], distence: 1 },
    { id: "Kog'Maw", name: '寇格魔', cost: 1, traits: ['末日機器人', '速射'], distence: 4 },
    { id: 'Zyra', name: '枷蘿', cost: 1, traits: ['街頭狂魔', '技師'], distence: 4 },
    { id: 'Poppy', name: '波比', cost: 1, traits: ['賽博霸主', '堡壘衛士'], distence: 1 },
    { id: 'Seraphine', name: '瑟菈紛', cost: 1, traits: ['百獸特攻隊', '技師'], distence: 4 },
    { id: 'Vi', name: '菲艾', cost: 1, traits: ['破譯師', '先鋒戰士'], distence: 1 },
    { id: 'Dr. Mundo', name: '蒙多醫生', cost: 1, traits: ['街頭狂魔', '蠻勇鬥士', '殺戮者'], distence: 1 },
    { id: 'Shaco', name: '薩科', cost: 1, traits: ['罪惡集團', '殺戮者'], distence: 1 },
    { id: 'Jax', name: '賈克斯', cost: 1, traits: ['極限科技', '堡壘衛士'], distence: 1 },
    { id: 'Sylas', name: '賽勒斯', cost: 1, traits: ['百獸特攻隊', '先鋒戰士'], distence: 1 },
    { id: 'Kindred', name: '鏡爪', cost: 1, traits: ['爆燃戰隊', '速射', '射手'], distence: 4 },
    { id: 'Morgana', name: '魔甘娜', cost: 1, traits: ['神諭集團', '發電機'], distence: 4 },

    { id: 'Illaoi', name: '伊羅旖', cost: 2, traits: ['百獸特攻隊', '堡壘衛士'], distence: 1 },
    { id: 'Rhaast', name: '勒哈斯特', cost: 2, traits: ['神諭集團', '先鋒戰士'], distence: 1 },
    { id: 'LeBlanc', name: '勒布朗', cost: 2, traits: ['破譯師', '戰略軍師'], distence: 4 },
    { id: 'Skarner', name: '史加納', cost: 2, traits: ['先鋒戰士', '末日機器人'], distence: 1 },
    { id: 'Naafiri', name: '娜菲芮', cost: 2, traits: ['極限科技', 'A.M.P.'], distence: 1 },
    { id: 'Shyvana', name: '希瓦娜', cost: 2, traits: ['爆燃戰隊', '堡壘衛士', '技師'], distence: 1 },
    { id: 'Vayne', name: '汎', cost: 2, traits: ['殺戮者', '百獸特攻隊'], distence: 4 },
    { id: 'Jhin', name: '燼', cost: 2, traits: ['極限科技', '射手', '發電機'], distence: 4 },
    { id: 'Veigar', name: '維迦', cost: 2, traits: ['賽博霸主', '技師'], distence: 4 },
    { id: 'Ekko', name: '艾克', cost: 2, traits: ['街頭狂魔', '戰略軍師'], distence: 1 },
    { id: 'Graves', name: '葛雷夫', cost: 2, traits: ['開運金牛', '處刑者'], distence: 2 },
    { id: 'Twisted Fate', name: '逆命', cost: 2, traits: ['罪惡集團', '速射'], distence: 4 },
    { id: 'Darius', name: '達瑞斯', cost: 2, traits: ['罪惡集團', '蠻勇鬥士'], distence: 1 },

    { id: 'Elise', name: '伊莉絲', cost: 3, traits: ['爆燃戰隊', '發電機'], distence: 4 },
    { id: 'Galio', name: '加里歐', cost: 3, traits: ['破譯師', '堡壘衛士'], distence: 1 },
    { id: 'Gragas', name: '古拉格斯', cost: 3, traits: ['神諭集團', '蠻勇鬥士'], distence: 1 },
    { id: 'Jinx', name: '吉茵珂絲', cost: 3, traits: ['街頭狂魔', '射手'], distence: 4 },
    { id: 'Jarvan IV', name: '嘉文四世', cost: 3, traits: ['開運金牛', '先鋒戰士', '殺戮者'], distence: 1 },
    { id: 'Senna', name: '姍娜', cost: 3, traits: ['神諭集團', '殺戮者'], distence: 4 },
    { id: 'Braum', name: '布朗姆', cost: 3, traits: ['罪惡集團', '先鋒戰士'], distence: 1 },
    { id: 'Yuumi', name: '悠咪', cost: 3, traits: ['百獸特攻隊', 'A.M.P.', '戰略軍師'], distence: 4 },
    { id: 'Varus', name: '法洛士', cost: 3, traits: ['極限科技', '處刑者'], distence: 4 },
    { id: 'Fiddlesticks', name: '費德提克', cost: 3, traits: ['末日機器人', '技師'], distence: 2 },
    { id: 'Draven', name: '達瑞文', cost: 3, traits: ['破譯師', '速射'], distence: 4 },
    { id: 'Rengar', name: '雷葛爾', cost: 3, traits: ['街頭狂魔', '處刑者'], distence: 1 },
    { id: 'Mordekaiser', name: '魔鬥凱薩', cost: 3, traits: ['極限科技', '蠻勇鬥士', '技師'], distence: 1 },

    { id: 'Aphelios', name: '亞菲利歐', cost: 4, traits: ['開運金牛', '射手'], distence: 4 },
    { id: 'Xayah', name: '剎雅', cost: 4, traits: ['百獸特攻隊', '射手'], distence: 4 },
    { id: 'Zed', name: '劫', cost: 4, traits: ['破譯師', '殺戮者'], distence: 1 },
    { id: 'Sejuani', name: '史瓦妮', cost: 4, traits: ['極限科技', '堡壘衛士'], distence: 1 },
    { id: 'Miss Fortune', name: '好運姐', cost: 4, traits: ['罪惡集團', '發電機'], distence: 4 },
    { id: 'Neeko', name: '妮可', cost: 4, traits: ['街頭狂魔', '戰略軍師'], distence: 1 },
    { id: 'Zeri', name: '婕莉', cost: 4, traits: ['極限科技', '速射'], distence: 5 },
    { id: 'Annie', name: '安妮', cost: 4, traits: ['開運金牛', 'A.M.P.'], distence: 4 },
    { id: 'Brand', name: '布蘭德', cost: 4, traits: ['街頭狂魔', '技師'], distence: 4 },
    { id: 'Ziggs', name: '希格斯', cost: 4, traits: ['賽博霸主', '戰略軍師'], distence: 4 },
    { id: "Cho'Gath", name: '科加斯', cost: 4, traits: ['末日機器人', '蠻勇鬥士'], distence: 1 },
    { id: 'Vex', name: '薇可斯', cost: 4, traits: ['神諭集團', '處刑者'], distence: 4 },
    { id: 'Leona', name: '雷歐娜', cost: 4, traits: ['百獸特攻隊', '先鋒戰士'], distence: 1 },

    { id: 'Zac', name: '札克', cost: 5, traits: ['病毒'], distence: 1 },
    { id: 'Kobuko', name: '柯布柯', cost: 5, traits: ['賽博霸主', '蠻勇鬥士'], distence: 1 },
    { id: 'Aurora', name: '歐羅拉', cost: 5, traits: ['百獸特攻隊', '發電機'], distence: 4 },
    { id: 'Urgot', name: '烏爾加特', cost: 5, traits: ['處刑者', '末日機器人'], distence: 4 },
    { id: 'Samira', name: '煞蜜拉', cost: 5, traits: ['街頭狂魔', 'A.M.P.'], distence: 4 },
    { id: 'Viego', name: '維爾戈', cost: 5, traits: ['靈魂殺手', '開運金牛', '技師'], distence: 1 },
    { id: 'Garen', name: '蓋倫', cost: 5, traits: ['網路之神',], distence: 1 },
    { id: 'Renekton', name: '雷尼克頓', cost: 5, traits: ['主宰', '神諭集團', '堡壘衛士'], distence: 1 },
];

const traitData = [
    { id: 'Vanguar', name: '先鋒戰士', levels: [2, 4, 6] },
    { id: 'Techie', name: '技師', levels: [2, 4, 6, 8] },
    { id: 'Slayer', name: '殺戮者', levels: [2, 4, 6] },
    { id: 'Rapidfire', name: '速射', levels: [2, 4, 6] },
    { id: 'Bastion', name: '堡壘衛士', levels: [2, 4, 6] },
    { id: 'Divinicorp', name: '神諭集團', levels: [1, 2, 3, 4, 5, 6, 7] },
    { id: 'Nitro', name: '爆燃戰隊', levels: [3, 4] },
    { id: 'Anima Squad', name: '百獸特攻隊', levels: [3, 5, 7, 10] },
    { id: 'Stree Demon', name: '街頭狂魔', levels: [3, 5, 7, 10] },
    { id: 'A.M.P.', name: 'A.M.P.', levels: [2, 3, 4, 5] },
    { id: 'Marksman', name: '射手', levels: [2, 4] },
    { id: 'BoomBot', name: '末日機器人', levels: [2, 4] },
    { id: 'Exotech', name: '極限科技', levels: [3, 5, 7, 10] },
    { id: 'Dynamo', name: '發電機', levels: [2, 3, 4] },
    { id: 'Ctpher', name: '破譯師', levels: [3, 4, 5] },
    { id: 'Syndicate', name: '罪惡集團', levels: [3, 5, 7] },
    { id: 'Cyberboss', name: '賽博霸主', levels: [2, 3, 4] },
    { id: 'Golden Ox', name: '開運金牛', levels: [2, 4, 6] },
    { id: 'Executioner', name: '處刑者', levels: [2, 3, 4, 5] },
    { id: 'Strategist', name: '戰略軍師', levels: [2, 3, 4, 5] },
    { id: 'Bruiser', name: '蠻勇鬥士', levels: [2, 4, 6] },
    { id: 'Soul Killer', name: '靈魂殺手', levels: [1] },
    { id: 'Overlord', name: '主宰', levels: [1] },
    { id: 'God of the Net', name: '網路之神', levels: [1] },
    { id: 'Virus', name: '病毒', levels: [1] },
];

const itemData = [
    { id: 'Fist of Fairness', name: '公理拳套', type: 'Radiant' },
    { id: 'Covalent Spark', name: '共價鍵星火', type: 'Radiant' },
    { id: 'Crest of Cinders', name: '力量的餘燼', type: 'Radiant' },
    { id: "Jak'sho the Protean", name: '千變萬化之賈克修', type: 'Radiant' },
    { id: "Statikk's Favor", name: '史提克的善行', type: 'Radiant' },
    { id: "Sterak's Megashield", name: '史特拉克超級護盾', type: 'Radiant' },
    { id: "Bulwark's Oath", name: '堡壘之誓約', type: 'Radiant' },
    { id: "Warmog's Pride", name: '好站者驕傲', type: 'Radiant' },
    { id: 'Dvarapala Stoneplate', name: '守門天磐核', type: 'Radiant' },
    { id: 'Equinox', name: '寂靜星河', type: 'Radiant' },
    { id: 'Zenith Edge', name: '巔峰之刃', type: 'Radiant' },
    { id: 'Legacy of the Colossus', name: '巨像之遺物', type: 'Radiant' },
    { id: "The Baron's Gift", name: '巴龍的賜福', type: 'Radiant' },
    { id: 'Spear of Hirana', name: '希安那之矛', type: 'Radiant' },
    { id: "Rascal's Gloves", name: '搗蛋鬼手套', type: 'Radiant' },
    { id: 'Sunlight Cape', name: '日光斗篷', type: 'Radiant' },
    { id: 'Quickestsilver', name: '極致水銀', type: 'Radiant' },
    { id: 'More More-ellonomicon', name: '極黑魔禁書', type: 'Radiant' },
    { id: 'Eternal Whisper', name: '永恆耳語', type: 'Radiant' },
    { id: "Titan's Vow", name: '泰坦的誓言', type: 'Radiant' },
    { id: 'Hextech Lifeblade', name: '海克斯科技命刃', type: 'Radiant' },
    { id: 'Demonslayer', name: '滅鬼之刃', type: 'Radiant' },
    { id: 'Rosethorn Vest', name: '玫瑰刺藤胸甲', type: 'Radiant' },
    { id: 'Royal Crownshield', name: '皇家冠盾', type: 'Radiant' },
    { id: 'Willbreaker', name: '破志者', type: 'Radiant' },
    { id: 'Blessed Bloodthirster', name: '神聖嗜血者', type: 'Radiant' },
    { id: 'Blue Blessing', name: '神聖遠古魔像增益', type: 'Radiant' },
    { id: 'Luminous Deathblade', name: '聖光神聖之刃', type: 'Radiant' },
    { id: "Runaan's Tempest", name: '芮蘭驟雨箭', type: 'Radiant' },
    { id: 'Absolution', name: '赦罪神石', type: 'Radiant' },
    { id: "Urf-Angel's Staff", name: '阿福天使之杖', type: 'Radiant' },
    { id: "Rabadon's Ascended Deathcap", name: '飛昇死亡之帽', type: 'Radiant' },
    { id: "Guinsoo's Reckoning", name: '鬼索的審判之刃', type: 'Radiant' },
    { id: 'Glamorous Gauntlet', name: '魅力手套', type: 'Radiant' },
    { id: 'Brink of Dawn', name: '黎明邊際', type: 'Radiant' },
    { id: "Dragon's Will", name: '龍之志', type: 'Radiant' },
    
    { id: "Zhonya's Paradox", name: '中婭悖論之鐘', type: 'Artifact' },
    { id: 'Lightshield Crest', name: '光盾之紋', type: 'Artifact' },
    { id: 'Deathfire Grasp', name: '冥火之擁', type: 'Artifact' },
    { id: "Suspicious Trench Coat", name: '可疑風衣', type: 'Artifact' },
    { id: "Sniper's Focus", name: '屏息狙擊', type: 'Artifact' },
    { id: "Lich Bane", name: '巫妖之禍', type: 'Artifact' },
    { id: "Fishbones", name: '惡鯊火箭', type: 'Artifact' },
    { id: "Seeker's Armguard", name: '探索者護腕', type: 'Artifact' },
    { id: 'Innervating Locket', name: '支配寶匣', type: 'Artifact' },
    { id: 'Talisman Of Ascension', name: '昇華護符', type: 'Artifact' },
    { id: "Wit's End", name: '智慧末刃', type: 'Artifact' },
    { id: 'Blighting Jewel', name: '枯萎寶石', type: 'Artifact' },
    { id: "Mogul's Mail", name: '權貴之甲', type: 'Artifact' },
    { id: "Trickster's Glass", name: '欺瞞水晶', type: 'Artifact' },
    { id: "Death's Defiance", name: '死亡之蔑', type: 'Artifact' },
    { id: 'Eternal Winter', name: '永冬', type: 'Artifact' },
    { id: "Prowler's Claw", name: '潛行者之爪', type: 'Artifact' },
    { id: 'Infinity Force', name: '無盡之力', type: 'Artifact' },
    { id: 'Unending Despair', name: '無盡絕望', type: 'Artifact' },
    { id: 'Anima Visage', name: '生命鎧甲', type: 'Artifact' },
    { id: "Luden's Tempest", name: '盧登驟雨', type: 'Artifact' },
    { id: 'Hullcrusher', name: '碎船戰斧', type: 'Artifact' },
    { id: 'Forbidden Idol', name: '禁忌之像', type: 'Artifact' },
    { id: 'Mittens', name: '縮小手套', type: 'Artifact' },
    { id: 'Rapid Firecannon', name: '衝擊火砲', type: 'Artifact' },
    { id: 'Horizon Focus', name: '視界專注', type: 'Artifact' },
    { id: 'Corrupt Vampiric Scepter', name: '詛咒吸血鬼權杖', type: 'Artifact' },
    { id: "Gambler's Blade", name: '賭徒之刃', type: 'Artifact' },
    { id: 'Gold Collector', name: '金幣收藏家', type: 'Artifact' },
    { id: 'Silvermere Dawn', name: '銀織黎明', type: 'Artifact' },
    { id: "Blacksmith's Gloves", name: '鐵匠手套', type: 'Artifact' },
    { id: 'Diamond Hands', name: '鑽石之手', type: 'Artifact' },
    { id: 'Spectral Cutlass', name: '鬼使彎刀', type: 'Artifact' },
    { id: 'Manazane', name: '魔力之蘊', type: 'Artifact' },
    
    { id: "Protector's Vow", name: '保衛者之誓', type: 'Core' },
    { id: 'Bramble Vest', name: '刺藤胸甲', type: 'Core' },
    { id: 'Statikk Shiv', name: '史提克彈簧刀', type: 'Core' },
    { id: "Sterak's Gage", name: '史特拉克手套', type: 'Core' },
    { id: "Bloodthirster", name: '嗜血者', type: 'Core' },
    { id: "Evenshroud", name: '均等法衣', type: 'Core' },
    { id: "Steadfast Heart", name: '堅定之心', type: 'Core' },
    { id: "Edge of Night", name: '夜色緣界', type: 'Core' },
    { id: "Archangel's Staff", name: '大天使之杖', type: 'Core' },
    { id: "Warmog's Armor", name: '好戰者鎧甲', type: 'Core' },
    { id: "Jeweled Gauntlet", name: '寶石手套', type: 'Core' },
    { id: 'Giant Slayer', name: '巨人殺手', type: 'Core' },
    { id: "Sunfire Cape", name: '日炎斗篷', type: 'Core' },
    { id: "Last Whisper", name: '最後耳語', type: 'Core' },
    { id: "Tactician's Shield", name: '棋手之盾', type: 'Core' },
    { id: "Tactician's Cape", name: '棋手披風', type: 'Core' },
    { id: "Tactician's Crown", name: '棋手皇冠', type: 'Core' },
    { id: 'Hand Of Justice', name: '正義手套', type: 'Core' },
    { id: "Rabadon's Deathcap", name: '死亡之帽', type: 'Core' },
    { id: 'Deathblade', name: '死神之刃', type: 'Core' },
    { id: "Quicksilver", name: '水銀兜帽', type: 'Core' },
    { id: "Titan's Resolve", name: '泰坦的決意', type: 'Core' },
    { id: 'Hextech Gunblade', name: '海克斯科技槍刃', type: 'Core' },
    { id: 'Infinity Edge', name: '無盡之刃', type: 'Core' },
    { id: 'CrownGuard', name: '皇冠守衛', type: 'Core' },
    { id: 'Gargoyle Stoneplate', name: '石像鬼磐核', type: 'Core' },
    { id: 'Guardbreaker', name: '破防者', type: 'Core' },
    { id: "Thief's Gloves", name: '竊賊手套', type: 'Core' },
    { id: 'Spear of Shojin', name: '精進之矛', type: 'Core' },
    { id: 'Red buff', name: '紅Buff', type: 'Core' },
    { id: "Nashor's Tooth", name: '納什之牙', type: 'Core' },
    { id: "Runaan's Hurricane", name: '芮蘭颶風箭', type: 'Core' },
    { id: 'Redemption', name: '贖罪神石', type: 'Core' },
    { id: 'Blue buff', name: '遠古魔像增益', type: 'Core' },
    { id: 'Adaptive Helm', name: '適性神盔', type: 'Core' },
    { id: "Lonic Spark", name: '離子星火', type: 'Core' },
    { id: "Guinsoo's Rageblade", name: '鬼索狂暴之刃', type: 'Core' },
    { id: 'Morellonomicon', name: '黑魔禁書', type: 'Core' },
    { id: "Dragon's Claw", name: '龍之爪', type: 'Core' },

    { id: "Vanguard Emblem", name: '先鋒戰士徽章', type: 'Emblem' },
    { id: "Bastion Emblem", name: '堡壘衛士徽章', type: 'Emblem' },
    { id: 'Marksman Emblem', name: '射手徽章', type: 'Emblem' },
    { id: 'Strategist Emblem', name: '戰略軍師徽章', type: 'Emblem' },
    { id: 'Techie Emblem', name: '技師徽章', type: 'Emblem' },
    { id: 'BoomBot Emblem', name: '末日機器人徽章', type: 'Emblem' },
    { id: 'Exotech Emblem', name: '極限科技徽章', type: 'Emblem' },
    { id: 'Slayer Emblem', name: '殺戮者徽章', type: 'Emblem' },
    { id: "Dynamo Emblem", name: '發電機徽章', type: 'Emblem' },
    { id: 'Anima Squad Emblem', name: '百獸特攻隊徽章', type: 'Emblem' },
    { id: 'Cypher Emblem', name: '破譯師徽章', type: 'Emblem' },
    { id: "Divinicorp Emblem", name: '神諭集團徽章', type: 'Emblem' },
    { id: "Syndicate Emblem", name: '罪惡集團徽章', type: 'Emblem' },
    { id: 'Executioner Emblem', name: '處刑者徽章', type: 'Emblem' },
    { id: 'Bruiser Emblem', name: '蠻勇鬥士徽章', type: 'Emblem' },
    { id: 'Street Demon Emblem', name: '街頭狂魔徽章', type: 'Emblem' },
    { id: "Rapidfire Emblem", name: '速射徽章', type: 'Emblem' },
    { id: "Golden Ox Emblem", name: '開運金牛徽章', type: 'Emblem' },

    { id: "Chalice of Power", name: '力量聖杯', type: 'Support' },
    { id: "Unstable Treasure Chest", name: '反復無常寶箱', type: 'Support' },
    { id: "Banshee's Veil", name: '女妖面紗', type: 'Support' },
    { id: "Shround of Stillness", name: '寂靜法衣', type: 'Support' },
    { id: "Spite", name: '惡源', type: 'Support' },
    { id: "Locket of the Iron Solari", name: '日輪的加冕', type: 'Support' },
    { id: "Moonstone Renewer", name: '月之石再生裝置', type: 'Support' },
    { id: "The Eternal Flame", name: '永恆之焰', type: 'Support' },
    { id: "Virtue of the Martyr", name: '烈士美德', type: 'Support' },
    { id: "Randuin's Omen", name: '蘭頓之兆', type: 'Support' },
    { id: "Zz'Rot Portal", name: '虛空之門', type: 'Support' },
    { id: "Zephyr", name: '西風匕首', type: 'Support' },
    { id: "Aegis of the Legion", name: '軍團聖盾', type: 'Support' },
    { id: "Needlessly Big Gem", name: '過大寶石', type: 'Support' },
    { id: "Zeke's Herald", name: '錫柯的號角', type: 'Support' },
    { id: "Knight's Vow", name: '騎士誓願', type: 'Support' },
    { id: "Obsidian Cleaver", name: '黑曜切割者', type: 'Support' },

    { id: "Guiding Hex", name: '引導靈咒', type: 'Synergy' },
    { id: "Ani-Mines", name: '百獸地雷', type: 'Synergy' },
    { id: "Searing Shortbow", name: '熔炎短弓', type: 'Synergy' },
    { id: "The Annihilator", name: '滅絕者', type: 'Synergy' },
    { id: "Final City Transit", name: '終城快車', type: 'Synergy' },
    { id: "Tornadoes", name: '龍捲風', type: 'Synergy' },
    { id: "Blade-o-rang", name: '迴力刃', type: 'Synergy' },
    { id: "Gating Bunny-Guns", name: '兔女郎格林槍', type: 'Synergy' },
    { id: "Surprise Supply Drop", name: '驚喜空投', type: 'Synergy' },
    { id: "UwU Blasters", name: 'UwU炮', type: 'Synergy' },
    { id: "Vortex Glove", name: '漩渦手套', type: 'Synergy' },
    { id: "Repulsor Lantern", name: '懸浮燈籠', type: 'Synergy' },
    { id: "Nullifier Lantern", name: '抵銷燈籠', type: 'Synergy' },
    { id: "Pulse Stabilizer", name: '脈衝穩定器', type: 'Synergy' },
    { id: "Pulse Silencer", name: '脈衝沈默者', type: 'Synergy' },
    { id: "Kingpin Hat", name: '黑街霸主帽子', type: 'Synergy' },
    { id: "Kingpin Hat R", name: '黑街霸主帽子', type: 'Synergy' },
    { id: "Corrupted Chassis", name: '破損機身', type: 'Synergy' },
    { id: "Harmonized Chassis", name: '協調機身', type: 'Synergy' },
    { id: "Hyper Fangs", name: '超頻利牙', type: 'Synergy' },
    { id: "Apex-Fangs", name: '頂尖利牙', type: 'Synergy' },
    { id: "Cybercoil", name: '賽博繩索', type: 'Synergy' },
    { id: "Hijacked Cybercoil", name: '被駭賽博繩索', type: 'Synergy' },
    { id: "Holobow", name: '全息弩弓', type: 'Synergy' },
    { id: "Scoped Holobow", name: '狙擊全息弩弓', type: 'Synergy' },
    { id: "Flux Capacitor", name: '湧動電容器', type: 'Synergy' },
    { id: "Fully-Charged Flux Capacitor", name: '滿電湧動電容器', type: 'Synergy' },

    { id: "Recurve Bow", name: '反曲弓', type: 'Component' },
    { id: "Tear of the Goddess", name: '女神之淚', type: 'Component' },
    { id: "Giant's Belt", name: '巨人腰帶', type: 'Component' },
    { id: "Needlessly Large Rod", name: '巨型魔棒', type: 'Component' },
    { id: "Frying Pan", name: '平底鍋', type: 'Component' },
    { id: "B.F Sword", name: '暴風之劍', type: 'Component' },
    { id: "Sparring Gloves", name: '格鬥手套', type: 'Component' },
    { id: "Negatron Cloak", name: '負極斗篷', type: 'Component' },
    { id: "Spatula", name: '鍋鏟', type: 'Component' },
    { id: "Chain Vest", name: '鎖子甲', type: 'Component' },
];

const augmentData = [
    { id: 'built_different', name: '與眾不同', tier: 1 },
    { id: 'cybernetic_shell', name: '電子外殼', tier: 1 },
    { id: 'jeweled_lotus', name: '寶石蓮花', tier: 2 },
    { id: 'thrill_of_hunt', name: '狩獵的快感', tier: 2 },
    { id: 'portable_forge', name: '攜帶式鍛造', tier: 3 },
    { id: 'triforce', name: '三相之力', tier: 3 },
];

// 當前選擇的標籤和過濾條件
let currentTab = 'champions';
let currentFilter = '';
let currentSearch = '';

// 棋盤上的棋子
const boardChampions = Array(28).fill(null);

// 特質計數
const traitCounter = {};

// DOM加載完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 生成六角形棋盤
    generateHexagonBoard();
    
    // 初始化標籤切換
    initTabSwitching();
    
    // 初始加載英雄數據
    loadGridItems('champions');
    
    // 初始化過濾按鈕
    updateFilterButtons('champions');
    
    // 初始化事件監聽器
    initEventListeners();
});


// 生成六角形棋盤
function generateHexagonBoard() {
    const board = document.getElementById('hexagon-board');
    board.innerHTML = '';
    
    for (let i = 0; i < 28; i++) {
        const hexagon = document.createElement('div');
        hexagon.className = 'hexagon';
        hexagon.dataset.index = i;
        
        // 添加點擊事件
        hexagon.addEventListener('click', function() {
            placeSelectedItem(i);
        });
        
        // 添加拖曳相關事件
        hexagon.addEventListener('dragover', function(event) {
            event.preventDefault(); // 允許拖曳到此元素上
            this.style.backgroundColor = '#3A3A4A'; // 提供視覺反饋
        });
        
        hexagon.addEventListener('dragleave', function() {
            this.style.backgroundColor = ''; // 恢復原始顏色
        });
        
        hexagon.addEventListener('drop', function(event) {
            event.preventDefault();
            this.style.backgroundColor = ''; // 恢復原始顏色
            
            try {
                const data = JSON.parse(event.dataTransfer.getData('application/json'));
                if (data && data.id) {
                    selectedItem = data.data;
                    selectedItemType = data.type;
                    placeSelectedItem(i);
                }
            } catch (error) {
                console.error('拖曳資料解析錯誤:', error);
            }
        });
        
        board.appendChild(hexagon);
    }
}
        
// 初始化標籤切換
function initTabSwitching() {
    const tabs = document.querySelectorAll('.menu-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentTab = this.dataset.tab;
            loadGridItems(currentTab);
            updateFilterButtons(currentTab);
            document.getElementById('search-input').placeholder = `搜尋${tabNameToChinese(currentTab)}`;
        });
    });
}

// 標籤名稱轉中文
function tabNameToChinese(tab) {
    const mapping = {
        'champions': '英雄',
        'items': '道具',
        'augments': '增幅裝置'
    };
    return mapping[tab] || tab;
}

// 根據當前標籤更新過濾按鈕
function updateFilterButtons(tab) {
    const filterContainer = document.getElementById('filter-buttons');
    filterContainer.innerHTML = '';
    
    let filters = [];
    if (tab === 'champions') {
        filters = ['一費', '二費', '三費', '四費', '五費'];
    } else if (tab === 'items') {
        filters = ['聖光', '神器', '核心', '特性徽章', '輔助', '羈絆', '組件'];
    } else if (tab === 'augments') {
        filters = ['銀級', '金級', '彩級'];
    }
    
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.className = 'filter-button';
        button.textContent = filter;
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            currentFilter = this.classList.contains('active') ? filter : '';
            loadGridItems(currentTab);
        });
        filterContainer.appendChild(button);
    });
}

// 初始化事件監聽器
function initEventListeners() {
    // 清除棋盤按鈕
    document.getElementById('clear-board').addEventListener('click', function() {
        clearBoard();
    });
    
    // 儲存圖像按鈕
    document.getElementById('save-image').addEventListener('click', function() {
        alert('儲存圖像功能將在完整版中實現');
    });
    
    // 搜尋框
    document.getElementById('search-input').addEventListener('input', function() {
        currentSearch = this.value.toLowerCase();
        loadGridItems(currentTab);
    });
    
    // 清除過濾按鈕
    document.getElementById('clear-filter').addEventListener('click', function() {
        document.querySelectorAll('.filter-button').forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById('search-input').value = '';
        currentFilter = '';
        currentSearch = '';
        loadGridItems(currentTab);
    });

    const boardContainer = document.querySelector('.board-container');
    boardContainer.addEventListener('dragenter', function(event) {
        event.preventDefault();
    });
    
    boardContainer.addEventListener('dragover', function(event) {
        event.preventDefault();
    });
}


// 載入網格項目函數
function loadGridItems(tab) {
    const grid = document.getElementById('items-grid');
    grid.innerHTML = '';
    
    // 改變容器樣式以適應水平分組
    grid.style.display = 'flex';
    grid.style.flexDirection = 'column';
    grid.style.gap = '20px';
    
    if (tab === 'champions') {
        if (currentFilter) {
            // 有篩選條件時，顯示符合條件的英雄
            let filteredChampions = [];
            if (currentFilter === '一費') filteredChampions = championData.filter(item => item.cost === 1);
            else if (currentFilter === '二費') filteredChampions = championData.filter(item => item.cost === 2);
            else if (currentFilter === '三費') filteredChampions = championData.filter(item => item.cost === 3);
            else if (currentFilter === '四費') filteredChampions = championData.filter(item => item.cost === 4);
            else if (currentFilter === '五費') filteredChampions = championData.filter(item => item.cost === 5);
            
            // 套用搜尋條件（如果有）
            if (currentSearch) {
                filteredChampions = filteredChampions.filter(item => 
                    item.name.toLowerCase().includes(currentSearch.toLowerCase()));
            }
            
            // 創建網格容器
            const championsRow = document.createElement('div');
            championsRow.className = 'champions-row';
            championsRow.style.display = 'grid';
            championsRow.style.gridTemplateColumns = 'repeat(auto-fill, minmax(55px, 1fr))';
            championsRow.style.gap = '10px';
            
            // 添加英雄
            filteredChampions.forEach(champion => {
                championsRow.appendChild(createChampionGridItem(champion));
            });
            
            grid.appendChild(championsRow);
        } else {
            // 無篩選條件時，按照 cost 分成五行
            for (let cost = 1; cost <= 5; cost++) {
                // 獲取當前費用的英雄
                const costChampions = championData.filter(champion => champion.cost === cost);
                
                // 套用搜尋條件（如果有）
                let filteredCostChampions = costChampions;
                if (currentSearch) {
                    filteredCostChampions = costChampions.filter(item => 
                        item.name.toLowerCase().includes(currentSearch.toLowerCase()));
                }
                
                // 如果該費用等級沒有英雄（或篩選後沒有），則跳過
                if (filteredCostChampions.length === 0) continue;
                
                // 創建費用標題
                const costHeader = document.createElement('div');
                costHeader.className = 'cost-header';
                costHeader.style.display = 'flex';
                costHeader.style.alignItems = 'center';
                costHeader.style.marginBottom = '8px';
                
                const costLabel = document.createElement('div');
                costLabel.textContent = `${cost} 費英雄`;
                costLabel.style.color = getCostColor(cost);
                costLabel.style.fontWeight = 'bold';
                costLabel.style.marginRight = '10px';
                costHeader.appendChild(costLabel);
                
                const costLine = document.createElement('div');
                costLine.style.flex = '1';
                costLine.style.height = '1px';
                costLine.style.backgroundColor = getCostColor(cost);
                costHeader.appendChild(costLine);
                
                grid.appendChild(costHeader);
                
                // 創建英雄行容器 - 修改為水平排列
                const championsRow = document.createElement('div');
                championsRow.className = 'champions-row';
                championsRow.style.display = 'grid';
                championsRow.style.gridTemplateColumns = 'repeat(auto-fill, minmax(55px, 1fr))';
                championsRow.style.gap = '10px';
                championsRow.style.marginBottom = '5px';
                
                // 添加英雄
                filteredCostChampions.forEach(champion => {
                    const item = createChampionGridItem(champion);
                    item.style.flexShrink = '0'; // 防止縮小
                    championsRow.appendChild(item);
                });
                
                grid.appendChild(championsRow);
            }
        }
    } else {
        // 恢復原始網格樣式
        grid.style.display = 'grid';
        grid.style.flexDirection = 'unset';
        
        let items = [];
        if (tab === 'items') {
            items = itemData;
            // 物品篩選邏輯
            if (currentFilter) {
                if (currentFilter === '組件') items = items.filter(item => item.type === 'Component');
                else if (currentFilter === '羈絆') items = items.filter(item => item.type === 'Synergy');
                else if (currentFilter === '輔助') items = items.filter(item => item.type === 'Support');
                else if (currentFilter === '特性徽章') items = items.filter(item => item.type === 'Emblem');
                else if (currentFilter === '聖光') items = items.filter(item => item.type === 'Radiant');
                else if (currentFilter === '神器') items = items.filter(item => item.type === 'Artifact');
                else if (currentFilter === '核心') items = items.filter(item => item.type === 'Core');
            }
        } else if (tab === 'augments') {
            items = augmentData;
            // 增幅篩選邏輯
            if (currentFilter) {
                if (currentFilter === '銀級') items = items.filter(item => item.tier === 1);
                else if (currentFilter === '金級') items = items.filter(item => item.tier === 2);
                else if (currentFilter === '彩級') items = items.filter(item => item.tier === 3);
            }
        }
        
        // 搜尋功能
        if (currentSearch) {
            items = items.filter(item => item.name.toLowerCase().includes(currentSearch.toLowerCase()));
        }
        
        // 創建網格項目
        items.forEach(item => {
            grid.appendChild(createItemGridItem(item, tab));
        });
    }
}

// 根據費用獲取顏色
function getCostColor(cost) {
    switch (cost) {
        case 1: return '#9E9E9E'; // 灰色 - 一費
        case 2: return '#7FC97F'; // 綠色 - 二費
        case 3: return '#386CB0'; // 藍色 - 三費
        case 4: return '#F0027F'; // 紫色 - 四費
        case 5: return '#FFD700'; // 金色 - 五費
        default: return '#FFFFFF';
    }
}

// 創建英雄網格項目的輔助函數
function createChampionGridItem(champion) {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.dataset.id = champion.id;
    
    const img = document.createElement('img');
    img.src = `images/champions/${champion.id}.png`;
    img.alt = champion.name;
    img.title = champion.name;
    
    // 錯誤處理
    img.onerror = function() {
        this.src = 'images/placeholder/40x40.png';
    };
    
    gridItem.appendChild(img);
    
    const name = document.createElement('div');
    name.className = 'item-name';
    name.textContent = champion.name;
    gridItem.appendChild(name);
    
    // 添加點擊事件
    gridItem.addEventListener('click', function() {
        selectItem(champion, 'champions');
    });
    
    return gridItem;
}

// 創建物品/增幅網格項目的輔助函數
let selectedItem = null;
let selectedItemType = null;

// 新增缺少的 selectItem 函數
function selectItem(item, type) {
    selectedItem = item;
    selectedItemType = type;
    console.log(`已選擇 ${type}: ${item.name}`);
}

// 修正 createItemGridItem 函數，避免重複定義
function createItemGridItem(item, type) {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.dataset.id = item.id;
    
    // 啟用拖曳功能
    gridItem.draggable = true;
    gridItem.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('application/json', JSON.stringify({
            id: item.id,
            type: type,
            data: item
        }));
        selectItem(item, type);
    });
    
    const img = document.createElement('img');
    if (type === 'items') {
        img.src = `images/items/${item.id}.png`;
    } else if (type === 'augments') {
        img.src = `images/augments/${item.id}.png`;
    }
    img.alt = item.name;
    img.title = item.name;
    
    img.onerror = function() {
        this.src = '/api/placeholder/40/40';
    };
    
    gridItem.appendChild(img);
    
    const name = document.createElement('div');
    name.className = 'item-name';
    name.textContent = item.name;
    gridItem.appendChild(name);
    
    // 添加點擊事件
    gridItem.addEventListener('click', function() {
        selectItem(item, type);
    });
    
    return gridItem;
}

function placeSelectedItem(index) {
    if (!selectedItem) return;
    
    const hexagons = document.querySelectorAll('.hexagon');
    const hexagon = hexagons[index];
    
    if (selectedItemType === 'champions') {
        // 如果是英雄，直接放置
        hexagon.innerHTML = '';
        const img = document.createElement('img');
        
        // 檢查是否有可用圖片
        if (isImageAvailable('champions', selectedItem.id)) {
            img.src = `images/champions/${selectedItem.id}.png`;
        } else {
            img.src = '/api/placeholder/40/40';
        }
        
        img.alt = selectedItem.name;
        img.title = selectedItem.name;
        
        // 設置錯誤處理函數
        img.onerror = function() {
            this.src = '/api/placeholder/40/40';
        };
        
        hexagon.appendChild(img);
        
        // 添加標籤顯示名稱
        const label = document.createElement('div');
        label.textContent = selectedItem.name;
        label.style.position = 'absolute';
        label.style.bottom = '0';
        label.style.left = '0';
        label.style.right = '0';
        label.style.textAlign = 'center';
        label.style.fontSize = '10px';
        label.style.backgroundColor = 'rgba(0,0,0,0.7)';
        label.style.color = 'white';
        label.style.padding = '2px 0';
        hexagon.appendChild(label);
        
        hexagon.classList.add('occupied');
        
        // 更新棋盤數據
        boardChampions[index] = selectedItem;
        
        // 更新特質顯示
        updateTraitDisplay();
    } else if (selectedItemType === 'items' && boardChampions[index]) {
        // 如果是道具且該位置有英雄，則為英雄添加道具
        alert(`為 ${boardChampions[index].name} 裝備了 ${selectedItem.name}`);
        
        // 這裡可以添加道具視覺效果的代碼
        // ...
    }
}

// 更新特質顯示
function updateTraitDisplay() {
    // 重置特質計數
    for (const trait of traitData) {
        traitCounter[trait.id] = 0;
    }
    
    // 計算新的特質數量
    boardChampions.forEach(champion => {
        if (champion) {
            champion.traits.forEach(traitName => {
                const trait = traitData.find(t => t.name === traitName);
                if (trait) {
                    traitCounter[trait.id] = (traitCounter[trait.id] || 0) + 1;
                }
            });
        }
    });
    
    // 更新特質顯示
    const traitsContainer = document.getElementById('traits-container');
    traitsContainer.innerHTML = '';
    
    for (const [traitId, count] of Object.entries(traitCounter)) {
        if (count > 0) {
            const trait = traitData.find(t => t.id === traitId);
            if (trait) {
                let tier = 0;
                for (let i = 0; i < trait.levels.length; i++) {
                    if (count >= trait.levels[i]) {
                        tier = i + 1;
                    } else {
                        break;
                    }
                }
                
                const tierClass = tier === 0 ? '' : (tier === 1 ? 'bronze' : (tier === 2 ? 'silver' : 'gold'));
                
                const traitBadge = document.createElement('div');
                traitBadge.className = `trait-badge ${tierClass}`;
                
                // 創建特質顏色指示器
                const colorIndicator = document.createElement('div');
                colorIndicator.style.width = '12px';
                colorIndicator.style.height = '12px';
                colorIndicator.style.borderRadius = '50%';
                colorIndicator.style.marginRight = '5px';
                colorIndicator.style.backgroundColor = getTierColor(tier);
                traitBadge.appendChild(colorIndicator);
                
                const traitText = document.createElement('span');
                traitText.textContent = `${trait.name} ${count}`;
                traitBadge.appendChild(traitText);
                
                traitsContainer.appendChild(traitBadge);
            }
        }
    }
    
    // 更新推薦區域
    updateRecommendations();
}

// 根據特質等級獲取顏色
function getTierColor(tier) {
    switch(tier) {
        case 1: return '#8C6F4C'; // 銅色
        case 2: return '#9DA8B0'; // 銀色
        case 3: return '#C89B3C'; // 金色
        case 4: return '#4EB8D5'; // 鉑金色
        default: return '#555555'; // 未激活
    }
}

// 更新推薦區域
function updateRecommendations() {
    // 這裡將來會放置實際的推薦算法
    // 現在只是模擬顯示一些推薦
    
    const coreContainer = document.getElementById('core-recommendations');
    coreContainer.innerHTML = '<p>基於您當前的陣容，推薦添加：</p>';
    
    // 找出當前陣容中最多的特質
    let maxTrait = null;
    let maxCount = 0;
    
    for (const [traitId, count] of Object.entries(traitCounter)) {
        if (count > maxCount) {
            maxCount = count;
            maxTrait = traitData.find(t => t.id === traitId);
        }
    }
    
    if (maxTrait) {
        const traitChampions = championData.filter(champion => 
            champion.traits.includes(maxTrait.name) && 
            !boardChampions.some(bc => bc && bc.id === champion.id)
        );
        
        if (traitChampions.length > 0) {
            const list = document.createElement('ul');
            list.style.marginTop = '10px';
            list.style.paddingLeft = '20px';
            
            traitChampions.slice(0, 3).forEach(champion => {
                const item = document.createElement('li');
                item.textContent = champion.name;
                list.appendChild(item);
            });
            
            coreContainer.appendChild(list);
        }
    }
    
    // 更新增幅推薦
    const augmentContainer = document.getElementById('augment-recommendations');
    augmentContainer.innerHTML = '<p>推薦增幅選項：</p>';
    
    const list = document.createElement('ul');
    list.style.marginTop = '10px';
    list.style.paddingLeft = '20px';
    
    augmentData.slice(0, 3).forEach(augment => {
        const item = document.createElement('li');
        item.textContent = `${augment.name} (${augment.tier}級)`;
        list.appendChild(item);
    });
    
    augmentContainer.appendChild(list);
}

// 清除棋盤
function clearBoard() {
    const hexagons = document.querySelectorAll('.hexagon');
    hexagons.forEach(hexagon => {
        hexagon.innerHTML = '';
        hexagon.classList.remove('occupied');
    });
    
    // 重置棋盤數據
    for (let i = 0; i < boardChampions.length; i++) {
        boardChampions[i] = null;
    }
    
    // 更新特質顯示
    updateTraitDisplay();
}