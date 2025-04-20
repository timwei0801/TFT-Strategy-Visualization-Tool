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
                { id: 'TFT14_Poppy', name: '波比' },
                { id: 'TFT14_Veigar', name: '維迦' },
                { id: 'TFT14_Ziggs', name: '希格斯' },
                { id: 'TFT14_KogMaw', name: '柯布柯' },
                { id: 'TFT14_Nidalee', name: '奈德麗' },
                { id: 'TFT14_Yuumi', name: '悠咪' },
                { id: 'TFT14_Annie', name: '安妮' },
                { id: 'TFT14_Samira', name: '煞蜜拉' },
                { id: 'TFT14_DrMundo', name: '蒙多醫生' },
                { id: 'TFT14_Jinx', name: '吉茵珂絲' },
                { id: 'TFT14_Ekko', name: '艾克' },
                { id: 'TFT14_Jhin', name: '燼' },
                { id: 'TFT14_Rengar', name: '雷葛爾' },
                { id: 'TFT14_Brand', name: '布蘭德' },
                { id: 'TFT14_Nilah', name: '妮可' },
                { id: 'TFT14_Seraphine', name: '瑟菈紛' },
                { id: 'TFT14_Sylas', name: '賽勒斯' },
                { id: 'TFT14_Irelia', name: '伊羅旖' },
                { id: 'TFT14_Wukong', name: '汎' },
                { id: 'TFT14_Leona', name: '雷歐娜' },
                { id: 'TFT14_Xayah', name: '剎雅' },
                { id: 'TFT14_Aurelia', name: '歐羅拉' },
                { id: 'TFT14_Jax', name: '賈克斯' },
                { id: 'TFT14_Ashe', name: '艾希' },
                { id: 'TFT14_Nami', name: '娜菲芮' },
                { id: 'TFT14_Mordekaiser', name: '魔鬥凱薩' },
                { id: 'TFT14_Pantheon', name: '法洛士' },
                { id: 'TFT14_Sejuani', name: '史瓦妮' },
                { id: 'TFT14_Morgana', name: '魔甘娜' },
                { id: 'TFT14_Hecarim', name: '勒哈斯特' },
                { id: 'TFT14_Gragas', name: '古拉格斯' },
                { id: 'TFT14_Senna', name: '姍娜' },
                { id: 'TFT14_Vex', name: '薇可絲' },
                { id: 'TFT14_Renekton', name: '雷尼克頓' },
                { id: 'TFT14_Fiora', name: '菲艾' },
                { id: 'TFT14_Leblanc', name: '勒布朗' },
                { id: 'TFT14_Draven', name: '達瑞文' },
                { id: 'TFT14_Galio', name: '加里歐' },
                { id: 'TFT14_Zed', name: '劫' },
                { id: 'TFT14_Kha', name: '鏡爪' },
                { id: 'TFT14_Shyvana', name: '希瓦娜' },
                { id: 'TFT14_Illaoi', name: '伊莉絲' },
                { id: 'TFT14_Alistar', name: '亞歷斯塔' },
                { id: 'TFT14_Graves', name: '葛雷夫' },
                { id: 'TFT14_JarvanIV', name: '嘉文四世' },
                { id: 'TFT14_Aphelios', name: '亞菲利歐' },
                { id: 'TFT14_Virgo', name: '維爾戈' },
                { id: 'TFT14_Shaco', name: '薩科' },
                { id: 'TFT14_Darius', name: '達瑞斯' },
                { id: 'TFT14_TwistedFate', name: '逆命' },
                { id: 'TFT14_Braum', name: '布郎姆' },
                { id: 'TFT14_MissFortune', name: '好運姐' },
                { id: 'TFT14_Naafiri', name: '納菲瑞' }
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
            'TFT14_CyberOverlords': '賽博霸主',
            'TFT14_AMP': 'A.M.P.',
            'TFT14_StreetPunk': '街頭狂魔',
            'TFT14_HyperTech': '極限科技',
            'TFT14_OracleCorp': '神諭集團',
            'TFT14_BehemothSquad': '百獸特攻隊',
            'TFT14_Decoders': '破譯師',
            'TFT14_Burnout': '爆燃戰隊',
            'TFT14_BigShot': '開運金牛',
            'TFT14_CrimeSyndicate': '罪惡集團',
            'TFT14_Bruiser': '蠻勇打手',
            'TFT14_Bastion': '堡壘衛士',
            'TFT14_Strategist': '戰略軍師',
            'TFT14_Gunner': '射手',
            'TFT14_Spellweaver': '技師',
            'TFT14_Executioner': '處刑者',
            'TFT14_Vanguard': '先鋒戰士',
            'TFT14_Generator': '發電機',
            'TFT14_Rapidfire': '速射',
            'TFT14_SoulReaper': '靈魂殺手',
            'TFT14_Juggernaut': '主宰'
        };
        return traitNames[traitId] || traitId.replace('TFT14_', '');
    }
    
    getHeroChineseName(heroId) {
        // 英雄ID轉中文名
        const heroNames = {
            'TFT14_Poppy': '波比',
            'TFT14_Veigar': '維迦',
            'TFT14_Ziggs': '希格斯',
            'TFT14_KogMaw': '柯布柯',
            'TFT14_Nidalee': '奈德麗',
            'TFT14_Yuumi': '悠咪',
            'TFT14_Annie': '安妮',
            'TFT14_Samira': '煞蜜拉',
            'TFT14_DrMundo': '蒙多醫生',
            'TFT14_Jinx': '吉茵珂絲',
            'TFT14_Ekko': '艾克',
            'TFT14_Jhin': '燼',
            'TFT14_Rengar': '雷葛爾',
            'TFT14_Brand': '布蘭德',
            'TFT14_Nilah': '妮可',
            'TFT14_Seraphine': '瑟菈紛',
            'TFT14_Sylas': '賽勒斯',
            'TFT14_Irelia': '伊羅旖',
            'TFT14_Wukong': '汎',
            'TFT14_Leona': '雷歐娜',
            'TFT14_Xayah': '剎雅',
            'TFT14_Aurelia': '歐羅拉',
            'TFT14_Jax': '賈克斯',
            'TFT14_Ashe': '艾希',
            'TFT14_Nami': '娜菲芮',
            'TFT14_Mordekaiser': '魔鬥凱薩',
            'TFT14_Pantheon': '法洛士',
            'TFT14_Sejuani': '史瓦妮',
            'TFT14_Morgana': '魔甘娜',
            'TFT14_Hecarim': '勒哈斯特',
            'TFT14_Gragas': '古拉格斯',
            'TFT14_Senna': '姍娜',
            'TFT14_Vex': '薇可絲',
            'TFT14_Renekton': '雷尼克頓',
            'TFT14_Fiora': '菲艾',
            'TFT14_Leblanc': '勒布朗',
            'TFT14_Draven': '達瑞文',
            'TFT14_Galio': '加里歐',
            'TFT14_Zed': '劫',
            'TFT14_Kha': '鏡爪',
            'TFT14_Shyvana': '希瓦娜',
            'TFT14_Illaoi': '伊莉絲',
            'TFT14_Alistar': '亞歷斯塔',
            'TFT14_Graves': '葛雷夫',
            'TFT14_JarvanIV': '嘉文四世',
            'TFT14_Aphelios': '亞菲利歐',
            'TFT14_Virgo': '維爾戈',
            'TFT14_Shaco': '薩科',
            'TFT14_Darius': '達瑞斯',
            'TFT14_TwistedFate': '逆命',
            'TFT14_Braum': '布郎姆',
            'TFT14_MissFortune': '好運姐',
            'TFT14_Naafiri': '納菲瑞'
        };
        return heroNames[heroId] || heroId.replace('TFT14_', '');
    }
}

// 初始化推薦系統
document.addEventListener('DOMContentLoaded', () => {
    const recommendationSystem = new RecommendationSystem('comp-recommendations');
});