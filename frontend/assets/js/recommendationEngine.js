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
        'Innervating Locket', "Luden's Tempest", 'Hullcrusher', 'Forbidden Idol', 'Mittens', 'Rapid Firecannon', 'Horizon Focus',"Gambler's Blade",

        'Protector\'s Vow','Bramble Vest','Statikk Shiv',"Sterak's Gage","Bloodthirster","Evenshroud","Steadfast Heart",
        "Edge of Night","Archangel's Staff","Warmog's Armor","Jeweled Gauntlet","Giant Slayer","Sunfire Cape",
        "Last Whisper","Tactician's Shield","Tactician's Cape","Tactician's Crown","Hand Of Justice","Rabadon's Deathcap",
        "Deathblade","Quicksilver","Titan's Resolve","Hextech Gunblade","Infinity Edge","CrownGuard","Gargoyle Stoneplate",
        "Guardbreaker","Thief's Gloves","Spear of Shojin","Red buff","Nashor's Tooth","Runaan's Hurricane","Redemption",
        'Blue buff','Adaptive Helm', "Lonic Spark", "Guinsoo's Rageblade", 'Morellonomicon', "Dragon's Claw",
    

        'Anima Squad Emblem','Bastion Emblem','BoomBot Emblem','Ctpher Emblem','Cyberboss Emblem','Divinicorp Emblem',
        'Dynamo Emblem','Exotech Emblem','Golden Ox Emblem','Marksman Emblem','Nitro Emblem','Overlord Emblem',
        'Rapidfire Emblem','Slayer Emblem','Stree Demon Emblem','Techie Emblem','Vanguar Emblem','Virus Emblem',
        "Vanguard Emblem",'Strategist Emblem','Cypher Emblem', "Syndicate Emblem", 'Executioner Emblem', 'Bruiser Emblem', 'Street Demon Emblem',

        'Aegis of the Legion','Banshee\'s Veil', 'Chalice of Power', 'Knight\'s Vow', 'Locket of the Iron Solari',
        'Moonstone Renewer', 'Needlessly Big Gem', 'Obsidian Cleaver', 'Randuin\'s Omen', 'Shroud of Stillness',
        'Spite', 'The Eternal Flame', 'Unstable Treasure Chest', 'Virtue of the Martyr', 'Zephyr','Zz\'Rot Portal',
        'Zeke\'s Herald',"Shround of Stillness",
        
        'Guiding Hex', 'Ani-Mines', 'Searning Shortbow', 'The Annihilator', 'Final City Transit', 'Tornadoes',
        "Blade-o-rang", "Gating Bunny-Guns", "Surprise Supply Drop", "UwU Blasters", "Vortex Glove", "Repulsor Lantern",
        "Nullifier Lantern", "Pulse Stabilizer", "Pulse Silencer", "Kingpin Hat", "Kingpin Hat R", "Corrupted Chassis",
        "Harmonized Chassis", "Hyper Fangs", "Apex-Fangs", "Cybercoil", "Hijacked Cybercoil", "Holobow", "Scoped Holobow",
        "Flux Capacitor", "Fully-Charged Flux Capacitor","Searing Shortbow",

        "Recurve Bow", "Tear of the Goddess", "Giant's Belt", "Needlessly Large Rod", "Frying Pan", "B.F Sword",
        "Sparring Gloves", "Negatron Cloak", "Spatula", "Chain Vest",
    ],
    traits: [],
    augments: [
        'Ones Twos Three', 'One Two Five!', 'Find Your Center', 'Teaming Up I', 'Eye For An Eye', 'Eye For An Eye+', 
        'Health is Wealth I', 'Lunch Money', 'Bulky Buddies I', 'Diversified Portfolio', 'Diversified Portfolio+', 
        "Caretaker's Ally", 'Placebo', 'Placebo+', 'Fine Vintage', 'Lategame Specialist', 'Mentorship I', 'Missed Connections', 
        'Titanic Titan', 'Delayed Start', 'Team Building', 'Kingslayer', 'One For All I', 'Spoils of War I', 'Called Shot', 
        'Rolling For Days I', 'Bachup', 'Climb The Ladder I', 'Branching Out', 'Branching Out+', 'Table Scraps', 'Good For Something I', 
        "Pandora's Bench", "Pandora's Items", 'Latent Forge', 'Cease and Desist', 'Wolf Unchained', 'Button Mash', 'Glass Cannon I', 
        'Survivor', 'Band of Thieves I', 'Crafted Crafting', 'Component Buffet', 'Patience is a Virtue', 'Corrosion', 
        'Young and Wild and Free', 'Superstars I', 'Pumping Up I', 'Firesale', 'Support Mining', 'Support Mining+', 
        'Over Encumbered', 'Item Collector I', 'Item Grab Bag I', 'Adaptive Strikes', 'Blistering Strikes', 'Recombobulator', 
        'Restart Mission', 'Silver Spoon', 'Dummify', 'Iron Assets', 'Lineuo', 'Risky Moves', 'ManaFlow I', 'Rigged Shop+',

        'Trifecta I', 'No Scout No Pivot', 'Category Five', 'Teaming Up II', 'Not Today', 'Scapegoat', 'Bad Luvk Protection', 'a', 'b', 'c', 'd',
        'Vanguard Crest', 'e', 'f', 'g', 'h', 'Reactive Shell', 'Alter Ego', 'Vampiric Vitality', 'i', 'j', 'k', 'l', 'm', 'Bastion Crest', 'n', 
        'Bulky Buddies II','Big Grab Bag', 'Raining Gold', 'Raining Gold+', "Caretaker's Favor", 'o', 'p', 'Little Buddies', 'q', 'r', 's', 't', 
        'u', 'v', 'Liquidate', 'Tagging Spree','One For All II', 'w', 'x', 'y', 'Techie Crest', 'z', 'Spare Parts', 'aa', 'ab', 'ac', 'ad', 'ae', 
        'af', 'Gold For Dummies', '10,000 IQ', 'ag', 'ah', 'ai','aj', 'Cybernetic Implants II', 'Slayer Crest', 'Wandering Trainer I', 'ak', 'al', 
        'am', 'an', 'Blazing Soul I', 'ao' ,'ap', 'aq', 'ar', 'as', 'Anima Squad Crest','at', 'au', 'av', 'Slammin', 'Slammin+', 'Divine Ascension', 
        'Divine Crest', 'aw', 'ax', 'ay', 'az', 'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'bg', 'bh', 'bi','Lethal Rerouting', 'bj', 'bk', 'bl', 'bm', 'bn', 
        'The Chug Bug', 'The Chug Bug+', 'bo', 'bp', 'bq', 'Keep Your Friends Close', 'br', 'bs', 'bt', 'bu','Cyberdesk', 'bv', 'bw', 'Overclocked', 
        'Overheal', 'bx', 'by', 'bz', 'Rapidfire Crest', 'ca', 'cb', 'Golden Ox Crest', 'cc', 'cd', 'Two Trick', 'ce','Capacitor', 'cf', 'cg', 'ch', 
        'BRB', 'ci', 'cj', 'ck', 'cl', 'cm', 'A Magic Roll', 'All That Shinmmers', 'All That Shinmmers+' ,'Golden Fleece','Golden Fleece+',

        'cn', 'co', 'cp', 'cq', 'cr', 'cs', 'ct', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'da', 'db', 'dc', 'dd', 'de', 'df', 'dg', 'dh', 'di', 'dj', 'dk', 
        'dl', 'dm', 'dn', 'do', 'dp', 'dq', 'dr', 'ds', 'dt', 'du', 'dv', 'dw', 'dx', 'dy', 'dz', 'ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'eg', 'eh', 'ei', 
        'ej', 'ek', 'el', 'em', 'en', 'eo', 'ep', 'eq', 'er', 'es', 'et', 'eu', 'ev', 'ew', 'ex', 'ey', 'ez', 'fa', 'fb', 'fc', 'fd', 'fe', 'ff', 'fg', 
        'fh', 'fi', 'fj', 'fk', 'fl', 'fm', 'fn', 'fo', 'fp', 'fq', 'fr', 'fs', 'ft', 'fu', 'fv', 'fw', 'fx', 'fy', 'fz', 'ga', 'gb', 'gc', 'gd', 'ge', 
        'gf', 'gg', 'gh', 'gi', 'gj', 'gk', 'gl', 'gm', 'gn', 'go', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gv', 'gw', 'gx', 'gy', 'gz', 'ha', 'hb', 'hc', 
        'hd', 'he', 'hf', 'hg',
    ]
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
    { id: 'Fist of Fairness', name: '公理拳套', type: 'Radiant', stats: ['critChance +40%', 'abilityPower +15'], description: '攻擊和技能為攜帶者提供相當於實際傷害值35%的治療效果。' },
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
    
    { id: "Protector's Vow", name: '保衛者之誓', type: 'Core', stats: ['physicalDefense +20', 'abilityPower +30'], description: '每場戰鬥一次：40%生命時，獲得一個25%最大生命的護盾，持續5秒，並獲得20物理與20魔法防禦。' },
    { id: 'Bramble Vest', name: '刺藤胸甲', type: 'Core', stats: ['physicalDefense +65'], description: '增加7%最大生命。承受的普攻傷害降低8%。被普攻命中時，對所有鄰近敵軍造成100魔法傷害。冷卻時間：2秒' },
    { id: 'Statikk Shiv', name: '史提克彈簧刀', type: 'Core', stats: ['magicAttack +15', 'attackSpeed +15%', 'abilityPower +15'], description: '每3次普攻會對4名敵軍造成35魔法傷害並削抗30%，持續5秒。削抗：減少魔法防禦' },
    { id: "Sterak's Gage", name: '史特拉克手套', type: 'Core', stats: ['physicalAttack +15%', 'health +150'], description: '每場戰鬥一次，生命60%時，獲得25%最大生命與35%物理攻擊。' },
    { id: "Bloodthirster", name: '嗜血者', type: 'Core', stats: ['physicalAttack +15%', 'magicAttack +15', 'magicDefense +20'], description: '每場戰鬥一次：生命掉到40%時，獲得等同於25%最大生命的護盾，最多持續5秒。' },
    { id: "Evenshroud", name: '均等法衣', type: 'Core', stats: ['health +150', 'magicDefense +20'], description: '在2.0格內的敵軍受到30%破甲。戰鬥開始後15秒內，增加25物理防禦與魔法防禦。破甲：降低物理防禦' },
    { id: "Steadfast Heart", name: '堅定之心', type: 'Core', stats: ['physicalDefense +20', 'critChance +20%', 'health +150'], description: '獲得8%續戰力。生命在50%以上時，改為獲得15%續戰力。' },
    { id: "Edge of Night", name: '夜色緣界', type: 'Core', stats: ['physicalAttack +10%', 'physicalDefense +20'], description: '每場戰鬥一次：生命60%時，短暫進入無法指定狀態，並移除負面效果。之後，增加15%額外攻速。' },
    { id: "Archangel's Staff", name: '大天使之杖', type: 'Core', stats: ['magicAttack +20', 'abilityPower +15'], description: '戰鬥開始：戰鬥中每5秒獲得30魔法攻擊。' },
    { id: "Warmog's Armor", name: '好戰者鎧甲', type: 'Core', stats: ['health +600'], description: '獲得12%最大生命。' },
    { id: "Jeweled Gauntlet", name: '寶石手套', type: 'Core', stats: ['magicAttack +35', 'critChance +35%'], description: '技能可以暴擊。若裝備者的技能本來就可暴擊，則改為增加10%暴擊傷害。' },
    { id: 'Giant Slayer', name: '巨人殺手', type: 'Core', stats: ['physicalAttack +25%', 'abilityPower +15', 'attackSpeed +10%'], description: '攻擊高於1750最大生命的敵軍時，獲得20%額外傷害增幅。' },
    { id: "Sunfire Cape", name: '日炎斗篷', type: 'Core', stats: ['physicalDefense +20', 'health +150'], description: '增加8%最大生命。每2.0秒，對2.0格內的敵軍造成1%燃燒與33%重創效果，持續10.0秒。燃燒：每秒對目標造成等同於其最大生命一定百分比的真實傷害。重創：降低獲得的治療效果' },
    { id: "Last Whisper", name: '最後耳語', type: 'Core', stats: ['physicalAttack +15%', 'attackSpeed +20%', 'critChance +20%'], description: '物理傷害會對目標造成30%破甲，持續3.0秒。此效果無法累加。破甲：降低物理防禦' },
    { id: "Tactician's Shield", name: '棋手之盾', type: 'Core', description: '我方最大隊伍規模+1.0。裝備者死亡時有10%機率掉落1金錢。' },
    { id: "Tactician's Cape", name: '棋手披風', type: 'Core', description: '我方最大隊伍規模+1.0。戰鬥開始10.0秒後有10%機率掉落1金錢。' },
    { id: "Tactician's Crown", name: '棋手皇冠', type: 'Core', description: '我方最大隊伍規模+1.0。贏得戰鬥時有10%機率掉落1金錢。' },
    { id: 'Hand Of Justice', name: '正義手套', type: 'Core', stats: ['critChance +20%', 'abilityPower +15'], description: '獲得2項效果：- 15%物理攻擊與15.0魔法攻擊。- 12%全能吸血。生命在0.5%以上時，物理攻擊以及魔法攻擊的加成翻倍。生命低於0.5%時，全能吸血的加成翻倍' },
    { id: "Rabadon's Deathcap", name: '死亡之帽', type: 'Core', stats: ['magicAttack +50'], description: '這頂小小的帽子能夠助你創造或毀滅世界。' },
    { id: 'Deathblade', name: '死神之刃', type: 'Core', stats: ['physicalAttack +55%'], description: '持有者將擁有永恆的安寧——敵對者也是。' },
    { id: "Quicksilver", name: '水銀兜帽', type: 'Core', stats: ['critChance +20%', 'attackSpeed +30%', 'magicDefense +20'], description: '戰鬥開始：免疫控制效果，持續18.0秒。在此期間，每2.0秒增加03%攻速。' },
    { id: "Titan's Resolve", name: '泰坦的決意', type: 'Core' , stats: ['attackSpeed +10%', 'physicalDefense +20'], description: '普攻或承受傷害時，獲得2%物理與2.0魔法攻擊，最多可累加25.0層。滿層時，獲得20.0物理防禦與20.0魔法防禦' },
    { id: 'Hextech Gunblade', name: '海克斯科技槍刃', type: 'Core', stats: ['physicalAttack +10%', 'magicAttack +20'], description: '治療生命比例最低的友軍，治療量等同於0.25%傷害量。' },
    { id: 'Infinity Edge', name: '無盡之刃', type: 'Core', stats: ['physicalAttack +35%', 'critChance +35%'], description: '技能可以暴擊。若裝備者的技能本來就可暴擊，則改為增加10%暴擊傷害。' },
    { id: 'CrownGuard', name: '皇冠守衛', type: 'Core', stats: ['magicAttack +20', 'physicalDefense +20', 'health +100'], description: '戰鬥開始：獲得可吸收最大生命25%傷害的護盾，持續8.0秒。護盾消失時，增加25.0魔法攻擊。' },
    { id: 'Gargoyle Stoneplate', name: '石像鬼磐核', type: 'Core', stats: ['physicalDefense +25', 'health +100', 'magicDefense +25'], description: '每有一位敵軍以裝備者為目標，便獲得10.0物理與10.0魔法防禦。' },
    { id: 'Guardbreaker', name: '破防者', type: 'Core', stats: ['critChance +20%', 'magicAttack +10', 'health +150', 'attackSpeed +20%'], description: '對護盾造成傷害後，獲得15%額外傷害增幅，持續3.0秒。' },
    { id: "Thief's Gloves", name: '竊賊手套', type: 'Core', stats: ['critChance +20%', 'health +150'], description: '每個回合：裝備2件隨機道具。' },
    { id: 'Spear of Shojin', name: '精進之矛', type: 'Core', stats: ['physicalAttack +15%', 'abilityPower +15', 'magicAttack +15'], description: '物理攻擊賦予5.0額外魔力。' },
    { id: 'Red buff', name: '紅Buff', type: 'Core', stats: ['attackSpeed +35%'], description: '普攻與技能會對敵軍造成1%燃燒與33%重創，持續5.0秒。燃燒：每秒造成目標一定比例最大生命的真實傷害。重創：降低獲得的治療效果' },
    { id: "Nashor's Tooth", name: '納什之牙', type: 'Core', stats: ['magicAttack +10', 'attackSpeed +10%', 'health +150'], description: '施放技能後，增加60%攻速，持續5.0秒。' },
    { id: "Runaan's Hurricane", name: '芮蘭颶風箭', type: 'Core', stats: ['physicalAttack +25%', 'attackSpeed +10%', 'magicDefense +20'], description: '普攻向另一名附近的敵軍發射分裂箭，造成60%物理攻擊AD的物理傷害。'  },
    { id: 'Redemption', name: '贖罪神石', type: 'Core', stats: ['health +150', 'abilityPower +15'], description: '每5.0秒治療1格內的友軍15%已損失的生命，同時獲得10%續戰力(無法累加)，持續5.0秒。' },
    { id: 'Blue buff', name: '遠古魔像增益', type: 'Core', stats: ['magicAttack +15', 'abilityPower +30', 'physicalAttack +15%'], description: '施放技能後獲得10.0魔力。裝備者參與擊殺後，可額外造成5%傷害，持續8.0秒。' },
    { id: 'Adaptive Helm', name: '適性神盔', type: 'Core', stats: ['magicAttack +10', 'abilityPower +15', 'magicDefense +25'], description: '戰鬥開始：根據起始位置獲得不同加成。前兩排：40.0物理與魔法防禦。被普攻命中時獲得1.0魔力。後兩排：15.0魔法攻擊。每3.0秒獲得10.0魔力。' },
    { id: "Lonic Spark", name: '離子星火', type: 'Core', stats: ['magicAttack +15', 'health +150', 'magicDefense +25'], description: '2.0格內的敵軍受到30%削抗。每當敵軍施放技能，造成等同於160%其消耗魔力的魔法傷害。削抗：減少魔法防禦' },
    { id: "Guinsoo's Rageblade", name: '鬼索狂暴之刃', type: 'Core' , stats: ['magicAttack +10', 'attackSpeed +10%'], description: '每次普攻可增加5%可累加的攻速。' },
    { id: 'Morellonomicon', name: '黑魔禁書', type: 'Core', stats: ['magicAttack +25', 'attackSpeed +10%', 'health +150'], description: '普攻與技能會對敵軍造成1%燃燒與33%重創效果，持續10.0秒。燃燒：每秒造成目標一定比例最大生命的真實傷害。重創：降低獲得的治療效果' },
    { id: "Dragon's Claw", name: '龍之爪', type: 'Core', stats: ['magicDefense +75'], description: '增加9%最大生命。每2.0秒回復2.5%最大生命。' },

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
    { id: 'Ones Twos Three', name: '一、二、三', tier: 1 },
    { id: 'One Two Five!', name: '一、二、五！', tier: 1 },
    { id: 'Find Your Center', name: '中堅自強', tier: 1 },
    { id: 'Teaming Up I', name: '人多好辦事', tier: 1 },
    { id: 'Eye For An Eye', name: '以眼還眼', tier: 1 },
    { id: 'Eye For An Eye+', name: '以眼還眼+', tier: 1 },
    { id: 'Health is Wealth I', name: '健康即是財富', tier: 1 },
    { id: 'Lunch Money', name: '午餐錢', tier: 1 },
    { id: 'Bulky Buddies I', name: '壯碩夥伴 I', tier: 1 },
    { id: 'Diversified Portfolio', name: '多元投資組合', tier: 1 },
    { id: 'Diversified Portfolio+', name: '多元投資組合+', tier: 1 },
    { id: "Caretaker's Ally", name: '守望者之友', tier: 1 },
    { id: 'Placebo', name: '安慰劑', tier: 1 },
    { id: 'Placebo+', name: '安慰劑+', tier: 1 },
    { id: 'Fine Vintage', name: '寶貝古董', tier: 1 },
    { id: 'Lategame Specialist', name: '專打後期', tier: 1 },
    { id: 'Mentorship I', name: '導師 I', tier: 1 },
    { id: 'Missed Connections', name: '就差你一個', tier: 1 },
    { id: 'Titanic Titan', name: '巨型泰坦', tier: 1 },
    { id: 'Delayed Start', name: '延遲開始', tier: 1 },
    { id: 'Team Building', name: '建立團隊', tier: 1 },
    { id: 'Kingslayer', name: '弒君之道', tier: 1 },
    { id: 'One For All I', name: '我為人人 I', tier: 1 },
    { id: 'Spoils of War I', name: '戰爭紅利 I', tier: 1 },
    { id: 'Called Shot', name: '打擊宣言', tier: 1 },
    { id: 'Rolling For Days I', name: '抽好抽滿 I', tier: 1 },
    { id: 'Bachup', name: '援軍', tier: 1 },
    { id: 'Climb The Ladder I', name: '攀升之階 I', tier: 1 },
    { id: 'Branching Out', name: '斜槓英雄', tier: 1 },
    { id: 'Branching Out+', name: '斜槓英雄+', tier: 1 },
    { id: 'Table Scraps', name: '檯面殘渣', tier: 1 },
    { id: 'Good For Something I', name: '死得有價值 I', tier: 1 },
    { id: "Pandora's Bench", name: '潘朵拉的備戰區', tier: 1 },
    { id: "Pandora's Items", name: '潘朵拉的道具', tier: 1 },
    { id: 'Latent Forge', name: '潛在火爐', tier: 1 },
    { id: 'Cease and Desist', name: '火瀑連擊', tier: 1 },
    { id: 'Wolf Unchained', name: '無縛獨狼', tier: 1 },
    { id: 'Button Mash', name: '狂亂猛砸', tier: 1 },
    { id: 'Glass Cannon I', name: '玻璃大砲 I', tier: 1 },
    { id: 'Survivor', name: '生存專家', tier: 1 },
    { id: 'Band of Thieves I', name: '神偷集團 I', tier: 1 },
    { id: 'Crafted Crafting', name: '精心製作', tier: 1 },
    { id: 'Component Buffet', name: '組件自助餐', tier: 1 },
    { id: 'Patience is a Virtue', name: '耐心是美德', tier: 1 },
    { id: 'Corrosion', name: '腐蝕', tier: 1 },
    { id: 'Young and Wild and Free', name: '自由奔放', tier: 1 },
    { id: 'Superstars I', name: '超級巨星 I', tier: 1 },
    { id: 'Pumping Up I', name: '越戰越勇 I', tier: 1 },
    { id: 'Firesale', name: '跳樓大拍賣', tier: 1 },
    { id: 'Support Mining', name: '輔助採礦', tier: 1 },
    { id: 'Support Mining+', name: '輔助採礦+', tier: 1 },
    { id: 'Over Encumbered', name: '過重負擔', tier: 1 },
    { id: 'Item Collector I', name: '道具收藏家 I', tier: 1 },
    { id: 'Item Grab Bag I', name: '道具組合包 I', tier: 1 },
    { id: 'Adaptive Strikes', name: '適性打擊', tier: 1 },
    { id: 'Blistering Strikes', name: '酷熱打擊', tier: 1 },
    { id: 'Recombobulator', name: '重整裝置', tier: 1 },
    { id: 'Restart Mission', name: '重新開始任務', tier: 1 },
    { id: 'Silver Spoon', name: '金湯匙', tier: 1 },
    { id: 'Dummify', name: '鈍化', tier: 1 },
    { id: 'Iron Assets', name: '鋼鐵素材', tier: 1 },
    { id: 'Lineuo', name: '陣容', tier: 1 },
    { id: 'Risky Moves', name: '高風險高報酬', tier: 1 },
    { id: 'ManaFlow I', name: '魔力流動 I', tier: 1 },
    { id: 'Rigged Shop+', name: '黑箱商店+', tier: 1 },

    { id: 'Trifecta I', name: '三連勝 I', tier: 2 },
    { id: 'No Scout No Pivot', name: '不偵查不換陣容', tier: 2 },
    { id: 'Category Five', name: '五級颶風', tier: 2 },
    { id: 'Teaming Up II', name: '人多好辦事', tier: 2 },
    { id: 'Not Today', name: '今非死期', tier: 2 },
    { id: 'Scapegoat', name: '代罪羔羊', tier: 2 },
    { id: 'Bad Luvk Protection', name: '保底機制', tier: 2 },
    { id: 'a', name: '值得等待', tier: 2 },
    { id: 'b', name: '健康即是財富 II', tier: 2 },
    { id: 'c', name: '備品零件', tier: 2 },
    { id: 'd', name: '債值爆棚', tier: 2 },
    { id: 'Vanguard Crest', name: '先鋒戰士之紋', tier: 2 },
    { id: 'e', name: '刃馬合一', tier: 2 },
    { id: 'f', name: '刷新計分板', tier: 2 },
    { id: 'g', name: '助攻碑文', tier: 2 },
    { id: 'h', name: '化為魔像', tier: 2 },
    { id: 'Reactive Shell', name: '反應殼盾', tier: 2 },
    { id: 'Alter Ego', name: '另我人格', tier: 2 },
    { id: 'Vampiric Vitality', name: '吸血活力', tier: 2 },
    { id: 'i', name: '嚴守皇冠', tier: 2 },
    { id: 'j', name: '四個一組', tier: 2 },
    { id: 'k', name: '四重援軍', tier: 2 },
    { id: 'l', name: '回收再利用', tier: 2 },
    { id: 'm', name: '回收再利用+', tier: 2 },
    { id: 'Bastion Crest', name: '堡壘之紋', tier: 2 },
    { id: 'n', name: '塔防', tier: 2 },
    { id: 'Bulky Buddies II', name: '壯碩夥伴', tier: 2 },
    { id: 'Big Grab Bag', name: '大禮包', tier: 2 },
    { id: 'Raining Gold', name: '天降金幣', tier: 2 },
    { id: 'Raining Gold+', name: '天降金幣+', tier: 2 },
    { id: "Caretaker's Favor", name: '守望者眷顧', tier: 2 },
    { id: 'o', name: '射手之紋', tier: 2 },
    { id: 'p', name: '導師 II', tier: 2 },
    { id: 'Little Buddies', name: '小小夥伴', tier: 2 },
    { id: 'q', name: '弱者，顫抖吧！', tier: 2 },
    { id: 'r', name: '強化骨骼', tier: 2 },
    { id: 's', name: '心電靜止', tier: 2 },
    { id: 't', name: '思緒清晰', tier: 2 },
    { id: 'u', name: '思緒雜亂', tier: 2 },
    { id: 'v', name: '惡性經營', tier: 2 },
    { id: 'Liquidate', name: '惡意收購', tier: 2 },
    { id: 'Tagging Spree', name: '我標我標我標標標', tier: 2 },
    { id: 'One For All II', name: '我為人人 II', tier: 2 },
    { id: 'w', name: '戰爭紅利 II', tier: 2 },
    { id: 'x', name: '戰略軍師之紋', tier: 2 },
    { id: 'y', name: '戰錘意志', tier: 2 },
    { id: 'Techie Crest', name: '技師之紋', tier: 2 },
    { id: 'z', name: '投資策略 I', tier: 2 },
    { id: 'Spare Parts', name: '拋光鉻', tier: 2 },
    { id: 'aa', name: '拳擊選手', tier: 2 },
    { id: 'ab', name: '拾荒者', tier: 2 },
    { id: 'ac', name: '持槍假人', tier: 2 },
    { id: 'ad', name: '攀升之階 II', tier: 2 },
    { id: 'ae', name: '攜帶型打鐵鋪', tier: 2 },
    { id: 'af', name: '支援尖塔', tier: 2 },
    { id: 'Gold For Dummies', name: '散財假人', tier: 2 },
    { id: '10,000 IQ', name: '智商10,000', tier: 2 },
    { id: 'ag', name: '月光', tier: 2 },
    { id: 'ah', name: '末日機器之紋', tier: 2 },
    { id: 'ai', name: '棘刺盔甲', tier: 2 },
    { id: 'aj', name: '極限之紋', tier: 2 },
    { id: 'Cybernetic Implants II', name: '模控機械', tier: 2 },
    { id: 'Slayer Crest', name: '殺戮者之紋', tier: 2 },
    { id: 'Wandering Trainer I', name: '流浪假人 I', tier: 2 },
    { id: 'ak', name: '清算', tier: 2 },
    { id: 'al', name: '潘朵拉的道具 II', tier: 2 },
    { id: 'am', name: '烏龍商店', tier: 2 },
    { id: 'an', name: '烹飪鍋', tier: 2 },
    { id: 'Blazing Soul I', name: '熾熱靈魂 I', tier: 2 },
    { id: 'ao', name: '特性追蹤器', tier: 2 },
    { id: 'ap', name: '獵殺導彈', tier: 2 },
    { id: 'aq', name: '玻璃大砲 II', tier: 2 },
    { id: 'ar', name: '發條加速器', tier: 2 },
    { id: 'as', name: '發電機之紋', tier: 2 },
    { id: 'Anima Squad Crest', name: '百獸之紋', tier: 2 },
    { id: 'at', name: '皇冠意志', tier: 2 },
    { id: 'au', name: '盜取', tier: 2 },
    { id: 'av', name: '盜蓋者 I', tier: 2 },
    { id: 'Slammin', name: '砸起來', tier: 2 },
    { id: 'Slammin+', name: '砸起來+', tier: 2 },
    { id: 'Divine Ascension', name: '神諭之梯', tier: 2 },
    { id: 'Divine Crest', name: '神諭之紋', tier: 2 },
    { id: 'aw', name: '移情', tier: 2 },
    { id: 'ax', name: '究極升級', tier: 2 },
    { id: 'ay', name: '穿刺蓮花 I', tier: 2 },
    { id: 'az', name: '竊賊', tier: 2 },
    { id: 'ba', name: '紀元', tier: 2 },
    { id: 'bb', name: '紀元+', tier: 2 },
    { id: 'bc', name: '終火狂', tier: 2 },
    { id: 'bd', name: '繁星夜空', tier: 2 },
    { id: 'be', name: '繁星夜空+', tier: 2 },
    { id: 'bf', name: '罪惡之紋', tier: 2 },
    { id: 'bg', name: '耐心學習', tier: 2 },
    { id: 'bh', name: '自毀裝置', tier: 2 },
    { id: 'bi', name: '自由發揮', tier: 2 },
    { id: 'Lethal Rerouting', name: '致命重導', tier: 2 },
    { id: 'bj', name: '英雄禮包', tier: 2 },
    { id: 'bk', name: '英雄禮包+', tier: 2 },
    { id: 'bl', name: '英雄禮包++', tier: 2 },
    { id: 'bm', name: '董事會', tier: 2 },
    { id: 'bn', name: '處刑者之紋', tier: 2 },
    { id: 'The Chug Bug', name: '蟲蟲暢飲', tier: 2 },
    { id: 'The Chug Bug+', name: '蟲蟲暢飲+', tier: 2 },
    { id: 'bo', name: '蠻勇之紋', tier: 2 },
    { id: 'bp', name: '複製', tier: 2 },
    { id: 'bq', name: '複製設施', tier: 2 },
    { id: 'Keep Your Friends Close', name: '親近朋友', tier: 2 },
    { id: 'br', name: '記憶銀行', tier: 2 },
    { id: 'bs', name: '試營運', tier: 2 },
    { id: 'bt', name: '認知植入', tier: 2 },
    { id: 'bu', name: '貿易大亨', tier: 2 },
    { id: 'Cyberdesk', name: '賽博平台', tier: 2 },
    { id: 'bv', name: '超前部署', tier: 2 },
    { id: 'bw', name: '超級巨星 II', tier: 2 },
    { id: 'Overclocked', name: '超載', tier: 2 },
    { id: 'Overheal', name: '超量治癒', tier: 2 },
    { id: 'bx', name: '越戰越勇 II', tier: 2 },
    { id: 'by', name: '越戰越強', tier: 2 },
    { id: 'bz', name: '輔助藏寶箱', tier: 2 },
    { id: 'Rapidfire Crest', name: '速射之紋', tier: 2 },
    { id: 'ca', name: '道具收藏家 II', tier: 2 },
    { id: 'cb', name: '遠親如近鄰', tier: 2 },
    { id: 'Golden Ox Crest', name: '金牛之紋', tier: 2 },
    { id: 'cc', name: '鋼級之命 I', tier: 2 },
    { id: 'cd', name: '長矛意志', tier: 2 },
    { id: 'Two Trick', name: '雙戲法', tier: 2 },
    { id: 'ce', name: '雙排', tier: 2 },
    { id: 'Capacitor', name: '電容器', tier: 2 },
    { id: 'cf', name: '電晶體', tier: 2 },
    { id: 'cg', name: '靈魂連結', tier: 2 },
    { id: 'ch', name: '饜足術士', tier: 2 },
    { id: 'BRB', name: '馬上回來', tier: 2 },
    { id: 'ci', name: '高分新紀錄', tier: 2 },
    { id: 'cj', name: '高貴犧牲', tier: 2 },
    { id: 'ck', name: '高速殺戮', tier: 2 },
    { id: 'cl', name: '高電壓', tier: 2 },
    { id: 'cm', name: '魔力流動 II', tier: 2 },
    { id: 'A Magic Roll', name: '魔法擲骰', tier: 2 },
    { id: 'All That Shinmmers', name: '鱗光四射', tier: 2 },
    { id: 'All That Shinmmers+', name: '鱗光四射+', tier: 2 },
    { id: 'Golden Fleece', name: '黃金羊毛', tier: 2 },
    { id: 'Golden Fleece+', name: '黃金羊毛+', tier: 2 },

    { id: 'cn', name: '一個Buff，兩個Buff', tier: 3 },
    { id: 'co', name: '三連勝 II', tier: 3 },
    { id: 'cp', name: '不穩定的進化', tier: 3 },
    { id: 'cq', name: '值得等待 II', tier: 3 },
    { id: 'cr', name: '先鋒戰士之冠', tier: 3 },
    { id: 'cs', name: '先鋒戰士之環', tier: 3 },
    { id: 'ct', name: '公理弧刃 III', tier: 3 },
    { id: 'cu', name: '共享光采', tier: 3 },
    { id: 'cv', name: '刀劍湧流', tier: 3 },
    { id: 'cw', name: '加冕', tier: 3 },
    { id: 'cx', name: '勝者發財', tier: 3 },
    { id: 'cy', name: '升級！', tier: 3 },
    { id: 'cz', name: '只買高檔貨 II', tier: 3 },
    { id: 'da', name: '召喚虛靈', tier: 3 },
    { id: 'db', name: '向上流動', tier: 3 },
    { id: 'dc', name: '吸取精華', tier: 3 },
    { id: 'dd', name: '地底寶藏 III', tier: 3 },
    { id: 'de', name: '堡壘之冠', tier: 3 },
    { id: 'df', name: '堡壘之環', tier: 3 },
    { id: 'dg', name: '壯碩夥伴 III', tier: 3 },
    { id: 'dh', name: '好運手套', tier: 3 },
    { id: 'di', name: '好運手套+', tier: 3 },
    { id: 'dj', name: '守望者之選', tier: 3 },
    { id: 'dk', name: '射手之冠', tier: 3 },
    { id: 'dl', name: '射手之環', tier: 3 },
    { id: 'dm', name: '山寨版', tier: 3 },
    { id: 'dn', name: '巨獸決意', tier: 3 },
    { id: 'do', name: '巨獸決意+', tier: 3 },
    { id: 'dp', name: '強力投入', tier: 3 },
    { id: 'dq', name: '微光龍鱗精粹', tier: 3 },
    { id: 'dr', name: '快刷快想', tier: 3 },
    { id: 'ds', name: '快拳連打', tier: 3 },
    { id: 'dt', name: '情緒管理', tier: 3 },
    { id: 'du', name: '戰爭紅利 III', tier: 3 },
    { id: 'dv', name: '戰略軍師之冠', tier: 3 },
    { id: 'dw', name: '戰略軍師之環', tier: 3 },
    { id: 'dx', name: '技師之冠', tier: 3 },
    { id: 'dy', name: '技師之環', tier: 3 },
    { id: 'dz', name: '投資+', tier: 3 },
    { id: 'ea', name: '投資++', tier: 3 },
    { id: 'eb', name: '投資策略 II', tier: 3 },
    { id: 'ec', name: '擲骰子', tier: 3 },
    { id: 'ed', name: '最大上限', tier: 3 },
    { id: 'ee', name: '最終庫存', tier: 3 },
    { id: 'ef', name: '末日機器之冠', tier: 3 },
    { id: 'eg', name: '末日機器之環', tier: 3 },
    { id: 'eh', name: '棋手廚房', tier: 3 },
    { id: 'ei', name: '極限之冠', tier: 3 },
    { id: 'ej', name: '極限之環', tier: 3 },
    { id: 'ek', name: '模控機械移植 III', tier: 3 },
    { id: 'el', name: '殺戮者之冠', tier: 3 },
    { id: 'em', name: '殺戮者之環', tier: 3 },
    { id: 'en', name: '泰坦之武', tier: 3 },
    { id: 'eo', name: '洞燭先機 II', tier: 3 },
    { id: 'ep', name: '活到老學到老', tier: 3 },
    { id: 'eq', name: '活火爐', tier: 3 },
    { id: 'er', name: '流浪假人 II', tier: 3 },
    { id: 'es', name: '海賊王', tier: 3 },
    { id: 'et', name: '混沌召喚', tier: 3 },
    { id: 'eu', name: '渾身是勁 III', tier: 3 },
    { id: 'ev', name: '潘朵拉的道具 III', tier: 3 },
    { id: 'ew', name: '炫目神速', tier: 3 },
    { id: 'ex', name: '無可動搖', tier: 3 },
    { id: 'ey', name: '無盡軍勢', tier: 3 },
    { id: 'ez', name: '無盡軍勢+', tier: 3 },
    { id: 'fa', name: '燃熱靈魂 II', tier: 3 },
    { id: 'fb', name: '狙擊武器 II', tier: 3 },
    { id: 'fc', name: '現在我是主力', tier: 3 },
    { id: 'fd', name: '生化過載', tier: 3 },
    { id: 'fe', name: '生日禮物', tier: 3 },
    { id: 'ff', name: '畫龍點睛', tier: 3 },
    { id: 'fg', name: '發電機之冠', tier: 3 },
    { id: 'fh', name: '發電機之環', tier: 3 },
    { id: 'fi', name: '百獸之冠', tier: 3 },
    { id: 'fj', name: '百獸之環', tier: 3 },
    { id: 'fk', name: '皎潔月光', tier: 3 },
    { id: 'fl', name: '盜墓者 II', tier: 3 },
    { id: 'fm', name: '盧登回音 III', tier: 3 },
    { id: 'fn', name: '神諭之冠', tier: 3 },
    { id: 'fo', name: '神諭之環', tier: 3 },
    { id: 'fp', name: '稜鏡票券', tier: 3 },
    { id: 'fq', name: '稜鏡管道', tier: 3 },
    { id: 'fr', name: '穿刺蓮花 II', tier: 3 },
    { id: 'fs', name: '精打細算', tier: 3 },
    { id: 'ft', name: '精算強化', tier: 3 },
    { id: 'fu', name: '罪惡之冠', tier: 3 },
    { id: 'fv', name: '罪惡之環', tier: 3 },
    { id: 'fw', name: '聖光重構', tier: 3 },
    { id: 'fx', name: '聖物抉擇', tier: 3 },
    { id: 'fy', name: '腰帶多多', tier: 3 },
    { id: 'fz', name: '處刑者之冠', tier: 3 },
    { id: 'ga', name: '處刑者之環', tier: 3 },
    { id: 'gb', name: '虧機星期五', tier: 3 },
    { id: 'gc', name: '虧機星期五+', tier: 3 },
    { id: 'gd', name: '蠻勇之冠', tier: 3 },
    { id: 'ge', name: '蠻勇之環', tier: 3 },
    { id: 'gf', name: '街頭狂魔之冠', tier: 3 },
    { id: 'gg', name: '街頭狂魔之環', tier: 3 },
    { id: 'gh', name: '訂閱服務', tier: 3 },
    { id: 'gi', name: '詛咒之冠', tier: 3 },
    { id: 'gj', name: '買不手軟', tier: 3 },
    { id: 'gk', name: '質大於量', tier: 3 },
    { id: 'gl', name: '越戰越勇 III', tier: 3 },
    { id: 'gm', name: '迷你小英雄', tier: 3 },
    { id: 'gn', name: '迷你小英雄+', tier: 3 },
    { id: 'go', name: '速射之冠', tier: 3 },
    { id: 'gp', name: '速射之環', tier: 3 },
    { id: 'gq', name: '避險基金', tier: 3 },
    { id: 'gr', name: '金牛之冠', tier: 3 },
    { id: 'gs', name: '金牛之環', tier: 3 },
    { id: 'gt', name: '銅級之命 II', tier: 3 },
    { id: 'gu', name: '鏡之廳', tier: 3 },
    { id: 'gv', name: '長久之計', tier: 3 },
    { id: 'gw', name: '開局新手包 I', tier: 3 },
    { id: 'gx', name: '陽壽局', tier: 3 },
    { id: 'gy', name: '雙胞胎 III', tier: 3 },
    { id: 'gz', name: '雙重目的', tier: 3 },
    { id: 'ha', name: '雙重空投物資', tier: 3 },
    { id: 'hb', name: '電擊療法', tier: 3 },
    { id: 'hc', name: '電擊療法+', tier: 3 },
    { id: 'hd', name: '靈活變通', tier: 3 },
    { id: 'he', name: '非凡冒險', tier: 3 },
    { id: 'hf', name: '預料中的意外', tier: 3 },
    { id: 'hg', name: '魔杖湧流', tier: 3 }
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
    img.src = isImageAvailable('champions', champion.id) ? `images/champions/${champion.id}.png` : '/api/placeholder/40/40';
    img.alt = champion.name;
    img.title = champion.name;
    
    gridItem.appendChild(img);
    
    const name = document.createElement('div');
    name.className = 'item-name';
    name.textContent = champion.name;
    gridItem.appendChild(name);
    
    // 添加點擊事件
    gridItem.addEventListener('click', function() {
        selectItem(champion, 'champions');
    });
    
    // 添加滑鼠懸停事件
    gridItem.addEventListener('mouseenter', function(event) {
        showTooltip(event, champion, 'champions');
    });
    
    gridItem.addEventListener('mouseleave', function() {
        hideTooltip();
    });
    
    return gridItem;
}

