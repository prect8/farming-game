# 農家の物語 (The Farmer's Story)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

2025年11月29日、冬の始まり。都会から来た青年が祖父の農場を受け継ぎ、新しい人生を始める物語。

![Game Screenshot](https://via.placeholder.com/800x450/1a2e1a/4ade80?text=Game+Screenshot)

## 🎮 デモ

**[▶️ プレイする](https://your-username.github.io/farming-game/full_version/)**

## ✨ 特徴

- 📖 **30シーンの完全なストーリー**
- 🔀 **3箇所の選択肢分岐**
- 🎭 **2種類のエンディング**
- 🎵 **BGM・効果音対応**
- 🖼️ **ギャラリー機能**
- ⚙️ **設定画面（音量・速度調整）**
- ⏩ **オート再生・スキップ機能**
- 📱 **レスポンシブデザイン**

## 🚀 クイックスタート

### オンラインでプレイ

GitHub Pagesで公開中：
```
https://your-username.github.io/farming-game/full_version/
```

### ローカルでプレイ

1. リポジトリをクローン
```bash
git clone https://github.com/your-username/farming-game.git
cd farming-game
```

2. ブラウザで開く
```bash
# Windowsの場合
start full_version/index.html

# macOS/Linuxの場合
open full_version/index.html
```

## 📁 プロジェクト構成

```
farming-game/
├── full_version/           # ゲーム本体
│   ├── index.html         # メインHTML
│   ├── main.js            # ゲームエンジン
│   ├── audio.js           # オーディオ管理
│   ├── story.js           # ストーリーデータ
│   ├── style.css          # スタイルシート
│   ├── assets/
│   │   ├── images/        # 画像素材
│   │   └── audio/         # 音声素材
│   ├── README.md          # 詳細ドキュメント
│   ├── TEST_CHECKLIST.md  # テストチェックリスト
│   └── IMAGE_GUIDE.md     # 画像管理ガイド
├── demo/                  # シンプルなデモ版
├── .kiro/specs/           # 設計ドキュメント
├── .gitignore
├── LICENSE
└── README.md              # このファイル
```

## 🎯 操作方法

### メニュー画面
- **はじめから**: 新規ゲーム開始
- **ギャラリー**: 既読CG鑑賞
- **設定**: 音量・テキスト速度調整

### ゲーム画面
- **クリック**: 次のシーンへ進む
- **タイピング中にクリック**: 全文即座表示
- **選択肢**: ボタンをクリックして選択

### コントロールボタン
- **📋 メニュー**: メニュー画面に戻る
- **▶️ オート**: 自動再生ON/OFF
- **⏩ スキップ**: 既読シーンを高速スキップ

## 🎨 キャラクター

| キャラクター | 説明 |
|------------|------|
| **ユウキ** | 主人公。都会から来た農家の青年 |
| **リサ** | ヒロイン。隣の牧場で働く明るい女性 |
| **タクミ** | 村の若い大工。施設の修理を手伝ってくれる |

## 🛠️ 技術スタック

- **HTML5** - マークアップ
- **CSS3** - スタイリング（アニメーション、レスポンシブ）
- **JavaScript (ES6+)** - ゲームロジック
- **Vanilla JS** - ライブラリ不使用

## 📝 開発

### 必要な環境
- モダンブラウザ（Chrome, Firefox, Edge, Safari）
- テキストエディタ

### カスタマイズ

#### ストーリーの編集
`full_version/story.js`を編集：
```javascript
const story = {
    scenes: [
        {
            id: 'scene_001',
            bg: 'background.png',
            char: 'character.png',
            speaker: 'character_name',
            text: 'セリフ',
            next: 'scene_002'
        }
    ]
}
```

#### 画像の追加
1. `full_version/assets/images/`に画像を配置
2. `story.js`で画像ファイル名を指定

#### 音声の追加
1. `full_version/assets/audio/bgm/`または`sfx/`に音声ファイルを配置
2. `story.js`で`bgm`または`sfx`プロパティを指定

## 🎵 音声素材について

音声ファイルは以下のサイトから入手できます：

- [DOVA-SYNDROME](https://dova-s.jp/) - BGM
- [魔王魂](https://maou.audio/) - BGM
- [甘茶の音楽工房](https://amachamusic.chagasi.com/) - BGM
- [効果音ラボ](https://soundeffect-lab.info/) - 効果音

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルをご覧ください。

### 使用素材のライセンス
- **画像**: 自作またはフリー素材
- **音声**: 各素材サイトの利用規約に従ってください

## 🤝 コントリビューション

プルリクエストを歓迎します！大きな変更の場合は、まずissueを開いて変更内容を議論してください。

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを開く

## 🐛 バグ報告

バグを見つけた場合は、[Issues](https://github.com/your-username/farming-game/issues)で報告してください。

## 📞 サポート

質問や提案がある場合：
- [Issues](https://github.com/your-username/farming-game/issues)を開く
- [Discussions](https://github.com/your-username/farming-game/discussions)で議論

## 🙏 クレジット

- **企画・制作**: [Your Name]
- **プログラミング**: Kiro AI
- **音楽素材**: DOVA-SYNDROME, 魔王魂, 甘茶の音楽工房
- **効果音素材**: 効果音ラボ

## 📊 プロジェクト統計

- **開発期間**: 1日
- **総コード行数**: 約2000行
- **シーン数**: 30シーン
- **選択肢**: 3箇所
- **エンディング**: 2種類

## 🌟 スター履歴

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/farming-game&type=Date)](https://star-history.com/#your-username/farming-game&Date)

---

**バージョン**: 1.0.0  
**最終更新**: 2025年11月29日

Made with ❤️ and ☕
