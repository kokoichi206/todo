const messageTag = document.getElementById('myMessage');


function sendMyMessage() {
    let message = messageTag.value;
    // console.log(message);
    createListElement(message, 'me');
    allMessages.push(message);
}



function appendMessage(message) {

}
