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

//--------點擊 logo 回首頁--------

let blackLogo = document.querySelector('.blackLogo');
blackLogo.addEventListener('click', function () {
    window.location = 'index_1.html';
})


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


    //-----------日曆-----------

    let date = new Date(); //取得現在的時間
    console.log(date);
    let myYear = date.getFullYear(); //取得年資訊(今年)
    console.log(typeof (myYear));
    let myMonth = date.getMonth(); //取得月資訊(月從0開始)
    console.log(myMonth);
    let mydate = date.getDate(); //取得日資訊(今天)
    console.log(mydate);
    let myday = date.getDay(); //取得星期資訊(星期幾)
    console.log(myday); //所有取出來的型態為數字



    //--------取得月有幾天------------

    function curMonthDays(year, month) {
        let showDays = new Date(year, month + 1, 0).getDate(); // 月從 0 開始算，所以 +1 才是這個月
        console.log(showDays);
        return showDays;
    }

    //--------取得月初星期幾------------

    function firstDayMonth(year, month) {
        let showFirstDay = new Date(year, month, 1).getDay();
        console.log(showFirstDay);
        return showFirstDay;
    }


    function showCalendar(nowYear, nowMonth, nowDate) {
        let calendar_date = document.querySelector('.calendar_date');
        let year = document.querySelector('.year');
        console.log(year);
        let month = document.querySelector('.month');
        console.log(month);

        let str = '';
        let dayTotal = curMonthDays(myYear, myMonth); // 先取得這個月的天數
        console.log(dayTotal);
        let firstDay = firstDayMonth(myYear, myMonth); // 先取得這個月初的星期幾
        console.log(firstDay);

        // 先印出空白
        for (let i = 0; i < firstDay; i++) {
            str += `<span></span>`;
        }

        //印日期
        for (let i = 1; i <= dayTotal; i++) {
            let className = '';

            if (i < nowDate && nowMonth == date.getMonth() && nowYear == date.getFullYear() ||
                nowMonth < date.getMonth() && nowYear <= date.getFullYear() ||
                nowYear < date.getFullYear()) {
                className += 'pastDay'; //判斷之前的日子

            } else if (i == date.getDate() && nowMonth == date.getMonth() && nowYear == date.getFullYear()) {

                className += 'today'; //今天的日子

            }
            str += `<span class="${className}">${i}</span>`;
        }
        calendar_date.innerHTML = str;
        year.innerHTML = nowYear;
        month.innerHTML = nowMonth + 1;

    }
    showCalendar(myYear, myMonth, mydate);

    //綁定上下個月繫結
    let rightArrow = document.querySelector('.right-arrow');
    console.log(rightArrow);
    let leftArrow = document.querySelector('.left-arrow');
    console.log(leftArrow);

    //上個月
    function pastDay() {
        myMonth -= 1;
        if (myMonth < 0) {
            myMonth = 11;
            myYear -= 1;
        }
        showCalendar(myYear, myMonth, mydate);
        console.log(mydate);
    }
    leftArrow.addEventListener('click', pastDay);

    //下個月
    function preDay() {
        myMonth += 1;
        if (myMonth > 11) {
            myMonth = 0;
            myYear += 1;
        }
        showCalendar(myYear, myMonth, mydate);
    }

    rightArrow.addEventListener('click', preDay);

    //-------點擊預約時段出現預約畫面---------

    let bookWrap = document.querySelector('.bookWrap');
    let bookRoom = document.querySelector('.bookRoom');
    let btn = document.querySelector('.btn');
    btn.addEventListener('click', function () {
        bookWrap.style.display = "flex";
        bookRoom.style.display = "flex";
    })

    //-------點擊取消或是外面黑色部分取消---------
    let resetBtn = document.querySelector('.resetBtn');
    resetBtn.addEventListener('click', function () {
        bookWrap.style.display = "none";
        bookRoom.style.display = "none";
    })

    bookWrap.addEventListener('click', function () {
        bookWrap.style.display = "none";
        bookRoom.style.display = "none";
    })




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