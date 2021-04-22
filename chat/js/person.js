const messageTag = document.getElementById('myMessage');


function sendMyMessage() {
    let chat = messageTag.value;
    // console.log(chat);
    let message = [countId, chat, unixTime()];
    createListElement(message, 'cpu');
    allMessages.push(message);
    console.log(allMessages);
}



function appendMessage(message) {

}
