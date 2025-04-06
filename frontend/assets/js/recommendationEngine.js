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

    traits: [
        'Vanguar', 'Techie', 'Slayer', 'Rapidfire', 'Bastion', 'Divinicorp', 'Nitro', 'Anima Squad', 'Stree Demon', 'A.M.P.', 'Marksman', 
        'BoomBot', 'Exotech', 'Dynamo', 'Ctpher', 'Syndicate', 'Cyberboss', 'Golden Ox', 'Executioner', 'Strategist', 'Bruiser', 'Soul Killer', 
        'Overlord', 'God of the Net', 'Virus', 
    ],

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
        'Forced Dropout', 'Juggernaut I', 'Geared Up I', 'Healing Orb I', 'Standing United I',

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
        'Last Stand', 'Geared Up II', 'Cybernetic Uplink II', 'Cybernetic Transplant II', 'Healing Orb II', 'Private Funds', 'Calculated Loss', 'Ascension', 

        'cn', 'co', 'cp', 'cq', 'cr', 'cs', 'ct', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'da', 'db', 'dc', 'dd', 'de', 'df', 'dg', 'dh', 'di', 'dj', 'dk', 
        'dl', 'dm', 'dn', 'do', 'dp', 'dq', 'dr', 'ds', 'dt', 'du', 'dv', 'dw', 'dx', 'dy', 'dz', 'ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'eg', 'eh', 'ei', 
        'ej', 'ek', 'el', 'em', 'en', 'eo', 'ep', 'eq', 'er', 'es', 'et', 'eu', 'ev', 'ew', 'ex', 'ey', 'ez', 'fa', 'fb', 'fc', 'fd', 'fe', 'ff', 'fg', 
        'fh', 'fi', 'fj', 'fk', 'fl', 'fm', 'fn', 'fo', 'fp', 'fq', 'fr', 'fs', 'ft', 'fu', 'fv', 'fw', 'fx', 'fy', 'fz', 'ga', 'gb', 'gc', 'gd', 'ge', 
        'gf', 'gg', 'gh', 'gi', 'gj', 'gk', 'gl', 'gm', 'gn', 'go', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gv', 'gw', 'gx', 'gy', 'gz', 'ha', 'hb', 'hc', 
        'hd', 'he', 'hf', 'hg', 'hi', 'hj', 'hk',
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
    { id: 'Crest of Cinders', name: '力量的餘燼', type: 'Radiant', stats: ['attackSpeed +60%', 'damageAmp +10%'], description: '普攻和技能對敵人造成2% 燃燒和33%重創效果，持續5秒。燃燒：每秒對目標造成等同於其最大生命1%的真實傷害，重創：降低獲得的治療效果' },

    { id: "Jak'sho the Protean", name: '千變萬化之賈克修', type: 'Radiant', stats: ['magicAttack +25', 'abilityPower +15', 'magicDefense +30'], description: '戰鬥開始：根據起始位置獲得不同加成。前兩排：60物理與魔法防禦，被普攻命中時獲得2魔力。後兩排：40魔法攻擊，每3秒獲得20魔力。' },

    { id: "Statikk's Favor", name: '史提克的善行', type: 'Radiant', stats: ['attackSpeed +20%', 'magicAttack +50', 'abilityPower +15'], description: '每3次普攻會對8名敵軍造成95魔法傷害並削抗30%，持續5秒。削抗：減少魔法防禦' },

    { id: "Sterak's Megashield", name: '史特拉克超級護盾', type: 'Radiant', stats: ['physicalAttack +30%', 'health +400'], description: '每場戰鬥一次，生命60%時，獲得40%最大生命與60%物理攻擊。' },

    { id: "Bulwark's Oath", name: '堡壘之誓約', type: 'Radiant', stats: ['abilityPower +30', 'physicalDefense +40'], description: '每場戰鬥一次：40%生命時，獲得一個50%最大生命的護盾，持續10秒，並獲得60物理與50魔法防禦。' },

    { id: "Warmog's Pride", name: '好站者驕傲', type: 'Radiant', stats: ['health +1000'], description: '獲得20%最大生命。每秒回復1.5%最大生命。' },

    { id: 'Dvarapala Stoneplate', name: '守門天磐核', type: 'Radiant', stats: ['physicalDefense +50', 'magicDefense +50', 'health +250'], description: '每有一位敵軍以裝備者為目標，便獲得15物防與15魔防。此外，每秒回復1.5%最大生命。' },

    { id: 'Equinox', name: '寂靜星河', type: 'Radiant', stats: ['magicDefense +30', 'health +500'], description: '在3格內的敵軍受到30%破甲。戰鬥開始後20秒內，增加70物理防禦與魔法防禦。破甲：降低物防' },

    { id: 'Zenith Edge', name: '巔峰之刃', type: 'Radiant', stats: ['physicalAttack +70%', 'critChance +75%'], description: '技能可以暴擊。若裝備者的技能本來就可暴擊，則改為增加10%暴擊傷害。' },

    { id: 'Legacy of the Colossus', name: '巨像之遺物', type: 'Radiant', stats: ['physicalDefense +40', 'health +500', 'critChance +20%'], description: '獲得16%額戰力。生命在40%以上時，改為獲得30%額戰力。' },

    { id: "The Baron's Gift", name: '巴龍的賜福', type: 'Radiant', stats: ['attackSpeed +20%', 'magicAttack +30', 'health +200'], description: '施放技能後，增加120%攻速，持續8秒。' },

    { id: 'Spear of Hirana', name: '希安那之矛', type: 'Radiant', stats: ['physicalAttack +35%', 'magicAttack +35', 'abilityPower +20'], description: '物理攻擊賦予10額外魔力。' },

    { id: "Rascal's Gloves", name: '搗蛋鬼手套', type: 'Radiant', stats: ['health +150', 'critChance +20%'], description: '每個回合：裝備2件隨機星光道具。[需消耗3個裝備格]' },

    { id: 'Sunlight Cape', name: '日光斗篷', type: 'Radiant', stats: ['physicalDefense +40', 'health +300'], description: '獲得12%最大生命。每1.5秒，對3格內的敵軍造成2%燃燒與33%重創效果，持續8秒。[唯一：每一名英雄僅限1件]' },

    { id: 'Quickestsilver', name: '極致水銀', type: 'Radiant', stats: ['attackSpeed +50%', 'magicDefense +30', 'critChance +40%'], description: '戰鬥開始：免疫控制效果，持續45秒。在18秒期間，每2秒增加7%攻速。[唯一：每一名英雄僅限1件]' },

    { id: 'More More-ellonomicon', name: '極黑魔禁書', type: 'Radiant', stats: ['attackSpeed +25%', 'magicAttack +50', 'health +150'], description: '普攻與技能會對敵軍造成2%燃燒與33%重創效果，持續8秒。[唯一：每一名英雄僅限1件]' },

    { id: 'Eternal Whisper', name: '永恆耳語', type: 'Radiant', stats: ['physicalAttack +45%', 'attackSpeed +25%', 'critChance +55%'], description: '物理傷害會對目標造成30%破甲，直到戰鬥結束。此效果無法疊加。[唯一：每一名英雄僅限1件]' },

    { id: "Titan's Vow", name: '泰坦的誓言', type: 'Radiant', stats: ['attackSpeed +30%', 'physicalDefense +35'], description: '普攻或承受傷害時，獲得3%物理與3魔法攻擊，最多可累加25層。滿層時，獲得50物理與50魔法防禦。' },

    { id: 'Hextech Lifeblade', name: '海克斯科技命刃', type: 'Radiant', stats: ['physicalAttack +40%', 'magicAttack +40', 'omnivamp +30%'], description: '治療生命比例最低的友軍，治療量等同於40%傷害量。' },

    { id: 'Demonslayer', name: '滅鬼之刃', type: 'Radiant', stats: ['physicalAttack +50%', 'attackSpeed +10%', 'magicAttack +50', 'damageAmp +20%'], description: '攻擊高於1750最大生命的敵軍時，獲得30%額外傷害增幅。' },

    { id: 'Rosethorn Vest', name: '玫瑰刺藤胸甲', type: 'Radiant', stats: ['physicalDefense +100'], description: '增加15%最大生命。承受的普攻傷害降低25%。被普攻命中時，對所有鄰近敵軍造成175魔法傷害。冷卻時間：2秒' },

    { id: 'Royal Crownshield', name: '皇家冠盾', type: 'Radiant', stats: ['magicAttack +40', 'physicalDefense +40', 'health +200'], description: '戰鬥開始：獲得可吸收最大生命50%傷害的護盾，持續8秒。護盾消失時，增加50魔法攻擊。' },

    { id: 'Willbreaker', name: '破志者', type: 'Radiant', stats: ['attackSpeed +30%', 'magicAttack +30', 'health +150', 'critChance +20%', 'damageAmp +20%'], description: '對敵軍造成傷害後，獲得30%額外傷害增幅，持續3秒。' },

    { id: 'Blessed Bloodthirster', name: '神聖嗜血者', type: 'Radiant', stats: ['physicalAttack +40%', 'magicAttack +40', 'magicDefense +20', 'omnivamp +40%'], description: '每場戰鬥一次：生命掉到40%時，獲得等同於40%最大生命的護盾，最多持續5秒。' },

    { id: 'Blue Blessing', name: '神聖遠古魔像增益', type: 'Radiant', stats: ['physicalAttack +60%', 'magicAttack +60', 'abilityPower +30'], description: '施放技能後獲得10魔力。裝備者參與擊殺後，可額外造成20%傷害，持續12秒。[唯一：每一名英雄僅限1件]' },

    { id: 'Luminous Deathblade', name: '聖光神聖之刃', type: 'Radiant', stats: ['physicalAttack +105%', 'damageAmp +20%'], description: '在敵人、朋友，以及任何生物附近時都會發光，真心不騙。' },

    { id: "Runaan's Tempest", name: '芮蘭驟雨箭', type: 'Radiant', stats: ['physicalAttack +50%', 'attackSpeed +20%', 'magicDefense +20'], description: '普攻向另一名附近的敵軍發射分裂箭，造成110%物理攻擊的物理傷害。' },

    { id: 'Absolution', name: '赦罪神石', type: 'Radiant', stats: ['abilityPower +15', 'health +400'], description: '每5秒治療2格內的友軍25%已損失的生命，同時獲得10%額戰力(無法疊加)，持續5秒。' },

    { id: "Urf-Angel's Staff", name: '阿福天使之杖', type: 'Radiant', stats: ['magicAttack +60', 'abilityPower +15'], description: '戰鬥開始：戰鬥中每4秒獲得40魔法攻擊。' },

    { id: "Rabadon's Ascended Deathcap", name: '飛昇死亡之帽', type: 'Radiant', stats: ['magicAttack +80', 'damageAmp +50%'], description: '奇蹟和災難同時被見證，也同時被釋放。' },

    { id: "Guinsoo's Reckoning", name: '鬼索的審判之刃', type: 'Radiant', stats: ['attackSpeed +20%', 'magicAttack +10'], description: '每次普攻增加10%可疊加的攻速。' },

    { id: 'Glamorous Gauntlet', name: '魅力手套', type: 'Radiant', stats: ['magicAttack +70', 'critChance +75%'], description: '技能可以暴擊。若裝備者的技能本來就可暴擊，則改為增加10%暴擊傷害。' },

    { id: 'Brink of Dawn', name: '黎明邊際', type: 'Radiant', stats: ['physicalAttack +30%', 'physicalDefense +30'], description: '每場戰鬥一次：生命60%時，短暫進入無法指定狀態，並移除負面效果。之後，回復100%已損失的生命，並增加85%額外攻速。[唯一：每一名英雄僅限1件]' },

    { id: "Dragon's Will", name: '龍之志', type: 'Radiant', stats: ['magicDefense +115'], description: '增加15%最大生命。每2秒回復10%最大生命。' },
    
    { id: "Zhonya's Paradox", name: '中婭悖論之鐘', type: 'Artifact', stats: ['magicAttack +40', 'physicalDefense +30', 'magicDefense +30'], description: '每場戰鬥一次: 在40%生命時，進入免疫傷害狀態且無法被指定，持續3秒。[唯一：每一名英雄僅限1件]' },

    { id: 'Lightshield Crest', name: '光盾之紋', type: 'Artifact', stats: ['physicalDefense +55', 'magicDefense +55'], description: '每3秒，賦予生命比例最低的友軍護盾，護盾量相當於裝備者物理防禦與魔法防禦總和的70%，持續5秒。陣亡時賦予所有友軍此護盾。' },

    { id: 'Deathfire Grasp', name: '冥火之擁', type: 'Artifact', stats: ['magicAttack +30', 'abilityPower +15', 'damageAmp +25%'], description: '戰鬥開始時：鎖定目標，造成等同於其最大生命40%的魔法傷害。每13秒重複一次。' },

    { id: "Suspicious Trench Coat", name: '可疑風衣', type: 'Artifact', stats: ['attackSpeed +15%', 'health +100'], description: '每場戰鬥一次，裝備者生命掉到66%時，便會一分為三，每個分身的生命為最大生命的25%。[唯一：每一名英雄僅限1件]' },

    { id: "Sniper's Focus", name: '屏息狙擊', type: 'Artifact', stats: ['physicalAttack +15%', 'attackSpeed +15%', 'magicAttack +15'], description: '增加2攻擊距離。裝備者與目標之間每隔1格，獲得對目標的9%傷害增幅。' },

    { id: "Lich Bane", name: '巫妖之禍', type: 'Artifact', stats: ['attackSpeed +30%', 'magicAttack +30'], description: '每次施放技能後，裝備者的首次普攻會造成200 / 270 / 340 / 410 / 480額外魔法傷害。傷害量會根據階段增加。' },

    { id: "Fishbones", name: '惡鯊火箭', type: 'Artifact', stats: ['physicalAttack +20%', 'attackSpeed +50%'], description: '裝備者的攻擊距離加倍，且每次普攻都會以一名隨機敵軍為目標。' },

    { id: "Seeker's Armguard", name: '探索者護腕', type: 'Artifact', stats: ['magicAttack +30', 'physicalDefense +30', 'magicDefense +30'], description: '參與擊殺會使裝備者的物理防禦、魔法防禦和魔法攻擊增加15，若取得擊殺則增加20。' },

    { id: 'Innervating Locket', name: '支配寶匣', type: 'Artifact', stats: ['abilityPower +15', 'health +150'], description: '受到普攻時，裝備者會獲得相當於總魔力2%的魔力。每次施放會在3秒內回復裝備者20%最大生命。' },

    { id: 'Talisman Of Ascension', name: '昇華護符', type: 'Artifact', stats: ['physicalAttack +20%', 'magicAttack +20', 'health +300'], description: '22秒後，增加100%最大生命，且獲得120%傷害增幅，持續到戰鬥結束。' },

    { id: "Wit's End", name: '智慧末刃', type: 'Artifact', stats: ['attackSpeed +30%', 'magicDefense +30'], description: '普攻造成42/60/75/90/100額外魔法傷害。為裝備者回復相當於所造成魔法傷害35%的生命。傷害加成隨階段增加。' },

    { id: 'Blighting Jewel', name: '枯萎寶石', type: 'Artifact', stats: ['magicAttack +40', 'abilityPower +15'], description: '造成魔法傷害會降低目標4魔法防禦。若其魔法防禦為0，則改為賦予裝備者5魔力。' },

    { id: "Mogul's Mail", name: '權貴之甲', type: 'Artifact', stats: ['health +100'], description: '受到傷害時，增加1物防、1魔防及7生命，最多累加35層。滿層時，獲得💰1金錢，且每隔8秒獲得💰1金錢。[唯一：每一名英雄僅限1件]' },

    { id: "Trickster's Glass", name: '欺瞞水晶', type: 'Artifact', stats: ['attackSpeed +10%', 'physicalDefense +10', 'magicDefense +10', 'critChance +15%'], description: '召喚1個擁有額外70%基礎生命與+10%最大魔力的分身，分身無法裝備道具。分身可受益於特性效果。[唯一：每一名英雄僅限1件]' },

    { id: "Death's Defiance", name: '死亡之蔑', type: 'Artifact', stats: ['physicalAttack +10%', 'attackSpeed +25%', 'physicalDefense +30', 'omnivamp +25%'], description: '裝備者承受的50%傷害會改為在4秒內持續的非致命傷害。[唯一：每一名英雄僅限1件]' },

    { id: "Prowler's Claw", name: '潛行者之爪', type: 'Artifact', stats: ['physicalAttack +40%', 'health +200', 'critChance +50%'], description: '擊殺目標後，移除負面效果並在4格內最遠的目標處刺刺。接下來2次攻擊會造成60%額外暴擊傷害。' },

    { id: 'Infinity Force', name: '無盡之力', type: 'Artifact', stats: ['physicalAttack +25%', 'attackSpeed +25%', 'magicAttack +25', 'abilityPower +25', 'physicalDefense +25', 'magicDefense +25', 'health +250'], description: '不管什麼都來很多！' },

    { id: 'Unending Despair', name: '無盡絕望', type: 'Artifact', stats: ['physicalDefense +40', 'health +350'], description: '裝備者身上的護盾破裂時，對最靠近的敵軍造成相當於該護盾初始數值150%的魔法傷害。' },

    { id: 'Anima Visage', name: '生命鎧甲', type: 'Artifact', stats: ['physicalDefense +20', 'magicDefense +20', 'health +400'], description: '每秒回復最大生命3.5%。' },

    { id: "Luden's Tempest", name: '盧登驟雨', type: 'Artifact', stats: ['physicalAttack +45%', 'magicAttack +45'], description: '對最靠近目標的三名敵軍造成相當於100%超量傷害，外加100的魔法傷害。' },

    { id: 'Hullcrusher', name: '碎船戰斧', type: 'Artifact', stats: ['physicalDefense +35', 'magicDefense +35'], description: '戰鬥開始：若沒有鄰近友軍，則增加600生命、20%物攻和20魔攻。' },

    { id: 'Mittens', name: '縮小手套', type: 'Artifact', stats: ['attackSpeed +60%', 'damageReduction +25%'], description: '縮小裝備者，使其跑速增加，且對凍骨效果免疫。凍骨：降低攻速' },

    { id: 'Rapid Firecannon', name: '衝擊火砲', type: 'Artifact', stats: ['attackSpeed +66%'], description: '攻擊距離+1，且裝備者每擊殺一名敵軍便再+1。' },

    { id: 'Horizon Focus', name: '視界專注', type: 'Artifact', stats: ['abilityPower +15', 'physicalDefense +20', 'magicDefense +20', 'health +250'], description: '暈眩敵軍會引發閃電擊打目標，造成相當於30%最大生命的魔法傷害。' },

    { id: "Gambler's Blade", name: '賭徒之刃', type: 'Artifact', stats: ['attackSpeed +35%', 'magicAttack +10'], description: '每持有💰1金錢便增加⚔️1%額外攻速(最多💰30金錢)。每次普攻有5%機率掉落💰1金錢。' },

    { id: 'Gold Collector', name: '金幣收藏家', type: 'Artifact', stats: ['physicalAttack +25%', 'critChance +30%'], description: '普攻與技能會魔決最大生命低於12%的敵軍，魔決有33%機率掉落💰1金錢。[唯一：每一名英雄僅限1件]' },

    { id: 'Silvermere Dawn', name: '銀織黎明', type: 'Artifact', stats: ['physicalAttack +120%', 'physicalDefense +50', 'magicDefense +50'], description: '裝備者免疫暈眩效果，且普攻會暈眩目標0.8秒。裝備者的攻速固定為0.5。' },

    { id: "Blacksmith's Gloves", name: '鐵匠手套', type: 'Artifact', stats: ['health +200', 'critChance +30%'], description: '每個回合：裝備2件隨機鄙廟神器。[需消耗3格道具欄位。]' },

    { id: 'Spectral Cutlass', name: '鬼使彎刀', type: 'Artifact', stats: ['physicalAttack +40%', 'physicalDefense +40', 'magicDefense +40', 'critChance +20%'], description: '戰鬥開始：將裝備者傳送到敵軍那側的對應棋格。8秒後，裝備者回到原本的位置。' },

    { id: 'Manazane', name: '魔力之蘊', type: 'Artifact', stats: ['physicalAttack +15%', 'attackSpeed +15%', 'magicAttack +10', 'abilityPower +15'], description: '第一次在戰鬥中施放技能後，在5秒內獲得120魔力。[唯一：每一名英雄僅限1件]' },
    
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

    { id: "Vanguard Emblem", name: '先鋒戰士徽章', type: 'Emblem', stats: ['health +150'], description: ' ' },
    { id: "Bastion Emblem", name: '堡壘衛士徽章', type: 'Emblem', stats: ['physicalDefense +20'], description: ' '  },
    { id: 'Marksman Emblem', name: '射手徽章', type: 'Emblem', stats: ['physicalAttack +25%'], description: ' '  },
    { id: 'Strategist Emblem', name: '戰略軍師徽章', type: 'Emblem', stats: ['physicalAttack +25%'], description: ' '  },
    { id: 'Techie Emblem', name: '技師徽章', type: 'Emblem', stats: ['magicAttack +10'] , description: ' ' },
    { id: 'BoomBot Emblem', name: '末日機器人徽章', type: 'Emblem', stats: ['physicalDefense +20'] , description: ' ' },
    { id: 'Exotech Emblem', name: '極限科技徽章', type: 'Emblem', stats: ['critChance +20%'], description: ' '  },
    { id: 'Slayer Emblem', name: '殺戮者徽章', type: 'Emblem', stats: ['magicDefense +20'], description: ' '  },
    { id: "Dynamo Emblem", name: '發電機徽章', type: 'Emblem', stats: ['abilityPower +15'], description: ' '  },
    { id: 'Anima Squad Emblem', name: '百獸特攻隊徽章', type: 'Emblem', stats: ['abilityPower +15'], description: ' '  },
    { id: 'Cypher Emblem', name: '破譯師徽章', type: 'Emblem', stats: ['health +150'], description: ' '  },
    { id: "Divinicorp Emblem", name: '神諭集團徽章', type: 'Emblem', stats: ['attackSpeed +10%'] , description: ' ' },
    { id: "Syndicate Emblem", name: '罪惡集團徽章', type: 'Emblem', stats: ['magicDefense +20'] , description: ' ' },
    { id: 'Executioner Emblem', name: '處刑者徽章', type: 'Emblem', stats: ['critChance +20%'], description: ' '  },
    { id: 'Bruiser Emblem', name: '蠻勇鬥士徽章', type: 'Emblem', stats: ['health +150'] , description: ' ' },
    { id: 'Street Demon Emblem', name: '街頭狂魔徽章', type: 'Emblem', stats: ['magicAttack +10'], description: ' '  },
    { id: "Rapidfire Emblem", name: '速射徽章', type: 'Emblem', stats: ['attackSpeed +10%'], description: ' '  },
    { id: "Golden Ox Emblem", name: '開運金牛徽章', type: 'Emblem', stats: ['health +150'] , description: ' ' },

    { id: "Chalice of Power", name: '力量聖杯', type: 'Support', stats: ['health +150'], description: '戰鬥開始：裝備者與同一排2格內的友軍增加25魔法攻擊和10魔力。' },
    { id: "Unstable Treasure Chest", name: '反復無常寶箱', type: 'Support', stats: ['health +150'], description: '裝備者陣亡時，生命比例最高的4名友軍獲得1件暫時完整道具。' },
    { id: "Banshee's Veil", name: '女妖面紗', type: 'Support', stats: ['health +150'], description: '戰鬥開始：裝備者和同一排1格內的友軍免疫控制效果並增加25%攻速，持續18秒。' },
    { id: "Shround of Stillness", name: '寂靜法衣', type: 'Support', stats: ['health +150'], description: '戰鬥開始：射出一道光束，使敵軍受到30%魔力掠奪。我方隊伍增加60生命。 ' },
    { id: "Spite", name: '惡源', type: 'Support', stats: ['health +150'], description: '戰鬥開始：裝備者與所有鄰近友軍獲得15%物攻和20魔攻。裝備者陣亡時，暈眩2格內所有敵軍2秒。' },
    { id: "Locket of the Iron Solari", name: '日輪的加冕', type: 'Support', stats: ['health +150'], description: '戰鬥開始：裝備者和同一排2格內的友軍獲得250護盾，並增加20物理防禦和20魔法防禦，持續20秒。' },
    { id: "Moonstone Renewer", name: '月之石再生裝置', type: 'Support', stats: ['health +150'], description: '每隔4秒，賦予2名生命比例最低的友軍55-325生命的護盾(取決於階段)，持續4秒。' },
    { id: "The Eternal Flame", name: '永恆之焰', type: 'Support', stats: ['health +150'], description: '裝備者存活期間，所有敵軍33%重創，且所有友軍獲得8%傷害增幅。此效果每5秒觸發一次。' },
    { id: "Virtue of the Martyr", name: '烈士美德', type: 'Support', stats: ['health +150'], description: '每5秒回復所有友軍最大生命7%。裝備者死亡時，額外治療2次，治療量增加至14%最大生命。' },
    { id: "Randuin's Omen", name: '蘭頓之兆', type: 'Support', stats: ['health +150'], description: '戰鬥開始：裝備者與鄰近友軍增加30物理防禦及30魔法防禦。' },
    { id: "Zz'Rot Portal", name: '虛空之門', type: 'Support', stats: ['health +150'], description: '召喚1隻巨型虛空蟲，強度會隨階段提升。' },
    { id: "Zephyr", name: '西風匕首', type: 'Support', stats: ['health +150'], description: '戰鬥開始：在競技場另一頭召喚一道旋風，並將距離旋風最近的敵軍從戰鬥中移除5秒。 我方隊伍增加8%攻速。' },
    { id: "Aegis of the Legion", name: '軍團聖盾', type: 'Support', stats: ['health +150'], description: '戰鬥開始時：裝備者、鄰近友軍及同一列後面的所有友軍增加30%攻速及15物理與魔法防禦，持續12秒。' },
    { id: "Needlessly Big Gem", name: '過大寶石', type: 'Support', stats: ['health +150'], description: '我方隊伍獲得5%傷害增幅，裝備者每存活一秒，我方隊伍便額外獲得1%傷害增幅，總量最多20%。' },
    { id: "Zeke's Herald", name: '錫柯的號角', type: 'Support', stats: ['health +150'], description: '戰鬥開始：裝備者與同一排2格內的友軍增加+30%攻速。' },
    { id: "Knight's Vow", name: '騎士誓願', type: 'Support', stats: ['health +150'], description: '戰鬥開始：裝備者與同一排1格內的友軍增加200生命與15%全能吸血。​​' },
    { id: "Obsidian Cleaver", name: '黑曜切割者', type: 'Support', stats: ['health +150'], description: '造成傷害會對敵軍造成30%削抗與30%破甲，持續15秒。 我方隊伍增加8%物理攻擊和8魔法攻擊。 ' },

    { id: "Guiding Hex", name: '引導靈咒', type: 'Synergy', stats: [], description: '發射導引飛彈，對隨機3位鄰近敵軍造成魔法傷害。' },

    { id: "Ani-Mines", name: '百獸地雷', type: 'Synergy', stats: [], description: '每隔5秒，一位隨機百獸特攻隊英雄丟出三枚會爆炸的百獸地雷，在範圍內造成物理傷害。' },
    
    { id: "Searing Shortbow", name: '熔炎短弓', type: 'Synergy', stats: [], description: '每隔5秒，一位隨機百獸特攻隊英雄會使用熔岩短弓射出火焰箭，留下一片會造成持續性魔法傷害的區域。' },
    
    { id: "The Annihilator", name: '滅絕者', type: 'Synergy', stats: [], description: '在6秒時，滅絕者會造成一次性的最大生命百分比真實傷害。' },
    
    { id: "Final City Transit", name: '終城快車', type: 'Synergy', stats: [], description: '每隔數秒，終城快車會召喚一輛火車並穿越整個戰場，造成毀滅性傷害且帶走低生命的敵軍。' },
    
    { id: "Tornadoes", name: '龍捲風', type: 'Synergy', stats: [], description: '每6秒，一位隨機百獸特攻隊英雄會生成龍捲風，造成魔法傷害。' },
    
    { id: "Blade-o-rang", name: '迴力刃', type: 'Synergy', stats: [], description: '每隔4秒，一位百獸特攻隊英雄會投擲出一把會返回的利刃，造成物理傷害，首個命中目標受到的傷害會增加。' },
    
    { id: "Gating Bunny-Guns", name: '兔女郎格林槍', type: 'Synergy', stats: [], description: '每隔5.5秒，一位百獸特攻隊英雄會使用兔女郎格林槍對錐形範圍造成高額物理傷害。' },
    
    { id: "Surprise Supply Drop", name: '驚喜空投', type: 'Synergy', stats: [], description: '每隔8秒，空投物資將呼喚支援飛船，對戰場投下強力補給。' },
    
    { id: "UwU Blasters", name: 'UwU炮', type: 'Synergy', stats: [], description: '每隔4秒，一位百獸特攻隊英雄會使用UwU炮快速連射，對首位命中的敵軍造成物理傷害。' },
    
    { id: "Vortex Glove", name: '漩渦手套', type: 'Synergy', stats: [], description: '每隔5秒，一位百獸特攻隊英雄會使用漩渦手套射出穿刺球體，造成魔法傷害，每命中一位敵軍傷害就會降低。' },
    
    { id: "Repulsor Lantern", name: '懸浮燈籠', type: 'Synergy', stats: ['health +444'], description: '增加5%生命。每3秒對1格內的所有敵軍造成等同於裝備者6%最大生命的魔法傷害。' },
    
    { id: "Nullifier Lantern", name: '抵銷燈籠', type: 'Synergy', stats: ['health +777'], description: ' ' },
    
    { id: "Pulse Stabilizer", name: '脈衝穩定器', type: 'Synergy', stats: ['physicalAttack +25%', 'critChance +35%'], description: '處決生命低於12%的敵軍，技能可以暴擊。若裝備者的技能本來就可暴擊，則改為增加10%暴擊傷害。' },
    
    { id: "Pulse Silencer", name: '脈衝沈默者', type: 'Synergy', stats: ['physicalAttack +44%', 'critChance +44%'], description: '處決生命低於12%的敵軍，技能可以暴擊。若裝備者的技能本來就可暴擊，則改為增加10%暴擊傷害。' },
    
    { id: "Kingpin Hat", name: '黑街霸主帽子', type: 'Synergy', stats: [], description: '' },
    
    { id: "Kingpin Hat R", name: '黑街霸主帽子', type: 'Synergy', stats: [], description: '' },
    
    { id: "Corrupted Chassis", name: '破損機身', type: 'Synergy', stats: ['health +200'], description: '裝備者獲得的護盾效果增加15%。每7秒，從當前目標吸取裝備者最大生命10%的生命，將之轉換為持續5秒的護盾。' },
    
    { id: "Harmonized Chassis", name: '協調機身', type: 'Synergy', stats: ['health +400'], description: '裝備者獲得的護盾效果增加15%。每7秒，從當前目標吸取裝備者最大生命10%的生命，將之轉換為持續5秒的護盾。' },
    
    { id: "Hyper Fangs", name: '超頻利牙', type: 'Synergy', stats: ['physicalAttack +20%', 'magicAttack +20', 'omnivamp +15%'], description: '對敵軍造成傷害時，將對其造成傷害的25%儲存起來。4秒後，對目標和最靠近的敵軍造成等同於儲存傷害的物理傷害。' },
    
    { id: "Apex-Fangs", name: '頂尖利牙', type: 'Synergy', stats: ['physicalAttack +40%', 'magicAttack +40', 'omnivamp +15%'], description: '對敵軍造成傷害時，將對其造成傷害的25%儲存起來。4秒後，對目標和最靠近的敵軍造成等同於儲存傷害的物理傷害。' },
    
    { id: "Cybercoil", name: '賽博繩索', type: 'Synergy', stats: ['physicalDefense +40', 'magicDefense +40'], description: '技能和普攻會標記敵軍，持續5秒。對標記敵軍造成傷害時，可回復相當於傷害量10%的生命。' },
    
    { id: "Hijacked Cybercoil", name: '被駭賽博繩索', type: 'Synergy', stats: ['physicalDefense +100', 'magicDefense +100'], description: '技能和普攻會標記敵軍，持續5秒。對標記敵軍造成傷害時，可回復相當於傷害量10%的生命。' },
    
    { id: "Holobow", name: '全息弩弓', type: 'Synergy', stats: ['attackSpeed +15%', 'magicAttack +20', 'abilityPower +15'], description: '普攻造成暴擊時賦予2額外魔力。施放技能後，增加40%暴擊率，持續5秒。' },
    
    { id: "Scoped Holobow", name: '狙擊全息弩弓', type: 'Synergy', stats: ['attackSpeed +20%', 'magicAttack +40', 'abilityPower +30'], description: '普攻造成暴擊時賦予2額外魔力。施放技能後，增加40%暴擊率，持續5秒。' },
    
    { id: "Flux Capacitor", name: '湧動電容器', type: 'Synergy', stats: ['physicalAttack +15%', 'attackSpeed +25%'], description: '普攻可儲存充能。達到4層充能時，下一次普攻會消耗充能，造成等同於目標15%最大生命的物理傷害，並降低10物理防禦。' },
    
    { id: "Fully-Charged Flux Capacitor", name: '滿電湧動電容器', type: 'Synergy', stats: ['physicalAttack +50%', 'attackSpeed +30%'], description: '普攻可儲存充能。達到4層充能時，下一次普攻會消耗充能，造成等同於目標15%最大生命的物理傷害，並降低10物理防禦。' },

    { id: "Recurve Bow", name: '反曲弓', type: 'Component', stats: ['attackSpeed +10%'], description: ' ' },
    { id: "Tear of the Goddess", name: '女神之淚', type: 'Component', stats: ['abilityPower +15'], description: ' ' },
    { id: "Giant's Belt", name: '巨人腰帶', type: 'Component', stats: ['health +150'], description: ' ' },
    { id: "Needlessly Large Rod", name: '巨型魔棒', type: 'Component', stats: ['magicAttack +10'], description: ' ' },
    { id: "Frying Pan", name: '平底鍋', type: 'Component', description: ' ' },
    { id: "B.F Sword", name: '暴風之劍', type: 'Component', stats: ['physicalAttack +10%'], description: ' ' },
    { id: "Sparring Gloves", name: '格鬥手套', type: 'Component', stats: ['critChance +20%'], description: ' ' },
    { id: "Negatron Cloak", name: '負極斗篷', type: 'Component', stats: ['magicDefense +20'], description: ' ' },
    { id: "Spatula", name: '鍋鏟', type: 'Component', description: ' ' },
    { id: "Chain Vest", name: '鎖子甲', type: 'Component', stats: ['physicalDefense +20'], description: ' ' },
];

