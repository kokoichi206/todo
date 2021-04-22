const oyalist   = document.getElementById('oyaList');
const postSort  = document.getElementById('postdate'); 
const deadSort  = document.getElementById('deadline'); 
const isReverse = document.getElementById('reverse');
const isHidden  = document.getElementById('hiddencheck');

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
function createListElement( message, person ) {

    let new_element = document.createElement('li');
    new_element.className = person;
    let p_tag       = document.createElement('p');
    p_tag.innerHTML     = person + ': ' + getToday() + '/' + getTime();
    new_element.appendChild(p_tag);

    let div_tag =   document.createElement('div');
    // new_element.className = ( person === 'cpu' )? 'cpu': 'me';
    div_tag.innerHTML = ht_str(message);
    new_element.appendChild(div_tag);

    oyalist.appendChild(new_element);
}


// 日付を取得する
function getToday() {
    const today = new Date();
    today.setDate(today.getDate());
    const yyyy  = today.getFullYear();
    // 0で桁を揃えるの、これ楽そうだなー
    const mm    = ("0"+(today.getMonth()+1)).slice(-2);
    const dd    = ("0"+today.getDate()).slice(-2);
    return yyyy + '-' + mm + '-' + dd;
}

// 時間を取得する
function getTime() {
    const today = new Date();
    today.setDate(today.getDate());
    const hour  = today.getHours();
    const min    = today.getMinutes();
    return hour + ':' + min ;
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



function createResult( scheduleList ){
    // 一回全部の ul の中身を消す
    while( resultList.firstChild ){
        resultList.removeChild( resultList.firstChild );
    }

    // そこから、scheduleList の中身を追加
    for ( const message of scheduleList ) {
        let resultMessage = document.createElement('li');
        if ( typeof message[0] !== 'object' ){
            resultMessage.innerHTML = message[0];
        } else {
            for ( const [key, value] of Object.entries(message[0]) ){
                let sentence = key + '\t' + value;
                resultMessage.innerHTML = sentence;
                // resultMessage.innerHTML = removeNotAWord(JSON.stringify(message));
            }
        }

        // done, undone のクラスを追加
        if ( message[1] === done ) {
            resultMessage.className = done;
            if ( !isHidden.checked ) resultList.appendChild(resultMessage)
        } else {
            resultMessage.className = undone;
            resultList.appendChild(resultMessage);
        }
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
function sortResult(){
    // reverse するかどうかのチェック
    let reverseTimes = -1;
    if ( isReverse.checked ){
        reverseTimes *= -1;
    }

    // チェックボックスの内容に応じてソート(関数を変えることで対応してる)
    if ( postSort.checked ){
        console.log('hoge');
        mySchedule.sort(function(a, b){
            if(getUnixTime(a[2]) > getUnixTime(b[2])) { return -1 * reverseTimes; } // a.valueが大きければ負
            if(getUnixTime(a[2]) < getUnixTime(b[2])) { return 1 * reverseTimes;  } // a.valueが小さければ正
            return 0;
        });
    } else if ( deadSort.checked ) {
        mySchedule.sort(function(a, b){
            if(getDeadline(a[0]) > getDeadline(b[0])) { return -1 * reverseTimes; } // a.valueが大きければ負
            if(getDeadline(a[0]) < getDeadline(b[0])) { return 1 * reverseTimes;  } // a.valueが小さければ正
            return 0;
        });
    }
    
    createResult(mySchedule);
}

// 2020-12-05/13:04 -> UNIX時間にするー？
function getUnixTime( time ){
    // Date.parse( "2017-05-25/10:10" );
    return Date.parse( time )
}

// 'run' or {'hair cut': '2012-4-15'} とかがくるので、
// 期限があれば UNIXタイム、なければ -1 で返す
function getDeadline( message ){
    if ( typeof message !== 'object' ){
        return -100
    } else {
        let time = Object.values(message)[0];
        // console.log(key);
        // c
        // let time = message.key;
        if ( time.split('-').length == 1 ){
            time = getToday() + '/' + time;
        } else if ( time.split('-').length == 2 ) {
            // 5-5 のように、日付だけでも対応できるようにした
            time = '2021-' + time;
        }
        console.log(time)
        return Date.parse( time )
    }
}


function init() {
    messageStatus  = 0;
    console.log('loaded');
    createListElement( DEFAULT_MESSAGE, 'cpu' );
    createResult(mySchedule);
}

// createElement 関数とほぼ一緒だから、まとめたいなぁ
function hiddenDone( ) {
    createResult( mySchedule );
}