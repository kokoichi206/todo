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
    let p_tag       = document.createElement('p');
    console.log(message[2]);
    console.log(oyalist);
    p_tag.innerHTML     = myName + ': ' + getToday( message[2] ) + '/' + getTime( message[2] );

    let deleteBtn   = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.innerHTML = 'del';
    deleteBtn.onclick = deleteChat(id);

    let editBtn     = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.innerHTML = 'edt';
    editBtn.onclick = editChat(id);

    let div_tag =   document.createElement('div');
    // new_element.className = ( person === 'cpu' )? 'cpu': 'me';
    div_tag.innerHTML = ht_str(message[1]);
    new_element.appendChild(p_tag);
    new_element.appendChild(div_tag);
    new_element.appendChild(deleteBtn);
    new_element.appendChild(editBtn);
    

    oyalist.appendChild(new_element);
}

function deleteChat( id ){
    // let index = allMessages.indexOf[]
    // splice(id, 1)
    // delete allMessages[id];
    createChat( allMessages );
    // console.log(allMessages);
}

// arrays = [[0, 'ho', 'ff'], [1, 'ho', 'ff'], [2, 'ho', 'ff'], [3, 'ho', 'ff'], ]
// とかの場合の、1つめが id のものを取り出したい
function indexOfFirst( id, arrays ){
    for ( let idx=0; idx<arrays.length; idx++){
        if ( idx == arrays[idx][0] ) return idx
    }
}

function editChat( id ) {

}

function unixTime() {
    const uTime = new Date();
    return Date.parse(uTime)
}

// 日付を取得する
function getToday( today ) {
    today = (typeof today !== 'undefined') ? new Date(today) : new Date()
    // const today = new Date();
    console.log(today);
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
    const hour  = ("0"+(today.getHours()+1)).slice(-2);
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
    console.log(allMessages);
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




function init() {
    messageStatus  = 0;
    console.log('loaded');
    createListElement([0, 'message created'], 'cpu');
}
