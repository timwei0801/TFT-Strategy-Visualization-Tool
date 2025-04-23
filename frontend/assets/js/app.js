document.addEventListener('DOMContentLoaded', () => {
    // 頁籤切換
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有活躍狀態
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // 激活選中的頁籤
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // 調試信息
            console.log(`切換到頁籤: ${tabId}`);
            console.log(`找到頁面元素: ${document.getElementById(tabId) ? '是' : '否'}`);
        });
    });
    
    // 檢查HTML結構是否正確
    console.log('--- 頁籤結構檢查 ---');
    tabButtons.forEach(btn => {
        const tabId = btn.getAttribute('data-tab');
        const tabElement = document.getElementById(tabId);
        console.log(`頁籤 ${tabId}: ${tabElement ? '找到對應元素' : '未找到對應元素！'}`);
    });
});