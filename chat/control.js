const repeatNum = 10;
const words = "abcdefghijklmnopqrstuvwxyz0123456789";

const textArea      = document.getElementById('myMessage');
const sendButtonnn  = document.getElementById('sendbtn');



// window.onload = function() {
//     for ( let idx=0; idx<repeatNum; idx++){
//         // textArea.select();
//         textArea.textContent = randomString(16);
//         console.log(textArea.textContent);
//         sendButtonnn.click();
//         sleep(200);
//     }
// }
function sendRepeat( num, string ){
    for ( let idx=0; idx<num; idx++){
        message = ( typeof string === 'undefined' )? randomString(16): string;
        // textArea.select();
        // textArea.click();
        textArea.value = message;
        sleep(500);
        sendButtonnn.click();
        sleep(100);
    }
}

function createRepeat( num, string ){
    for ( let idx=0; idx<num; idx++){
        message = ( typeof string === 'undefined' )? randomString(16): string;
        countId++;
        allMessages.push([countId, message, unixTime()]);
    }
    createChat( allMessages );
    scrollToEnd();
}

// for ( let idx=0; idx<num; idx++){
//     message = ( typeof string === 'undefined' )? randomString(16): string;
// }

// console.log(randomString(16));
function randomString( digit ) {
    let cl = words.length;
    let r = "";
    for(let i=0; i<digit; i++){
        r += words[Math.floor(Math.random()*cl)];
    }
    return r
}
