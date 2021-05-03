
// reader = new FileReader()
// reader.readAsText(Fileオブジェクト)
// reader.result

const CONTAINER = document.getElementById('cotainer');
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
    for ( const idx of array ){
        // console.log(idx)
        let elm = document.getElementById(`${idx[0]}`);

        transform = "translate(" + scatDist(idx[1]) + "px, " + scatDist(idx[2]) + "px) rotate(" + randomAngle() + "deg)";
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