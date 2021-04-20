const SCHEDULE_NUMS = {'append': '1', 'check': '2', 'delete': '3'};

const DEFAULT_MESSAGE   = `いかがいたしましょう？
 1. 予定を追加
 2. 予定を確認
 3. 予定を削除`;

const INPUT_YOTEI = `予定を入力してください。
期限を設定する場合は、半角スペースの後に/区切りで入力してください`;

function sendCPUMessage() {

    // 実験用！
    createListElement(DEFAULT_MESSAGE, 'cpu')
    return

    switch ( status ) {
        case STATUSES.CPU1st:
            createListElement(INPUT_YOTEI, 'cpu');
            break
        case STATUSES.CPU2nd:
            createListElement( secondMessage(), 'cpu' );
            break
    }
}



function secondMessage() {
    let lastIndex = allMessages.length - 1;
    console.log(lastIndex);
    console.log(typeof lastIndex);


    // console.log(SCHEDULE_NUMS.append)
    // console.log(typeof SCHEDULE_NUMS.append)
    // console.log(allMessages[lastIndex]);
    // console.log(typeof allMessages[lastIndex])   // stringじゃ
    switch ( allMessages[lastIndex] ) {
        case SCHEDULE_NUMS.append:
            console.log('koko');
            return '予定を入力してください'
        case SCHEDULE_NUMS.check:
            return '予定を右側に表示しました。'
        case SCHEDULE_NUMS.delete:
            return deleteSchedule()
    }
}

function appendSchedule() {
    createListElement(INPUT_YOTEI,)
}
function checkSchedule() {
}

function deleteSchedule() {

}