# 設計ドキュメント - 農家の物語

## アーキテクチャ

### システム構成
```
full_version/
├── index.html          # メインHTML
├── style.css           # スタイルシート
├── main.js             # ゲームエンジン
├── story.js            # ストーリーデータ
├── assets/
│   ├── images/         # 画像素材
│   └── audio/          # 音声素材
│       ├── bgm/        # BGM
│       └── sfx/        # 効果音
```

## コアシステム設計

### CP-001: ゲームエンジン
**対応要件**: AC-001, AC-002
**説明**: ゲーム全体を管理するコアシステム

```javascript
const Game = {
    state: {
        currentScene: 0,
        flags: {},          // 選択肢フラグ
        visitedScenes: [],  // 既読管理
        settings: {
            bgmVolume: 0.7,
            sfxVolume: 0.8,
            textSpeed: 50
        }
    },
    
    init() {
        // 初期化処理
        // UI初期化
        // イベントリスナー設定
    },
    
    loadScene(sceneId) {
        // シーン読み込み
        // 背景・キャラクター表示
        // テキスト表示
    },
    
    nextScene() {
        // 次のシーンへ
    },
    
    showChoice(choices) {
        // 選択肢表示
    }
}
```

### CP-002: ストーリーデータ構造
**対応要件**: AC-001, AC-002, AC-003

```javascript
const story = {
    scenes: [
        {
            id: 'scene_001',
            bg: '00000-4137636735.png',
            char: null,
            speaker: 'ナレーター',
            text: '都会の喧騒を離れ、私は祖父が残した古い農場へとやってきた。',
            bgm: 'main_theme',
            next: 'scene_002'
        },
        {
            id: 'scene_010',
            bg: '00002-2642426615.png',
            char: '00001-3689628275.png',
            speaker: 'リサ',
            text: 'どうする？手伝おうか？',
            type: 'choice',
            choices: [
                { text: 'お願いします', next: 'scene_011a', flag: 'helped_by_lisa' },
                { text: '自分でやります', next: 'scene_011b', flag: 'independent' }
            ]
        }
    ],
    
    characters: {
        'protagonist': { name: '主人公', color: '#4ade80' },
        'lisa': { name: 'リサ', color: '#f59e0b' },
        'narrator': { name: 'ナレーター', color: '#94a3b8' }
    }
}
```

### CP-003: オーディオシステム
**対応要件**: AC-004

```javascript
const AudioManager = {
    bgm: null,
    sfx: {},
    
    playBGM(filename, loop = true) {
        // BGM再生
        // フェードイン/アウト
    },
    
    stopBGM() {
        // BGM停止
    },
    
    playSFX(filename) {
        // 効果音再生
    },
    
    setVolume(type, volume) {
        // 音量設定
    }
}
```

### CP-004: UI管理システム
**対応要件**: AC-005, AC-006, AC-007

```javascript
const UI = {
    screens: {
        menu: null,
        game: null,
        gallery: null,
        settings: null
    },
    
    showScreen(screenName) {
        // 画面切り替え
    },
    
    updateDialogue(speaker, text) {
        // ダイアログ更新
    },
    
    showChoices(choices) {
        // 選択肢表示
    },
    
    hideChoices() {
        // 選択肢非表示
    }
}
```

## 画面設計

### 画面遷移図
```
[メニュー画面]
    ├─→ [ゲーム画面] ─→ [エンディング] ─→ [メニュー画面]
    ├─→ [ギャラリー画面] ─→ [メニュー画面]
    └─→ [設定画面] ─→ [メニュー画面]
```

### メニュー画面
- タイトルロゴ（中央上部）
- ボタン群（中央）
  - はじめから
  - ギャラリー
  - 設定
- 背景：グラデーション

### ゲーム画面
- 背景画像（全画面）
- キャラクター画像（中央下部）
- ダイアログボックス（下部）
  - 話者名（左上）
  - テキスト（中央）
  - 次へインジケーター（右下）
- コントロールボタン（右上）
  - オート
  - ログ
  - 設定
  - メニュー

### ギャラリー画面
- タイトル（上部）
- 画像グリッド（中央）
- 戻るボタン（左上）

### 設定画面
- タイトル（上部）
- 設定項目
  - BGM音量スライダー
  - 効果音音量スライダー
  - テキスト速度スライダー
- 戻るボタン

## データフロー

### シーン進行フロー
```
1. ユーザークリック
2. 現在のシーンタイプ判定
   - 通常シーン → 次のシーンへ
   - 選択肢 → 選択肢表示
   - エンディング → メニューへ
3. シーンデータ読み込み
4. UI更新（背景、キャラ、テキスト）
5. BGM/効果音再生
6. 既読フラグ更新
```

### 選択肢処理フロー
```
1. 選択肢表示
2. ユーザー選択待ち
3. 選択された選択肢のフラグ保存
4. 対応するシーンへ分岐
5. 通常のシーン進行へ
```

## パフォーマンス最適化

### 画像読み込み
- 初回ローディング時に主要画像をプリロード
- 背景画像は遅延読み込み
- 画像サイズの最適化

### 音声管理
- BGMはプリロード
- 効果音はオンデマンド読み込み
- 音声ファイルの圧縮

## エラーハンドリング

- 画像読み込み失敗時：プレースホルダー表示
- 音声再生失敗時：サイレント続行
- 不正なシーンID：エラーログ出力してメニューへ

## テスト戦略

### 単体テスト
- シーン遷移ロジック
- 選択肢分岐ロジック
- オーディオ再生/停止

### 統合テスト
- ストーリー全体の進行
- 各エンディングへの到達
- UI操作の動作確認

### ブラウザテスト
- Chrome, Firefox, Edge, Safari
- レスポンシブ表示確認
