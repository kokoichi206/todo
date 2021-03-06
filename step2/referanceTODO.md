## What is node.js?


### How to use?
- ローカルサーバーの立ち上げ
```
npx @js-primer/local-server
```

### submitイベント
- form要素でEnterキーを押して送信すると発生


### event.preventDefault
- メソッドを呼び出すことで、このデフォルトの動作をキャンセルしています。
- デフォルトの動作？
  - フォームの内容を指定したURLへ送信する
  - 今回は不要
    - ページがリロードされてしまうので

### 直接DOMをいじる
- 柔軟性がないという問題がある
- Todoリストの状態がDOM上にしか存在しないため、状態をすべてDOM上に文字列で埋め込まないといけない
- 操作に対して更新する表示箇所が増えてくると、表示の処理が複雑化する

### 解決策１
- Todoアイテムという情報をJavaScriptクラスとしてモデル化
- TodoアイテムやTodoリストなどのモノの状態や操作方法を定義したオブジェクト



### MVC
- アプリケーションを管理しやすく、モジュラー化し、高速開発できるパッケージに変える、実証済みのソフトウェアデザインパターン


### DOM Events
- ブラウザのDOM APIのイベントの仕組み
- イベント？
  - 「ディスパッチする側」と「リッスンする側」が必要
  - 場合によっては自分がリッスンすることも
  
- 「イベントをディスパッチした（イベントを発生させた）ときにイベントをリッスンしているコールバック関数（イベントリスナー）を呼び出す」

### 今回の設計
- 親クラス（EventEmitter）: イベントをディスパッチしたとき、登録されているコールバック関数（イベントリスナー）を呼び出すクラス
- 子クラス（TodoListModel）: 値を更新したとき、登録されているコールバック関数を呼び出すクラス

#### EventEmitter
- Observerパターン
  - ディスパッチ側: emitメソッドは、指定されたイベント名に登録済みのすべてのコールバック関数を呼び出す
  - リッスン側: addEventListenerメソッドは、指定したイベント名に任意のコールバック関数を登録できる
- ブラウザやNode.jsなど多くの実行環境に類似するAPIが存在


### クラス分け注意？
- AppクラスからHTML要素の作成処理がViewクラスに移動
- AppクラスはModelとView間のイベントを管理するだけ
- Appクラスのメソッドとしてリスナー関数を並べる


### 変更点
```
if ( inputElement.value.trim() !== '' ){
    this.handleAdd(inputElement.value);
    inputElement.value = "";
}
```




## わからないこと
- HTML要素とHTML文字列？

