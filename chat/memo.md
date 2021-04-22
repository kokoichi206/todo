## 苦戦したところ
- html内でスペースは、&nbsp;
- [onclick をJS で渡すときの引数に注意](https://yanor.net/wiki/?JavaScript/%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/onclick%E3%81%A7%E5%89%B2%E3%82%8A%E5%BD%93%E3%81%A6%E3%82%8B%E3%83%8F%E3%83%B3%E3%83%89%E3%83%A9%E9%96%A2%E6%95%B0%E3%81%AB%E5%BC%95%E6%95%B0%E3%82%92%E6%B8%A1%E3%81%99)
- コンテンツの消去ボタンを押した時に出てくるモーダルは共通でいいかと思ったが、何のボタンが押されたか（モーダルの前の挙動）によって消す内容は異なるので、モーダルも押されるたびに作り替える
- 配列から要素を削除するのは delete だと empty が残るので
  - Array.splice(startIndex, deleteNum)
- chatMessage.contenteditable = 'true';
  - JS で 属性を指定するときは、'' で囲む！
- 編集可能にする要素
  - contentEditable の E は大文字！！！
    



## これからなんとかしたいところ（ちけっと？）
- ボタンの見た目を今風にする
- 要素をいじった際に、毎回 createChat(allMessages); で更新しているが、これだと更新系の関数すべてに書かないといけなくて、うっとおしい
  - クラスの出番？
- edit の処理
  - モーダル？
  - リストを editable に？
  - edit btn -> finish btn -> edit btn ??

- ちょっとごちゃごちゃしてて、メッセージに保存したい追加項目が増えたら死にそう？？
  - 意外とそうでもない？



## DONE


