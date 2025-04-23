// network.js
class NetworkChart {
    constructor(containerId) {
        this.container = d3.select(containerId);
        this.width = this.container.node().getBoundingClientRect().width;
        this.height = 600;
        this.data = null;
        this.filteredData = null;
        this.simulation = null;
        this.svg = null;
        this.link = null;
        this.node = null;
        // 使用 TFTUtils 獲取顏色，而不是直接定義
        this.traitColors = {};
        this.initTraitColors();
        this.init();
    }
    
    initTraitColors() {
        // 為所有羈絆初始化顏色對象
        const traits = [
            'Cyberboss', 'A.M.P.', 'Street Demon', 'Exotech', 'Divinicorp',
            'Anima Squad', 'Cypher', 'Nitro', 'Golden Ox', 'Syndicate',
            'BoomBot', 'Virus', 'Soul Killer', 'Overlord', 'God of the Net',
            'Bruiser', 'Bastion', 'Strategist', 'Marksman', 'Techie',
            'Executioner', 'Vanguar', 'Dynamo', 'Rapidfire', 'Slayer'
        ];
        
        traits.forEach(trait => {
            // 使用TFTUtils獲取顏色
            const traitId = `TFT14_${trait}`;
            this.traitColors[traitId] = TFTUtils.getTraitColor(trait);
        });
    }
    
