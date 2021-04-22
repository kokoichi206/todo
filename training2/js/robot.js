const SCHEDULE_NUMS = {'append': '1', 'check': '2', 'delete': '3'};

const DEFAULT_MESSAGE   = `いかがいたしましょう？
 1. 予定を追加
 2. 予定を変更
 3. 予定を削除`;

const INPUT_YOTEI = `予定を入力してください。
期限を設定する場合は、半角スペースの後に/区切りで入力してください`;

function sendCPUMessage() {

    // 実験用！
    // createListElement(DEFAULT_MESSAGE, 'cpu')
    // return 
    if ( messageStatus == STATUSES.default ){
        let lastIndex = allMessages.length - 1;
        // console.log(allMessages[lastIndex]);
        if ( (allMessages[lastIndex] === ('1'))
        || allMessages[lastIndex] === ('2')
        || allMessages[lastIndex] === ('3') ){
            messageStatus = allMessages[lastIndex];
        } else {
            createListElement('1-3で指定してね', 'cpu');
        }
    }

    switch ( messageStatus ) {
        case STATUSES.first1st:
            createListElement('予定を述べてください', 'cpu');
            messageStatus = STATUSES.first2nd;
            break
        case STATUSES.second1st:
            createListElement( '勝手に右見とけ', 'cpu' );
            messageStatus = STATUSES.default;
            break
        case STATUSES.third1st:
            createListElement( '削除したい内容を表示してください', 'cpu' );
            messageStatus = STATUSES.third2nd;
            break

        case STATUSES.first2nd:
            appendSchedule();
            break
        case STATUSES.third2nd:
            deleteSchedule( getLastMessage(allMessages) );
            break
    }

    if ( messageStatus == STATUSES.default ) createListElement( DEFAULT_MESSAGE, 'cpu' )
}


function secondMessage() {
    let lastIndex = allMessages.length - 1;

    // console.log(SCHEDULE_NUMS.append)
    // console.log(typeof SCHEDULE_NUMS.append)
    // console.log(allMessages[lastIndex]);
    // console.log(typeof allMessages[lastIndex])   // stringじゃ
    switch ( allMessages[lastIndex] ) {
        case SCHEDULE_NUMS.append:
            return '予定を入力してください'
        case SCHEDULE_NUMS.check:
            return '予定を右側に表示しました。'
        case SCHEDULE_NUMS.delete:
            return deleteSchedule()
    }
}


function appendSchedule() {
    let message = getLastMessage(allMessages);
    if ( message.length < 2 ){
        createListElement('予定を言ってよ〜', 'cpu');
    } else {
        mySchedule.push(message);
        createListElement('予定を追加しました', 'cpu');
    }
    scrollToEnd();  // １秒待つ前に、上のやつだけは更新させたいのになぁ...
    messageStatus = STATUSES.default;   // すべてでデフォルトに戻すかは微妙
}

// sArray のなかに key があればtrueを返す　→　index を返す
// sArray = [[{}, done, date], [a, done, date], [a, undone, date]];
function checkSchedule( key, sArray ) {
    let flg = false;
    for ( let idx=0; idx<sArray.length; idx++ ){
        let mess = sArray[idx][0];  // [0]であれをとってる
        if ( typeof mess === 'object' ){
            if ( key in mess ) flg = idx;
        } else {
            if ( key == mess ) flg = idx;
        }
    }
    return flg
}

function deleteSchedule( key ){
    console.log(key);
    console.log(checkSchedule(key, mySchedule));
    if ( checkSchedule(key, mySchedule) ){
        mySchedule.splice([checkSchedule(key, mySchedule)], 1);
        createListElement('本当に削除しますか？（y/n）', 'cpu');
        console.log(mySchedule);
        console.log(mySchedule.length)
    } else {
        createListElement('そんな予定はないよ＠＠', 'cpu');
        // console.log(key);
    }
    scrollToEnd();  // １秒待つ前に、上のやつだけは更新させたいのになぁ...
    messageStatus = STATUSES.default;   // すべてでデフォルトに戻すかは微妙
}


function getLastMessage( messageArray ) {
    let lastIndex = messageArray.length - 1;
    return messageArray[lastIndex]
}