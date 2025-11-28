// ゲームエンジン
const Game = {
    state: {
        currentSceneId: 'scene_001',
        flags: {},
        visitedScenes: [],
        isTyping: false,
        textSpeed: 30, // ミリ秒/文字
        isAuto: false,
        isSkipping: false
    },

    typewriterInterval: null,
    autoInterval: null,

    elements: {
        menuScreen: document.getElementById('menu-screen'),
        gameScreen: document.getElementById('game-screen'),
        galleryScreen: document.getElementById('gallery-screen'),
        settingsScreen: document.getElementById('settings-screen'),
        bg: document.getElementById('bg'),
        charContainer: document.getElementById('char-container'),
        speaker: document.getElementById('speaker'),
        text: document.getElementById('text'),
        dialogueBox: document.getElementById('dialogue-box'),
        choiceContainer: document.getElementById('choice-container'),
        galleryGrid: document.getElementById('gallery-grid')
    },

    init() {
        // オーディオ初期化
        AudioManager.init();

        // スタートボタン
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startGame();
        });

        // ギャラリーボタン
        document.getElementById('gallery-btn').addEventListener('click', () => {
            this.showGallery();
        });

        // ギャラリー戻るボタン
        document.getElementById('gallery-back-btn').addEventListener('click', () => {
            this.showMenu();
        });

        // 設定ボタン
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.showSettings();
        });

        // 設定戻るボタン
        document.getElementById('settings-back-btn').addEventListener('click', () => {
            this.showMenu();
        });

        // 設定変更イベント
        this.initSettings();

        // ゲーム内コントロール
        this.initGameControls();

        // ダイアログクリック
        this.elements.dialogueBox.addEventListener('click', () => {
            // タイピング中なら即座に全文表示
            if (this.state.isTyping) {
                this.completeText();
            } else {
                AudioManager.playSFX('click');
                this.nextScene();
            }
        });
    },

    initGameControls() {
        // メニューボタン
        document.getElementById('btn-menu').addEventListener('click', () => {
            if (confirm('メニューに戻りますか？')) {
                this.stopAuto();
                this.showMenu();
            }
        });

        // オートボタン
        document.getElementById('btn-auto').addEventListener('click', () => {
            this.toggleAuto();
        });

        // スキップボタン
        document.getElementById('btn-skip').addEventListener('click', () => {
            this.toggleSkip();
        });
    },

    toggleAuto() {
        this.state.isAuto = !this.state.isAuto;
        const btn = document.getElementById('btn-auto');
        
        if (this.state.isAuto) {
            btn.classList.add('active');
            this.startAuto();
        } else {
            btn.classList.remove('active');
            this.stopAuto();
        }
    },

    startAuto() {
        // タイピングが終わったら3秒後に次へ
        const checkAndAdvance = () => {
            if (!this.state.isAuto) return;
            
            if (!this.state.isTyping) {
                const scene = story.scenes.find(s => s.id === this.state.currentSceneId);
                if (scene && scene.type !== 'choice' && scene.type !== 'end') {
                    this.autoInterval = setTimeout(() => {
                        this.nextScene();
                    }, 3000);
                }
            } else {
                setTimeout(checkAndAdvance, 100);
            }
        };
        
        checkAndAdvance();
    },

    stopAuto() {
        this.state.isAuto = false;
        if (this.autoInterval) {
            clearTimeout(this.autoInterval);
        }
        const btn = document.getElementById('btn-auto');
        btn.classList.remove('active');
    },

    toggleSkip() {
        this.state.isSkipping = !this.state.isSkipping;
        const btn = document.getElementById('btn-skip');
        
        if (this.state.isSkipping) {
            btn.classList.add('active');
            this.startSkip();
        } else {
            btn.classList.remove('active');
        }
    },

    startSkip() {
        const skipNext = () => {
            if (!this.state.isSkipping) return;
            
            const scene = story.scenes.find(s => s.id === this.state.currentSceneId);
            
            // 選択肢やエンディングで停止
            if (scene && (scene.type === 'choice' || scene.type === 'end')) {
                this.state.isSkipping = false;
                document.getElementById('btn-skip').classList.remove('active');
                return;
            }
            
            // 未読シーンで停止
            if (scene && !this.state.visitedScenes.includes(scene.next)) {
                this.state.isSkipping = false;
                document.getElementById('btn-skip').classList.remove('active');
                return;
            }
            
            // 次へ進む
            this.completeText();
            setTimeout(() => {
                this.nextScene();
                setTimeout(skipNext, 100);
            }, 100);
        };
        
        skipNext();
    },

    startGame() {
        this.state.currentSceneId = 'scene_001';
        this.state.flags = {};
        this.state.visitedScenes = [];
        
        // メニューBGMを停止してゲームBGMを再生
        AudioManager.playBGM('main');
        
        this.elements.menuScreen.classList.remove('active');
        this.elements.gameScreen.classList.add('active');
        
        this.loadScene('scene_001');
    },

    loadScene(sceneId) {
        const scene = story.scenes.find(s => s.id === sceneId);
        
        if (!scene) {
            console.error('Scene not found:', sceneId);
            return;
        }

        this.state.currentSceneId = sceneId;
        
        // 既読管理
        if (!this.state.visitedScenes.includes(sceneId)) {
            this.state.visitedScenes.push(sceneId);
        }

        // オート再生の継続
        if (this.state.isAuto) {
            this.startAuto();
        }

        // 背景
        if (scene.bg) {
            this.elements.bg.style.backgroundImage = `url('full_version/assets/images/${scene.bg}')`;
        }

        // キャラクター
        this.updateCharacter(scene.char);

        // 話者名
        const character = story.characters[scene.speaker];
        if (character) {
            this.elements.speaker.textContent = character.name;
            this.elements.speaker.style.color = character.color;
        } else {
            this.elements.speaker.textContent = scene.speaker;
        }

        // テキスト（タイプライター効果）
        this.typeText(scene.text);

        // BGM変更
        if (scene.bgm) {
            AudioManager.playBGM(scene.bgm);
        }

        // 効果音再生
        if (scene.sfx) {
            AudioManager.playSFX(scene.sfx);
        }

        // 選択肢の処理
        if (scene.type === 'choice') {
            this.showChoices(scene.choices);
        } else {
            this.hideChoices();
        }

        // エンディング処理
        if (scene.type === 'end') {
            setTimeout(() => {
                this.showEnding(scene.endingType);
            }, 3000);
        }
    },

    nextScene() {
        const scene = story.scenes.find(s => s.id === this.state.currentSceneId);
        
        if (!scene) return;

        // 選択肢がある場合は何もしない
        if (scene.type === 'choice') return;

        // エンディングの場合は何もしない
        if (scene.type === 'end') return;

        // 次のシーンへ
        if (scene.next) {
            this.loadScene(scene.next);
        }
    },

    showChoices(choices) {
        this.elements.choiceContainer.innerHTML = '';
        this.elements.choiceContainer.classList.remove('hidden');

        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            btn.addEventListener('click', () => {
                // 効果音
                AudioManager.playSFX('select');
                
                // フラグ保存
                if (choice.flag) {
                    this.state.flags[choice.flag] = true;
                }
                // 次のシーンへ
                this.hideChoices();
                this.loadScene(choice.next);
            });
            this.elements.choiceContainer.appendChild(btn);
        });
    },

    hideChoices() {
        this.elements.choiceContainer.classList.add('hidden');
        this.elements.choiceContainer.innerHTML = '';
    },

    updateCharacter(charImage) {
        const container = this.elements.charContainer;
        
        if (charImage) {
            // 既に同じキャラクターが表示されている場合は何もしない
            const currentImg = container.querySelector('img');
            if (currentImg && currentImg.src.includes(charImage)) {
                return;
            }

            // フェードアウトしてから新しいキャラを表示
            if (currentImg) {
                container.classList.add('fade-out');
                setTimeout(() => {
                    container.innerHTML = `<img src="full_version/assets/images/${charImage}" alt="character">`;
                    container.classList.remove('fade-out');
                }, 300);
            } else {
                container.innerHTML = `<img src="full_version/assets/images/${charImage}" alt="character">`;
            }
        } else {
            // キャラクターを消す
            if (container.querySelector('img')) {
                container.classList.add('fade-out');
                setTimeout(() => {
                    container.innerHTML = '';
                    container.classList.remove('fade-out');
                }, 300);
            }
        }
    },

    typeText(text) {
        // 既存のタイピングを停止
        if (this.typewriterInterval) {
            clearInterval(this.typewriterInterval);
        }

        this.state.isTyping = true;
        this.elements.text.textContent = '';
        
        let index = 0;
        const fullText = text;

        this.typewriterInterval = setInterval(() => {
            if (index < fullText.length) {
                this.elements.text.textContent += fullText.charAt(index);
                index++;
            } else {
                clearInterval(this.typewriterInterval);
                this.state.isTyping = false;
            }
        }, this.state.textSpeed);
    },

    completeText() {
        // タイピングを停止して全文表示
        if (this.typewriterInterval) {
            clearInterval(this.typewriterInterval);
        }
        
        const scene = story.scenes.find(s => s.id === this.state.currentSceneId);
        if (scene) {
            this.elements.text.textContent = scene.text;
        }
        
        this.state.isTyping = false;
    },

    setTextSpeed(speed) {
        // speed: 'slow' (50ms), 'normal' (30ms), 'fast' (10ms)
        const speeds = {
            slow: 50,
            normal: 30,
            fast: 10
        };
        this.state.textSpeed = speeds[speed] || 30;
    },

    showMenu() {
        this.elements.gameScreen.classList.remove('active');
        this.elements.galleryScreen.classList.remove('active');
        this.elements.settingsScreen.classList.remove('active');
        this.elements.menuScreen.classList.add('active');
        AudioManager.playBGM('menu');
    },

    showGallery() {
        this.elements.menuScreen.classList.remove('active');
        this.elements.galleryScreen.classList.add('active');
        this.loadGallery();
    },

    showSettings() {
        this.elements.menuScreen.classList.remove('active');
        this.elements.settingsScreen.classList.add('active');
    },

    initSettings() {
        // BGM音量
        const bgmSlider = document.getElementById('bgm-volume');
        const bgmValue = document.getElementById('bgm-value');
        bgmSlider.value = AudioManager.bgm.volume * 100;
        bgmValue.textContent = Math.round(bgmSlider.value) + '%';

        bgmSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            AudioManager.setBGMVolume(volume);
            bgmValue.textContent = Math.round(e.target.value) + '%';
        });

        // 効果音音量
        const sfxSlider = document.getElementById('sfx-volume');
        const sfxValue = document.getElementById('sfx-value');
        sfxSlider.value = AudioManager.sfx.volume * 100;
        sfxValue.textContent = Math.round(sfxSlider.value) + '%';

        sfxSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            AudioManager.setSFXVolume(volume);
            sfxValue.textContent = Math.round(e.target.value) + '%';
            // テスト再生
            AudioManager.playSFX('click');
        });

        // テキスト速度
        const textSpeed = document.getElementById('text-speed');
        textSpeed.addEventListener('change', (e) => {
            this.setTextSpeed(e.target.value);
        });
    },

    loadGallery() {
        this.elements.galleryGrid.innerHTML = '';

        // 背景画像のリスト
        const allImages = [
            '00000-4137636735.png',
            '00002-2642426615.png',
            '00003-2642426616.png',
            '00004-2642426617.png',
            '00005-2642426618.png',
            '00006-2642426619.png',
            '00007-2642426620.png',
            '00008-2642426621.png',
            '00009-2642426622.png',
            '00010-2642426623.png'
        ];

        allImages.forEach(imageName => {
            const item = document.createElement('div');
            item.className = 'gallery-item';

            // 既読シーンの画像のみ表示
            const isUnlocked = this.isImageUnlocked(imageName);
            
            if (isUnlocked) {
                item.innerHTML = `<img src="full_version/assets/images/${imageName}" alt="CG">`;
                item.addEventListener('click', () => {
                    this.showImageModal(imageName);
                });
            } else {
                item.classList.add('locked');
            }

            this.elements.galleryGrid.appendChild(item);
        });
    },

    isImageUnlocked(imageName) {
        // 該当する画像を使用しているシーンが既読かチェック
        const scenesWithImage = story.scenes.filter(s => s.bg === imageName);
        return scenesWithImage.some(scene => 
            this.state.visitedScenes.includes(scene.id)
        );
    },

    showImageModal(imageName) {
        // モーダル作成
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-close">×</div>
            <img src="full_version/assets/images/${imageName}" alt="CG">
        `;

        document.body.appendChild(modal);

        // クリックで閉じる
        modal.addEventListener('click', () => {
            modal.remove();
        });
    },

    showEnding(endingType) {
        let message = '';
        if (endingType === 'happy') {
            message = '🎉 ハッピーエンド達成！\n\nリサとの素敵な未来が待っています。';
        } else if (endingType === 'normal') {
            message = '✨ ノーマルエンド\n\n農場での新しい生活が始まりました。';
        }
        
        alert(message);
        
        // メニューに戻る
        this.showMenu();
    }
};

// 初期化
window.addEventListener('DOMContentLoaded', () => {
    // ローディング画面を表示
    const loadingScreen = document.getElementById('loading-screen');
    const menuScreen = document.getElementById('menu-screen');

    // 最低1秒はローディング画面を表示
    setTimeout(() => {
        Game.init();
        
        // ローディング完了
        if (loadingScreen) loadingScreen.classList.remove('active');
        if (menuScreen) menuScreen.classList.add('active');
        
        // メニュー画面でBGM再生
        AudioManager.playBGM('menu');
    }, 1000);
});