const augmentData = [
    { id: 'Ones Twos Three', name: '一、二、三', tier: 1, description: '獲得2個1費英雄、2個2費英雄與1個3費英雄。' },
    { id: 'One Two Five!', name: '一、二、五！', tier: 1, description: '獲得1個隨機組件、2金錢與1個隨機5費英雄。' },
    { id: 'Find Your Center', name: '中堅自強', tier: 1, description: '在盤面前排中央開始戰鬥的我方英雄獲得15%傷害增幅和15%最大生命。' },
    { id: 'Teaming Up I', name: '人多好辦事', tier: 1, description: '獲得1個隨機組件及2名隨機3費英雄。' },
    { id: 'Eye For An Eye', name: '以眼還眼', tier: 1, description: '每有15名敵方英雄陣亡，獲得1個隨機組件(最多4個)。' },
    { id: 'Eye For An Eye+', name: '以眼還眼+', tier: 1, description: '獲得1個隨機組件。每有16名敵方英雄陣亡，再獲得1個組件(最多3個)。' },
    { id: 'Health is Wealth I', name: '健康即是財富', tier: 1, description: '我方隊伍獲得10%全能吸血。我方隊伍自身累積滿10000英雄治療量時，額外獲得8金錢。' },
    { id: 'Lunch Money', name: '午餐錢', tier: 1, description: '對敵方棋子每造成8傷害便獲得2金錢。總報酬：0金錢' },
    { id: 'Bulky Buddies I', name: '壯碩夥伴 I', tier: 1, description: '戰鬥開始時，鄰近恰好1個友軍的友軍獲得100生命值。在該英雄死亡時，另一名英雄獲得最大生命10%的護盾，持續10秒。' },
    { id: 'Diversified Portfolio', name: '多元投資組合', tier: 1, description: '獲得1金錢。每個回合，每發動3項非唯一特性獲得1金錢。' },
    { id: 'Diversified Portfolio+', name: '多元投資組合+', tier: 1, description: '獲得4金錢。每個回合，每發動3項非唯一特性獲得1金錢。' },
    { id: "Caretaker's Ally", name: '守望者之友', tier: 1, description: '立即隨機獲得一個2費英雄。每次升級時，都會獲得同一名英雄。英雄：0' },
    { id: 'Placebo', name: '安慰劑', tier: 1, description: '我方隊伍增加1%攻速，獲得8金錢。' }, 
    { id: 'Placebo+', name: '安慰劑+', tier: 1, description: '我方隊伍增加1%攻速，獲得15金錢。' },
    { id: 'Lategame Specialist', name: '專打後期', tier: 1, description: '當你達到9級時，獲得33金錢。' },
    { id: 'Mentorship I', name: '導師 I', tier: 1, description: '如果友軍在費用更高的友軍旁開始戰鬥，會增加10%攻速和100生命。' },
    { id: 'Missed Connections', name: '就差你一個', tier: 1, description: '獲得所有1費英雄的複製體。' },
    { id: 'Titanic Titan', name: '巨型泰坦', tier: 1, description: '目前生命和最大玩家生命增加25%。在聯合徵召回合，我方提早出場，但速度變慢許多。' },
    { id: 'Delayed Start', name: '延遲開始', tier: 1, description: '出售我方盤面和備戰區中的所有英雄。獲得4位隨機的2星1費英雄。在接下來3個回合中關閉你的商店。' },
    { id: 'Team Building', name: '建立團隊', tier: 1, description: '獲得1件初級英雄複製裝置，5場玩家戰鬥後再獲得1件。此道具可用來複製一個3費以下的英雄。' },
    { id: 'Kingslayer', name: '弒君之道', tier: 1, description: '贏得玩家戰鬥後，獲得1金錢。若該玩家生命比你多，則改為獲得6金錢。獲得1金錢。' },
    { id: 'One For All I', name: '我為人人 I', tier: 1, description: '我方盤面上每有1個不同的1費英雄，我方隊伍獲得2%最大生命和1%傷害增幅，獲得2個1費英雄。' },
    { id: 'Spoils of War I', name: '戰爭紅利 I', tier: 1, description: '敵軍死亡時，有25%機率會掉落戰利品。' },
    { id: 'Called Shot', name: '打擊宣言', tier: 1, description: '將連勝數設為+4。獲得4金錢。' },
    { id: 'Rolling For Days I', name: '抽好抽滿 I', tier: 1, description: '獲得11次免費商店重抽機會。' },
    { id: 'Bachup', name: '援軍', tier: 1, description: '如果至少有4名友軍從後兩排開始戰鬥，則我方隊伍增加12%攻速。' },
    { id: 'Climb The Ladder I', name: '攀升之階 I', tier: 1, description: '每次友軍陣亡時，與其共享至少一項特性的友軍會獲得3魔攻、3%物攻、3物防與3魔防。' },
    { id: 'Branching Out', name: '斜槓英雄', tier: 1, description: '獲得1枚隨機微章。' },
    { id: 'Branching Out+', name: '斜槓英雄+', tier: 1, description: '獲得1枚隨機微章及1台重鑄器。重鑄器可用來重製任何道具。' },
    { id: 'Table Scraps', name: '檯面殘渣', tier: 1, description: '下2次聯合徵召後，獲得1個沒有被拿走的單位及其道具。獲得1金錢。' },
    { id: 'Good For Something I', name: '死得有價值 I', tier: 1, description: '我方未裝備道具的英雄死亡時有50%機率會掉落1金錢。' },
    { id: "Pandora's Bench", name: '潘朵拉的備戰區', tier: 1, description: '在每回合開始時，在備戰區最右邊3格的英雄將隨機幻化為同費英雄。獲得2金錢。' },
    { id: "Pandora's Items", name: '潘朵拉的道具', tier: 1, description: '回合開始：我方備戰區中的道具將隨機變化。獲得1個隨機組件。' },
    { id: 'Latent Forge', name: '潛在火爐', tier: 1, description: '在8個玩家對戰回合後，獲得1個神器鐵鉤。此鐵鉤提供4個選擇。神器是擁有獨特效果的強大道具。' },
    { id: 'Cease and Desist', name: '火瀑連擊', tier: 1, description: '獲得1個非艾。我方最強大的非艾增加攻速，且施放技能時會衝向3格內距離最遠的目標，暈眩並造成額外物理傷害。' },
    { id: 'Wolf Unchained', name: '無縛獨狼', tier: 1, description: '獲得1個賽勒斯。我方最強大的賽勒斯技能造成更多傷害且擊殺時會重施技能，但生命不會再隨著魔攻增加。' },
    { id: 'Button Mash', name: '狂亂猛砸', tier: 1, description: '獲得1個波比。我方最強大的波比技能替換成攻擊3次的重擊。' },
    { id: 'Glass Cannon I', name: '玻璃大砲 I', tier: 1, description: '戰鬥開始時，後排單位以90%生命開場，但獲得15%傷害增幅。' },
    { id: 'Survivor', name: '生存專家', tier: 1, description: '在3名玩家出局後，獲得92金錢。' },
    { id: 'Band of Thieves I', name: '神偷集團 I', tier: 1, description: '獲得1個竊賊手套。' },
    { id: 'Crafted Crafting', name: '精心製作', tier: 1, description: '每合成一件完整道具，獲得2次重抽機會。' },
    { id: 'Component Buffet', name: '組件自助餐', tier: 1, description: '每次獲得1個組件時，改為獲得1個組件鐵鉤。獲得1個隨機組件。此鐵鉤提供4種選擇。' },
    { id: 'Patience is a Virtue', name: '耐心是美德', tier: 1, description: '若上一回合沒有購買英雄，則下一回合可獲得2次免費重抽機會。' },
    { id: 'Corrosion', name: '腐蝕', tier: 1, description: '前兩排敵方英雄每2秒失去3物防和魔防。' },
    { id: 'Young and Wild and Free', name: '自由奔放', tier: 1, description: '我方可在每個聯合徵召回合自由移動。獲得5金錢。' },
    { id: 'Pumping Up I', name: '越戰越勇 I', tier: 1, description: '我方隊伍立即增加6%攻速。每過一個回合，再增加0.5%。' },
    { id: 'Firesale', name: '跳樓大拍賣', tier: 1, description: '每回合從商店隨機偷走1個3費或以下的英雄。獲得1金錢。' },
    { id: 'Support Mining', name: '輔助採礦', tier: 1, description: '獲得1個訓練假人。當它陣亡8次後，獲得1件隨機輔助道具並移除訓練假人。' },
    { id: 'Support Mining+', name: '輔助採礦+', tier: 1, description: '獲得1個訓練假人。當它陣亡7次後，獲得1件隨機輔助道具並移除訓練假人。' },
    { id: 'Over Encumbered', name: '過重負擔', tier: 1, description: '下一階段你只會有2個備戰區欄位。之後，獲得2個道具組件。' },
    { id: 'Item Collector I', name: '道具收藏家 I', tier: 1, description: '每持有一件不同道具，我方隊伍便增加1物攻和1魔攻。' },
    { id: 'Item Grab Bag I', name: '道具組合包 I', tier: 1, description: '獲得1件隨機完整裝備。' },
    { id: 'Adaptive Strikes', name: '適性打擊', tier: 1, description: '獲得1個賈克斯。我方最強大的賈克斯每第3次普攻都會造成額外魔法傷害，而且該傷害會越來越高。他的技能會賦予攻速。' },
    { id: 'Blistering Strikes', name: '酷熱打擊', tier: 1, description: '我方隊伍的普攻會使目標燃燒，在5秒內造成5%目標最大生命的傷害。並降低目標受到的治療效果33%。' },
    { id: 'Recombobulator', name: '重整裝置', tier: 1, description: '我方盤面上的英雄永久轉變為高1階級的隨機英雄 (上限為5)。獲得2台磁性卸除器。' },
    { id: 'Restart Mission', name: '重新開始任務', tier: 1, description: '移除你的盤面和備戰區中所有英雄。隨機獲得2位2星3費英雄、3位2星2費英雄和1位2星1費英雄。' },
    { id: 'Silver Spoon', name: '金湯匙', tier: 1, description: '獲得10經驗值。' },
    { id: 'Dummify', name: '鈍化', tier: 1, description: '失去我方盤面和備戰區中所有英雄。獲得1個訓練假人，生命值為所有英雄生命總和的80%。假人在每個階段都會獲得1000生命。' },
    { id: 'Iron Assets', name: '鋼鐵素材', tier: 1, description: '獲得1個組件鐵鉤及4金錢。' },
    { id: 'Lineuo', name: '陣容', tier: 1, description: '戰鬥開始時，前兩排每有一個單位，我方隊伍增加2物防與魔防。' },
    { id: 'Risky Moves', name: '高風險高報酬', tier: 1, description: '失去期手手生命。經過7個玩家戰鬥回合後，獲得30金錢。' },
    { id: 'ManaFlow I', name: '魔力流動 I', tier: 1, description: '戰鬥開始時，後排單位每次普攻可額外獲得2魔力。' },
    { id: 'Rigged Shop+', name: '黑箱商店+', tier: 1, description: '我方下一次刷新和每刷新4次，商店裡會全是3費英雄。獲得9次重抽機會。' },
    { id: 'Forced Dropout', name: '強制中離', tier: 1, description: '在接下來的3回合，你無法進行任何行動。在那之後，獲得20金錢。' },
    { id: 'Juggernaut I', name: '超大型靠山 I', tier: 1, description: '戰鬥開始時，我方單位身旁如有超過1750生命的友軍，則所受傷害減少7%，持續直到戰鬥結束。' },
    { id: 'Geared Up I', name: '整裝備戰 I', tier: 1, description: '在你的備戰區的英雄將每回合永久獲得20生命、2%物理攻擊、2魔法攻擊。英雄在開始時就帶有1層此效果，累加上限為4層。' },
    { id: 'Healing Orb I', name: '治療靈球 I', tier: 1, description: '敵軍陣亡後，最靠近的友軍回復200生命。' },
    { id: 'Standing United I', name: '並肩作戰 I', tier: 1, description: '隊伍中每有一項啟動中的非唯一特性，我方單位便增加1.5%物理攻擊和1.5魔法攻擊。' },

    { id: 'Trifecta I', name: '三連勝 I', tier: 2, description: '獲得2個3費英雄。戰鬥開始：3個隨機隊友英雄增加220生命和20%攻速。' },
    { id: 'No Scout No Pivot', name: '不偵查不換陣容', tier: 2, description: '單位經歷玩家戰鬥後，無法再放回備戰區或賣掉。每回玩家戰鬥後，參戰過的單位增加12生命、1.5%物攻和1.5%魔攻。' },
    { id: 'Category Five', name: '五級颶風', tier: 2, description: '獲得1支芮爾颶風碎片。你的芮爾颶風箭會發射額外一支箭，每隻造成原技能75%傷害。' },
    { id: 'Teaming Up II', name: '人多好辦事 II', tier: 2, description: '隨機獲得1件輔助道具及2個隨機4費英雄。' },
    { id: 'Not Today', name: '今非死期', tier: 2, description: '獲得1個夜色緣界。裝備此道具的英雄增加35%攻速。' },
    { id: 'Scapegoat', name: '代罪羔羊', tier: 2, description: '獲得1個訓練假人及1金錢。在每場玩家戰鬥中，若假人率先陣亡，則獲得1金錢。' },
    { id: 'Bad Luvk Protection', name: '保底機制', tier: 2, description: '我方隊伍無法再造成暴擊。每5%暴擊率轉換為5%物理攻擊。獲得一雙格鬥手套。' },
    { id: 'a', name: '值得等待', tier: 2, description: '隨機獲得1位2星1費英雄。2回合後，每回合開始獲得1個複製體，持續到場場遊戲結束。' },
    { id: 'b', name: '健康即是財富 II', tier: 2, description: '我方隊伍獲得15%全能吸血。我方隊伍自次累積滿10000英雄治療量時，額外獲得15金錢。' },
    { id: 'c', name: '備品零件', tier: 2, description: '獲得1座爆燃戰隊海克斯防禦塔，將有你33%的鉻。獲得1個希瓦娜。' },
    { id: 'd', name: '價值爆棚', tier: 2, description: '上次戰鬥時部署2個不同的2費英雄，便獲得1次重抽機會。獲得2個2費單位。' },
    { id: 'Vanguard Crest', name: '先鋒戰士之紋', tier: 2, description: '獲得1枚先鋒戰士徽章。' },
    { id: 'e', name: '刃馬合一', tier: 2, description: '獲得1個2星2費單位英雄。造成80玩家傷害後，獲得高費英雄和道具的寶箱。' },
    { id: 'f', name: '刷新計分板', tier: 2, description: '每回合，若你的排名是後4名，則我方隊伍永久獲得1.5%物理攻擊和魔法攻擊。若你是前4名，則我方隊伍擁有10%額外生命。' },
    { id: 'g', name: '助攻碑文', tier: 2, description: '單位死亡時，最靠近的友軍獲得其最大生命20%的護盾，並增加8%可疊加的攻速。' },
    { id: 'h', name: '化為魔像', tier: 2, description: '失去我方盤面和備戰區中所有英雄。獲得1個魔像。生命及物攻各為所有英雄流最大生命值的70%和60%。魔像在每個階段都會獲得1000生命。' },
    { id: 'Reactive Shell', name: '反應殼盾', tier: 2, description: '先鋒戰士獲得8%生命。先鋒戰士的護盾失效時，對其當前目標造成相當於初始護盾值50%的魔法傷害。獲得1個烏薩加斯及1個厄薩斯。' },
    { id: 'Alter Ego', name: '另我人格', tier: 2, description: '獲得1個勒哈斯特。我方最強大的勒哈斯特進入詭影刺客型態，技能替換為衝刺及範圍為1格的迴旋斬。如果技能擊殺敵人，立即再次施放。' },
    { id: 'Vampiric Vitality', name: '吸血活力', tier: 2, description: '治療自身，回復量為我方對敵方棋子造成傷害的20%。我方單位獲得12%全能吸血。' },
    { id: 'i', name: '嚴守皇冠', tier: 2, description: '獲得1名皇冠守衛。我方皇冠守衛的隊列開始效果增加85%。護盾持續時間增加5秒。' },
    { id: 'j', name: '四個一組', tier: 2, description: '如果我方隊伍恰好有2個4費英雄，在增加40生命和24.4%攻速。獲得1個隨機4費單位。' },
    { id: 'k', name: '四重援軍', tier: 2, description: '我方購買的下一個4費英雄會立即升至2星。獲得12金錢。' },
    { id: 'l', name: '回收再利用', tier: 2, description: '立即獲得1件隨機的完整道具，並在隨機7場玩家戰鬥後，獲得1個組件。將英雄賣出時，會將他們身上的完整道具分解為組件(掛飾道具和微章除外)。' },
    { id: 'm', name: '回收再利用+', tier: 2, description: '立即獲得1件隨機的完整道具，並在隨機4場玩家戰鬥後，獲得1個組件。將英雄賣出時，會將他們身上的完整道具分解為組件(掛飾道具和微章除外)。' },
    { id: 'Bastion Crest', name: '堡壘之紋', tier: 2, description: '獲得1枚百獸特攻隊徽章。' },
    { id: 'n', name: '塔防', tier: 2, description: '獲得1個裝備1枚隨機徽章的訓練假人，可對敵軍發動遠距離攻擊。隨著遊戲進行會不斷升級。' },
    { id: 'Bulky Buddies II', name: '壯碩夥伴 II', tier: 2, description: '戰鬥開始時，鄰近好1個友軍的友軍獲得175生命值。在該英雄死亡時，另一名英雄獲得最大生命15%的護盾，持續10秒。' },
    { id: 'Big Grab Bag', name: '大禮包', tier: 2, description: '獲得3個隨機組件、2金錢和1台重鑄器。重鑄器可用來重製任何道具。' },
    { id: "Caretaker's Favor", name: '守望者眷顧', tier: 2, description: '達到等級5、6、7和8時，獲得1個組件鐵砧。此鐵砧提供4種選擇。' },
    { id: 'o', name: '射手之紋', tier: 2, description: '獲得1枚射手徽章。' },
    { id: 'p', name: '導師 II', tier: 2, description: '如果友軍在費用更高的友軍旁開始戰鬥，會增加16%攻速和220生命。' },
    { id: 'Little Buddies', name: '小小夥伴', tier: 2, description: '我方場上每有一名1費或2費英雄，我方4費和5費英雄增加55生命並提升6%攻速。' },
    { id: 'q', name: '弱者，顫抖吧！', tier: 2, description: '賽博霸主的技能會降低目標20%最大生命。賽博霸主若受到最大生命值較低敵軍的傷害，該傷害減少20%。獲得1個瑞茲及1個維迦。' },
    { id: 'r', name: '強化骨骼', tier: 2, description: '蠻勇鬥士死亡時，永久獲得40生命。獲得1個達瑞斯及1個亞歷斯塔。' },
    { id: 's', name: '心電靜止', tier: 2, description: '射手處決生命低於12%的敵軍。每當射手處決敵軍時，所有射手增加4%攻速。獲得1個燼跟1個鏡爪。' },
    { id: 't', name: '思緒清晰', tier: 2, description: '玩家戰鬥結束時，若我方備戰區沒有任何英雄，則獲得3經驗值。' },
    { id: 'u', name: '思緒雜亂', tier: 2, description: '立即獲得4個隨機的1費英雄。在玩家戰鬥結束時，若我方備戰區已經全滿，則獲得3經驗值。' },
    { id: 'v', name: '惡性經營', tier: 2, description: '獲得2金錢。在接下來3個回合，敵方英雄死亡時會掉落2金錢。' },
    { id: 'Liquidate', name: '惡意收購', tier: 2, description: '破譯師獲得75%戰鬥額外獎勵。雖然敗場獲得30%。獲得1個達瑞斯。' },
    { id: 'Tagging Spree', name: '我標我標我標標標', tier: 2, description: '街頭狂魔的簽名棋格賦予20%攻速。獲得3個街頭狂魔單位及2罐能夠創作街頭狂魔簽名棋格的噴漆罐道具。' },
    { id: 'One For All II', name: '我為人人 II', tier: 2, description: '我方盤面上每有1個不同的1費英雄，我方隊伍獲得3%最大生命和1.5%傷害增幅。獲得3個1費英雄。' },
    { id: 'w', name: '戰爭紅利 II', tier: 2, description: '敵軍死亡時，有30%機率會掉落戰利品。' },
    { id: 'x', name: '戰略軍師之紋', tier: 2, description: '獲得1枚戰略軍師徽章。' },
    { id: 'y', name: '戰錘意志', tier: 2, description: '獲得1個格鬥手套。我方隊伍增加6%攻速和20%暴擊率。' },
    { id: 'Techie Crest', name: '技師之紋', tier: 2, description: '獲得1枚技師徽章。' },
    { id: 'z', name: '投資策略 I', tier: 2, description: '每購買一點利息，我方英雄永久獲得7最大生命。' },
    { id: 'Spare Parts', name: '拋光鉻', tier: 2, description: '將爆燃戰隊單位升至3星時，他們獲得15%物理攻擊、20魔法攻擊及10金錢。獲得1個鏡爪及1個奈德麗。' },
    { id: 'aa', name: '拳擊選手', tier: 2, description: '獲得2個道具組件。每獲勝5次可獲得1個道具組件。' },
    { id: 'ab', name: '拾荒者', tier: 2, description: '每場戰鬥中，最先遭受殺的5位敵方英雄將賦予我方一位英雄1件暫時的完整道具。' },
    { id: 'ac', name: '持槍假人', tier: 2, description: '罪惡集團特性啟動時，我方訓練假人會對敵軍人。假人每發動2次攻擊，罪惡霸王提提獲2%物理攻擊和魔法攻擊。獲得1個訓練假人、1個連珠斯及1個提莫。' },
    { id: 'ad', name: '攀升之階 II', tier: 2, description: '每次友軍陣亡時，與其共享至少一項特性的友軍會獲得6魔攻、6%物攻、6物防與6魔防。' },
    { id: 'ae', name: '攜帶型打鐵鋪', tier: 2, description: '從4件神器中挑1。神器是擁有獨特效果的強大道具。' },
    { id: 'af', name: '支援尖塔', tier: 2, description: '戰鬥開始後10秒，支援尖塔將賦予百獸特攻隊護盾、攻速並暈眩所有敵軍。獲得3個百獸特攻隊單位。' },
    { id: 'Gold For Dummies', name: '散財假人', tier: 2, description: '獲得1個訓練假人。每10秒，所有訓練假人給予1金錢。' },
    { id: '10,000 IQ', name: '智商10,000', tier: 2, description: '啟動戰略軍師每過5回合，預測你會贏更多或輸更慘。如果預測正確，獲得2金錢和1件隨機完整道具。獲得1個勒布朗及1個艾克。' },
    { id: 'ag', name: '月光', tier: 2, description: '戰鬥開始：1個隨機1費英雄變回合升級到3星，並增加45%物攻與45%魔攻。' },
    { id: 'ah', name: '末日機器之紋', tier: 2, description: '獲得1枚末日機器人徽章。' },
    { id: 'ai', name: '棘刺盔甲', tier: 2, description: '獲得1件刺藤胸甲。我方刺藤胸甲額外造成1-180%傷害(取決於階段)，並治療裝備者造成傷害量的35%。' },
    { id: 'aj', name: '極限之紋', tier: 2, description: '獲得1枚極限科技徽章。' },
    { id: 'Cybernetic Implants II', name: '模控機械批量 II', tier: 2, description: '裝備一件道具的英雄獲得300生命。' },
    { id: 'Slayer Crest', name: '殺戮者之紋', tier: 2, description: '獲得1枚殺戮者徽章。' },
    { id: 'Wandering Trainer I', name: '流浪假人 I', tier: 2, description: '獲得1個永久裝備2枚徽章的訓練假人。獲得1金錢。' },
    { id: 'ak', name: '清算', tier: 2, description: '交易破譯師情報時，我方盤面及備戰區將以300%的價值賣出並獲得4台重鑄器。獲得1個達瑞文。' },
    { id: 'al', name: '潘朵拉的道具 II', tier: 2, description: '回合開始：我方備戰區中的道具將隨機變化。獲得2個隨機組件。' },
    { id: 'am', name: '烏龍商店', tier: 2, description: '在非玩家戰鬥回合，我方商店每2.5秒免費刷新一次，持續28秒。' },
    { id: 'an', name: '烹飪鍋', tier: 2, description: '每回合開始時，所有裝備平底鍋或鍋蓋道具的單位，會賦予最靠近的英雄40%攻生命。獲得一個平底鍋。' },
    { id: 'Blazing Soul I', name: '熾熱靈魂 I', tier: 2, description: '戰鬥開始：我方攻擊最高的英雄會增加20魔法攻擊與20%攻速。每3秒鬧另一名友軍重新獲此效果。' },
    { id: 'ao', name: '特性追蹤器', tier: 2, description: '在1場戰門中若成功啟動8個唯一特性時，獲得6枚隨機徽章。' },
    { id: 'ap', name: '獵殺導彈', tier: 2, description: '每發射6枚末日機器人導彈便對當前目標發射1枚獵殺導彈，造成原始導彈350%的傷害。獲得1個寇格魔及1個史加納。' },
    { id: 'aq', name: '玻璃大砲 II', tier: 2, description: '戰鬥開始時，後排單位以90%生命開場，但獲得18%傷害增幅。' },
    { id: 'ar', name: '發條加速器', tier: 2, description: '我方隊伍無法再造成暴擊。每5%暴擊率轉換為5%物理攻擊。獲得一雙格鬥手套。' },
    { id: 'as', name: '發電機之紋', tier: 2, description: '獲得1枚發電機徽章。' },
    { id: 'Anima Squad Crest', name: '百獸之紋', tier: 2, description: '獲得1枚百獸特攻隊徽章。' },
    { id: 'at', name: '皇冠意志', tier: 2, description: '獲得1把巨型皇橋。我方單位增加10魔攻和10物防。' },
    { id: 'au', name: '盜取', tier: 2, description: '每回合，獲得1個上次戰鬥贏歐的第一位英雄的1星複製體。' },
    { id: 'av', name: '盜墓者 I', tier: 2, description: '接下來陣亡的3位玩家，都能拿走對方一件完整道具。' },
    { id: 'Slammin', name: '砸起來', tier: 2, description: '獲得1個隨機組件。每次玩家戰鬥結束後，若備戰區沒有任何道具(消耗品除外)，則獲得2經驗值。' },
    { id: 'Slammin+', name: '砸起來+', tier: 2, description: '立即獲得1個隨機組件及10經驗值。每次玩家戰鬥結束後，若備戰區沒有任何道具(消耗品除外)，則獲得2經驗值。' },
    { id: 'Divine Ascension', name: '神諭之梯', tier: 2, description: '戰鬥開始12秒後，神諭集團單位會飛昇，增加20%生命和30%攻速。獲得1個動態斯特及1個戟甲。' },
    { id: 'Divine Crest', name: '神諭之紋', tier: 2, description: '獲得1枚神諭集團徽章。' },
    { id: 'aw', name: '移情', tier: 2, description: 'A.M.P.單位陣亡時，最靠近的A.M.P.單位獲得1傷害增幅，直至戰鬥結束。獲得1個娜菲芮及1個奈德麗。' },
    { id: 'ax', name: '究極升級', tier: 2, description: '百獸特攻隊參與擊殺時，有30%機率掉落1顆經驗晶球，賣出後可獲得1點經驗。玩家每有一等，百獸特攻隊單位增加1%攻速。獲得1個瑟菈紛及1個伊羅旖。' },
    { id: 'ay', name: '穿刺蓮花 I', tier: 2, description: '我方隊伍增加5%暴擊率，且技能可以暴擊。暴擊對目標增加20%物物防和破甲，持續3秒。' },
    { id: 'az', name: '竊賊', tier: 2, description: '每回合，獲得1個上次戰鬥贏歐的第一位英雄的1星複製體。' },
    { id: 'ba', name: '紀元', tier: 2, description: '現在以及每個階段開始時獲得4經驗值與2次免費重抽機會。' },
    { id: 'bb', name: '紀元+', tier: 2, description: '現在以及每個階段開始時獲得8經驗值與3次免費重抽機會。' },
    { id: 'bc', name: '終火狂', tier: 2, description: '獲得1個紅Buff。燃燒造成的傷害提高50%。' },
    { id: 'bd', name: '繁星夜空', tier: 2, description: '商店中的1費和2費單位有機會變成2星。獲得6金錢。目前機率：0%機率會隨著玩家遊戲階段提升。' },
    { id: 'be', name: '繁星夜空+', tier: 2, description: '商店中的1費和2費單位有機會變成2星。獲得9金錢。目前機率：0%機率會隨著玩家遊戲階段提升。' },
    { id: 'bf', name: '罪惡之紋', tier: 2, description: '獲得1枚罪惡集團徽章。' },
    { id: 'bg', name: '耐心學習', tier: 2, description: '玩家戰鬥回合每勝利時獲得2經驗值。戰敗則獲得3經驗值。' },
    { id: 'bi', name: '自由發揮', tier: 2, description: '清除所有受到塗鴉的標記。戰鬥開始時，街頭狂魔若未於沒有受到標記的棋格，則將其標記。標記所有棋格後，獲得25金錢。獲得3個街頭狂魔單位。' },
    { id: 'Lethal Rerouting', name: '致命重導', tier: 2, description: '殺戮者生命高於50%時，增加20%物攻；生命低於50%時，增加15%全能吸血。獲得1個汎及1個薩科。' },
    { id: 'bj', name: '英雄禮包', tier: 2, description: '獲得2件初級英雄複製裝置。獲得5金錢。此道具可用來複製一個3費以下的英雄。' },
    { id: 'bk', name: '英雄禮包+', tier: 2, description: '獲得2件初級英雄複製裝置。獲得9金錢。此道具可用來複製一個3費以下的英雄。' },
    { id: 'bl', name: '英雄禮包++', tier: 2, description: '獲得2件初級英雄複製裝置。獲得15金錢。此道具可用來複製一個3費以下的英雄。' },
    { id: 'bm', name: '董事會', tier: 2, description: '如果你擁有的神諭集團單位低於3，他們每階段的加成提升75% + 0%獲得1個勒哈斯特及1個魔甘娜。' },
    { id: 'bn', name: '處刑者之紋', tier: 2, description: '獲得1枚處刑者徽章。' },
    { id: 'The Chug Bug', name: '蟲蟲暢飲', tier: 2, description: '獲得1個古拉格斯。我方最強大的古拉格斯普攻有機會擊退敵軍並造成額外魔法傷害。他的技能會強並強化下次普攻。' },
    { id: 'The Chug Bug+', name: '蟲蟲暢飲+', tier: 2, description: '獲得2個古拉格斯。我方最強大的古拉格斯普攻有機會擊退敵軍並造成額外魔法傷害。他的技能會治療並強化下次普攻。' },
    { id: 'bo', name: '蠻勇之紋', tier: 2, description: '獲得1枚蠻勇鬥士徽章。' },
    { id: 'bp', name: '複製', tier: 2, description: '從3個組件中選擇1個，捨棄另2回合。獲得該組件的1個複製品。' },
    { id: 'bq', name: '複製設施', tier: 2, description: '強化規範第三排中央的單位，為站在此網格上的英雄召喚一個擁有80%最低生命且魔力消耗提升10%的分身。' },
    { id: 'Keep Your Friends Close', name: '親近朋友', tier: 2, description: '罪惡集團的黑街霸主同排每有一名相鄰友軍，他獲得10%攻速及120生命。友軍增加175生命。獲得1個逆命及1個達瑞斯。' },
    { id: 'br', name: '記憶銀行', tier: 2, description: '獲得1個燼及1個魔甘娜。發電機獲得4%傷害增幅。花費7000魔力後，獲得1個中婭悖論之鐘及1個歐羅拉。' },
    { id: 'bs', name: '試營運', tier: 2, description: '獲得1個極限科技巨像，並持有你全部的極限科技道具。每個極限科技單位的星級都將賦予其1.5%生命及4%物理傷害。獲得1個燼跟1個娜菲芮。' },
    { id: 'bt', name: '認知植入', tier: 2, description: '我方技師獲得5魔攻，每2次參與擊殺提升1。獲得1個維迦及1個枷蘿。' },
    { id: 'bu', name: '貿易大亨', tier: 2, description: '每個回合會獲得一次免費的商店刷新。獲得4金錢。' },
    { id: 'Cyberdesk', name: '賽博平台', tier: 2, description: '戰鬥開始時，最多3位我方擁有2件道具的極限科技單位獲得1件理想的極限科技道具。獲得1個賈克斯及1個娜菲芮。' },
    { id: 'bv', name: '超前部署', tier: 2, description: '失去所有的金錢。5個玩家回合後，拿回本金外加70金錢。' },
    { id: 'bw', name: '超大型靠山 II', tier: 2, description: '戰鬥開始時，我方攻擊最高的英雄會增加20魔法攻擊與20%攻速。每3秒鬧另一名友軍重新獲此效果。' },
    { id: 'Overclocked', name: '超載', tier: 2, description: '我方裝備3件道具的A.M.P.英雄獲得1增幅。獲得1次4重抽機會、1個娜菲芮及1個奈德麗。' },
    { id: 'Overheal', name: '超量治癒', tier: 2, description: '每三下普攻造成130%傷害，並治療自身等同於50%傷害的生命。治補的治療量將轉為護盾，護盾層上限為300生命。' },
    { id: 'bx', name: '越戰越勇 II', tier: 2, description: '我方隊伍立即增加8%攻速。每過一個回合，再增加1%。' },
    { id: 'bz', name: '輔助藏寶箱', tier: 2, description: '從4件輔助道具中挑1。' },
    { id: 'Rapidfire Crest', name: '速射之紋', tier: 2, description: '獲得1枚速射徽章。' },
    { id: 'ca', name: '道具收藏家 II', tier: 2, description: '我方隊伍增加20生命。每持有一件不同道具，我方隊伍便增加5生命、1.5物攻和1.5魔攻。' },
    { id: 'cb', name: '遠親如近鄰', tier: 2, description: '戰鬥開始：我方距離最遠的2個單位建立聯繫，彼此共享22%的物理攻擊、魔法防禦、物理攻擊與魔法攻擊。' },
    { id: 'Golden Ox Crest', name: '金牛之紋', tier: 2, description: '獲得1枚開運金牛徽章。' },
    { id: 'cc', name: '鋼級之命 I', tier: 2, description: '每啟用一項鋼級特性，我方隊伍獲得3%傷害增幅。' },
    { id: 'cd', name: '長矛意志', tier: 2, description: '我方隊伍增加10%物攻和10魔力。獲得1把暴風之刃。' },
    { id: 'Two Trick', name: '雙戲法', tier: 2, description: '獲得2位隨機的5費英雄與一個隨機組件的2個複製品。' },
    { id: 'ce', name: '雙排', tier: 2, description: '獲得2位隨機的5費英雄與一個隨機組件的2個複製品。' },
    { id: 'Capacitor', name: '電容器', tier: 2, description: '技師施放技能時，賦予生命最低的技師護盾，護盾值等同於200%使用的魔力。獲得1個維迦及1個枷蘿。' },
    { id: 'cf', name: '電晶體', tier: 2, description: '堡壘衛士戰鬥開始時獲得的增益結束時，將50% 增益轉化成物攻及魔攻，並獲得25%攻速。獲得1個伊羅旖跟1個賈克斯。' },
    { id: 'cg', name: '靈魂連結', tier: 2, description: '我方隊伍每4秒回復6%最大生命。每失去10點生生命，治療量增加0.5%。' },
    { id: 'ch', name: '饜足術士', tier: 2, description: '單位技能施放後，英雄增加20%全能吸血，持續3秒。該補的治療量將變成一個護層，護盾層上限為300生命。' },
    { id: 'BRB', name: '馬上回來', tier: 2, description: '在接下來的3回合，你無法進行任何行動。然後，會獲得2個完整道具鐵鉤。' },
    { id: 'ci', name: '高分新紀錄', tier: 2, description: '賽博霸主造成傷害時會提升等級，並他們達到下個高分點時，獲得1.5%攻速及額外戰利品。' },
    { id: 'cj', name: '高貴犧牲', tier: 2, description: '每次戰鬥中，首次有友軍陣亡時，賦予我方隊伍最靠近該友軍25+10%的物防和魔防和傷防。' },
    { id: 'ck', name: '高速殺戮', tier: 2, description: '速射單位以2堆層開始戰鬥且可以累積至15層。若你在18秒內贏得戰鬥，則獲得2金錢。獲得1個逆命及1個寇格魔。' },
    { id: 'cl', name: '高電壓', tier: 2, description: '獲得1個離子星火。你的離子星火光程徑+3格，傷害增加25%。' },
    { id: 'cm', name: '魔力流動 II', tier: 2, description: '戰鬥開始時，後排單位每次普攻可額外獲得3魔力。' },
    { id: 'A Magic Roll', name: '魔法擲骰', tier: 2, description: '擲骰3次。根據擲骰數獲得獎勵。' },
    { id: 'All That Shinmmers', name: '鱗光四射', tier: 2, description: '選擇一件能產生金錢的神器道具，然後獲得一台磁性卸除器。' },
    { id: 'All That Shinmmers+', name: '鱗光四射+', tier: 2, description: '選擇一件能產生金錢的神器，獲得一台磁性卸除器以及4金錢。' },
    { id: 'Golden Fleece', name: '黃金羊毛', tier: 2, description: '每經歷2場戰鬥，每個開運金牛單位掉落1金錢。我方利息上限改為7。獲得1個葛雷夫、1個亞歷斯塔與1金錢。' },
    { id: 'Golden Fleece+', name: '黃金羊毛+', tier: 2, description: '每經歷2場戰鬥，每個開運金牛單位掉落1金錢。我方利息上限改為7。獲得1個葛雷夫、1個亞歷斯塔與4金錢。' },
    { id: 'Raining Gold', name: '天降金幣', tier: 2, description: '立即獲得8金錢。且每回合獲得1金錢。' },
    { id: 'Raining Gold+', name: '天降金幣+', tier: 2, description: '立即獲得18金錢。且每回合獲得1金錢。' },
    { id: 'Last Stand', name: '最後一搏', tier: 2, description: '我方首次將被淘汰時會逃離死亡，且我方隊伍會永久獲得200生命、10%物理與魔法防禦及10%全能吸血效果。' },
    { id: 'Geared Up II', name: '整裝備戰 II', tier: 2, description: '在你的備戰區的英雄將每回合永久獲得35生命、3%物理攻擊、3魔法攻擊。英雄在開始時就帶有1層此效果，累加上限為4層。' },
    { id: 'Cybernetic Uplink II', name: '模控機械上鏈 II', tier: 2, description: '你的英雄裝備一件道具可獲得120生命並每秒回復2.5魔力。' },
    { id: 'Cybernetic Transplant II', name: '模控機械移植 II', tier: 2, description: '你的英雄裝備一件道具可獲得120生命與20%物理攻擊。' },
    { id: 'Healing Orb II', name: '治療靈球 II', tier: 2, description: '敵軍陣亡後，最靠近的友軍回復400生命。' },
    { id: 'Private Funds', name: '私房錢', tier: 2, description: '你不會獲得利息，但每個玩家戰鬥回合開始時獲得3金錢。立即獲得3金錢。利息是指每10金錢可獲得的額外金錢。' },
    { id: 'Calculated Loss', name: '這次戰敗也在計算之中', tier: 2, description: '在你的備戰區敗北後，獲得2金錢與一次免費的商店刷新。' },
    { id: 'Ascension', name: '飛昇', tier: 2, description: '戰鬥開始15秒後，我方單位獲得60%傷害增幅。' },
    

    { id: 'cn', name: '一個Buff，兩個Buff', tier: 3, description: '獲得1個紅Buff、1個藍Buff及1件英雄複製裝置。' },
    { id: 'co', name: '三連勝 II', tier: 3, description: '獲得3個3費英雄。友軍獲得5%攻速。戰鬥開始時，3個隨機3費英雄增加300生命和25%攻速。' },
    { id: 'cp', name: '不穩定的進化', tier: 3, description: '我方英雄升星時隨機獲得下列其中一項加成：33生命、33%攻速、33%物理攻擊、或33脫法攻擊。' },
    { id: 'cq', name: '值得等待 II', tier: 3, description: '隨機獲得1位2費英雄。每回合開始獲得1個其複製體，持續到這場遊戲結束。' },
    { id: 'cr', name: '先鋒戰士之冠', tier: 3, description: '獲得1枚先鋒戰士徽章、1個保衛者之誓及1個史加納。' },
    { id: 'cs', name: '先鋒戰士之環', tier: 3, description: '獲得1枚先鋒戰士徽章及1個布朗姆。' },
    { id: 'ct', name: '公理弧刃 III', tier: 3, description: '獲得5支巨型魔杖，我方巨型魔杖給予3%攻速。' },
    { id: 'cu', name: '共享光采', tier: 3, description: '現在以及每個階段開始時，商店內將有4個不同真英雄，並獲得6金錢。' },
    { id: 'cv', name: '刀劍湧流', tier: 3, description: '獲得5把暴風之劍，我方暴風之劍給予2%攻速。' },
    { id: 'cw', name: '加冕', tier: 3, description: '獲得1頂棋手皇冠。棋手皇冠、護盾和披風賦予裝備者額外25%攻速、25%物攻和35魔攻。' },
    { id: 'cx', name: '勝者發財', tier: 3, description: '贏得玩家戰鬥後，每有2名英雄存活，獲得1金錢。獲得16經驗值。' },
    { id: 'cy', name: '升級！', tier: 3, description: '購買經驗值時，額外獲得2經驗值，立即獲得12經驗值。' },
    { id: 'cz', name: '只買高檔貨 II', tier: 3, description: '每次你刷新商店，你有45%機率會獲得一次免費刷新。' },
    { id: 'da', name: '召喚虛靈', tier: 3, description: '獲得1個虛空之門。每經過10次玩家戰鬥，再獲得1個。虛空之門虛靈增加30%攻速和30%全能吸血。' },
    { id: 'db', name: '向上流動', tier: 3, description: '購買經驗值費用減1。每次升級，都會獲得2生命和2次免費重抽機會。' },
    { id: 'dc', name: '吸取精華', tier: 3, description: '戰鬥開始：最多有6個裝備1件以下道具的英雄，從最靠近那名裝備道具的友軍身上獲得1件隨機完整道具的複製品。' },
    { id: 'dd', name: '地底寶藏 III', tier: 3, description: '接下來6個回合開始時(包含這一回合)，各獲得1個隨機掉落道具組件。' },
    { id: 'de', name: '堡壘之冠', tier: 3, description: '獲得1枚堡壘衛士徽章、1件堅定之心及1個伊羅旖。' },
    { id: 'df', name: '堡壘之環', tier: 3, description: '獲得1枚堡壘徽章及1個加里歐。' },
    { id: 'dg', name: '壯碩夥伴 III', tier: 3, description: '我方寵位增加20%暴擊率，且技能可以暴擊。暴擊基礎傷害加20%獲取護盾量，持續3秒。' },
    { id: 'dh', name: '好運手套', tier: 3, description: '竊賊手套必定會給你的英雄理想的道具。獲得2雙格鬥手套。7回合後，再獲得一雙格鬥手套。' },
    { id: 'di', name: '好運手套+', tier: 3, description: '竊賊手套必定會給你的英雄理想的道具，獲得3副格門手套。' },
    { id: 'dj', name: '守望者之選', tier: 3, description: '隨等級提升，獲得的道具會越來越強。等級4：組件盤點；等級6：完整道具盤點；等級7：從5件盤光道具中擇1' },
    { id: 'dk', name: '射手之冠', tier: 3, description: '獲得1枚射手徽章、1把無盡之刃及1個燼。' },
    { id: 'dl', name: '射手之環', tier: 3, description: '獲得1枚射手徽章及1個吉茵珂絲。' },
    { id: 'dm', name: '山寨版', tier: 3, description: '獲得1個輔助盤點及1個完整道具盤點。' },
    { id: 'dn', name: '巨獸決意', tier: 3, description: '獲得1個泰坦的決意，2場玩家戰鬥後再獲得1個。泰坦的決意堆層上限從25層改為50層。雙防總加成增加50%。' },
    { id: 'do', name: '巨獸決意+', tier: 3, description: '獲得1個泰坦的決意，2場玩家戰鬥後再獲得1個。泰坦的決意堆層上限從25層改為50層。雙防總加成增加50%。' },
    { id: 'dp', name: '強力投入', tier: 3, description: '獲得1枚隨機徽章，現在以及每隨機段開始時，我方隨機4位英雄增加40%物攻與50魔攻。' },
    { id: 'dq', name: '微光龍鱗精粹', tier: 3, description: '現在以及每個隨段開始時，獲得1枚隨機徽章，我們隨機每持有1枚徽章便增加20生命。' },
    { id: 'dr', name: '快刷快想', tier: 3, description: '每次你刷新商店，你有45%機率會獲得一次免費刷新。' },
    { id: 'ds', name: '快拳連打', tier: 3, description: '獲得1支錫柯的號角。獲得錫柯的號角增益的英雄增加45%暴擊率。' },
    { id: 'dt', name: '情緒管理', tier: 3, description: '你目前和之後取得的完整道具都會變為鬼索的狂暴之刃，其賦予45物防與魔防。狂暴之刃每2層會賦予1%物攻與魔攻。' },
    { id: 'du', name: '戰爭紅利 III', tier: 3, description: '敵軍死亡時，有45%機率會掉落戰利品。' },
    { id: 'dv', name: '戰略軍師之冠', tier: 3, description: '獲得1枚戰略軍師徽章、1頂適性神盔及1個艾克。' },
    { id: 'dw', name: '戰略軍師之環', tier: 3, description: '獲得1枚戰略軍師徽章及1個悠咪。' },
    { id: 'dx', name: '技師之冠', tier: 3, description: '獲得1枚技師徽章、1副寶石手套及1個希瓦娜。' },
    { id: 'dy', name: '技師之環', tier: 3, description: '獲得1枚技師徽章及1個魔鬥凱薩。' },
    { id: 'dz', name: '投資+', tier: 3, description: '獲得26金錢，每回合開始時，超過50金錢後每有10金錢(最多累計至80金錢)，便獲得1次商店重抽機會。' },
    { id: 'ea', name: '投資++', tier: 3, description: '獲得45金錢，每回合開始時，超過50金錢後每有10金錢(最多累計至80金錢)，便獲得1次商店重抽機會。' },
    { id: 'eb', name: '投資策略 II', tier: 3, description: '每賺取一點利息，我方英雄永久獲得8最大生命。我方利息上限提升至7。獲得3金錢。' },
    { id: 'ec', name: '擲骰子', tier: 3, description: '獲得1副搗蛋鬼手套。此道具每回合會隨機裝備2件聖光道具' },
    { id: 'ed', name: '最大上限', tier: 3, description: '我方等級上限為7。獲得1聯盟棋手護盾，使我方人數+1，並獲得40金錢。' },
    { id: 'ee', name: '最終庫存', tier: 3, description: '每次結束玩家戰門後，獲得2玩家生命與1金錢。我方聯盟領袖也會提升跑速，立即獲得15金錢。' },
    { id: 'ef', name: '末日機器之冠', tier: 3, description: '獲得1枚末日機器人徽章、1把史提克彈簧刀及1個史加納。' },
    { id: 'eg', name: '末日機器之環', tier: 3, description: '獲得1枚末日機器人徽章及1個費德提克。' },
    { id: 'eh', name: '棋手廚房', tier: 3, description: '獲得1枚隨機徽章，6場玩家戰門後，獲得1件棋手披風。' },
    { id: 'ei', name: '極限之冠', tier: 3, description: '獲得1枚極限徽章、1把鬼索的狂暴之刃及1個娜菲芮。' },
    { id: 'ej', name: '極限之環', tier: 3, description: '獲得1枚極限科技徽章及1個魔鬥凱薩。' },
    { id: 'ek', name: '模控機械移植 III', tier: 3, description: '你的英雄裝備一件道具可獲得200生命與30%物理攻擊。' },
    { id: 'el', name: '殺戮者之冠', tier: 3, description: '獲得1枚殺戮者徽章、1副正義手套及1個汎。' },
    { id: 'em', name: '殺戮者之環', tier: 3, description: '獲得1枚殺戮者徽章及1個嘉文四世。' },
    { id: 'en', name: '泰坦之武', tier: 3, description: '我方隊伍獲得相當於1.25%最大生命的物理攻擊；相當於1.25%最大生命的魔法攻擊。' },
    { id: 'eo', name: '洞燭先機 II', tier: 3, description: '可以得知下一場即將對戰的對手。獲得2個訓練假人，各自裝備著西風匕首或寂靜法衣。' },
    { id: 'ep', name: '活到老學到老', tier: 3, description: '你的單位每回合獲得2%生命。如果他們在戰鬥中存活，獲得額外2.5險法攻擊與3%物理攻擊。' },
    { id: 'eq', name: '活火爐', tier: 3, description: '立即獲得1個神器鐵砧，且每進行10場玩家對戰回合可獲得1個神器鐵砧。' },
    { id: 'er', name: '流浪假人 II', tier: 3, description: '獲得1個永久性橫3枚徽章的訓練假人，獲得6金錢。' },
    { id: 'es', name: '海賊王', tier: 3, description: '獲得25金錢，我方利息上限提升至10。利息是指每擁10金錢可獲得的額外金錢。' },
    { id: 'et', name: '混沌召喚', tier: 3, description: '獲得1項強大的隨機獎勵。' },
    { id: 'eu', name: '渾身是勁 III', tier: 3, description: '獲得1個籃Buff。我方單位增加15质攻。施放技能後獲得5碗力。' },
    { id: 'ev', name: '潘朵拉的道具 III', tier: 3, description: '回合開始：我方備戰區中的道具將隨機變化。獲得1件隨機聖光道具。' },
    { id: 'ew', name: '炫目神速', tier: 3, description: '獲得巨人殺手、鬼索的狂暴之刃、反曲弓和磁性卸除器。' },
    { id: 'ex', name: '無可動搖', tier: 3, description: '獲得1個蘭頓之兆。其攻擊距離增加1格，且效果提升33%。' },
    { id: 'ey', name: '無盡軍勢', tier: 3, description: '最大隊伍規模+3，但我方單位只能持有1件道具，且生命總量減少20%。獲得8金錢。' },
    { id: 'ez', name: '無盡軍勢+', tier: 3, description: '最大隊伍規模+3，但我方單位只能持有1件道具，且生命總量減少20%。獲得8金錢。' },
    { id: 'fa', name: '燃熱靈魂 II', tier: 3, description: '戰鬥開始：我方攻速最高的英雄會增加35廣法攻擊與35%政速。每3秒對另一名友軍重複此效果。' },
    { id: 'fb', name: '狙擊武器 II', tier: 3, description: '戰鬥開始時，部署在後2排的單位攻擊距離愛成無限並獲得18%攻速。' },
    { id: 'fc', name: '現在我是主力', tier: 3, description: '取得1名擁有量身打造進攻性道具的魔像，每個階段開始時都會變得更強。' },
    { id: 'fd', name: '生化過載', tier: 3, description: '在第二排的隨機棋格打開通往佐恩的3道傳送門。戰鬥開始時，站在傳送門上的單价塔加250生命與30%政速，並在陣亡時掉落1金錢。' },
    { id: 'fe', name: '生日禮物', tier: 3, description: '每次我方升級時，獲得1名2星英雄與1金錢。獲得英雄的費用階級等同於你的等級減4 (最高：5費)。' },
    { id: 'ff', name: '畫龍點睛', tier: 3, description: '獲得1個輔助鐵砧及1個完整道具鐵砧。' },
    { id: 'fg', name: '發電機之冠', tier: 3, description: '獲得1枚發電機徽章、1把精進之矛及1個燼。' },
    { id: 'fh', name: '發電機之環', tier: 3, description: '獲得1枚發電機徽章及1個伊莉絲。' },
    { id: 'fi', name: '百獸之冠', tier: 3, description: '獲得1枚百獸特攻隊徽章、1頂適性神盔及1個伊羅旖。' },
    { id: 'fj', name: '百獸之環', tier: 3, description: '獲得1枚百獸特攻隊徽章及1個悠咪。' },
    { id: 'fk', name: '皎潔月光', tier: 3, description: '戰鬥開始時：1個隨機1費英雄當回合升級至4星，並增加5%物攻與5魔攻。' },
    { id: 'fl', name: '盜墓者 II', tier: 3, description: '獲得1個完整道具鐵砧。每次有玩家陣亡，即可拿走對方一件完整道具。' },
    { id: 'fm', name: '盧登回音 III', tier: 3, description: '每測耗60廣力，我方單位下次造成的技能傷害額外對目標和附近敵車造成100-250（取決於目前階段）魔法傷害。' },
    { id: 'fn', name: '神諭之冠', tier: 3, description: '獲得1枚神諭集團徽章、1個贖罪神石及1個勒哈斯特。' },
    { id: 'fo', name: '神諭之環', tier: 3, description: '獲得1枚神諭集團徽章及1個姍娜。' },
    { id: 'fp', name: '稜鏡票券', tier: 3, description: '每次你刷新商店，你有45%機率會獲得一次免費刷新。' },
    { id: 'fq', name: '稜鏡管道', tier: 3, description: '下一個非玩家戰鬥回合會多掉落1顆滿是精彩戰利品的稜鏡晶球。' },
    { id: 'fr', name: '穿刺蓮花 II', tier: 3, description: '我方隊伍增加20%暴擊率，且技能可以暴擊。暴擊對目標附加20%削抗和破甲，持續3秒。' },
    { id: 'fs', name: '精打細算', tier: 3, description: '每當你刷新商店時，獲得2點經驗值。獲得1金錢。' },
    { id: 'ft', name: '精算強化', tier: 3, description: '每場戰鬥中，我方最後兩排的隨機4位英雄增加40%物攻與50魔攻。' },
    { id: 'fu', name: '罪惡之冠', tier: 3, description: '獲得1枚罪惡集團徽章、1把無盡之刃及1個達瑞斯。' },
    { id: 'fv', name: '罪惡之環', tier: 3, description: '獲得1枚罪惡集團徽章及1個布郎姆。' },
    { id: 'fw', name: '聖光重構', tier: 3, description: '獲得1件傑作升級道具及1個組件鐵砧。' },
    { id: 'fx', name: '聖物抉擇', tier: 3, description: '從5件聖光道具中擇1。獲得1台磁性卸除器。' },
    { id: 'fy', name: '腰帶多多', tier: 3, description: '獲得5個巨人腰帶。你的巨人腰帶會賦予+60額外生命。' },
    { id: 'fz', name: '處刑者之冠', tier: 3, description: '獲得1枚處刑者徽章、1個破防者及1個葛雷夫。' },
    { id: 'ga', name: '處刑者之環', tier: 3, description: '獲得1枚處刑者徽章及1個雷葛爾。' },
    { id: 'gb', name: '虧機星期五', tier: 3, description: '獲得1個無盡之力。5場玩家戰鬥後，再獲得1個。' },
    { id: 'gc', name: '虧機星期五+', tier: 3, description: '獲得1個無盡之力。3場玩家戰鬥後，再獲得1個。' },
    { id: 'gd', name: '蠻勇之冠', tier: 3, description: '獲得1枚蠻勇鬥士徽章、1個皇冠守衛及1個達瑞斯。' },
    { id: 'ge', name: '蠻勇之環', tier: 3, description: '獲得1枚蠻勇鬥士徽章及1個古拉格斯。' },
    { id: 'gf', name: '街頭狂魔之冠', tier: 3, description: '獲得1枚街頭狂魔徽章、1把破防者及1個艾克。' },
    { id: 'gg', name: '街頭狂魔之環', tier: 3, description: '獲得1枚街頭狂魔徽章及1個吉茵珂絲。' },
    { id: 'gh', name: '訂閱服務', tier: 3, description: '現在以及每個階段開始時，商店內將有4個不同4費英雄，並獲得6金錢。' },
    { id: 'gi', name: '詛咒之冠', tier: 3, description: '最大隊伍規模+2，但輸掉玩家戰門時額外受到100%玩家信吉。' },
    { id: 'gj', name: '買不手軟', tier: 3, description: '升級時，獲得等同於等級數字+1的商店免費刷新次數。獲得4金錢。' },
    { id: 'gk', name: '質大於量', tier: 3, description: '恰好裝備1件道具的單位，將該道具升級至聖光等級。裝備聖光道具的單位增加4%生命。獲得2台磁性卸除器。' },
    { id: 'gl', name: '越戰越勇 III', tier: 3, description: '我方隊伍立即增加12%攻速。每過一個回合，再增加2%。' },
    { id: 'gm', name: '迷你小英雄', tier: 3, description: '每次結束玩家戰門後，獲得2玩家生命與1金錢。我方聯盟領袖也會提升跑速。' },
    { id: 'gn', name: '迷你小英雄+', tier: 3, description: '每次結束玩家戰門後，獲得2玩家生命與1金錢。我方聯盟領袖也會提升跑速，立即獲得15金錢。' },
    { id: 'go', name: '速射之冠', tier: 3, description: '獲得1枚速射徽章、1把巨人殺手及1個逆命。' },
    { id: 'gp', name: '速射之環', tier: 3, description: '獲得1枚速射徽章及1個達瑞文。' },
    { id: 'gq', name: '避險基金', tier: 3, description: '獲得25金錢。我方利息上限提升至10。' },
    { id: 'gr', name: '金牛之冠', tier: 3, description: '獲得1枚開運金牛徽章、1把納什之牙及1個葛雷夫。' },
    { id: 'gs', name: '金牛之環', tier: 3, description: '獲得1枚開運金牛徽章及1個嘉文四世。' },
    { id: 'gt', name: '銅級之命 II', tier: 3, description: '每啟用一項銅級特性，我方隊伍獲得3.5%傷害增幅與1%續戰力。' },
    { id: 'gu', name: '鏡之廳', tier: 3, description: '戰鬥開始：我方所有前排英雄變成該排最中間那位英雄的複製體。複製體的生命為其原有生命的100%，且造成的傷害降低5%。' },
    { id: 'gv', name: '長久之計', tier: 3, description: '獲得1個副護符之光，真攻擊距離增加1格，且效果提升33%。' },
    { id: 'gw', name: '開局新手包 I', tier: 3, description: '獲得1名隨機3星1費英雄，獲得8金錢。' },
    { id: 'gx', name: '陽壽局', tier: 3, description: '購買XP從4金錢改為花毀6玩家生命。在玩家戰鬥開始前，治療3玩家生命。' },
    { id: 'gy', name: '雙胞胎 III', tier: 3, description: '部署正好2名相同英雄時，兩者都獲得35%物理攻擊與35质法攻擊、物理防禦和隨法防禦。將其升至3星時，獲得1名該英雄的2星複製單位。' },
    { id: 'gz', name: '雙重目的', tier: 3, description: '每回合首次購買經驗值時，獲得2金錢。每次購買經驗值，都會刷新商店。' },
    { id: 'ha', name: '雙重空投物資', tier: 3, description: '戰鬥開始時：裝備2件道具的最多4名英雄獲得第3件系統推薦的完鍪道具。' },
    { id: 'hb', name: '電擊療法', tier: 3, description: '獲得1把史提克彈簧刀，5場玩家戰鬥後再獲得1把。我方的史提克彈簧刀賦予10%額外攻速，其連鎖閃電效果額外造成30-120%傷害（取決於階段等級）。' },
    { id: 'hc', name: '電擊療法+', tier: 3, description: '獲得1把史提克彈簧刀，5場玩家戰鬥後再獲得1把。我方的史提克彈簧刀賦予10%額外攻速，其連鎖閃電效果額外造成30-120%傷害（取決於階段等級）。' },
    { id: 'hd', name: '靈活變通', tier: 3, description: '獲得1枚隨機徽章。每個階段開始時，獲得1枚隨機徽章。我方隊伍每持有1枚徽章便增加20生命。' },
    { id: 'he', name: '非凡冒險', tier: 3, description: '獲得3位2費英雄。若將其中2位英雄升到3星，則會獲得1顆充滿戰利品的晶球。接下來2個階段開始時，獲得1件初級英雄複製裝置，' },
    { id: 'hf', name: '預料中的意外', tier: 3, description: '獲得1個無盡之力，5場玩家戰門後，再獲得1個。' },
    { id: 'hg', name: '魔杖湧流', tier: 3, description: '獲得5支巨型魔杖，我方巨型魔杖給予3%攻速。' },
    { id: 'hi', name: '最終飛昇', tier: 3, description: '我方隊伍獲得15%傷害增幅，15秒後，改為獲得50%傷害增幅。' },
    { id: 'hj', name: '模控機械上鏈 III', tier: 3, description: '你的英雄裝備一件道具可獲得200生命並每秒回復3.5魔力。' },
    { id: 'hk', name: '模控機械批量 III', tier: 3, description: '裝備一件道具的英雄增加500生命。' },
];

