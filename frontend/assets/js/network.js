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
        this.traitColors = {
            'TFT14_CyberOverlords': '#ff6b6b',  // 賽博霸主
            'TFT14_AMP': '#4ecdc4',             // A.M.P.
            'TFT14_StreetPunk': '#ffe66d',       // 街頭狂魔
            'TFT14_HyperTech': '#6a0572',       // 極限科技
            'TFT14_OracleCorp': '#1a535c',      // 神諭集團
            'TFT14_BehemothSquad': '#f72585',   // 百獸特攻隊
            'TFT14_Decoders': '#6c757d',        // 破譯師
            'TFT14_Burnout': '#ff9a3c',         // 爆燃戰隊
            'TFT14_BigShot': '#ffc107',         // 開運金牛
            'TFT14_CrimeSyndicate': '#dc3545',  // 罪惡集團
            'Unknown': '#aaaaaa'
        };
        this.init();
    }
    
    init() {
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
            'Unknown': '未知'
        };
        
        traits.forEach((trait, i) => {
            const traitGroup = legend.append('g')
                .attr('transform', `translate(0, ${i * 25 + 20})`);
                
            traitGroup.append('circle')
                .attr('r', 8)
                .attr('fill', this.traitColors[trait]);
                
            traitGroup.append('text')
                .attr('x', 15)
                .attr('y', 4)
                .text(traitNames[trait] || trait);
        });
    }
    
    loadData() {
        d3.json('/api/synergy_network')
            .then(data => {
                this.data = data;
                this.filteredData = JSON.parse(JSON.stringify(data));
                this.updateTraitFilter();
                this.render();
            })
            .catch(error => console.error('Error loading data:', error));
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
        
        // 添加羈絆選項
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
        
        Array.from(allTraits).sort().forEach(trait => {
            const option = document.createElement('option');
            option.value = trait;
            option.textContent = traitNames[trait] || trait.replace('TFT14_', '');
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
        
        // 建立模擬
        this.simulation = d3.forceSimulation(this.filteredData.nodes)
            .force('link', d3.forceLink(this.filteredData.links)
                .id(d => d.id)
                .distance(100))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collide', d3.forceCollide(d => 30));
            
        // 繪製連線
        this.link = this.svg.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(this.filteredData.links)
            .enter().append('line')
            .attr('stroke-width', d => Math.max(1, Math.min(10, d.value / 10)))
            .attr('stroke', d => d.type === 'same_trait' ? '#999' : '#ddd')
            .attr('stroke-dasharray', d => d.type === 'same_trait' ? '0' : '3,3');
            
        // 繪製節點
        this.node = this.svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(this.filteredData.nodes)
            .enter().append('g');
            
        const circles = this.node.append('circle')
            .attr('r', d => 15 + d.usage_count / 30)
            .attr('fill', d => this.traitColors[d.primary_trait] || this.traitColors.Unknown)
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
                // 轉換羈絆名稱為中文
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
                
                const traits = d.traits.map(t => {
                    return traitNames[t] || t.replace('TFT14_', '');
                }).join(', ');
                
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