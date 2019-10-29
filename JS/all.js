var xhr = new XMLHttpRequest();
xhr.open('get', 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', true);
xhr.setRequestHeader("Authorization", "Bearer oMOGMDxGufuA980zsgIGbAvmFQzKrfNnjrWC4X3aKY9dysZ8vc68u3MwazIm");
xhr.send(null);

var roomAry;
var list;


xhr.onload = function () {
    if (xhr.status != 200) {
        return;
    }
    roomAry = JSON.parse(xhr.responseText);
    roomNo();
    ul.addEventListener('mouseover', backgdImg);
    ul.addEventListener('click', setId);

}
var ul = document.querySelector('.list');

//-----------把ID存進去localstroage---------

function setId(e) {
    let roomId = e.target.dataset.id;
    localStorage.setItem('id', roomId);
    window.location = 'index_3.html'; //原視窗打開
    //window.open('index_3.html'); //另開一頁

}



//------房型---------

function roomNo() {
    list = document.querySelector('.list');
    let str = "";
    for (let i = 0; i < roomAry.items.length; i++) {
        str += `<li data-id="${roomAry.items[i].id}" class="roomNum">${roomAry.items[i].name}</li>`
    }
    list.innerHTML = str;
}


//------背景------


function backgdImg(e) {
    let wrap = document.querySelector('.wrap');
    let date = document.querySelector('.date');
    let roomName = document.querySelector('.roomName');
    let liName = e.target.innerHTML;
    //console.log(liName);

    for (var i = 0; i < roomAry.items.length; i++) {
        let aryName = roomAry.items[i].name;
        if (liName == aryName) {
            wrap.style.backgroundImage = `url('${roomAry.items[i].imageUrl}')`;
            date.innerHTML = "0" + (1 + i);
            roomName.innerHTML = `${roomAry.items[i].name}`;
        }
    }

}
//--------至第二個網頁-------

let logo = document.querySelector('.logo');
logo.addEventListener('click', function () {
    window.location = 'index_2.html';
})