// 當前選擇的標籤和過濾條件
let selectedItem = null;
let selectedItemType = null;
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

// 選擇項目函數
function selectItem(item, type) {
    selectedItem = item;
    selectedItemType = type;
    console.log(`已選擇: ${item.name} (${type})`);
    
    // 移除之前選中項目的高亮
    document.querySelectorAll('.grid-item').forEach(el => {
        el.classList.remove('selected');
    });
    
    // 為當前選中的項目添加高亮
    const selectedElements = document.querySelectorAll(`.grid-item[data-id="${item.id}"]`);
    selectedElements.forEach(el => {
        el.classList.add('selected');
    });
}


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
        const imgContainer = document.createElement('div');
        imgContainer.className = 'hex-img-container';
        
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
        
        imgContainer.appendChild(img);
        hexagon.appendChild(imgContainer);
        
        // 添加標籤顯示名稱
        const label = document.createElement('div');
        label.textContent = selectedItem.name;
        label.className = 'hex-label';
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

function createChampionGridItem(champion) {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.dataset.id = champion.id;
    
    // 添加背景顏色以反映英雄費用
    gridItem.style.backgroundColor = getCostBackgroundColor(champion.cost);
    gridItem.style.boxShadow = `0 0 5px ${getCostColor(champion.cost)}`;
    
    const img = document.createElement('img');
    img.src = isImageAvailable('champions', champion.id) ? `images/champions/${champion.id}.png` : '/api/placeholder/40/40';
    img.alt = champion.name;
    img.title = champion.name;
    
    gridItem.appendChild(img);
    
    const name = document.createElement('div');
    name.className = 'item-name';
    name.textContent = champion.name;
    name.style.color = getCostTextColor(champion.cost);
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

// 根據費用獲取背景顏色
function getCostBackgroundColor(cost) {
    switch (cost) {
        case 1: return '#2A2A2A'; // 灰色背景 - 一費
        case 2: return '#213824'; // 深綠色背景 - 二費
        case 3: return '#1A2940'; // 深藍色背景 - 三費
        case 4: return '#2A1A33'; // 深紫色背景 - 四費
        case 5: return '#332B1A'; // 深金色背景 - 五費
        default: return '#2A2A3A';
    }
}

// 根據費用獲取文字顏色
function getCostTextColor(cost) {
    switch (cost) {
        case 1: return '#BBBBBB'; // 灰色文字 - 一費
        case 2: return '#7FC97F'; // 綠色文字 - 二費
        case 3: return '#386CB0'; // 藍色文字 - 三費
        case 4: return '#F0027F'; // 紫色文字 - 四費
        case 5: return '#FFD700'; // 金色文字 - 五費
        default: return '#FFFFFF';
    }
}