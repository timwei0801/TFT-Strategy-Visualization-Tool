// recommendations.js
class RecommendationSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedHeroes = [];
        this.init();
    }
    
    init() {
        // 英雄選擇事件
        const heroSearch = document.getElementById('hero-search');
        const addHeroBtn = document.getElementById('add-hero');
        const selectedHeroesContainer = document.querySelector('.selected-heroes');
        const recommendBtn = document.getElementById('recommend-btn');
        
        // 加載英雄數據用於搜尋
        this.loadHeroData().then(heroes => {
            // 實現簡單的英雄搜尋
            const setupAutocomplete = (inputElem, heroes) => {
                let currentFocus;
                
                inputElem.addEventListener('input', function() {
                    const val = this.value;
                    closeAllLists();
                    
                    if (!val) return false;
                    currentFocus = -1;
                    
                    const autocompleteList = document.createElement('div');
                    autocompleteList.setAttribute('id', this.id + '-autocomplete-list');
                    autocompleteList.setAttribute('class', 'autocomplete-items');
                    this.parentNode.appendChild(autocompleteList);
                    
                    for (const hero of heroes) {
                        if (hero.name.toLowerCase().includes(val.toLowerCase())) {
                            const item = document.createElement('div');
                            item.innerHTML = `<strong>${hero.name}</strong>`;
                            item.innerHTML += `<input type='hidden' value='${hero.name}'>`;
                            
                            item.addEventListener('click', function() {
                                inputElem.value = this.getElementsByTagName('input')[0].value;
                                closeAllLists();
                            });
                            
                            autocompleteList.appendChild(item);
                            
                            if (autocompleteList.children.length >= 5) break; // 限制顯示數量
                        }
                    }
                });
                
                function closeAllLists(elmnt) {
                    const x = document.getElementsByClassName('autocomplete-items');
                    for (let i = 0; i < x.length; i++) {
                        if (elmnt !== x[i] && elmnt !== inputElem) {
                            x[i].parentNode.removeChild(x[i]);
                        }
                    }
                }
                
                document.addEventListener('click', function(e) {
                    closeAllLists(e.target);
                });
            };
            
            setupAutocomplete(heroSearch, heroes);
        });
        
        // 添加英雄按鈕
        addHeroBtn.addEventListener('click', () => {
            const heroName = heroSearch.value.trim();
            if (heroName && !this.selectedHeroes.includes(heroName)) {
                this.selectedHeroes.push(heroName);
                this.updateSelectedHeroes();
                heroSearch.value = '';
            }
        });
        
        // 推薦按鈕
        recommendBtn.addEventListener('click', () => {
            if (this.selectedHeroes.length > 0) {
                this.getRecommendations();
            } else {
                alert('請先選擇至少一名英雄');
            }
        });
    }
    
    updateSelectedHeroes() {
        const container = document.querySelector('.selected-heroes');
        container.innerHTML = '';
        
        this.selectedHeroes.forEach(hero => {
            const heroTag = document.createElement('div');
            heroTag.className = 'hero-tag';
            heroTag.innerHTML = `
                ${hero}
                <span class="remove-hero" data-hero="${hero}">×</span>
            `;
            container.appendChild(heroTag);
        });
        
        // 添加移除事件
        document.querySelectorAll('.remove-hero').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const heroToRemove = e.target.getAttribute('data-hero');
                this.selectedHeroes = this.selectedHeroes.filter(h => h !== heroToRemove);
                this.updateSelectedHeroes();
            });
        });
    }
    
    loadHeroData() {
        // 這裡可以從API加載英雄數據，或使用靜態數據
        return new Promise(resolve => {
            const staticHeroes = [
                { id: 'Alistar', name: '亞歷斯塔' },
                { id: 'Nidalee', name: '奈德麗' },
                { id: "Kog'Maw", name: '寇格魔' },
                { id: 'Zyra', name: '枷蘿' },
                { id: 'Poppy', name: '波比' },
                { id: 'Seraphine', name: '瑟菈紛' },
                { id: 'Vi', name: '菲艾' },
                { id: 'DrMundo', name: '蒙多醫生' },
                { id: 'Shaco', name: '薩科' },
                { id: 'Jax', name: '賈克斯' },
                { id: 'Sylas', name: '賽勒斯' },
                { id: 'Kindred', name: '鏡爪' },
                { id: 'Morgana', name: '魔甘娜' },
                { id: 'Illaoi', name: '伊羅旖' },
                { id: 'Rhaast', name: '勒哈斯特' },
                { id: 'LeBlanc', name: '勒布朗' },
                { id: 'Skarner', name: '史加納' },
                { id: 'Naafiri', name: '娜菲芮' },
                { id: 'Shyvana', name: '希瓦娜' },
                { id: 'Vayne', name: '汎' },
                { id: 'Jhin', name: '燼' },
                { id: 'Veigar', name: '維迦' },
                { id: 'Ekko', name: '艾克' },
                { id: 'Graves', name: '葛雷夫' },
                { id: 'Twisted Fate', name: '逆命' },
                { id: 'Darius', name: '達瑞斯' },
                { id: 'Elise', name: '伊莉絲' },
                { id: 'Galio', name: '加里歐' },
                { id: 'Gragas', name: '古拉格斯' },
                { id: 'Jinx', name: '吉茵珂絲' },
                { id: 'Jarvan IV', name: '嘉文四世' },
                { id: 'Senna', name: '姍娜' },
                { id: 'Braum', name: '布朗姆' },
                { id: 'Yuumi', name: '悠咪' },
                { id: 'Varus', name: '法洛士' },
                { id: 'Fiddlesticks', name: '費德提克' },
                { id: 'Draven', name: '達瑞文' },
                { id: 'Rengar', name: '雷葛爾' },
                { id: 'Mordekaiser', name: '魔鬥凱薩' },
                { id: 'Aphelios', name: '亞菲利歐' },
                { id: 'Xayah', name: '剎雅' },
                { id: 'Zed', name: '劫' },
                { id: 'Sejuani', name: '史瓦妮' },
                { id: 'Miss Fortune', name: '好運姐' },
                { id: 'Neeko', name: '妮可' },
                { id: 'Zeri', name: '婕莉' },
                { id: 'Annie', name: '安妮' },
                { id: 'Brand', name: '布蘭德' },
                { id: 'Ziggs', name: '希格斯' },
                { id: "Cho'Gath", name: '科加斯' },
                { id: 'Vex', name: '薇可斯' },
                { id: 'Leona', name: '雷歐娜' },
                { id: 'Zac', name: '札克' },
                { id: 'Kobuko', name: '柯布柯' },
                { id: 'Aurora', name: '歐羅拉' },
                { id: 'Urgot', name: '烏爾加特' },
                { id: 'Samira', name: '煞蜜拉' },
                { id: 'Viego', name: '維爾戈' },
                { id: 'Garen', name: '蓋倫' },
                { id: 'Renekton', name: '雷尼克頓' },
            ];
            resolve(staticHeroes);
        });
    }
    
    
    getRecommendations() {
        // 呼叫API獲取推薦
        fetch('/api/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ heroes: this.selectedHeroes })
        })
        .then(response => response.json())
        .then(data => {
            this.displayRecommendations(data);
            // 切換到推薦頁籤
            document.querySelector('.tab-btn[data-tab="recommendations"]').click();
        })
        .catch(error => console.error('Error getting recommendations:', error));
    }
    
    displayRecommendations(recommendations) {
        const container = document.getElementById('comp-recommendations');
        container.innerHTML = '';
        
        if (recommendations.length === 0) {
            container.innerHTML = '<div class="no-results">沒有找到合適的推薦陣容</div>';
            return;
        }
        
        recommendations.forEach((rec, index) => {
            const recCard = document.createElement('div');
            recCard.className = 'recommendation-card';
            
            // 計算羈絆標籤
            const traitTags = rec.active_traits.map(trait => {
                const traitName = this.getTraitChineseName(trait.name);
                return `<span class="trait-tag" data-level="${trait.level}">${traitName} (${trait.level}/${trait.max_level})</span>`;
            }).join('');
            
            // 計算推薦的英雄
            const recommendedHeroes = rec.recommended_heroes.map(hero => {
                return `<div class="recommended-hero">${this.getHeroChineseName(hero)}</div>`;
            }).join('');
            
            recCard.innerHTML = `
                <div class="rec-header">
                    <h3>推薦陣容 #${index + 1}</h3>
                    <span class="placement">排名: ${rec.placement}</span>
                </div>
                <div class="traits-container">
                    ${traitTags}
                </div>
                <div class="rec-content">
                    <div class="current-heroes">
                        <h4>當前英雄</h4>
                        <div class="heroes-list">
                            ${this.selectedHeroes.map(h => `<div class="current-hero">${h}</div>`).join('')}
                        </div>
                    </div>
                    <div class="recommended-heroes">
                        <h4>推薦添加</h4>
                        <div class="heroes-list">
                            ${recommendedHeroes}
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(recCard);
        });
    }
    
    getTraitChineseName(traitId) {
        // 羈絆ID轉中文名
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
        
        // 移除TFT14_前綴以匹配字典
        const cleanId = traitId.replace('TFT14_', '');
        return traitNames[cleanId] || cleanId;
    }
    
    getHeroChineseName(heroId) {
        // 英雄ID轉中文名
        const heroNames = {
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
            "雷尼克頓": "Renekton",
        }
        hero_id = hero_ids.get(hero_name, hero_name)
        return heroNames[heroId] || heroId.replace('TFT14_', '');
    }
}

// 初始化推薦系統
document.addEventListener('DOMContentLoaded', () => {
    const recommendationSystem = new RecommendationSystem('comp-recommendations');
});