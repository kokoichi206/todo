
// reader = new FileReader()
// reader.readAsText(Fileオブジェクト)
// reader.result

// const CONTAINER = document.getElementById('cotainer');
const CONTAINER = document.getElementById('chatMain');
const FONT_SIZE = 20;



let bombId = 0;



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
    let ratio = 0.8;
    for ( const idx of array ){
        // idx としては（当初は）[elment, distanceX, distanceY] を想定していた
        // console.log(idx);
        let elm = document.getElementById(`${idx[0]}`);
        

        // transform = "translate(" + scatDist(idx[1]) + "px, " + scatDist(idx[2]) + "px) rotate(" + randomAngle() + "deg)";
        // transform = "translate(" + (idx[1]) + "px, " + (idx[2]) + "px) rotate(" + randomAngle() + "deg)";
        let dx = (2*randomAngle()-360) * ratio;
        let dy = (2*randomAngle()-360) * ratio;
        transform = "translate(" + dx + "px, " + dy + "px) rotate(" + randomAngle() + "deg)";
        elm.style['transform'] = transform;
    }   
    // location.reload();
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
    mark.style.zIndex = 4;
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
    setTimeout(function() {bombEach.remove}, 2800);
    setTimeout(function() {bombEach.animate({
        opacity: [0, 1]
        }, {
        delay: 200,
        direction: 'reverse',
        duration: 500,
        easing: 'ease-in-out',
        fill: 'forwards'
    })}, 3000);
    
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
    
    const withInIndex = checkPosition(e.clientX, e.clientY, 3000);
    window.setTimeout( scatterTag, 3400, withInIndex );
    // scatterTag(withInIndex);
    window.setTimeout( clearTags, 3400, withInIndex );
}

// document.addEventListener('click', onClick, false);



// 適当な時間待つ関数
function sleep(waitMsec) {
    var startMsec = new Date();
  
    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
}



// div タグは壊さないので、２つ以上破壊するには、
// id を連番でつける必要がある（２回目も０からとかはできなさそう）
// p, div それぞれのタグを管理する id として
let div_id = 0;
let p_id   = 0;

// ボタンが指差す要素の中心座標をとってくる
function getCords( elm ){
    let rect = elm.getBoundingClientRect();  // 画面左上を基準とする位置
    
    // document（ページ左上）からの絶対座標
    let y1 = rect.top + window.pageYOffset + elm.offsetHeight/2;
    let x1 = rect.left + window.pageXOffset + elm.offsetWidth/2;

    return [x1, y1]

    // let left = elm.offset().left;
    // let top = elm.offset().top;
    // let width = elm.width();
    // let height = elm.height();
    
    // offsetCenterLeft = left+(width/2);
    // offsetCenterTop = top+(height/2);

    // return [offsetCenterLeft, offsetCenterTop]
}

// element 中の文字列を全て div タグに分割する
function splitDiv( elm, x,y ){
    let startId = div_id;

    let text = elm.textContent;
    console.log(text);
    let textList = text.split('');


    elm.textContent = '';
    tmp = [];
    for ( let i=0; i<textList.length; i++ ){
        let div_tag = document.createElement('div');
        div_tag.id = 'd' + ( i + startId );
        div_tag.className = 'scatDiv';
        div_tag.textContent = textList[i];

        elm.appendChild(div_tag);

        let coooo = getCords( elm );
        tmp.push([ div_tag.id, coooo[0]-x, coooo[1]-y ]);
    }
    div_id += textList.length;
    return tmp
}


// element 中の文字列を全て div タグに分割する
// x,y はリストの中心座標
function splitP( elm, x,y ){
    let startId = p_id;

    let text = elm.textContent;
    let textList = text.split('');


    elm.textContent = '';
    tmp = [];
    for ( let i=0; i<textList.length; i++ ){
        let div_tag = document.createElement('div');
        div_tag.id = 'p' + ( i + startId );
        div_tag.className = 'scatDiv';

        div_tag.textContent = textList[i];
        if ( textList[i] === ' ' ){
            div_tag.innerHTML = '&nbsp;';
        }

        elm.appendChild(div_tag);

        let coooo = getCords( elm );
        tmp.push([ div_tag.id, coooo[0]-x, coooo[1]-y ]);
    }
    p_id += textList.length;
    return tmp
}

// [id, dx, dy] の集まったリストを渡すと、そこから進めてくれる
function scatterElmByIndex( withInIndex ){
    window.setTimeout( scatterTag, 3000, withInIndex );
    // scatterTag(withInIndex);
    window.setTimeout( clearTags, 3100, withInIndex );
}


function bombBtn( bombId ){
    // ぶっ壊したいリスト（div, p, button などを含む）を持ってくる
    const destroyElmId = bombId;
    const destroyElm = document.getElementById( destroyElmId );

    
    
    // li の中心座標をゲット
    const listCords = getCords( destroyElm );
    // リストの中心に爆弾を置く
    putBomb( listCords[0], listCords[1] );
    
    

    // p, div タグを拾う　ー＞　分ける必要ある？？？
    let p_elms = destroyElm.getElementsByTagName('p');
    let div_elms = destroyElm.getElementsByClassName('before');
    // let div_elm = destroyElm.getElementById('div_tag' + bombId);

    let idControlP = splitP(p_elms[0], 30,30 );
    let idControlDiv = splitDiv(div_elms[0], 30,30 );

    scatterElmByIndex( idControlP );
    scatterElmByIndex( idControlDiv );
    // console.log(idControlDiv);

    // 全部終わってから li を削除、３秒のカウントダウンがあるから3sちょいにしてる
    window.setTimeout( function h() {
        destroyElm.removeChild(p_elms[0]);
        destroyElm.removeChild(div_elms[0]);
        const buttons = destroyElm.getElementsByTagName('button');
        console.log(buttons[0]);
        console.log(buttons[1]);
        destroyElm.removeChild(buttons[1]);
        destroyElm.removeChild(buttons[0]);
    }, 3500);
    window.setTimeout( function ho() {
        // li を束ねる ul をゲット
        const oya_ul = document.getElementById('oyaList');
        oya_ul.removeChild(destroyElm);
    }, 3500);
}