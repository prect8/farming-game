// オーディオ管理システム
const AudioManager = {
    bgm: {
        current: null,
        audio: null,
        volume: 0.5
    },
    
    sfx: {
        volume: 0.7,
        cache: {}
    },

    // 初期化
    init() {
        // BGM用のAudioオブジェクト作成
        this.bgm.audio = new Audio();
        this.bgm.audio.loop = true;
        this.bgm.audio.volume = this.bgm.volume;

        // 設定を読み込み
        this.loadSettings();
    },

    // BGM再生
    playBGM(filename, fadeIn = true) {
        // 同じBGMが再生中なら何もしない
        if (this.bgm.current === filename && !this.bgm.audio.paused) {
            return;
        }

        // 新しいBGMを再生
        const newBGM = new Audio(`full_version/assets/audio/bgm/${filename}.mp3`);
        newBGM.loop = true;
        newBGM.volume = fadeIn ? 0 : this.bgm.volume;

        // 古いBGMをフェードアウト
        if (this.bgm.audio && !this.bgm.audio.paused) {
            this.fadeOut(this.bgm.audio, 1000);
        }

        // 新しいBGMを再生
        newBGM.play().catch(err => {
            console.warn('BGM再生失敗:', err);
        });

        // フェードイン
        if (fadeIn) {
            this.fadeIn(newBGM, this.bgm.volume, 1000);
        }

        this.bgm.audio = newBGM;
        this.bgm.current = filename;
    },

    // BGM停止
    stopBGM(fadeOut = true) {
        if (!this.bgm.audio) return;

        if (fadeOut) {
            this.fadeOut(this.bgm.audio, 1000, () => {
                this.bgm.audio.pause();
                this.bgm.current = null;
            });
        } else {
            this.bgm.audio.pause();
            this.bgm.current = null;
        }
    },

    // 効果音再生
    playSFX(filename) {
        // キャッシュから取得または新規作成
        if (!this.sfx.cache[filename]) {
            this.sfx.cache[filename] = new Audio(`full_version/assets/audio/sfx/${filename}.mp3`);
        }

        const sfx = this.sfx.cache[filename].cloneNode();
        sfx.volume = this.sfx.volume;
        sfx.play().catch(err => {
            console.warn('効果音再生失敗:', err);
        });
    },

    // BGM音量設定
    setBGMVolume(volume) {
        this.bgm.volume = Math.max(0, Math.min(1, volume));
        if (this.bgm.audio) {
            this.bgm.audio.volume = this.bgm.volume;
        }
        this.saveSettings();
    },

    // 効果音音量設定
    setSFXVolume(volume) {
        this.sfx.volume = Math.max(0, Math.min(1, volume));
        this.saveSettings();
    },

    // フェードイン
    fadeIn(audio, targetVolume, duration) {
        const steps = 20;
        const stepDuration = duration / steps;
        const volumeStep = targetVolume / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            audio.volume = Math.min(volumeStep * currentStep, targetVolume);

            if (currentStep >= steps) {
                clearInterval(interval);
            }
        }, stepDuration);
    },

    // フェードアウト
    fadeOut(audio, duration, callback) {
        const steps = 20;
        const stepDuration = duration / steps;
        const startVolume = audio.volume;
        const volumeStep = startVolume / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            audio.volume = Math.max(startVolume - (volumeStep * currentStep), 0);

            if (currentStep >= steps) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, stepDuration);
    },

    // 設定保存
    saveSettings() {
        const settings = {
            bgmVolume: this.bgm.volume,
            sfxVolume: this.sfx.volume
        };
        localStorage.setItem('audioSettings', JSON.stringify(settings));
    },

    // 設定読み込み
    loadSettings() {
        const saved = localStorage.getItem('audioSettings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                this.bgm.volume = settings.bgmVolume || 0.5;
                this.sfx.volume = settings.sfxVolume || 0.7;
                
                if (this.bgm.audio) {
                    this.bgm.audio.volume = this.bgm.volume;
                }
            } catch (e) {
                console.warn('設定読み込み失敗:', e);
            }
        }
    },

    // ミュート切り替え
    toggleMute() {
        if (this.bgm.audio) {
            this.bgm.audio.muted = !this.bgm.audio.muted;
        }
        return this.bgm.audio ? this.bgm.audio.muted : false;
    }
};
