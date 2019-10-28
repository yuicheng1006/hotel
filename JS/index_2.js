var xhr = new XMLHttpRequest();
xhr.open('get', 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', true);
xhr.setRequestHeader("Authorization", "Bearer oMOGMDxGufuA980zsgIGbAvmFQzKrfNnjrWC4X3aKY9dysZ8vc68u3MwazIm");
xhr.send(null);

var roomAry;


xhr.onload = function () {
    if (xhr.status != 200) {
        return;
    }
    roomAry = JSON.parse(xhr.responseText);

    var coverflow = document.querySelector('.coverflow');

    //------------輪播圖------------
    var timer;
    var sum = 0;

    slideImg();

    function slideImg() {
        //console.log(coverflow.className);
        coverflow.classList.remove('coverSmall');
        //console.log(coverflow.style.backgroundSize);

        coverflow.style.backgroundImage = `url('${roomAry.items[0+sum].imageUrl}')`;

        coverflow.classList.add('coverSmall');
        // console.log(coverflow.style.backgroundImage);
        // console.log(coverflow.className);
        sum++;

        // ----剛好超出去的長度 = 圖片的陣列長度----
        if (sum == roomAry.items.length - 1) {
            sum = 0; //讓sum＝0重新開始

        }

    }

    timer = setInterval(slideImg, 6000);

    // ----------另一種輪播圖寫法-----------
    // showSlider();

    // function showSlider() {
    //     console.log('qq');
    //     coverflow.style.backgroundSize = '130%';

    //     if (sum < roomAry.items.length) {

    //         coverflow.style.backgroundImage = `url('${roomAry.items[0+sum].imageUrl}')`;
    //         coverflow.classList.add("coverSmall");

    //         sum += 1;
    //         setTimeout(showSlider, 6000);
    //     } else {
    //         sum = 0;
    //         setTimeout(showSlider, 6000);
    //     }

    // }
    information();



    function information() {
        let roomImg = document.querySelector('.roomImg');
        let str = "";

        for (let i = 0; i < roomAry.items.length; i++) {
            let roomSize = roomAry.items[i].name;
            str += ` <li class="roomInfo" style="background-image:url('${roomAry.items[i].imageUrl}')" >
            <div class="infoHover">
                <h3>${roomAry.items[i].name}</h3>
                <p>${chineseName(roomSize)}</p>
                <div class="hoverInfo">
                    <p>${roomAry.items[i].normalDayPrice}</p>
                    <span>平日</span>
                    <span class="price">${roomAry.items[i].holidayPrice}</span>
                    <span class="holiday">假日</span>
                </div>
            </div>
        </li>`
        }
        roomImg.innerHTML = str;

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

    //--------至第一個網頁-------

    let logo = document.querySelector('.logo');
    logo.addEventListener('click', function () {
        window.location = 'index_1.html';
    })

    // function roomsImage() {
    //     let roomInfo = document.querySelectorAll('.roomInfo');
    //     for (let i = 0; i < roomInfo.length; i++) {
    //         roomInfo[i].style.backgroundImage = `url('${roomAry.items[i].imageUrl}')`;
    //     }
    // }
    // roomsImage();


    // function chineseName() {
    //     let roomNameCH = document.querySelector('.infoHover p');
    //     let str = "";
    //     console.log(roomNameCH.textContent);
    //     for (let i = 0; i < roomAry.items.length; i++) {
    //         str += roomAry.items[i].name;

    //     }
    //     roomNameCH.innerHTML = str;
    // }

}