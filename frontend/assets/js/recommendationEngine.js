// 全局變數
let selectedChampions = [];
let boardChampions = Array(28).fill(null);
let activeTraits = {};
let recommendedComps = [];

// 模擬的英雄資料（後期可從API獲取）
const championsData = [
    // 示例資料，實際實現時應從Riot API或自建資料庫獲取
    { id: "TFT_Aatrox", name: "厄薩斯", cost: 4, traits: ["魔王", "挑戰者"] },
    { id: "TFT_Ahri", name: "阿璃", cost: 5, traits: ["靈魂使者", "魔導士"] },
    { id: "TFT_Akali", name: "阿卡莉", cost: 4, traits: ["真實傷害", "刺客"] },
    // 添加更多英雄...
];

// 模擬特質資料
const traitsData = {
    "魔王": { name: "魔王", description: "魔王英雄獲得額外魔法抗性", thresholds: [1, 2, 4] },
    "挑戰者": { name: "挑戰者", description: "挑戰者獲得額外攻擊速度", thresholds: [2, 4, 6, 8] },
    "靈魂使者": { name: "靈魂使者", description: "靈魂使者獲得額外法力", thresholds: [3, 5, 7] },
    // 添加更多特質...
};

// 初始化頁面
document.addEventListener('DOMContentLoaded', function() {
    generateChampionsGrid();
    generateHexagonalBoard();
    setupEventListeners();
});

// 生成英雄選擇網格
function generateChampionsGrid() {
    const grid = document.getElementById('champions-grid');
    
    // 清空現有內容
    grid.innerHTML = '';
    
    championsData.forEach(champion => {
        const championEl = document.createElement('div');
        championEl.className = `champion-item cost-${champion.cost}`;
        championEl.dataset.id = champion.id;
        
        const imgPath = `assets/images/champions/${champion.id}.png`;
        championEl.innerHTML = `<img src="${imgPath}" alt="${champion.name}" title="${champion.name}">`;
        
        grid.appendChild(championEl);
    });
}

// 生成六角形棋盤
function generateHexagonalBoard() {
    const board = document.getElementById('hexagonal-board');
    
    // 清空現有內容
    board.innerHTML = '';
    
    // 棋盤形狀：7行，每行4個格子
    const rowsConfig = [4, 4, 4, 4, 4, 4, 4]; // 可根據實際需求調整
    
    let cellIndex = 0;
    rowsConfig.forEach((cellsInRow, rowIndex) => {
        const rowEl = document.createElement('div');
        rowEl.className = 'board-row';
        
        for (let i = 0; i < cellsInRow; i++) {
            const cellEl = document.createElement('div');
            cellEl.className = 'hex-cell';
            cellEl.dataset.index = cellIndex;
            
            rowEl.appendChild(cellEl);
            cellIndex++;
        }
        
        board.appendChild(rowEl);
    });
}

// 設置事件監聽器
function setupEventListeners() {
    // 英雄選擇事件
    document.querySelectorAll('.champion-item').forEach(item => {
        item.addEventListener('click', function() {
            const championId = this.dataset.id;
            const champion = championsData.find(c => c.id === championId);
            
            if (champion) {
                // 選擇英雄
                selectedChampions.push(champion);
                updateSelectedChampionsDisplay();
                updateRecommendations();
            }
        });
    });
    
    // 過濾按鈕事件
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterChampions(filter);
        });
    });
    
    // 棋盤格子點擊事件
    document.querySelectorAll('.hex-cell').forEach(cell => {
        cell.addEventListener('click', function() {
            if (selectedChampions.length > 0) {
                const index = parseInt(this.dataset.index);
                placeChampionOnBoard(selectedChampions[0], index);
                selectedChampions.shift();
                updateSelectedChampionsDisplay();
            }
        });
    });
}

// 過濾英雄顯示
function filterChampions(filter) {
    const allChampions = document.querySelectorAll('.champion-item');
    
    if (filter === 'all') {
        allChampions.forEach(champ => champ.style.display = 'block');
        return;
    }
    
    const cost = parseInt(filter.split('-')[1]);
    
    allChampions.forEach(champ => {
        const championData = championsData.find(c => c.id === champ.dataset.id);
        if (championData && championData.cost === cost) {
            champ.style.display = 'block';
        } else {
            champ.style.display = 'none';
        }
    });
}

// 更新已選英雄顯示
function updateSelectedChampionsDisplay() {
    // 可以在這裡添加選中英雄的顯示邏輯
    console.log('Selected champions:', selectedChampions);
}