// 修改 createItemGridItem 函數，添加滑鼠懸停事件
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
        // 修改圖片路徑處理
        img.src = isImageAvailable('items', item.id) ? `images/items/${item.id}.png` : '/api/placeholder/40/40';
    } else if (type === 'augments') {
        img.src = isImageAvailable('augments', item.id) ? `images/augments/${item.id}.png` : '/api/placeholder/40/40';
    }
    img.alt = item.name;
    img.title = item.name;

    // 確保錯誤處理使用絕對路徑
    img.onerror = function() {
        this.src = '/api/placeholder/40/40';
        this.onerror = null; // 防止無限循環
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
    
    // 添加滑鼠懸停事件
    gridItem.addEventListener('mouseenter', function(event) {
        showTooltip(event, item, type);
    });
    
    gridItem.addEventListener('mouseleave', function() {
        hideTooltip();
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

// 提示框相關函數
const tooltip = document.getElementById('tooltip');
let tooltipTimeout;

// 設置提示框內容和顯示位置
function showTooltip(event, item, type) {
    // 清除任何可能的懸停延遲
    if (tooltipTimeout) clearTimeout(tooltipTimeout);
    
    const tooltipIcon = tooltip.querySelector('.tooltip-icon');
    const tooltipTitle = tooltip.querySelector('.tooltip-title');
    const tooltipCost = tooltip.querySelector('.tooltip-cost');
    const tooltipTraits = tooltip.querySelector('.tooltip-traits');
    const tooltipStats = tooltip.querySelector('.tooltip-stats');
    const tooltipAbility = tooltip.querySelector('.tooltip-ability');
    const tooltipDescription = tooltip.querySelector('.tooltip-description');
    
    // 重置提示框內容
    tooltipTraits.innerHTML = '';
    tooltipStats.innerHTML = '';
    tooltipAbility.innerHTML = '';
    tooltipDescription.innerHTML = '';
    
    // 設置通用資訊
    tooltipTitle.textContent = item.name;
    
    // 根據類型設置不同的內容
    if (type === 'champions') {
        // 設置英雄圖示
        tooltipIcon.src = isImageAvailable('champions', item.id) 
            ? `images/champions/${item.id}.png` 
            : '/api/placeholder/40/40';
        tooltipIcon.alt = item.name;
        
        // 設置英雄費用
        tooltipCost.textContent = `${item.cost} 費`;
        tooltipCost.style.color = getCostColor(item.cost);
        
        // 設置英雄特質
        item.traits.forEach(trait => {
            const traitElem = document.createElement('div');
            traitElem.className = 'tooltip-trait';
            traitElem.textContent = trait;
            tooltipTraits.appendChild(traitElem);
        });
        
    } else if (type === 'items') {
        // 設置物品圖示
        tooltipIcon.src = isImageAvailable('items', item.id) 
            ? `images/items/${item.id}.png` 
            : '/api/placeholder/40/40';
        tooltipIcon.alt = item.name;
        
        // 設置物品類型
        tooltipCost.textContent = item.type;
        switch(item.type) {
            case 'Radiant': tooltipCost.style.color = '#FFD700'; break;
            case 'Artifact': tooltipCost.style.color = '#FF4500'; break;
            case 'Core': tooltipCost.style.color = '#1E90FF'; break;
            case 'Component': tooltipCost.style.color = '#FFFFFF'; break;
            case 'Emblem': tooltipCost.style.color = '#9932CC'; break;
            default: tooltipCost.style.color = '#90EE90'; break;
        }
        
        // 顯示物品屬性加成
        if (item.stats && Array.isArray(item.stats)) {
            item.stats.forEach(stat => {
                const statElem = document.createElement('div');
                statElem.className = 'tooltip-stat';
                statElem.textContent = stat;
                tooltipStats.appendChild(statElem);
            });
        }
        
        // 物品功能描述
        if (item.description) {
            tooltipDescription.textContent = item.description;
        } else {
            tooltipDescription.textContent = `${item.name}是一件${item.type}類型的裝備。`;
        }
        
    } else if (type === 'augments') {
        // 設置增幅圖示
        tooltipIcon.src = isImageAvailable('augments', item.id) 
            ? `images/augments/${item.id}.png` 
            : '/api/placeholder/40/40';
        tooltipIcon.alt = item.name;
        
        // 設置增幅等級
        let tierText = '';
        let tierColor = '';
        switch(item.tier) {
            case 1: tierText = '銀級'; tierColor = '#C0C0C0'; break;
            case 2: tierText = '金級'; tierColor = '#FFD700'; break;
            case 3: tierText = '彩級'; tierColor = '#FF1493'; break;
        }
        tooltipCost.textContent = tierText;
        tooltipCost.style.color = tierColor;
        
        // 增幅描述
        if (item.description) {
            tooltipDescription.textContent = item.description;
        } else {
            tooltipDescription.textContent = `${item.name}是一個${tierText}增幅裝置，可在對戰中提供特殊效果。`;
        }
    }
    
    // 設置提示框位置
    const x = event.clientX + 15;
    const y = event.clientY + 15;
    
    // 確保提示框不會超出視窗邊界
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let finalX = x;
    let finalY = y;
    
    if (x + tooltipRect.width > viewportWidth) {
        finalX = x - tooltipRect.width - 15;
    }
    
    if (y + tooltipRect.height > viewportHeight) {
        finalY = y - tooltipRect.height - 15;
    }
    
    tooltip.style.left = `${finalX}px`;
    tooltip.style.top = `${finalY}px`;
    tooltip.style.display = 'block';
}

// 隱藏提示框
function hideTooltip() {
    tooltipTimeout = setTimeout(() => {
        tooltip.style.display = 'none';
    }, 100); // 略微延遲以實現更平滑的過渡
}

// 獲取物品的屬性加成
function getItemStats(item) {
    if (item.stats) {
        return item.stats;
    }
    
    // 如果沒有定義屬性，則返回預設值
    return {
        physicalAttack: 0,
        magicAttack: 0,
        attackSpeed: 0,
        abilityPower: 0,
        physicalDefense: 0,
        magicDefense: 0,
        health: 0,
        critChance: 0
    };
}

function getItemDescription(item) {
    return item.description || `${item.name}是一件${item.type}類型的裝備。`;
}

// 獲取物品的功能描述
function getItemDescription(item) {
    // 這是一個示例函數，應該根據實際的物品數據來實現
    // 在實際使用中，描述應該定義在物品數據中
    
    switch(item.id) {
        case 'Infinity Edge':
            return '增加暴擊傷害50%，並提高暴擊率。普通攻擊有25%機率造成175%傷害。';
        case "Rabadon's Deathcap":
            return '增加40%法術強度。';
        case "Warmog's Armor":
            return '每秒恢復2%最大生命值。';
        case 'Bloodthirster':
            return '攻擊會恢復33%傷害的生命值。落到30%生命值以下時，獲得一個持續4秒的護盾。';
        case 'Statikk Shiv':
            return '每第三次攻擊會發射一道鏈狀閃電，對3個敵人造成70魔法傷害，並減少敵人40%魔法抗性5秒。';
        case "Dragon's Claw":
            return '增加魔法抗性，並在戰鬥開始時獲得一個吸收400魔法傷害的護盾。';
        case 'Titan\'s Resolve':
            return '每次被擊中或攻擊時，獲得2%攻擊和2%法術強度，最多堆疊25次。滿層時，增加25點護甲和魔抗。';
        default:
            return `${item.name}是一件${item.type}類型的裝備，提供獨特的戰鬥能力。裝備在英雄身上可以增強其能力，並且某些裝備組合可以產生更強大的效果。`;
    }
}

// 獲取增幅的描述
function getAugmentDescription(item) {
    // 示例函數，實際應該從增幅數據中獲取
    switch(item.id) {
        case 'Ones Twos Three':
            return '在每個玩家階段開始時，獲得1個1費單位、1個2費單位和1個3費單位。';
        case 'One Two Five!':
            return '在每個玩家階段開始時，獲得1個1費單位、1個2費單位和1個5費單位。';
        case 'Find Your Center':
            return '你的英雄們獲得10%生命值和5%攻擊力。';
        default:
            return `${item.name}是一個${item.tier === 1 ? '銀級' : item.tier === 2 ? '金級' : '彩級'}增幅裝置，提供強大的戰鬥加成或特殊效果，幫助你在對戰中取得優勢。`;
    }
}

// 隱藏提示框
function hideTooltip() {
    tooltipTimeout = setTimeout(() => {
        tooltip.style.display = 'none';
    }, 100); // 略微延遲以實現更平滑的過渡
}