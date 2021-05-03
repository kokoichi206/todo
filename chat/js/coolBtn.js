// const hamburger = document.querySelector('.nav-list .hamburger');
// const menu_item = document.querySelectorAll('.nav-list ul li a');

// hamburger.addEventListener('click', () => {
// 	hamburger.classList.toggle('active');
// 	mobile_menu.classList.toggle('active');
// });





// menu_item.forEach((item) => {
// 	item.addEventListener('click', () => {
// 		hamburger.classList.toggle('active');
// 		mobile_menu.classList.toggle('active');
// 	});
// });


// 自分のチャットアプリに組み込む用
function createButtonGroup( id ){
	const oya = document.getElementById(`${id}`);

	const nav_list = document.createElement('div');
	nav_list.classList = 'nav-list';

	const hamburger = document.createElement('div');
	hamburger.classList = 'hamburger';
	const bar = document.createElement('div');
	bar.classList = 'bar';

	hamburger.appendChild(bar);

	const ulinchi = document.createElement('ul');
	ulinchi.classList = '';
	
	const li1 = document.createElement('li');
	const a1 = document.createElement('a');
	a1.type = 'button';
	a1.textContent = 'delete';
	a1.className = 'delete';
	a1.onclick = function () { deleteChat(id); };
	li1.appendChild(a1);

	const li2 		= document.createElement('li');
	const a2 		= document.createElement('a');
	a2.type 		= 'button';
	a2.textContent 	= 'edit';
	a2.className   	= 'edit';
	a2.id          	= 'edit' + id;
	a2.onclick = function () { editChat(id); };
	li2.appendChild(a2);
	
	ulinchi.appendChild(li1);
	ulinchi.appendChild(li2);

	
	nav_list.appendChild(hamburger);
	nav_list.appendChild(ulinchi);

	oya.appendChild(nav_list);
	// 機能を加える
	hamburger.onclick = function () { clickHamburger(id); };
}

// id のハンバーガーを押した時の処理
function clickHamburger(id) {
	const oya = document.getElementById(`${id}`);

	const thisHamburger = oya.querySelector('.nav-list .hamburger');
	const mobile_menu = oya.querySelector('.nav-list ul');

	thisHamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');

	// 全部のクラスをリセットする前に一時保存
	const set_class_hum = thisHamburger.className;
	const set_class_mob = mobile_menu.className;

	// 全クラスをリセット（しないと開いたリストが開きっぱなし）
	for ( const child of oyalist.children ){
		let hum = child.querySelector('.nav-list .hamburger');
		let mob = child.querySelector('.nav-list ul');

		hum.className = 'hamburger';
		mob.className = '';
	}

	thisHamburger.classList = set_class_hum;
	console.log(thisHamburger.className)
	mobile_menu.classList = set_class_mob;
}


function checkOyaHeight( ){
	const y = oyalist.offsetHeight;
	if ( y > 520 ){
		for ( const child of oyalist.children ){
			// class リセット
			child.classList = 'cpu';
		}
		// lastChild にのみ overY クラスを付与
		oyalist.lastChild.classList = 'cpu overY';
	}
}

