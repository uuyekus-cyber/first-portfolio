//ヘッダー------------------------------------------------------------------------------------
let lastY = window.scrollY;
let hideThreshold = 50;
let showThreshold = 20;
let accumulatedDown = 0;
let accumulatedUp = 0;
window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const diff = currentY - lastY;
    if (diff > 0) {
        accumulatedDown += diff;
        accumulatedUp = 0;
        if (accumulatedDown > hideThreshold) {
            document.querySelector('.header-move').style.transform = 'translateY(-500%)';
        }
    } else {
        accumulatedUp -= diff;
        accumulatedDown = 0;
        if (accumulatedUp > showThreshold) {
            document.querySelector('.header-move').style.transform = 'translateY(0)';
        }
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