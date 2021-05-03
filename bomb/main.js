const TEXTCONTENT = `

20thロゴ
OPTiM®
OPTiMはおかげさまで創業20周年を迎えました
企業情報

トップメッセージ
ソリューション

農業ソリューション
サービス

AI サービス
IR情報

経営方針
採用情報

採用情報トップ
ニュース

ニュース一覧
アクセス
EN
お問い合わせ







TOPICS

トピックス
オプティムの最新の取り組みやニュースなど幅広くご紹介


オプティムは創業20周年を迎えました。特設サイト公開中

Optimal Bizで最適なGIGAスクール構想の実現をサポート

withコロナ対応「OPTiM AI Camera」ソリューションの販売開始
NEWS

ニュース
ニュース一覧
お知らせ
プレスリリース
IPインフォメーション
メディア
IR情報
採用情報
プレスリリース
2021.04.22

テレワーク支援サービス「Optimal Biz Telework」、バージョンアップを実施 ～仕事への取り組み方に気づきを与える「集中度可視化」機能などを追加～

メディア
2021.04.20

CNET Japanに、当社とKDDI株式会社が合弁会社「DXGoGo株式会社」を、共同で設立する旨の記事が掲載されました。

メディア
2021.04.20

IoTNEWSに、「OPTiM AI Camera」がアップデートされた旨の記事が掲載されました。

メディア
2021.04.20

EnterpriseZineに、当社とKDDI株式会社が合弁会社「DXGoGo株式会社」を、共同で設立する旨の記事が掲載されました。

メディア
2021.04.20

business network.jpに、当社とKDDI株式会社が合弁会社「DXGoGo株式会社」を、共同で設立する旨の記事が掲載されました。

メディア
2021.04.20

IoTNEWSに、当社とKDDI株式会社が合弁会社「DXGoGo株式会社」を、共同で設立する旨の記事が掲載されました。


COMPANY

企業情報
OPTiMは2000年の創業以来、AI・IoT・ビッグデータプラットフォームのマーケットリーダーとして、普遍的なテクノロジー・サービス・ビジネスモデルを創り出すことに取り組んでいます。

SERVICES

サービス
「ネットを空気に変える」というコンセプトを掲げ、すべての人々が等しくインターネットのもたらす創造性、利便性を享受できるようなサービスの開発に尽力しております。






























IR

IR情報
最新のIR資料や投資家向けの情報を掲載しています。

RECRUIT

採用情報
「世界のデファクトスタンダードを獲得する」
言葉にするのは簡単ですが、私たちは本気でそう思い、独自の技術を武器に、世界を意識した行動を起こしています。世界を本気で狙う企業の一員として活躍したいという想いを持つ方を募集します。

RELATED INFORMATION

関連情報
OPTiM TECH BLOG
「世界のデファクトスタンダードを獲得する」をスローガンに、独自の技術を武器に本気で世界を意識した私たちの技術情報を発信しています。

スマートアグリフード（スマ直）
白米・玄米・無洗米玄米の通販サイト

SMART AGRI
スマートアグリは、スマート農業に関する情報をお届けするウェブメディアです。「農政・行政」の情報を、日々更新していきます。

Medical DX
医療業界のデジタルトランスフォーメーションをテーマとした医療のウェブメディアです。

デジコン
「建設土木の未来をICTで変える」をコンセプトとしたメディアです。

AI Start Lab
AIの導入事例や導入効果の評価などリアルな声を発信、 AIを用いたビジネス変革をサポートするメディアです。

Facebook
Twitter
Instagram
YouTube
企業情報
トップメッセージ
ディレクター紹介
経営理念
会社概要
グループ会社
事業案内
経営諮問委員会
知財戦略
ソリューション
農業ソリューション
医療ソリューション
水産ソリューション
製造ソリューション
コールセンターソリューション
教育向けMDMソリューション
行政向けMDMソリューション
サービス
AI サービス
IoT サービス
Robotics / Hardware サービス
Other サービス
IR情報
経営方針
IRニュース
IRカレンダー
IRライブラリ
株主・株式情報
ニュース
ニュース一覧
お知らせ
プレスリリース
IPインフォメーション
メディア
採用情報
IR情報
パートナー募集
採用情報
情報セキュリティ
プライバシーポリシー
競争的資金等の不正防止
商標について
お問い合わせ
サイトマップ
OPTiM

©2021 OPTiM Corp.All Rights Reserved
`

// reader = new FileReader()
// reader.readAsText(Fileオブジェクト)
// reader.result

const CONTAINER = document.getElementById('cotainer');
const FONT_SIZE = 20;


