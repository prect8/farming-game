// 農家の物語 - ストーリーデータ
// 2025年11月29日、冬の始まり

const story = {
    // キャラクター定義
    characters: {
        'narrator': { name: 'ナレーター', color: '#94a3b8' },
        'protagonist': { name: 'ユウキ', color: '#4ade80' },
        'lisa': { name: 'リサ', color: '#f59e0b' },
        'takumi': { name: 'タクミ', color: '#3b82f6' },
        'hana': { name: 'ハナばあちゃん', color: '#ec4899' }
    },

    // シーンデータ
    scenes: [
        // === 序盤：到着 ===
        {
            id: 'scene_001',
            bg: '00000-4137636735.png',
            char: null,
            speaker: 'narrator',
            text: '2025年11月29日。冬の冷たい風が吹く中、僕は祖父が残した農場へとやってきた。',
            bgm: 'main_theme',
            next: 'scene_002'
        },
        {
            id: 'scene_002',
            bg: '00000-4137636735.png',
            char: null,
            speaker: 'narrator',
            text: '都会の喧騒から逃れて、新しい人生を始めるために……。',
            next: 'scene_003'
        },
        {
            id: 'scene_003',
            bg: '00000-4137636735.png',
            char: null,
            speaker: 'protagonist',
            text: 'うわぁ……想像以上に荒れてるな。本当にここでやっていけるのか？',
            next: 'scene_004'
        },
        {
            id: 'scene_004',
            bg: '00000-4137636735.png',
            char: null,
            speaker: 'narrator',
            text: '見渡す限りの荒れ地。雑草だらけの畑。傾いた小屋。不安が胸をよぎる。',
            next: 'scene_005'
        },

        // === リサ登場 ===
        {
            id: 'scene_005',
            bg: '00000-4137636735.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'あら、あなたが新しい持ち主さん？やっと会えたわ！',
            sfx: 'appear',
            next: 'scene_006'
        },
        {
            id: 'scene_006',
            bg: '00000-4137636735.png',
            char: 'char_lisa.png',
            speaker: 'protagonist',
            text: 'えっ、あなたは……？',
            next: 'scene_007'
        },
        {
            id: 'scene_007',
            bg: '00000-4137636735.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: '私はリサ！隣の牧場で働いてるの。あなたのおじいさんとは仲良くしてもらってたのよ。',
            next: 'scene_008'
        },
        {
            id: 'scene_008',
            bg: '00000-4137636735.png',
            char: 'char_lisa.png',
            speaker: 'protagonist',
            text: '僕はユウキです。よろしくお願いします。',
            next: 'scene_009'
        },
        {
            id: 'scene_009',
            bg: '00000-4137636735.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'ふふっ、堅苦しいわね。ここは田舎だから、もっと気楽にいきましょ！',
            next: 'scene_010'
        },
        {
            id: 'scene_010',
            bg: '00002-2642426615.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'それにしても……ここ、かなり荒れちゃってるわね。冬に入る前に何とかしないと。',
            next: 'scene_011'
        },

        // === 選択肢1：誰に助けを求めるか ===
        {
            id: 'scene_011',
            bg: '00002-2642426615.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'ねえ、どうする？私が農業のこと教えてあげようか？それとも村の大工のタクミに頼む？',
            type: 'choice',
            choices: [
                { 
                    text: 'リサに教えてもらう', 
                    next: 'scene_012_lisa',
                    flag: 'helped_by_lisa'
                },
                { 
                    text: 'タクミに頼む', 
                    next: 'scene_012_takumi',
                    flag: 'helped_by_takumi'
                },
                { 
                    text: '自分でやってみる', 
                    next: 'scene_012_alone',
                    flag: 'independent'
                }
            ]
        },

        // === ルートA：リサルート ===
        {
            id: 'scene_012_lisa',
            bg: '00002-2642426615.png',
            char: 'char_lisa.png',
            speaker: 'protagonist',
            text: 'リサさん、農業のこと教えてもらえますか？',
            next: 'scene_013_lisa'
        },
        {
            id: 'scene_013_lisa',
            bg: '00002-2642426615.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'もちろん！任せて。まずは冬でも育つ野菜から始めましょう。',
            next: 'scene_014_lisa'
        },
        {
            id: 'scene_014_lisa',
            bg: '00003-2642426616.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'ほうれん草とか白菜とか、冬野菜は意外と強いのよ。',
            next: 'scene_015_common'
        },

        // === ルートB：タクミルート ===
        {
            id: 'scene_012_takumi',
            bg: '00002-2642426615.png',
            char: 'char_lisa.png',
            speaker: 'protagonist',
            text: 'まずは施設を直さないと。タクミさんに頼んでみます。',
            next: 'scene_013_takumi'
        },
        {
            id: 'scene_013_takumi',
            bg: '00002-2642426615.png',
            char: 'char_takumi.png',
            speaker: 'takumi',
            text: 'よう！新入りか。俺がタクミだ。小屋の修理なら任せとけ！',
            next: 'scene_014_takumi'
        },
        {
            id: 'scene_014_takumi',
            bg: '00003-2642426616.png',
            char: 'char_takumi.png',
            speaker: 'takumi',
            text: 'この冬を乗り切るには、まず屋根と壁を直さないとな。',
            next: 'scene_015_common'
        },

        // === ルートC：独立ルート ===
        {
            id: 'scene_012_alone',
            bg: '00002-2642426615.png',
            char: 'char_lisa.png',
            speaker: 'protagonist',
            text: 'ありがとう。でも、まずは自分でやってみたいんです。',
            next: 'scene_013_alone'
        },
        {
            id: 'scene_013_alone',
            bg: '00002-2642426615.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'あら、頼もしいわね！でも困ったらいつでも声かけてね。',
            next: 'scene_014_alone'
        },
        {
            id: 'scene_014_alone',
            bg: '00003-2642426616.png',
            char: null,
            speaker: 'narrator',
            text: '一人で黙々と作業を始めた。大変だけど、少しずつ形になっていく。',
            next: 'scene_015_common'
        },

        // === 共通ルート：数日後 ===
        {
            id: 'scene_015_common',
            bg: '00004-2642426617.png',
            char: null,
            speaker: 'narrator',
            text: '数日後――',
            next: 'scene_016'
        },
        {
            id: 'scene_016',
            bg: '00004-2642426617.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'ユウキ！調子はどう？',
            next: 'scene_017'
        },
        {
            id: 'scene_017',
            bg: '00004-2642426617.png',
            char: 'char_lisa.png',
            speaker: 'protagonist',
            text: '少しずつだけど、形になってきました。',
            next: 'scene_018'
        },

        // === 選択肢2：何を育てるか ===
        {
            id: 'scene_018',
            bg: '00004-2642426617.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'そうだ！最初の作物、何を育てる？実用的な野菜？それとも……花とか？',
            type: 'choice',
            choices: [
                { 
                    text: '冬野菜を育てる', 
                    next: 'scene_019_vegetable',
                    flag: 'grow_vegetable'
                },
                { 
                    text: '冬の花を育てる', 
                    next: 'scene_019_flower',
                    flag: 'grow_flower'
                }
            ]
        },

        // === 野菜ルート ===
        {
            id: 'scene_019_vegetable',
            bg: '00005-2642426618.png',
            char: 'char_lisa.png',
            speaker: 'protagonist',
            text: 'やっぱり実用的な野菜がいいかな。',
            next: 'scene_020_vegetable'
        },
        {
            id: 'scene_020_vegetable',
            bg: '00005-2642426618.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: '現実的ね！じゃあ白菜とほうれん草を植えましょう。',
            next: 'scene_021_common'
        },

        // === 花ルート ===
        {
            id: 'scene_019_flower',
            bg: '00005-2642426618.png',
            char: 'char_lisa.png',
            speaker: 'protagonist',
            text: '冬でも咲く花を育ててみたいです。',
            next: 'scene_020_flower'
        },
        {
            id: 'scene_020_flower',
            bg: '00005-2642426618.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'まあ、ロマンチック！パンジーとかスイートアリッサムがいいわね。',
            next: 'scene_021_common'
        },

        // === 共通：村の祭り ===
        {
            id: 'scene_021_common',
            bg: '00006-2642426619.png',
            char: null,
            speaker: 'narrator',
            text: '12月中旬。村では冬の収穫祭が開かれることになった。',
            next: 'scene_022'
        },
        {
            id: 'scene_022',
            bg: '00006-2642426619.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'ねえユウキ、今度の祭り、一緒に出店しない？',
            next: 'scene_023'
        },

        // === 選択肢3：祭りへの参加 ===
        {
            id: 'scene_023',
            bg: '00006-2642426619.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'まだ始めたばかりだけど、村の人たちに顔を覚えてもらういい機会よ！',
            type: 'choice',
            choices: [
                { 
                    text: '積極的に参加する', 
                    next: 'scene_024_active',
                    flag: 'festival_active'
                },
                { 
                    text: '控えめに参加する', 
                    next: 'scene_024_passive',
                    flag: 'festival_passive'
                }
            ]
        },

        // === 積極参加ルート ===
        {
            id: 'scene_024_active',
            bg: '00007-2642426620.png',
            char: 'char_lisa.png',
            speaker: 'protagonist',
            text: 'やります！リサさんと一緒なら頑張れそうです。',
            next: 'scene_025_active'
        },
        {
            id: 'scene_025_active',
            bg: '00007-2642426620.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'その意気よ！じゃあ、私の特製スープとあなたの野菜で勝負ね！',
            next: 'scene_026_active'
        },
        {
            id: 'scene_026_active',
            bg: '00008-2642426621.png',
            char: 'char_lisa.png',
            speaker: 'narrator',
            text: '祭り当日。二人の出店は大盛況だった。',
            next: 'scene_027_active'
        },
        {
            id: 'scene_027_active',
            bg: '00008-2642426621.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'ユウキ、見て！完売よ！',
            next: 'scene_028_active'
        },
        {
            id: 'scene_028_active',
            bg: '00009-2642426622.png',
            char: 'char_lisa.png',
            speaker: 'protagonist',
            text: 'リサさんのおかげです。ありがとう。',
            next: 'scene_029_active'
        },
        {
            id: 'scene_029_active',
            bg: '00009-2642426622.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'ふふっ、二人でやったからよ。……ねえ、これからも一緒にやっていかない？',
            next: 'ending_happy'
        },

        // === 控えめ参加ルート ===
        {
            id: 'scene_024_passive',
            bg: '00007-2642426620.png',
            char: 'char_lisa.png',
            speaker: 'protagonist',
            text: 'まだ始めたばかりだし、今回は見学だけにしておきます。',
            next: 'scene_025_passive'
        },
        {
            id: 'scene_025_passive',
            bg: '00007-2642426620.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'そっか……。でも、一緒に回りましょ？',
            next: 'scene_026_passive'
        },
        {
            id: 'scene_026_passive',
            bg: '00008-2642426621.png',
            char: 'char_lisa.png',
            speaker: 'narrator',
            text: '祭りは楽しかった。でも、どこか物足りない気持ちも残った。',
            next: 'ending_normal'
        },

        // === ハッピーエンディング ===
        {
            id: 'ending_happy',
            bg: '00010-2642426623.png',
            char: 'char_lisa.png',
            speaker: 'narrator',
            text: '数ヶ月後――',
            bgm: 'ending',
            next: 'ending_happy_2'
        },
        {
            id: 'ending_happy_2',
            bg: '00010-2642426623.png',
            char: 'char_lisa.png',
            speaker: 'narrator',
            text: '農場は見違えるほど立派になった。そして、リサとの距離も……。',
            next: 'ending_happy_3'
        },
        {
            id: 'ending_happy_3',
            bg: '00010-2642426623.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'ユウキ、春になったら何を植える？',
            next: 'ending_happy_4'
        },
        {
            id: 'ending_happy_4',
            bg: '00010-2642426623.png',
            char: 'char_lisa.png',
            speaker: 'protagonist',
            text: 'リサさんと一緒なら、何でも育てられる気がします。',
            next: 'ending_happy_5'
        },
        {
            id: 'ending_happy_5',
            bg: '00010-2642426623.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'ふふっ、じゃあ二人の未来も一緒に育てていきましょ？',
            next: 'ending_happy_final'
        },
        {
            id: 'ending_happy_final',
            bg: '00010-2642426623.png',
            char: 'char_lisa.png',
            speaker: 'narrator',
            text: '【ハッピーエンド】新しい人生、新しい恋。農場での日々は、これからも続いていく――',
            type: 'end',
            endingType: 'happy'
        },

        // === ノーマルエンディング ===
        {
            id: 'ending_normal',
            bg: '00010-2642426623.png',
            char: null,
            speaker: 'narrator',
            text: '数ヶ月後――',
            bgm: 'ending',
            next: 'ending_normal_2'
        },
        {
            id: 'ending_normal_2',
            bg: '00010-2642426623.png',
            char: null,
            speaker: 'narrator',
            text: '農場は順調に育っている。村の人たちとも少しずつ仲良くなってきた。',
            next: 'ending_normal_3'
        },
        {
            id: 'ending_normal_3',
            bg: '00010-2642426623.png',
            char: 'char_lisa.png',
            speaker: 'lisa',
            text: 'ユウキ、頑張ってるわね。',
            next: 'ending_normal_4'
        },
        {
            id: 'ending_normal_4',
            bg: '00010-2642426623.png',
            char: 'char_lisa.png',
            speaker: 'protagonist',
            text: 'まだまだこれからですけどね。',
            next: 'ending_normal_final'
        },
        {
            id: 'ending_normal_final',
            bg: '00010-2642426623.png',
            char: 'char_lisa.png',
            speaker: 'narrator',
            text: '【ノーマルエンド】農場での新しい生活。まだ始まったばかりだ――',
            type: 'end',
            endingType: 'normal'
        }
    ]
};
