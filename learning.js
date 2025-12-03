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
//モーダルウィンドウ----------------------------------------------------------------------------
// ボタンを押したときのモーダル表示
document.querySelectorAll('.contents .button').forEach(button => {
    button.addEventListener('click', () => {
        // buttonの親 li から言語名を取得
        // button の親 li の中の .item-title を取得
        const item = button.closest('.item');
        const langName = item.querySelector('.item-title').textContent.trim().toLowerCase(); // HTML -> "html"
        console.log(langName);
        // 対応するモーダルを取得
        const modal = document.getElementById(`modal-${langName}`);
        if (modal) {
            modal.classList.add('show');
        }
    });
});

// モーダル右上のバツボタンで閉じる
document.querySelectorAll('.modal .close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        modal.classList.remove('show');
    });
});

// 背景クリックで閉じる場合（オプション）
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { // 背景クリック
            modal.classList.remove('show');
        }
    });
});
//ヘッダー追加用
const hbgMenu = document.querySelector('.hbg-menu');
const hbgList = document.querySelector('.hbg-list');

hbgMenu.addEventListener('click', () => {
    hbgMenu.classList.toggle("show");
    hbgList.classList.toggle("show");
});