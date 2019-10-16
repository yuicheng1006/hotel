let roomId = localStorage.getItem('id');

let xhr = new XMLHttpRequest();
xhr.open('get', 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/' + roomId, true);
xhr.setRequestHeader("Authorization", "Bearer oMOGMDxGufuA980zsgIGbAvmFQzKrfNnjrWC4X3aKY9dysZ8vc68u3MwazIm");
xhr.send(null);


xhr.onload = function () {
    if (xhr.status != 200) {
        return;
    }

    roomAry = JSON.parse(xhr.responseText);

    roomInfo();
    backBg();
    installation();
}


//---------背景--------

function backBg() {
    let leftBg = document.querySelector('.leftBg');
    let upBg = document.querySelector('.upBg');
    let downBg = document.querySelector('.downBg');

    leftBg.style.backgroundImage = `url('${roomAry.room[0].imageUrl[0]}')`
    upBg.style.backgroundImage = `url('${roomAry.room[0].imageUrl[1]}')`
    downBg.style.backgroundImage = `url('${roomAry.room[0].imageUrl[2]}')`
}



//---------資訊字串--------
function roomInfo() {
    let roomSize = roomAry.room[0].name;
    let h2 = document.querySelector('.roomsName h2');
    let roomsIntro = document.querySelector('.roomsIntro');
    let ul = document.querySelector('.roomInfoList');
    let check = document.querySelector('.check span');
    let checkTime = document.querySelector('.checkTime span');
    let priceDayH3 = document.querySelector('.priceDay h3');
    let priceDayH4 = document.querySelector('.priceDay h4');
    let str = '';
    h2.innerHTML = roomAry.room[0].name;
    roomsIntro.innerHTML = roomAry.room[0].description;
    check.innerHTML = roomAry.room[0].checkInAndOut.checkInEarly + '－' + roomAry.room[0].checkInAndOut.checkInLate;
    checkTime.innerHTML = roomAry.room[0].checkInAndOut.checkOut;
    priceDayH3.innerHTML = `NT.${roomAry.room[0].normalDayPrice}`;
    priceDayH4.innerHTML = `NT.${roomAry.room[0].holidayPrice}`;
    str = `<li>房客人數限制： ${roomAry.room[0].descriptionShort.GuestMin}~${roomAry.room[0].descriptionShort.GuestMax} 人</li>
        <li>床型：${chineseName(roomSize)}</li>
        <li>衛浴數量：${roomAry.room[0].descriptionShort['Private-Bath']} 間</li>
        <li>房間大小： ${roomAry.room[0].descriptionShort.Footage} 平方公尺</li>`
    ul.innerHTML = str;
}

//-------判斷我的英文房間名字是什麼回傳中文名字
function chineseName(roomSize) { //roomSize 參數是自己取的

    if (roomSize == 'Single Room') {
        return '單人房';
    }
    if (roomSize == 'Deluxe Single Room') {
        return '豪華單人房';
    }
    if (roomSize == 'Double Room') {
        return '單床雙人房';
    }
    if (roomSize == 'Deluxe Double Room') {
        return '豪華單床雙人房';
    }
    if (roomSize == 'Twin Room') {
        return '雙人房';
    }
    if (roomSize == 'Deluxe Twin Room') {
        return '豪華單雙人房';
    }
}

//---------設施--------

function installation() {
    let li = document.querySelectorAll('.roomsInsta li')
    let fas = document.querySelectorAll('.fas');
    let fasSpan = document.querySelectorAll('.roomsInsta span');
    console.log(fasSpan);
    for (let i = 0; i < li.length; i++) {
        let id = li[i].id;
        if (roomAry.room[0].amenities[`${id}`] == false) {
            fas[i].style.opacity = '0.3';
            fasSpan[i].style.opacity = '0.3';
        }
    }



    // let li = document.querySelectorAll('.roomsInsta li');

    // for (let i = 0; i < li.length; i++) {
    //     let id = li[i].id;
    //     if (roomAry.room[0].amenities[`${id}`] == true) {
    //         li[i].classList.add('test');
    //     }
    // }



}



// //---------刪除localstroage--------

// let local = window.location.href; //window.location的所有網址
// let localAry = local.split("/"); //拆字串
// let localHtml = localAry[localAry.length - 1]; //找我要的html的位置
// console.log(localHtml);

// function clearId() {
//     if (localHtml == 'index_3.html') {
//         localStorage.removeItem('id');
//     }

// }