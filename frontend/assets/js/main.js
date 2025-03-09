// 等待DOM內容完全加載
document.addEventListener('DOMContentLoaded', function() {
    console.log('TFT戰術推薦系統已加載');
    
    // 獲取「開始使用」按鈕並添加點擊事件
    const startButton = document.querySelector('.btn-primary');
    if (startButton) {
        startButton.addEventListener('click', function() {
            // 暫時顯示警告信息，之後會替換為實際功能
            alert('陣容推薦功能正在開發中，敬請期待！');
            // 後續可以改為導航到陣容推薦頁面
            // window.location.href = 'recommendation.html';
        });
    }
    
    // 導航欄活動項目高亮
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有連結的active類
            navLinks.forEach(l => l.classList.remove('active'));
            // 為當前點擊的連結添加active類
            this.classList.add('active');
        });
    });
});