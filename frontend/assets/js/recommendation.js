// recommendations.js
class RecommendationSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedHeroes = [];
        this.compData = null; // 存儲JSON陣容數據
        this.init();
    }
    
    init() {
        // 英雄選擇事件
        const heroSearch = document.getElementById('hero-search');
        const addHeroBtn = document.getElementById('add-hero');
        const selectedHeroesContainer = document.querySelector('.selected-heroes');
        const recommendBtn = document.getElementById('recommend-btn');
        
        // 加載預設陣容數據
        this.loadCompData().then(() => {
            console.log('陣容數據加載完成');
        });
        
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
    
    // 加載預設陣容數據
    async loadCompData() {
        try {
            const response = await fetch('/assets/data/opgg_template.json');
            this.compData = await response.json();
            return this.compData;
        } catch (error) {
            console.error('無法載入陣容數據:', error);
            return null;
        }
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
        // 使用 TFTUtils 生成英雄數據
        return new Promise(resolve => {
            // 建立英雄清單，使用util.js中的方法
            const heroIds = [
                "Alistar", "Nidalee", "Kog'Maw", "Zyra", "Poppy", "Seraphine", "Vi", 
                "DrMundo", "Shaco", "Jax", "Sylas", "Kindred", "Morgana", "Illaoi", 
                "Rhaast", "LeBlanc", "Skarner", "Naafiri", "Shyvana", "Vayne", "Jhin", 
                "Veigar", "Ekko", "Graves", "Twisted Fate", "Darius", "Elise", 
                "Galio", "Gragas", "Jinx", "Jarvan IV", "Senna", "Braum", "Yuumi", 
                "Varus", "Fiddlesticks", "Draven", "Rengar", "Mordekaiser", "Aphelios", 
                "Xayah", "Zed", "Sejuani", "Miss Fortune", "Neeko", "Zeri", "Annie", 
                "Brand", "Ziggs", "Cho'Gath", "Vex", "Leona", "Zac", "Kobuko", 
                "Aurora", "Urgot", "Samira", "Viego", "Garen", "Renekton"
            ];
            
            const heroes = heroIds.map(id => ({
                id: id,
                name: TFTUtils.getHeroChineseName(id)
            }));
            
            resolve(heroes);
        });
    }
    
    // 從預設陣容尋找推薦
    findRecommendationsFromPresets() {
        if (!this.compData || !this.compData.comps) return [];
        
        const recommendations = [];
        
        // 將選定的英雄轉換為英文名稱(ID)用於比較
        const selectedHeroesIds = this.selectedHeroes.map(name => 
            TFTUtils.getHeroId(name)
        );
        
        // 遍歷所有預設陣容
        this.compData.comps.forEach(comp => {
            // 獲取陣容中的英雄
            const compHeroes = comp.units.map(unit => {
                // 移除星級標記，例如"維迦(3★)" => "維迦"
                const heroName = unit.hero_name.replace(/\([^\)]+\)/g, '').trim();
                return TFTUtils.getHeroId(heroName);
            });
            
            // 檢查選定的英雄是否在這個陣容中
            const matchCount = selectedHeroesIds.filter(hero => 
                compHeroes.includes(hero)
            ).length;
            
            // 如果有匹配的英雄，將這個陣容添加到推薦列表
            if (matchCount > 0) {
                recommendations.push({
                    comp: comp,
                    matchCount: matchCount,
                    matchRatio: matchCount / selectedHeroesIds.length
                });
            }
        });
        
        // 按匹配程度排序
        recommendations.sort((a, b) => {
            // 首先按匹配數量排序
            if (b.matchCount !== a.matchCount) {
                return b.matchCount - a.matchCount;
            }
            // 其次按陣容得分排序
            return b.comp.score - a.comp.score;
        });
        
        return recommendations.slice(0, 3); // 返回前3個最佳匹配
    }
    
    getRecommendations() {
        // 首先從預設陣容中查找推薦
        const presetRecommendations = this.findRecommendationsFromPresets();
        
        if (presetRecommendations.length > 0) {
            // 有預設陣容推薦，直接顯示
            this.displayPresetRecommendations(presetRecommendations);
            // 切換到推薦頁籤
            document.querySelector('.tab-btn[data-tab="recommendations"]').click();
        } else {
            // 沒有預設陣容推薦，從API獲取
            this.getRecommendationsFromAPI();
        }
    }
    
    // 從API獲取推薦
    getRecommendationsFromAPI() {
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
            this.displayAPIRecommendations(data);
            // 切換到推薦頁籤
            document.querySelector('.tab-btn[data-tab="recommendations"]').click();
        })
        .catch(error => console.error('Error getting recommendations:', error));
    }
    
    // 顯示從預設陣容中獲取的推薦
    displayPresetRecommendations(recommendations) {
        const container = document.getElementById('comp-recommendations');
        container.innerHTML = '';
        
        if (recommendations.length === 0) {
            container.innerHTML = '<div class="no-results">沒有找到合適的推薦陣容</div>';
            return;
        }
        
        recommendations.forEach((rec, index) => {
            const comp = rec.comp;
            const recCard = document.createElement('div');
            recCard.className = 'recommendation-card';
            
            // 提取羈絆信息
            const traits = this.extractTraitsFromComp(comp);
            
            // 羈絆標籤HTML
            const traitTags = traits.map(trait => {
                return `<span class="trait-tag" data-level="${trait.level}" style="background-color: ${TFTUtils.getTraitColor(trait.name)}22; border-color: ${TFTUtils.getTraitColor(trait.name)}">${trait.name} (${trait.level})</span>`;
            }).join('');
            
            // 當前英雄HTML
            const currentHeroesHTML = this.selectedHeroes.map(h => 
                `<div class="current-hero">${h}</div>`
            ).join('');
            
            // 推薦英雄HTML - 過濾掉已選英雄
            const selectedHeroesSet = new Set(this.selectedHeroes);
            const recommendedHeroes = comp.units
                .map(unit => {
                    // 移除星級標記
                    const heroName = unit.hero_name.replace(/\([^\)]+\)/g, '').trim();
                    return {
                        name: heroName,
                        cost: TFTUtils.getHeroCost(TFTUtils.getHeroId(heroName)),
                        position: unit.position,
                        core: unit.core,
                        items: unit.main_items
                    };
                })
                .filter(hero => !selectedHeroesSet.has(hero.name));
                
            const recommendedHeroesHTML = recommendedHeroes.map(hero => {
                const costClass = `cost-${hero.cost}`;
                const coreClass = hero.core === 'carry' ? 'core-carry' : 
                                hero.core === 'tank' ? 'core-tank' : 
                                hero.core === 'secondary' ? 'core-secondary' : '';
                                
                const itemsHTML = hero.items.length > 0 ? 
                    `<div class="hero-items">${hero.items.join(', ')}</div>` : '';
                
                return `<div class="recommended-hero ${costClass} ${coreClass}">
                    <div class="hero-name">${hero.name}</div>
                    ${itemsHTML}
                </div>`;
            }).join('');
            
            // 構建完整的推薦卡片HTML
            recCard.innerHTML = `
                <div class="rec-header">
                    <h3>${comp.comp_name}</h3>
                    <div class="comp-stats">
                        <span class="comp-score">評分: ${comp.score}</span>
                        <span class="placement">平均名次: ${comp.avg_placement}</span>
                        <span class="difficulty">難度: ${comp.difficulty}</span>
                    </div>
                </div>
                <div class="comp-description">
                    <p>${comp.prerequisites}</p>
                </div>
                <div class="traits-container">
                    ${traitTags}
                </div>
                <div class="rec-content">
                    <div class="current-heroes">
                        <h4>當前英雄</h4>
                        <div class="heroes-list">
                            ${currentHeroesHTML}
                        </div>
                    </div>
                    <div class="recommended-heroes">
                        <h4>推薦添加</h4>
                        <div class="heroes-list">
                            ${recommendedHeroesHTML}
                        </div>
                    </div>
                </div>
                <div class="comp-positioning">
                    <h4>站位指南</h4>
                    <p>${comp.positioning}</p>
                </div>
            `;
            
            container.appendChild(recCard);
        });
    }
    
    // 從陣容中提取羈絆信息
    extractTraitsFromComp(comp) {
        const traitCount = {};
        
        // 遍歷所有英雄的特質
        comp.units.forEach(unit => {
            if (unit.trait) {
                const traits = unit.trait.split(' ');
                traits.forEach(traitInfo => {
                    // 格式可能是 "賽博霸主 4"，需要分離
                    const match = traitInfo.match(/(.+)\s+(\d+)/);
                    if (match) {
                        const [_, traitName, level] = match;
                        traitCount[traitName] = parseInt(level);
                    }
                });
            }
        });
        
        // 轉換為陣列格式
        return Object.entries(traitCount).map(([name, level]) => ({
            name,
            level
        }));
    }
    
    // 顯示從API獲取的推薦
    displayAPIRecommendations(recommendations) {
        const container = document.getElementById('comp-recommendations');
        container.innerHTML = '';
        
        if (recommendations.length === 0) {
            container.innerHTML = '<div class="no-results">沒有找到合適的推薦陣容</div>';
            return;
        }
        
        recommendations.forEach((rec, index) => {
            const recCard = document.createElement('div');
            recCard.className = 'recommendation-card api-recommendation';
            
            // 使用 TFTUtils 計算羈絆標籤
            const traitTags = rec.active_traits.map(trait => {
                const traitName = TFTUtils.getTraitChineseName(trait.name);
                return `<span class="trait-tag" data-level="${trait.level}" style="background-color: ${TFTUtils.getTraitColor(trait.name)}22; border-color: ${TFTUtils.getTraitColor(trait.name)}">${traitName} (${trait.level}/${trait.max_level})</span>`;
            }).join('');
            
            // 使用 TFTUtils 計算推薦的英雄
            const recommendedHeroes = rec.recommended_heroes.map(hero => {
                const heroName = TFTUtils.getHeroChineseName(hero);
                // 根據英雄花費給予不同的樣式
                const cost = TFTUtils.getHeroCost(hero);
                const costClass = `cost-${cost}`;
                return `<div class="recommended-hero ${costClass}">${heroName}</div>`;
            }).join('');
            
            recCard.innerHTML = `
                <div class="rec-header">
                    <h3>推薦陣容 #${index + 1} (資料庫)</h3>
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
}

// 初始化推薦系統
document.addEventListener('DOMContentLoaded', () => {
    const recommendationSystem = new RecommendationSystem('comp-recommendations');
});