
const STATUSES = {'CPU1st': 0, 'ME1st': 1, 'CPU2nd': 2, 'ME2nd': 3};
let status  = 2;

let allMessages = [];

let mySchedule = [];


function sendMessage() {
    sendMyMessage();
    sendCPUMessage();
}