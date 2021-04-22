const resultList = document.getElementById('resultList');

// あれ、これ数字必要かな？
// あえて文字で数字を管理　→　INPUTが文字だから
const STATUSES = {'default': '0', 'first1st': '1', 'second1st': '2','third1st': '3', 
                            'first2nd': '4', 'second2nd': '5', 'third2nd': '6'};
let messageStatus  = 0;

let allMessages = [];

const done      = 'done';
const undone    = 'undone';
// let mySchedule = [];
// message は配列の中にオブジェクトで保存する
// 期限がないものは単体
// [[{}, done, date], [a, done, date], [a, undone, date]] みたいな雰囲気
let mySchedule = [['走る', done, '2021-04-21/13:00'], [{'髪を切る': '2021-04-15'}, undone, '2021-04-13/13:00'],
[{'書類提出': '2021-5-5/13:00'}, done, '2021-04-15/12:00'], [{'郵便局に行く': '14:00'}, undone, '2021-04-19/13:00'],
['食べる', undone, '2021-04-22/13:00'], [{'褒める': '2021-04-24/15:43'}, undone, '2021-04-15/13:00'],
['なく', done, '2021-04-22/13:00'], [{'TODOチャット': '2021-05-1/17:10'}, undone, '2021-04-18/13:00'],
[{'hogehoge': '2022-9-22/13:00'}, done, '2021-04-22/13:00'], [{'日報': '18:00'}, undone, '2021-04-18/13:00'],
[{'保険証': '2021-5-5/13:00'}, done, '2021-04-15/12:00'], [{'区役所にいく': '5-1/14:00'}, undone, '2021-04-19/13:00']];




function sendMessage() {
    if ( messageTag.value ){
        sendMyMessage();
        scrollToEnd();
        messageTag.value = '';
    }

}



