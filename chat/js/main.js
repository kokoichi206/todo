const resultList = document.getElementById('resultList');

const myName = 'kokoichi';

let messageStatus   = 0;
let countId         = 0;

// [id, message, date]
// [[0, 'hoge', '2020-05-03/13:00'], [1, 'fuga', '2020-05-06/13:00'],
// [2, 'hoge', '2020-05-03/13:00'], [3, 'fuga', '2020-05-06/13:00']]
// {id1: [message1, date1], id2: [message2, date2]}
let allMessages = [];


function init() {
    sleep('2000');
    console.log('loaded');

    // localStorage から読み込んでくる
    allMessages = objToArray( );
    // 過去のデータがあれば読み込み、
    if ( allMessages.length > 0 ){
        // countId をとってくるのは罠だ
        // countId = allMessages.length;
        countId = getCountId();
        sortChats();
        createChat(allMessages);
    } else {
        // なければ新規に会話を始め
        let First_message = 'さあ、チャットを始めてみよう';
        createListElement([0, First_message, unixTime()], 'cpu');
        allMessages.push([0, First_message, unixTime()]);
        // それを追加する
        localStorage.setItem(`${countId}`, `${allMessages[allMessages.length-1]}`);
    }

    // sendRepeat( 500, 'yes' );
    // createRepeat( 500 );
    scrollToEnd();
    checkOyaHeight( );
}

function sendMessage() {
    if ( messageTag.value.trim() ){
        countId += 1;
        // メッセージを上の画面に追加して
        sendMyMessage();
        // 自動スクロールして
        scrollToEnd();
        // ローカルストレージに保存する
        localStorage.setItem(`${countId}`, `${allMessages[allMessages.length-1]}`);
        // ul の高さがある程度以上なら、最後のボタンは上に伸びる表示
        checkOyaHeight();
        messageTag.value = '';
    }
}

