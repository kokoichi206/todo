
// NOTHING (localStorage) -> array (allMessages)
// {1: "[1, a, a]", 2: "[2, a, a]", 3: "[3, a, a]"}
//          ↓   ↓   ↓   ↓   ↓   ↓
// [[1, 'a', 'a'], [2, 'a', 'a'], [3, 'a', 'a']]
function objToArray( ) {
    let tmp = [];
    let keys = Object.keys(localStorage);
    for ( let i=0; i<localStorage.length; i++ ){
        // const key = localStorage.key(i);
        let key =　keys[i];
        const value = localStorage.getItem(key);
        
        // id と unixTime を一応 num に戻しておく
        let tmpMessage = getArrayFromString(value);
        tmpMessage[0] = Number(tmpMessage[0]);
        tmpMessage[2] = Number(tmpMessage[2]);

        tmp.push( tmpMessage );
    }
    return tmp
}

// id が string になっちゃうのはおけ？
function getArrayFromString( string ) {
    return string.split(",")
}

// max Id を取得する！
function getCountId(){
    let nowId = 0;
    for ( let i=0; i<localStorage.length; i++ ){
        const key = localStorage.key(i);
        if ( Number(key) > nowId ){
            nowId = Number(key);
        }
    }
    return nowId
}

