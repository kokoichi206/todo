const btn = document.getElementById('item2');

const deleteContent = document.getElementById('hogehoge');

function deleteChat() {
    document.getElementById('modal').classList.add("active");
    document.getElementById('mask').classList.add("active");
    let modalContetnt = '内容：' + deleteContent.textContent + 'を削除します。<br>本当によろしいですか？';
    document.getElementById('modalContents').innerHTML = modalContetnt;
    
}


// 
document.getElementById('modalClose').addEventListener("click", function() {
    document.getElementById('modal').classList.remove("active");
    document.getElementById('mask').classList.remove("active");
    document.getElementById("menu").checked = false;
})

document.getElementById('deledele').addEventListener("click", function() {
    document.getElementById('modal').classList.remove("active");
    document.getElementById('mask').classList.remove("active");
    console.log("消去の処理");
    document.getElementById("menu").checked = false;
})