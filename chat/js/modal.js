// 消去ボタンから modal を追加するため

const btn = document.getElementById('item2');
const modalOya = document.getElementById('modal');

const deleteContent = document.getElementById('hogehoge');


function deleteChat( id ) {
    console.log(id);
    let text = allMessages[indexOfFirst( id, allMessages )];
    console.log(text);
    text = '<br>&nbsp;&nbsp;id: ' + text[0] + ', <br>&nbsp;&nbsp;content: ' + text[1] + ', <br>&nbsp;&nbsp;posted date: ' + uTimeToTime(text[2]);

    document.getElementById('modal').classList.add("active");
    document.getElementById('mask').classList.add("active");
    let modalContetnt = '内容：' + text + '<br>を削除します。<br>本当によろしいですか？';
    document.getElementById('modalContents').innerHTML = modalContetnt;
    createModalButton( id );
}


// 
function deleteModal( id ){
    document.getElementById('modal').classList.remove("active");
    document.getElementById('mask').classList.remove("active");
    deleteModalButton( id );
}

// モーダルmodalのdelete ボタンが押された時に、リストからも localStorage からも消去
function completelyDelete( id ){
    document.getElementById('modal').classList.remove("active");
    document.getElementById('mask').classList.remove("active");
    deleteModalButton( id );
    
    allMessages.splice( indexOfFirst(id, allMessages), 1 );
    localStorage.removeItem(`${id}`);

    // bomb 爆弾を発現させたければこれ
    // bombBtn( id );
    
    createChat(allMessages);
    
}


// id に応じた消去、閉じるボタンを作る。
// 消す内容を保存するため
function createModalButton( id ) {
    let closeButton         = document.createElement('a');
    closeButton.className   = 'modalClose';
    closeButton.id          = 'modalClose';
    closeButton.innerHTML   = '閉じる';

    closeButton.onclick     = function () { deleteModal(id); };

    let deleteButton        = document.createElement('a');
    deleteButton.className  = 'modalClose';
    deleteButton.id         = 'deledele' + id;
    deleteButton.innerHTML  = 'id=' + id + '&nbspを消去する';

    deleteButton.onclick    = function () { completelyDelete(id); };

    modalOya.append(closeButton);
    modalOya.append(deleteButton);
}

// 作ったボタンを消さないと無限に増殖するので！
function deleteModalButton( id ){
    let closeBtn    = document.getElementById("modalClose");
    let deleBtn     = document.getElementById("deledele" + id);
    modalOya.removeChild(closeBtn);
    modalOya.removeChild(deleBtn);
}



