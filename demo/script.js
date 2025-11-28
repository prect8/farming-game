const images = [
    "00000-4137636735.png", "00001-3689628275.png", "00002-2642426615.png", "00003-2642426616.png",
    "00004-2642426617.png", "00005-2642426618.png", "00006-2642426619.png", "00007-2642426620.png",
    "00008-2642426621.png", "00009-2642426622.png", "00010-2642426623.png", "00011-2642426624.png",
    "00012-2642426625.png", "00013-2642426626.png", "00014-2642426627.png", "00015-2642426628.png",
    "00016-2642426629.png", "00017-2642426630.png", "00018-2642426631.png", "00019-2642426632.png",
    "00020-2642426633.png", "00021-2642426634.png", "00022-2642426635.png", "00023-2642426636.png",
    "00024-2642426637.png", "00025-2642426638.png", "00026-2642426639.png", "00027-2642426640.png",
    "00028-2642426641.png", "00029-2642426642.png", "00030-2642426643.png", "00031-2642426644.png",
    "00032-2642426645.png", "00033-2642426646.png", "00034-2642426647.png", "00035-2642426648.png",
    "00036-2642426649.png", "00037-2642426650.png", "00038-2642426651.png", "00039-2642426652.png",
    "00040-2642426653.png", "00041-2642426654.png", "00042-2642426655.png", "00043-2642426656.png",
    "00044-2642426657.png", "00045-2642426658.png", "00046-2642426659.png", "00047-2642426660.png",
    "00048-2642426661.png", "00049-2642426662.png", "00050-2642426663.png", "00051-2642426664.png"
];

// Game State
let currentSceneIndex = 0;
let isTyping = false;
let typeInterval;

// Simple Story Script
// Note: Since we don't know which image is which, we use placeholders.
// The user can update these indices based on the gallery.
const story = [
    {
        bg: images[0],
        char: null,
        speaker: "ナレーター",
        text: "朝の光が畑に降り注ぐ。農場での新しい一日が始まる。"
    },
    {
        bg: images[0],
        char: images[1], // Assuming this is a character
        speaker: "???",
        text: "あら、こんにちは！あなたが新しい農家さんね。"
    },
    {
        bg: images[0],
        char: images[1],
        speaker: "アンナ",
        text: "私はアンナ。この道の先に住んでいるの。やっと会えて嬉しいわ！"
    },
    {
        bg: images[2], // Change BG
        char: images[1],
        speaker: "アンナ",
        text: "ここはしばらく使われていなかったけど……あなたならきっと素敵な場所にできるはずよ。"
    },
    {
        bg: images[2],
        char: null,
        speaker: "ナレーター",
        text: "彼女は温かく微笑んだ。あなたは胸の中に決意が湧き上がるのを感じた。"
    }
];

// DOM Elements
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    gallery: document.getElementById('gallery-screen')
};

const elements = {
    bg: document.getElementById('background-layer'),
    char: document.getElementById('character-img'),
    speaker: document.getElementById('speaker-name'),
    text: document.getElementById('dialogue-text'),
    galleryGrid: document.getElementById('gallery-grid')
};

// Navigation
function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

document.getElementById('btn-start').addEventListener('click', () => {
    currentSceneIndex = 0;
    showScreen('game');
    renderScene();
});

document.getElementById('btn-gallery').addEventListener('click', () => {
    showScreen('gallery');
    loadGallery();
});

document.getElementById('btn-back-home').addEventListener('click', () => {
    showScreen('start');
});

// Advance story on screen click or button click
function handleAdvance() {
    if (isTyping) {
        // Complete immediately
        clearInterval(typeInterval);
        elements.text.textContent = story[currentSceneIndex].text;
        isTyping = false;
    } else {
        nextScene();
    }
}

document.getElementById('btn-next').addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent double firing if screen also has listener
    handleAdvance();
});

document.getElementById('game-screen').addEventListener('click', () => {
    handleAdvance();
});

// Game Logic
function nextScene() {
    currentSceneIndex++;
    if (currentSceneIndex >= story.length) {
        // End of demo
        alert("デモ終了です！遊んでくれてありがとう。");
        showScreen('start');
        return;
    }
    renderScene();
}

function renderScene() {
    const scene = story[currentSceneIndex];

    // Update Background
    if (scene.bg) {
        elements.bg.style.backgroundImage = `url('assets/images/${scene.bg}')`;
    }

    // Update Character
    if (scene.char) {
        elements.char.src = `assets/images/${scene.char}`;
        elements.char.classList.remove('hidden');
    } else {
        elements.char.classList.add('hidden');
    }

    // Update Text
    elements.speaker.textContent = scene.speaker;
    typeText(scene.text);
}

function typeText(text) {
    elements.text.textContent = "";
    isTyping = true;
    let i = 0;

    clearInterval(typeInterval);
    typeInterval = setInterval(() => {
        elements.text.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(typeInterval);
            isTyping = false;
        }
    }, 30);
}

// Gallery Logic
function loadGallery() {
    elements.galleryGrid.innerHTML = '';
    images.forEach(imgName => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `<img src="assets/images/${imgName}" loading="lazy" title="${imgName}">`;
        div.onclick = () => {
            // Copy filename to clipboard or just show alert
            alert(`Image Name: ${imgName}`);
        };
        elements.galleryGrid.appendChild(div);
    });
}