    init() {
        // 檢查容器是否存在
        if (!this.container.node()) {
            console.error(`找不到容器元素: ${this.containerId}`);
            return;
        }
        console.log('找到網絡圖容器，初始化中...');
    
        this.svg = this.container.append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g');
            
        // 添加箭頭標記定義
        this.svg.append('defs').append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '-0 -5 10 10')
            .attr('refX', 15)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 5)
            .attr('markerHeight', 5)
            .append('path')
            .attr('d', 'M 0,-5 L 10,0 L 0,5')
            .attr('fill', '#999');
            
        // 添加圖例
        this.createLegend();
        
        // 添加縮放功能
        const zoom = d3.zoom()
            .scaleExtent([0.5, 5])
            .on('zoom', (event) => {
                this.svg.attr('transform', event.transform);
            });
            
        d3.select(this.container.node().querySelector('svg'))
            .call(zoom);
    }
    
    createLegend() {
        const legend = this.svg.append('g')
            .attr('class', 'legend')
            .attr('transform', 'translate(10, 20)');
            
        legend.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .text('羈絆圖例')
            .style('font-weight', 'bold');
            
        const traits = Object.keys(this.traitColors);
        
        traits.forEach((trait, i) => {
            const traitGroup = legend.append('g')
                .attr('transform', `translate(0, ${i * 25 + 20})`);
                
            traitGroup.append('circle')
                .attr('r', 8)
                .attr('fill', this.traitColors[trait]);
                
            // 使用TFTUtils獲取中文名稱
            const traitName = TFTUtils.getTraitChineseName(trait);
            traitGroup.append('text')
                .attr('x', 15)
                .attr('y', 4)
                .text(traitName);
        });
    }
    
    loadData() {
        d3.json('/api/synergy_network')
            .then(data => {
                // 確保返回的數據是有效的對象
                if (!data) {
                    console.error('API返回的數據為空');
                    return;
                }
                
                // 確保數據是正確的格式
                if (!data.nodes || !data.links) {
                    console.error('API返回的數據格式不正確:', data);
                    // 創建一個基本的示例數據結構
                    data = this.createSampleData();
                }
                
                this.data = data;
                
                try {
                    // 使用try/catch包裝JSON操作，防止解析錯誤
                    this.filteredData = JSON.parse(JSON.stringify(data));
                } catch (error) {
                    console.error('複製數據時出錯:', error);
                    // 直接賦值，不使用深複製
                    this.filteredData = data;
                }
                
                this.updateTraitFilter();
                this.render();
                console.log('網絡圖數據加載完成，渲染已執行');
            })
            .catch(error => {
                console.error('加載網絡圖數據時出錯:', error);
                // 顯示錯誤信息在頁面上
                this.container.html('<div class="error-message">加載數據時出錯，請稍後再試</div>');
                
                // 使用示例數據進行渲染
                this.data = this.createSampleData();
                this.filteredData = this.data;
                this.updateTraitFilter();
                this.render();
            });
    }
    
    // 添加一個新方法來創建示例數據（當API失敗時使用）
    createSampleData() {
        return {
            nodes: [
                {
                    id: 'TFT14_Veigar',
                    name: '維迦',
                    traits: ['TFT14_Cyberboss', 'TFT14_Techie'],
                    primary_trait: 'TFT14_Cyberboss',
                    win_rate: 0.55,
                    usage_count: 120,
                    avg_placement: 3.2
                },
                {
                    id: 'TFT14_Poppy',
                    name: '波比',
                    traits: ['TFT14_Cyberboss', 'TFT14_Bastion'],
                    primary_trait: 'TFT14_Cyberboss',
                    win_rate: 0.52,
                    usage_count: 100,
                    avg_placement: 3.5
                },
                {
                    id: 'TFT14_Brand',
                    name: '布蘭德',
                    traits: ['TFT14_Street Demon', 'TFT14_Techie'],
                    primary_trait: 'TFT14_Street Demon',
                    win_rate: 0.53,
                    usage_count: 90,
                    avg_placement: 3.4
                }
            ],
            links: [
                {
                    source: 'TFT14_Veigar',
                    target: 'TFT14_Poppy',
                    value: 50,
                    win_rate: 0.6,
                    synergy_count: 80,
                    type: 'same_trait',
                    shared_traits: ['TFT14_Cyberboss']
                },
                {
                    source: 'TFT14_Veigar',
                    target: 'TFT14_Brand',
                    value: 30,
                    win_rate: 0.5,
                    synergy_count: 60,
                    type: 'cross_trait',
                    shared_traits: ['TFT14_Techie']
                }
            ]
        };
    }
    
    updateTraitFilter() {
        const traitFilter = document.getElementById('trait-filter');
        traitFilter.innerHTML = '<option value="all">全部羈絆</option>';
        
        // 獲取所有羈絆
        const allTraits = new Set();
        this.data.nodes.forEach(node => {
            if (node.traits) {
                node.traits.forEach(trait => allTraits.add(trait));
            }
        });
        
        // 使用 TFTUtils 獲取羈絆中文名稱
        Array.from(allTraits).sort().forEach(trait => {
            const option = document.createElement('option');
            option.value = trait;
            option.textContent = TFTUtils.getTraitChineseName(trait);
            traitFilter.appendChild(option);
        });
        
        // 添加篩選事件
        traitFilter.addEventListener('change', () => {
            this.filterByTrait(traitFilter.value);
        });
    }
    
    filterByTrait(trait) {
        if (trait === 'all') {
            this.filteredData = JSON.parse(JSON.stringify(this.data));
        } else {
            // 篩選節點
            const filteredNodes = this.data.nodes.filter(node => 
                node.traits && node.traits.includes(trait)
            );
            
            const nodeIds = new Set(filteredNodes.map(node => node.id));
            
            // 篩選邊
            const filteredLinks = this.data.links.filter(link => 
                nodeIds.has(link.source) && nodeIds.has(link.target)
            );
            
            this.filteredData = {
                nodes: filteredNodes,
                links: filteredLinks
            };
        }
        
        this.render();
    }
    
    render() {
        this.svg.selectAll('.links').remove();
        this.svg.selectAll('.nodes').remove();
        
        // 建立更有結構的模擬
        this.simulation = d3.forceSimulation(this.filteredData.nodes)
            .force('link', d3.forceLink(this.filteredData.links)
                .id(d => d.id)
                .distance(150))  // 增加距離
            .force('charge', d3.forceManyBody().strength(-800))  // 增強排斥力
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collide', d3.forceCollide(d => 40))  // 增加碰撞半徑
            .force('x', d3.forceX().strength(0.05))  // 添加x方向力
            .force('y', d3.forceY().strength(0.05));  // 添加y方向力
            
        // 篩選連線 - 只顯示重要的協同關係
        const filteredLinks = this.filteredData.links.filter(link => 
            link.value > 5  // 只顯示協同強度較高的連線
        );
        
        // 繪製連線
        this.link = this.svg.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(filteredLinks)  // 使用篩選後的連線
            .enter().append('line')
            .attr('stroke-width', d => Math.max(1, Math.min(6, d.value / 20)))  // 更合理的線寬
            .attr('stroke', d => d.type === 'same_trait' ? '#666' : '#ddd')  // 更明顯的顏色對比
            .attr('stroke-opacity', 0.6)  // 降低透明度提高可讀性
            .attr('stroke-dasharray', d => d.type === 'same_trait' ? '0' : '3,3');
            
        // 繪製節點分組
        const traitGroups = {};
        this.filteredData.nodes.forEach(node => {
            const trait = node.primary_trait;
            if (!traitGroups[trait]) {
                traitGroups[trait] = [];
            }
            traitGroups[trait].push(node);
        });
        
        // 為每個羈絆分組應用特定的力
        Object.keys(traitGroups).forEach((trait, i) => {
            const angle = (i / Object.keys(traitGroups).length) * 2 * Math.PI;
            const radius = Math.min(this.width, this.height) * 0.35;
            const x = this.width/2 + radius * Math.cos(angle);
            const y = this.height/2 + radius * Math.sin(angle);
            
            traitGroups[trait].forEach(node => {
                // 添加羈絆分組的引力
                this.simulation.force(`${trait}-x`, d3.forceX(x).strength(0.1));
                this.simulation.force(`${trait}-y`, d3.forceY(y).strength(0.1));
            });
        });
            
        // 繪製節點
        this.node = this.svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(this.filteredData.nodes)
            .enter().append('g');
            
        const circles = this.node.append('circle')
            .attr('r', d => 15 + d.usage_count / 30)
            .attr('fill', d => this.traitColors[d.primary_trait] || '#ccc')
            .call(d3.drag()
                .on('start', this.dragstarted.bind(this))
                .on('drag', this.dragged.bind(this))
                .on('end', this.dragended.bind(this)));
                
        // 添加英雄名稱
        this.node.append('text')
            .attr('dy', 5)
            .attr('text-anchor', 'middle')
            .text(d => d.name)
            .style('fill', '#fff')
            .style('font-size', '10px');
            
        // 添加提示框
        this.node.append('title')
            .text(d => {
                // 使用TFTUtils獲取羈絆中文名稱
                const traits = d.traits.map(t => TFTUtils.getTraitChineseName(t)).join(', ');
                
                return `${d.name}\n勝率: ${(d.win_rate * 100).toFixed(1)}%\n平均名次: ${d.avg_placement.toFixed(2)}\n羈絆: ${traits}`;
            });
            
        // 模擬更新
        this.simulation.on('tick', () => {
            this.link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);
                
            circles
                .attr('cx', d => d.x = Math.max(20, Math.min(this.width - 20, d.x)))
                .attr('cy', d => d.y = Math.max(20, Math.min(this.height - 20, d.y)));
                
            this.node.select('text')
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });
    }
    
    dragstarted(event, d) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    dragended(event, d) {
        if (!event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

// 初始化並載入數據
document.addEventListener('DOMContentLoaded', () => {
    const networkChart = new NetworkChart('#network-chart');
    networkChart.loadData();
});