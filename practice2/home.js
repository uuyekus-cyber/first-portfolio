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

//メインビジュアル-----------------------------------------------------------------------------


const frame = document.querySelector('.frame');
const images = document.querySelectorAll('.image');

const dotNum = images.length;
console.log(dotNum);
const firstImage = images[0];
const lastImage = images[images.length - 1];

const firstClone = firstImage.cloneNode(true);
const lastClone = lastImage.cloneNode(true);

frame.appendChild(firstClone);
frame.insertBefore(lastClone, frame.firstChild);

const imagesNew = document.querySelectorAll('.image');

imagesNew.forEach((img, i) => {
    img.style.transition = 'none';   // 初期はアニメーションなし
    img.style.transform = `translateX(-100%)`;
});

// 最初のスライドを即座に表示
imagesNew[1].style.transform = `translateX(-100%)`;  // 最初の「1枚目」を表示

// 次のアニメーションで transition を戻す
requestAnimationFrame(() => {
    imagesNew.forEach(img => {
        img.style.transition = '';
    });
});

//ドット関係
const dots = document.querySelector('.dots');

for (let i = 0; i < dotNum; i++) {
    const li = document.createElement('li');
    li.classList.add('dot');
    dots.appendChild(li);
}
dots.firstChild.classList.add('active');

const dot = document.querySelectorAll('.dot');

const dotActivate = (number) => {
    dot.forEach(x => {
        x.classList.remove('active');
    });
    dot[(number - 1) % 3].classList.add('active');
}


//ここで表示
frame.style.opacity = '1';
let nowSlide = 1;

//ここからカルーセル制御
let intervalTime = 5000;
let slideInterval;


function slide() {

    if (nowSlide < dotNum + 1) {
        nowSlide++;
        imagesNew.forEach(img => {
            img.style.transform = `translateX(-${nowSlide}00%)`;
        });
        dotActivate(nowSlide);

    } else {

        nowSlide = 1;

        imagesNew.forEach(img => {
            img.style.transition = 'none';
            img.style.transform = `translateX(-100%)`;
        });
        dotActivate(nowSlide);

        setTimeout(() => {
            requestAnimationFrame(() => {
                imagesNew.forEach(img => {
                    img.style.transition = '';
                });
            });
        }, 1000);
    }
}
function startAutoSlide() {
    slideInterval = setInterval(slide, intervalTime);
}
function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}
startAutoSlide();

//ドットで移動にも対応
dot.forEach((x, index) => {
    x.addEventListener('click', (e) => {
        dot.forEach(x => {
            x.classList.remove('active');
        });
        e.target.classList.add('active');
        nowSlide = index;
        slide();
        resetAutoSlide();
    });
}
);
//メインコンテンツ---------------------------------------------------------------------------------------
const fadeIn = document.querySelectorAll('.info');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0,
    rootMargin: '0px 0px -50px 0px'
});

fadeIn.forEach(target => observer.observe(target));

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
        const latestFive = data.slice(-5).reverse();

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