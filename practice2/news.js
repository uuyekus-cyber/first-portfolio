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
//ニュース表示関連---------------------------------------------------------------------------------
//ここでは、csvファイルを配列化してる。
function csvToArray(str) {
    const lines = str.trim().split("\n");
    const headers = lines[0].split(",");

    return lines.slice(1).map(line => {
        const cols = line.split(",");
        let obj = {};
        headers.forEach((h, i) => {
            obj[h] = cols[i];
        });
        return obj;
    });
}
//ここでそのファイルを読み込んでいく
fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQK_oX0YEto8DU9y0ygrAK9TIy0nL8gkrNN0GGkUchKWFV5RvCRR22w-tXBEhFuXQhkbU0kTBmUaSey/pub?gid=0&single=true&output=csv")
    .then(res => res.text())
    .then(csv => {
        const data = csvToArray(csv);
        const dl = document.querySelector(".news-list");
        const latestFive = data.slice(-20).reverse();

        latestFive.forEach(item => {
            const dt = document.createElement("dt");
            dt.textContent = item.date;
            const dd = document.createElement("dd");
            dd.textContent = item.text;
            dl.appendChild(dt);
            dl.appendChild(dd);
        });
    });
//ヘッダー追加用
const hbgMenu = document.querySelector('.hbg-menu');
const hbgList = document.querySelector('.hbg-list');

hbgMenu.addEventListener('click', () => {
    hbgMenu.classList.toggle("show");
    hbgList.classList.toggle("show");
});