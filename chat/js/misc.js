const oyalist   = document.getElementById('oyaList');
const isReverse = document.getElementById('reverse');

// なんだっけこれ。
// innerHTMLとして読み込みたい欲求
function ht_str( str )
{
    if( str == null ) return '';
    str = str.toString();
    str = str.replace( /&/g,'&amp;' );
    str = str.replace( /</g,'&lt;' );
    str = str.replace( />/g,'&gt;' );
    str = str.replace( / /g,'&nbsp;' );
    str = str.replace( /\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;' ); // Tabをスペース4つに..
    str = str.replace( /\r?\n/g, "<br />\n");
    return str;
}

// メインのチャットの ul にリストを追加する
// function createListElement( message, person ) {
//     let new_element = document.createElement('li');
//     new_element.className = ( person === 'cpu' )? 'cpu': 'me';
//     new_element.innerHTML = ht_str(message);
//     oyalist.appendChild(new_element);
// }

// function createListElement( message, person ) {

//     let new_element = document.createElement('li');
//     new_element.className = 'cpu';
//     let p_tag       = document.createElement('p');
//     p_tag.innerHTML     = myName + ': ' + getToday() + '/' + getTime();
//     new_element.appendChild(p_tag);

//     let div_tag =   document.createElement('div');
//     // new_element.className = ( person === 'cpu' )? 'cpu': 'me';
//     div_tag.innerHTML = ht_str(message);
//     new_element.appendChild(div_tag);

//     oyalist.appendChild(new_element);
// }




// message = [id, chat, date]
function createListElement( message, person ) {
    let id = message[0];

    let new_element = document.createElement('li');
    new_element.className = 'cpu';
    new_element.id = id;

    let p_tag       = document.createElement('p');
    // console.log(oyalist);
    p_tag.innerHTML     = myName + ': ' + uTimeToTime( message[2] );

    //
    // 新しいボタンを作ったことで不要になったコード
    //
    // let deleteBtn       = document.createElement('button');
    // deleteBtn.className = 'delete';
    // deleteBtn.innerHTML = 'del';
    // deleteBtn.onclick   = function () { deleteChat(id); };
    // // deleteBtn.addEventListener("click", 'deleteChat( id )');

    // let editBtn         = document.createElement('button');
    // editBtn.className   = 'edit';
    // editBtn.id          = 'edit' + id;
    // // editBtn.style.transition = '0.5s';
    // editBtn.innerHTML   = 'edt';
    // editBtn.onclick = function () { editChat(id); };
    // new_element.appendChild(deleteBtn);
    // new_element.appendChild(editBtn);
    //
    // 新しいボタンを作ったことで不要になったコード（終わり）
    //

    let div_tag =   document.createElement('div');
    // edit するときのために id に countId を持たせる
    div_tag.id = 'div_tag' + id;
    div_tag.className  = 'before';
    // new_element.className = ( person === 'cpu' )? 'cpu': 'me';
    div_tag.innerHTML = ht_str(message[1]);
    div_tag.style.transition = '0.5s';

    new_element.appendChild(p_tag);
    new_element.appendChild(div_tag);


    // 新しく作った、ボタン群の追加
    // new_element.appendChild(createButtonGroup( id ));
    
    oyalist.appendChild(new_element);

    createButtonGroup( id );
    // const hoge = createButtonGroup( id );
    // console.log(hoge);
    // new_element.appendChild(hoge);
}


function uTimeToTime( uTime ){
    return getToday( uTime ) + '/' + getTime( uTime )
}

// arrays = [[0, 'ho', 'ff'], [1, 'ho', 'ff'], [2, 'ho', 'ff'], [3, 'ho', 'ff'], ]
// とかの場合の、1つめが id のものを取り出したい
function indexOfFirst( id, arrays ){
    for ( let idx=0; idx<arrays.length; idx++){
        if ( id == arrays[idx][0] ) return idx
    }
}

function editChat( id ) {
    let chatMessage = document.getElementById('div_tag' + id);
    let edbtn       = document.getElementById('edit' + id);


    if ( edbtn.innerHTML === 'fin' ) {
        // 編集不可能にし
        chatMessage.contentEditable = 'false';
        chatMessage.style.backgroundColor = '#fff';
        // ボタンを戻し
        edbtn.innerHTML = 'edit';
        edbtn.style.color     = '#fff';
        // 中身を変える
        allMessages[indexOfFirst(id, allMessages)][1] = chatMessage.textContent;
        // ローカルストレージを書き換える
        localStorage.setItem(`${id}`, allMessages[indexOfFirst(id, allMessages)]);
        // ハンバーガーメニューを元に戻す
        clickHamburger(id);
    } else {
        // 編集可能にし
        chatMessage.contentEditable = 'true';
        chatMessage.style.backgroundColor = '#ccc';
        // ボタンの見た目を変える
        edbtn.innerHTML = 'fin';
        edbtn.style.color     = '#f00';
    }
}

function unixTime() {
    const uTime = new Date();
    return Date.parse(uTime)
}

// 日付を取得する
function getToday( today ) {
    today = (typeof today !== 'undefined') ? new Date(today) : new Date()
    // const today = new Date();
    today.setDate(today.getDate());
    const yyyy  = today.getFullYear();
    // 0で桁を揃えるの、これ楽そうだなー
    const mm    = ("0"+(today.getMonth()+1)).slice(-2);
    const dd    = ("0"+today.getDate()).slice(-2);
    return yyyy + '-' + mm + '-' + dd
}

// 時間を取得する
function getTime( today ) {
    today = (typeof today !== 'undefined') ? new Date(today): new Date()
    // const today = new Date();
    today.setDate(today.getDate());
    const hour  = ("0"+(today.getHours())).slice(-2);
    const min    = ("0"+today.getMinutes()).slice(-2);
    return hour + ':' + min
}

// li 要素が追加された時自動で下までスクロールするようにした
function scrollToEnd() {
    const messagesArea = document.getElementById('chatMain');
    messagesArea.scrollTop = messagesArea.scrollHeight;
}


// 適当な時間待つ関数
function sleep(waitMsec) {
    var startMsec = new Date();
  
    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
}



function createChat( scheduleList ){
    // 一回全部の ul の中身を消す
    while( oyalist.firstChild ){
        oyalist.removeChild( oyalist.firstChild );
    }

    // そこから、scheduleList の中身を追加
    for ( const message of scheduleList ) {
        createListElement( message, 'cpu' );
    }
}

// いまいらんかも
function removeNotAWord( message ){
    return message.replace('{', '')
                .replace('}', '')
                .replaceAll('"', '');
}


// チェックボックスの、投稿日時と期限を入れ替える
function changeCheckBox( cbnum ) {
    if ( cbnum === 1 ){
        deadSort.checked = false;
        postSort.checked = true;
    } else {
        deadSort.checked = true;
        postSort.checked = false;
    }
}

// チェックボックスの内容で、右側の表示をソートする
function sortChats(){
    // reverse するかどうかのチェック
    let reverseTimes = -1;
    if ( isReverse.checked ){
        reverseTimes *= -1;
    }

    allMessages.sort(function(a, b){
        if(a[2] > b[2]) { return -1 * reverseTimes; } // a.valueが大きければ負
        if(a[2] < b[2]) { return 1 * reverseTimes;  } // a.valueが小さければ正
        return 0;
    });

    createChat(allMessages);
}

// 2020-12-05/13:04 -> UNIX時間にするー？
function getUnixTime( time ){
    // Date.parse( "2017-05-25/10:10" );
    return Date.parse( time )
}

function clearAllMessage() {
    clearWithBomb( );
    // localStorage.clear();
    // location.reload();
}

// bomb で全画面消去
function clearWithBomb( ){
    // ぶっ壊したいリスト（div, p, button などを含む）を持ってくる
    const destroyElm = document.getElementById( 'oyaList' );
    const childrens = destroyElm.children;

    const listCords = getCords( destroyElm );

    // 
    // ul の中心に爆弾を置く    今は使っていない？
    // 
    // putBomb( listCords[0], listCords[1] );
    // 
    // ul の中心に爆弾を置く
    // 

    // 全消去ボタンの位置に爆弾を置く
    let clearbtn = document.getElementById('clear');
    const clearCords = getCords(clearbtn);
    console.log(clearCords);
    putBomb( clearCords[0], clearCords[1] );

    
    for ( const child of childrens ){
        // p, div タグを拾う
        let p_elms = child.getElementsByTagName('p');
        let div_elms = child.getElementsByClassName('before');
        // let div_elm = destroyElm.getElementById('div_tag' + bombId);
        // console.log(p_elm);

        let idControlP = splitP(p_elms[0], randomDist(0, 80),randomDist(0, 80) );
        let idControlDiv = splitDiv(div_elms[0], randomDist(0, 80),randomDist(0, 80) );

        scatterElmByIndex( idControlP );
        scatterElmByIndex( idControlDiv );
    }
    

    // 全部終わってから 全要素を削除、かつリロード
    window.setTimeout( function ho() {
        localStorage.clear();
        location.reload();
    }, 5500);
}


function randomInt( min, max ){
    return Math.floor((max - min+1)*Math.random()) + min
}
// x から y までの適当なランダムな距離を返す
// randomDist(200, 1000)
function randomDist(x, y) {
    let sign = -1;
    let hoge = randomInt(0,1);

    if ( hoge === 1 ){
        sign = 1;
    }
    return (( y - x ) * Math.random() + x ) * sign
}


function classChange(){
    oyalist.classList.toggle('reverse');
}