// 在棋盤上放置英雄
function placeChampionOnBoard(champion, index) {
    boardChampions[index] = champion;
    
    const cell = document.querySelector(`.hex-cell[data-index="${index}"]`);
    cell.classList.add('has-champion');
    
    // 移除現有英雄（如果有）
    const existingImg = cell.querySelector('.hex-cell-champion');
    if (existingImg) {
        existingImg.remove();
    }
    
    // 添加新英雄
    const championEl = document.createElement('div');
    championEl.className = 'hex-cell-champion';
    championEl.innerHTML = `<img src="assets/images/champions/${champion.id}.png" alt="${champion.name}">`;
    cell.appendChild(championEl);
    
    // 更新激活特質
    updateActiveTraits();
    
    // 更新推薦
    updateRecommendations();
}

// 更新激活特質
function updateActiveTraits() {
    // 重置特質計數
    activeTraits = {};
    
    // 計算棋盤上的特質
    boardChampions.forEach(champion => {
        if (!champion) return;
        
        champion.traits.forEach(trait => {
            if (!activeTraits[trait]) {
                activeTraits[trait] = 0;
            }
            activeTraits[trait]++;
        });
    });
    
    // 更新特質顯示
    renderActiveTraits();
}

// 渲染激活的特質
function renderActiveTraits() {
    const traitsContainer = document.getElementById('active-traits');
    traitsContainer.innerHTML = '';
    
    Object.entries(activeTraits).forEach(([trait, count]) => {
        if (count === 0) return;
        
        const traitData = traitsData[trait];
        if (!traitData) return;
        
        // 確定特質等級
        let traitClass = '';
        for (let i = traitData.thresholds.length - 1; i >= 0; i--) {
            if (count >= traitData.thresholds[i]) {
                traitClass = i === 0 ? 'trait-bronze' : i === 1 ? 'trait-silver' : i === 2 ? 'trait-gold' : 'trait-platinum';
                break;
            }
        }
        
        const traitEl = document.createElement('div');
        traitEl.className = `trait-item ${traitClass}`;
        traitEl.innerHTML = `
            <img src="assets/images/traits/${trait}.png" alt="${trait}">
            <span>${traitData.name} ${count}</span>
        `;
        
        traitsContainer.appendChild(traitEl);
    });
}

// 更新推薦陣容
function updateRecommendations() {
    // 模擬API請求延遲
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = '<div class="loading">正在分析最佳陣容</div>';
    
    // 這裡應該是對API的實際調用，但現在我們模擬一些數據
    setTimeout(() => {
        // 基於當前選擇的英雄和棋盤英雄，生成推薦
        generateRecommendations();
        renderRecommendations();
    }, 1000);
}

// 生成推薦陣容（這裡應根據實際算法替換）
function generateRecommendations() {
    // 簡單模擬：根據當前激活的特質，推薦相關陣容
    recommendedComps = [];
    
    // 示例推薦邏輯
    if (Object.keys(activeTraits).length > 0) {
        const primaryTrait = Object.keys(activeTraits).reduce(
            (a, b) => activeTraits[a] > activeTraits[b] ? a : b
        );
        
        // 添加一些模擬的推薦陣容
        recommendedComps.push({
            name: `${traitsData[primaryTrait].name} 主攻陣容`,
            traits: { [primaryTrait]: 6, "挑戰者": 4 },
            champions: ["TFT_Aatrox", "TFT_Ahri", "TFT_Akali", /* ... */],
            winRate: 58.3,
            averagePlacement: 3.2
        });
        
        recommendedComps.push({
            name: `${traitsData[primaryTrait].name} 變種陣容`,
            traits: { [primaryTrait]: 4, "刺客": 4 },
            champions: ["TFT_Ahri", "TFT_Akali", /* ... */],
            winRate: 52.7,
            averagePlacement: 3.8
        });
        
        // 添加更多推薦...
    } else {
        // 如果沒有選擇英雄，提供一些默認熱門陣容
        recommendedComps.push({
            name: "真實傷害陣容",
            traits: { "真實傷害": 6, "刺客": 2 },
            champions: ["TFT_Akali", /* ... */],
            winRate: 62.1,
            averagePlacement: 2.9
        });
        
        // 添加更多默認推薦...
    }
}

