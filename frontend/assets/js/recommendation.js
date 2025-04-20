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
                // 可以添加更多英雄...
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
            'TFT14_Bruiser': '蠻勇打手',
            'TFT14_Bastion': '堡壘衛士',
            'TFT14_Strategist': '戰略軍師',
            'TFT14_Gunner': '射手',
            'TFT14_Spellweaver': '技師',
            'TFT14_Executioner': '處刑者'
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
            'TFT14_Samira': '煞蜜拉'
        };
        return heroNames[heroId] || heroId;
    }
}

// 初始化推薦系統
document.addEventListener('DOMContentLoaded', () => {
    const recommendationSystem = new RecommendationSystem('comp-recommendations');
});