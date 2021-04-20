const oyalist           = document.getElementById('oyaList');

// なんだっけこれ。
// innerHTMLとして読み込みたい欲求
function ht_str( str )
{
    if( str == null ) return '';
    str = str.toString();
    str = str.replace( /&/g,'&amp;' );
    str = str.replace( /</g,'&lt;' );
    str = str.replace( />/g,'&gt;' );
    str = str.replace( / /g,'&nbsp;' );
    str = str.replace( /\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;' ); // Tabをスペース4つに..
    str = str.replace( /\r?\n/g, "<br />\n");
    return str;
}

// メインのチャットの ul にリストを追加する
function createListElement( message, person ) {
    let new_element = document.createElement('li');
    new_element.className = ( person === 'cpu' )? 'cpu': 'me';
    new_element.innerHTML = ht_str(message);
    oyalist.appendChild(new_element);
}