// 渲染推薦陣容
function renderRecommendations() {
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = '';
    
    if (recommendedComps.length === 0) {
        recommendationsContainer.innerHTML = '<div class="no-results">請選擇英雄以獲取推薦</div>';
        return;
    }
    
    recommendedComps.forEach((comp, index) => {
        const compEl = document.createElement('div');
        compEl.className = 'recommendation-card';
        compEl.dataset.index = index;
        
        // 構建特質顯示
        let traitsHTML = '<div class="recommendation-traits">';
        Object.entries(comp.traits).forEach(([trait, count]) => {
            traitsHTML += `
                <div class="trait-badge">
                    <img src="assets/images/traits/${trait}.png" alt="${trait}">
                    <span>${count}</span>
                </div>
            `;
        });
        traitsHTML += '</div>';
        
        // 構建英雄顯示
        let championsHTML = '<div class="recommendation-champions">';
        comp.champions.slice(0, 5).forEach(champId => {
            championsHTML += `<img src="assets/images/champions/${champId}.png" alt="${champId}">`;
        });
        if (comp.champions.length > 5) {
            championsHTML += `<span>+${comp.champions.length - 5}</span>`;
        }
        championsHTML += '</div>';
        
        compEl.innerHTML = `
            <h3>${comp.name}</h3>
            ${traitsHTML}
            ${championsHTML}
            <div class="recommendation-stats">
                <span>勝率: ${comp.winRate.toFixed(1)}%</span>
                <span>平均排名: ${comp.averagePlacement.toFixed(1)}</span>
            </div>
        `;
        
        // 添加點擊事件以顯示詳情
        compEl.addEventListener('click', () => showCompDetails(comp));
        
        recommendationsContainer.appendChild(compEl);
    });
}

