document.addEventListener('DOMContentLoaded', function() {
    console.log('陣容推薦頁面已加載');
    
    // 模擬英雄數據（實際應用中，這應該從後端API獲取）
    const champions = [
        { id: 'ahri', name: '阿璃', cost: 4, traits: ['魔導師', '星系'] },
        { id: 'ashe', name: '艾希', cost: 3, traits: ['遊俠', '極地'] },
        { id: 'darius', name: '達瑞斯', cost: 2, traits: ['宇航員', '諾克薩斯'] },
        { id: 'ekko', name: '艾克', cost: 5, traits: ['秘術師', '時空者'] },
        { id: 'fiora', name: '菲歐拉', cost: 1, traits: ['劍士', '貴族'] },
        { id: 'jarvan', name: '嘉文四世', cost: 2, traits: ['守護者', '帝國'] },
        { id: 'jinx', name: '吉茵珂絲', cost: 4, traits: ['砲手', '爆破專家'] },
        { id: 'kaisa', name: '凱莎', cost: 5, traits: ['遊俠', '虛空'] },
        { id: 'lucian', name: '路西恩', cost: 2, traits: ['砲手', '光明使者'] },
        { id: 'lux', name: '拉克絲', cost: 7, traits: ['魔導師', '光明使者'] },
        { id: 'malphite', name: '墨菲特', cost: 4, traits: ['戰鬥機甲', '山岳'] },
        { id: 'poppy', name: '波比', cost: 1, traits: ['守護者', '約德爾'] }
    ];
    
    // 初始化變數
    let selectedChampions = [];
    
    // 渲染英雄列表
    function renderChampionList() {
        const championList = document.getElementById('champion-list');
        // 清空佔位符
        championList.innerHTML = '';
        
        // 添加每個英雄
        champions.forEach(champion => {
            const championEl = document.createElement('div');
            championEl.className = 'champion-item';
            championEl.setAttribute('data-id', champion.id);
            
            // 目前使用佔位符圖片，實際應用中應該使用英雄圖片
            championEl.innerHTML = `
                <img src="assets/images/champions/${champion.id}.jpg" alt="${champion.name}" onerror="this.src='assets/images/champion-placeholder.jpg'">
                <div class="champion-cost">${champion.cost}</div>
            `;
            
            // 添加點擊事件
            championEl.addEventListener('click', function() {
                selectChampion(champion);
            });
            
            championList.appendChild(championEl);
        });
    }
    
    // 選擇英雄
    function selectChampion(champion) {
        // 檢查是否已經選擇了這個英雄
        if (!selectedChampions.some(c => c.id === champion.id)) {
            selectedChampions.push(champion);
            renderSelectedChampions();
            updateActiveTraits();
        }
    }
    
    // 移除選擇的英雄
    function removeChampion(championId) {
        selectedChampions = selectedChampions.filter(c => c.id !== championId);
        renderSelectedChampions();
        updateActiveTraits();
    }
    
    // 渲染已選擇的英雄
    function renderSelectedChampions() {
        const selectedChampionsEl = document.getElementById('selected-champions');
        
        if (selectedChampions.length === 0) {
            selectedChampionsEl.innerHTML = '<p class="empty-message">尚未選擇任何英雄</p>';
            return;
        }
        
        selectedChampionsEl.innerHTML = '';
        
        selectedChampions.forEach(champion => {
            const championEl = document.createElement('div');
            championEl.className = 'selected-champion';
            
            championEl.innerHTML = `
                <img src="assets/images/champions/${champion.id}.jpg" alt="${champion.name}" onerror="this.src='assets/images/champion-placeholder.jpg'">
                <div class="remove-champion" data-id="${champion.id}">×</div>
            `;
            
            selectedChampionsEl.appendChild(championEl);
        });
        
        // 為所有移除按鈕添加事件監聽
        const removeButtons = document.querySelectorAll('.remove-champion');
        removeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const championId = this.getAttribute('data-id');
                removeChampion(championId);
            });
        });
    }
    
    // 更新激活的特質
    function updateActiveTraits() {
        const activeTraitsEl = document.getElementById('active-traits');
        const traitsContainer = activeTraitsEl.querySelector('.traits-container');
        
        // 統計特質
        const traitCounts = {};
        selectedChampions.forEach(champion => {
            champion.traits.forEach(trait => {
                traitCounts[trait] = (traitCounts[trait] || 0) + 1;
            });
        });
        
        if (Object.keys(traitCounts).length === 0) {
            traitsContainer.innerHTML = '<p>尚未激活任何特質</p>';
            return;
        }
        
        traitsContainer.innerHTML = '';
        
        // 渲染每個特質
        Object.entries(traitCounts).forEach(([trait, count]) => {
            const traitLevel = getTraitLevel(trait, count);
            if (traitLevel > 0) {
                const traitEl = document.createElement('div');
                traitEl.className = `trait-item trait-active-${traitLevel}`;
                traitEl.innerHTML = `
                    <span class="trait-icon">⚔️</span>
                    <span>${trait} (${count})</span>
                `;
                traitsContainer.appendChild(traitEl);
            }
        });
    }
    
    // 獲取特質激活等級（這只是模擬，實際應根據遊戲規則）
    function getTraitLevel(trait, count) {
        if (count >= 6) return 5;
        if (count >= 4) return 4;
        if (count >= 3) return 3;
        if (count >= 2) return 2;
        if (count >= 1) return 1;
        return 0;
    }
    
    // 搜尋英雄功能
    function setupSearch() {
        const searchInput = document.getElementById('champion-search');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const championItems = document.querySelectorAll('.champion-item');
            
            championItems.forEach(item => {
                const championId = item.getAttribute('data-id');
                const champion = champions.find(c => c.id === championId);
                
                if (champion.name.toLowerCase().includes(searchTerm) || 
                    champion.traits.some(trait => trait.toLowerCase().includes(searchTerm))) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // 獲取推薦陣容
    function setupGetRecommendationsButton() {
        const button = document.getElementById('get-recommendations');
        button.addEventListener('click', function() {
            if (selectedChampions.length === 0) {
                alert('請先選擇至少一個英雄');
                return;
            }
            
            // 模擬獲取推薦陣容（實際應用中應從後端API獲取）
            simulateGetRecommendations();
        });
    }
    
    // 模擬獲取推薦陣容
    function simulateGetRecommendations() {
        // 顯示加載狀態
        document.getElementById('recommendations-results').style.display = 'block';
        document.getElementById('comp1').innerHTML = '<p>加載中...</p>';
        document.getElementById('comp2').innerHTML = '<p>加載中...</p>';
        document.getElementById('comp3').innerHTML = '<p>加載中...</p>';
        
        // 模擬API調用延遲
        setTimeout(() => {
            // 模擬推薦陣容數據
            const recommendations = [
                {
                    name: '魔導師星系',
                    champions: [
                        champions.find(c => c.id === 'ahri'),
                        champions.find(c => c.id === 'lux'),
                        champions.find(c => c.id === 'malphite'),
                        champions.find(c => c.id === 'ekko'),
                        champions.find(c => c.id === 'ashe'),
                        champions.find(c => c.id === 'jinx'),
                        champions.find(c => c.id === 'poppy'),
                        champions.find(c => c.id === 'fiora')
                    ],
                    traits: ['魔導師(4)', '星系(2)', '砲手(2)', '守護者(2)'],
                    stats: {
                        winRate: '62.8%',
                        pickRate: '15.2%',
                        avgPlacement: '2.9'
                    }
                },
                {
                    name: '遊俠虛空',
                    champions: [
                        champions.find(c => c.id === 'ashe'),
                        champions.find(c => c.id === 'kaisa'),
                        champions.find(c => c.id === 'ekko'),
                        champions.find(c => c.id === 'jarvan'),
                        champions.find(c => c.id === 'lucian'),
                        champions.find(c => c.id === 'darius')
                    ],
                    traits: ['遊俠(2)', '虛空(2)', '秘術師(1)', '守護者(1)', '帝國(1)'],
                    stats: {
                        winRate: '54.1%',
                        pickRate: '10.8%',
                        avgPlacement: '3.5'
                    }
                },
                {
                    name: '守護者貴族',
                    champions: [
                        champions.find(c => c.id === 'fiora'),
                        champions.find(c => c.id === 'jarvan'),
                        champions.find(c => c.id === 'poppy'),
                        champions.find(c => c.id === 'lux'),
                        champions.find(c => c.id === 'malphite'),
                        champions.find(c => c.id === 'lucian')
                    ],
                    traits: ['守護者(3)', '貴族(2)', '光明使者(2)', '戰鬥機甲(1)'],
                    stats: {
                        winRate: '49.5%',
                        pickRate: '8.6%',
                        avgPlacement: '4.1'
                    }
                }
            ];
            
            // 渲染推薦陣容
            recommendations.forEach((comp, index) => {
                renderRecommendation(comp, index + 1);
            });
            
            // 設置頁籤功能
            setupTabs();
        }, 1500);
    }
    
    // 渲染推薦陣容
    function renderRecommendation(recommendation, index) {
        const compEl = document.getElementById(`comp${index}`);
        
        let championsHTML = '';
        recommendation.champions.forEach(champion => {
            championsHTML += `
                <div class="comp-champion">
                    <img src="assets/images/champions/${champion.id}.jpg" alt="${champion.name}" onerror="this.src='assets/images/champion-placeholder.jpg'">
                </div>
            `;
        });
        
        let traitsHTML = '';
        recommendation.traits.forEach(trait => {
            traitsHTML += `<div class="trait-item">${trait}</div>`;
        });
        
        compEl.innerHTML = `
            <div class="recommended-comp">
                <h4>${recommendation.name}</h4>
                <div class="comp-details">
                    <div class="comp-champions">
                        ${championsHTML}
                    </div>
                    <div class="comp-traits">
                        <h5>特質:</h5>
                        ${traitsHTML}
                    </div>
                    <div class="comp-stats">
                        <p><strong>勝率:</strong> <span>${recommendation.stats.winRate}</span></p>
                        <p><strong>使用率:</strong> <span>${recommendation.stats.pickRate}</span></p>
                        <p><strong>平均名次:</strong> <span>${recommendation.stats.avgPlacement}</span></p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 設置頁籤功能
    function setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除所有active類
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // 添加active類到當前頁籤
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // 初始化頁面
    function initPage() {
        renderChampionList();
        renderSelectedChampions();
        updateActiveTraits();
        setupSearch();
        setupGetRecommendationsButton();
    }
    
    // 啟動頁面初始化
    initPage();
});