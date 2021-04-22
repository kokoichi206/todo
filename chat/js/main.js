const resultList = document.getElementById('resultList');


const myName = 'kokoichi';

let messageStatus   = 0;
let countId         = 0;

// [[0, 'hoge', '2020-05-03/13:00'], [1, 'fuga', '2020-05-06/13:00']]
let allMessages = [];



function sendMessage() {
    if ( messageTag.value ){
        countId += 1;
        sendMyMessage();
        scrollToEnd();
        messageTag.value = '';
    }
}