// 顯示陣容詳細資訊（續）
function showCompDetails(comp) {
    const detailView = document.getElementById('detailed-view');
    const detailContent = detailView.querySelector('.detail-content');
    
    // 構建詳細信息HTML
    detailContent.innerHTML = `
        <h3>${comp.name}</h3>
        <div class="comp-stats">
            <div class="stat-item">
                <span class="stat-label">勝率</span>
                <span class="stat-value">${comp.winRate.toFixed(1)}%</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">平均排名</span>
                <span class="stat-value">${comp.averagePlacement.toFixed(1)}</span>
            </div>
        </div>
        
        <h4>核心特質</h4>
        <div class="detail-traits">
            ${Object.entries(comp.traits).map(([trait, count]) => `
                <div class="detail-trait">
                    <img src="assets/images/traits/${trait}.png" alt="${trait}">
                    <span>${traitsData[trait]?.name || trait}: ${count}</span>
                </div>
            `).join('')}
        </div>
        
        <h4>推薦陣容</h4>
        <div class="detail-board">
            <div class="detail-board-grid">
                <!-- 這裡使用D3.js繪製推薦陣容棋盤 -->
                <svg id="detail-board-svg" width="600" height="400"></svg>
            </div>
        </div>
        
        <h4>發展路徑</h4>
        <div class="development-path">
            <div class="path-stage">
                <h5>早期 (1-3)</h5>
                <div class="stage-champions">
                    ${comp.champions.slice(0, 3).map(champId => `
                        <div class="stage-champion">
                            <img src="assets/images/champions/${champId}.png" alt="${champId}">
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="path-stage">
                <h5>中期 (4-5)</h5>
                <div class="stage-champions">
                    ${comp.champions.slice(0, 6).map(champId => `
                        <div class="stage-champion">
                            <img src="assets/images/champions/${champId}.png" alt="${champId}">
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="path-stage">
                <h5>後期 (6+)</h5>
                <div class="stage-champions">
                    ${comp.champions.map(champId => `
                        <div class="stage-champion">
                            <img src="assets/images/champions/${champId}.png" alt="${champId}">
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <h4>陣容強度分析</h4>
        <div class="strength-analysis">
            <svg id="strength-chart" width="600" height="300"></svg>
        </div>
        
        <h4>裝備推薦</h4>
        <div class="item-recommendations">
            <!-- 裝備推薦將在此顯示 -->
        </div>
    `;
    
    // 顯示詳細視圖
    detailView.style.display = 'block';
    
    // 使用D3.js繪製視覺化圖表
    drawRecommendedBoard(comp);
    drawStrengthChart(comp);
}

// 使用D3.js繪製推薦陣容棋盤
function drawRecommendedBoard(comp) {
    // 設置棋盤SVG
    const svg = d3.select('#detail-board-svg');
    svg.selectAll('*').remove();
    
    // 定義六角形格子參數
    const hexRadius = 30;
    const hexWidth = hexRadius * 2;
    const hexHeight = hexRadius * Math.sqrt(3);
    
    // 定義棋盤佈局
    const boardLayout = [
        { row: 0, cells: 4 },
        { row: 1, cells: 4 },
        { row: 2, cells: 4 },
        { row: 3, cells: 4 },
        { row: 4, cells: 4 },
        { row: 5, cells: 4 },
        { row: 6, cells: 4 }
    ];
    
    // 計算每個格子的位置
    let cells = [];
    let cellIndex = 0;
    
    boardLayout.forEach((rowConfig, rowIndex) => {
        for (let col = 0; col < rowConfig.cells; col++) {
            const x = (col * hexWidth * 0.75) + 100;
            const y = (rowIndex * hexHeight) + (hexHeight / 2) + 50;
            
            cells.push({
                index: cellIndex,
                x: x,
                y: y,
                champId: cellIndex < comp.champions.length ? comp.champions[cellIndex] : null
            });
            
            cellIndex++;
        }
    });
    
    // 繪製每個格子
    svg.selectAll('.hex-cell')
        .data(cells)
        .enter()
        .append('path')
        .attr('class', 'hex-cell')
        .attr('d', d => {
            // 繪製六角形路徑
            const points = [];
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const x = d.x + hexRadius * Math.cos(angle);
                const y = d.y + hexRadius * Math.sin(angle);
                points.push([x, y]);
            }
            return `M${points[0][0]},${points[0][1]} L${points[1][0]},${points[1][1]} L${points[2][0]},${points[2][1]} L${points[3][0]},${points[3][1]} L${points[4][0]},${points[4][1]} L${points[5][0]},${points[5][1]} Z`;
        })
        .attr('fill', d => d.champId ? '#555' : '#333')
        .attr('stroke', '#222');
    
    // 添加英雄圖像
    const champGroups = svg.selectAll('.champ-group')
        .data(cells.filter(cell => cell.champId))
        .enter()
        .append('g')
        .attr('class', 'champ-group');
    
    // 添加英雄頭像剪裁區域
    svg.append('defs')
        .selectAll('.champ-clip')
        .data(cells.filter(cell => cell.champId))
        .enter()
        .append('clipPath')
        .attr('id', d => `clip-${d.index}`)
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', hexRadius * 0.7);
    
    // 添加英雄圖像
    champGroups.append('image')
        .attr('x', d => d.x - hexRadius * 0.7)
        .attr('y', d => d.y - hexRadius * 0.7)
        .attr('width', hexRadius * 1.4)
        .attr('height', hexRadius * 1.4)
        .attr('clip-path', d => `url(#clip-${d.index})`)
        .attr('xlink:href', d => `assets/images/champions/${d.champId}.png`);
}

// 使用D3.js繪製陣容強度分析圖表
function drawStrengthChart(comp) {
    // 設置SVG
    const svg = d3.select('#strength-chart');
    svg.selectAll('*').remove();
    
    // 模擬數據：不同階段的陣容強度
    const stageData = [
        { stage: "第1回合", strength: 30 },
        { stage: "第2回合", strength: 45 },
        { stage: "第3回合", strength: 55 },
        { stage: "第4回合", strength: 65 },
        { stage: "第5回合", strength: 75 },
        { stage: "第6回合", strength: 85 },
        { stage: "第7回合", strength: 90 },
        { stage: "第8回合", strength: 95 }
    ];
    
    // 設置圖表尺寸和邊距
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    
    // 創建圖表區域
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // 創建X軸
    const x = d3.scaleBand()
        .domain(stageData.map(d => d.stage))
        .range([0, width])
        .padding(0.1);
    
    g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('y', 10)
        .attr('x', -5)
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-45)');
    
    // 創建Y軸
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
    
    g.append('g')
        .call(d3.axisLeft(y));
    
    // 添加Y軸標籤
    g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -40)
        .attr('x', -height / 2)
        .attr('text-anchor', 'middle')
        .text('陣容強度 (%)');
    
    // 繪製線條
    const line = d3.line()
        .x(d => x(d.stage) + x.bandwidth() / 2)
        .y(d => y(d.strength))
        .curve(d3.curveMonotoneX);
    
    g.append('path')
        .datum(stageData)
        .attr('fill', 'none')
        .attr('stroke', '#f0b440')
        .attr('stroke-width', 2)
        .attr('d', line);
    
    // 添加數據點
    g.selectAll('.dot')
        .data(stageData)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => x(d.stage) + x.bandwidth() / 2)
        .attr('cy', d => y(d.strength))
        .attr('r', 5)
        .attr('fill', '#f0b440');
    
    // 添加說明文字
    g.selectAll('.stage-text')
        .data(stageData)
        .enter()
        .append('text')
        .attr('class', 'stage-text')
        .attr('x', d => x(d.stage) + x.bandwidth() / 2)
        .attr('y', d => y(d.strength) - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .text(d => `${d.strength}%`);
}

// 關閉詳情視圖
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('detailed-view').style.display = 'none';
});