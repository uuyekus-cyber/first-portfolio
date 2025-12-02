//ヘッダー------------------------------------------------------------------------------------
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > lastY) {
        // 下スクロール → 隠す
        document.querySelector('.header-move').style.transform = 'translateY(-500%)';
    } else {
        // 上スクロール → 表示
        document.querySelector('.header-move').style.transform = 'translateY(0)';
    }
    lastY = currentY;
});
//ヘッダー追加用
const hbgMenu = document.querySelector('.hbg-menu');
const hbgList = document.querySelector('.hbg-list');

hbgMenu.addEventListener('click', () => {
    hbgMenu.classList.toggle("show");
    hbgList.classList.toggle("show");
});