const radius    = 10000;
const power     = 10000;


// CONTAINER.innerHTML = TEXTCONTENT;
const textList = TEXTCONTENT.split('');


let bombId = 0;

for ( let idx=0; idx<textList.length; idx++ ){
    let child = document.createElement('div');
    child.textContent   = textList[idx];
    child.id            = idx;
    CONTAINER.appendChild(child);
}



// マウスクリックの座標を渡したら、ある特定の範囲内の要素のIDのリストを返す
function checkPosition( ex, ey, r ){
    let tmp = [];
    for ( let idx=0; idx<textList.length; idx++ ){
        let elm = document.getElementById(`${idx}`);
        if ( elm ){
            let rect = elm.getBoundingClientRect();  // 画面左上を基準とする位置
    
            // document（ページ左上）からの絶対座標
            let y1 = rect.top + window.pageYOffset;
            let x1 = rect.left + window.pageXOffset;
            if ( Math.pow(x1 - ex, 2) + Math.pow(y1 - ey, 2) < r ){
                tmp.push([idx, x1 - ex, y1 - ey]);
            }
        }
    }
    return tmp
}

function scatterTag( array ){
    for ( const idx of array ){
        // console.log(idx)
        let elm = document.getElementById(`${idx[0]}`);

        let sqr = sqrt(idx[1], idx[2]);
        // transform = "translate(" + scatDist(idx[1]) + "px, " + scatDist(idx[2]) + "px) rotate(" + randomAngle() + "deg)";
        transform = "translate(" + power*(idx[1])/sqr + "px, " + power*(idx[2])/sqr + "px) rotate(" + randomAngle() + "deg)";
        elm.style['transform'] = transform;
    }   
    // location.reload();
}

function sqrt(x,y ){
    return x**2 + y**2
}

function scatDist( dist ){
    let revDis = 200 / dist;
    return revDis * ( 1 + Math.random() )
}

// 0-360 deg をランダムに返す
function randomAngle() { 
    return 360 * Math.random()
}

function putBomb( x, y ){
    createMark( x,y );
    // console.log(mark.id);
    startTimer( bombId );
    bombId += 1;
}
// id のものを x, y だけ移動する
function createMark( x,y ){
    let mark = document.createElement('div');

    mark.id = 'b' + bombId;

    mark.className = 'bomb';
    mark.style.position = 'fixed';
    mark.style.top = y - FONT_SIZE + 'px';
    mark.style.left = x - FONT_SIZE + 'px';

    mark.textContent = 3;
    CONTAINER.appendChild(mark);
}

let nextRemoveBomb = 0;
function startTimer( bombId ){
    const bombEach = document.getElementById('b' + bombId);
    // const timerName = 'testTimer' + bombId;

    // HACK
    setTimeout(function() {bombEach.textContent = 2}, 1000);
    setTimeout(function() {bombEach.textContent = 1}, 2000);
    setTimeout(function() {bombEach.textContent = 0}, 3000);
    setTimeout(function() {bombEach.remove}, 3100);
    setTimeout(function() {bombEach.animate({
        opacity: [0, 1]
        }, {
        delay: 500,
        direction: 'reverse',
        duration: 500,
        easing: 'ease-in-out',
        fill: 'forwards'
    })}, 3100);
    
    // timerName = setInterval( function() {
    //     let time = Number(bombEach.innerHTML)
    //     bombEach.textContent = time - 1;
    //     if ( time > 1 ){
            
    //     } else {
    //         clearInterval(timerName);
    //         // CONTAINER.removeChild(bombEach);
    //         bombEach.remove();
    //     }
    // } , 1000);
}



let isDragging = false
let startPosition = null
let lastPosition = null
let requestId = null


// 指定した id を持つタグを消去する（removeChild）
function clearTags( array ){
    for ( tagId of array ){
        // tagId = [id, x, y] にしたんだった
        let elm = document.getElementById( tagId[0] );
        elm.animate({
            opacity: [0, 1]
            }, {
            delay: 500,
            direction: 'reverse',
            duration: 500,
            easing: 'ease-in-out',
            fill: 'forwards'
        })
        // elm.remove();
    }
}

function onClick(e) {
    

    putBomb( e.clientX, e.clientY );
    
    const withInIndex = checkPosition(e.clientX, e.clientY, radius);
    window.setTimeout( scatterTag, 3000, withInIndex );
    // scatterTag(withInIndex);
    window.setTimeout( clearTags, 3100, withInIndex );
}
document.addEventListener('click', onClick, false);


// 適当な時間待つ関数
function sleep(waitMsec) {
    var startMsec = new Date();
  
    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
}