// li を束ねる ul をゲット
const oya_ul = document.getElementsByTagName('ul')[0];

// div タグは壊さないので、２つ以上破壊するには、
// id を連番でつける必要がある（２回目も０からとかはできなさそう）
// p, div それぞれのタグを管理する id として
let div_id = 0;
let p_id   = 0;

// ボタンが指差す要素の中心座標をとってくる
function getCords( elm ){
    let rect = elm.getBoundingClientRect();  // 画面左上を基準とする位置
    
    // document（ページ左上）からの絶対座標
    let y1 = rect.top + window.pageYOffset;
    let x1 = rect.left + window.pageXOffset;

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
    console.log(text);
    let textList = text.split('');

    elm.textContent = '';
    tmp = [];
    for ( let i=0; i<textList.length; i++ ){
        let div_tag = document.createElement('div');
        div_tag.id = 'p' + ( i + startId );
        div_tag.textContent = textList[i];
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
    console.log(destroyElm);

    // li の中心座標をゲット
    const listCords = getCords( destroyElm );
    // リストの中心に爆弾を置く
    putBomb( listCords[0], listCords[1] );

    // p, div タグを拾う、時間が格納
    let p_elms = destroyElm.getElementsByTagName('p');
    let div_elms = destroyElm.getElementsByClassName('before');
    console.log(div_elms[0]);
    // console.log(p_elm);
    let idControlP = splitP(p_elms[0], 30,30 );
    let idControlDiv = splitDiv(div_elms[0], 30,30 );

    scatterElmByIndex( idControlP );
    scatterElmByIndex( idControlDiv );
    // console.log(idControlDiv);

    // 全部終わってから li を削除、３秒のカウントダウンがあるから3sちょいにしてる
    window.setTimeout( function h() {
        destroyElm.removeChild(p_elms[0]);
        destroyElm.removeChild(div_elms[0]);
        console.log(destroyElm.getElementsByTagName('button'));
        destroyElm.removeChild(destroyElm.getElementsByTagName('button')[0]);
    }, 3500);
    window.setTimeout( function ho() {
        oya_ul.removeChild(destroyElm);
    }, 4400);
}