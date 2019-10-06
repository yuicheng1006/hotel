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

}
//------房型---------

function roomNo() {
    list = document.querySelector('.list');
    let str = "";
    for (let i = 0; i < roomAry.items.length; i++) {
        str += `<li class="roomNum">${roomAry.items[i].name}</li>`
    }
    list.innerHTML = str;
}


//------背景------
var ul = document.querySelector('.list');

function backgdImg(e) {
    let wrap = document.querySelector('.wrap');
    let date = document.querySelector('.date');
    let roomName = document.querySelector('.roomName');
    let shawdow = document.querySelector('.date_shawdow');
    let liName = e.target.innerHTML;

    for (var i = 0; i < roomAry.items.length; i++) {
        let aryName = roomAry.items[i].name;
        if (liName == aryName) {
            wrap.style.backgroundImage = `url('${roomAry.items[i].imageUrl}')`;
            date.innerHTML = "0" + (1 + i);
            roomName.innerHTML = `${roomAry.items[i].name}`;
        }
    }
    shawdow.style.display = "block";


}