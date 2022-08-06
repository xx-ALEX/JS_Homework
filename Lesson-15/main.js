var getUserList = document.getElementById('getUserList');
var usersContainer = document.getElementsByClassName('users');
var indicator = 0;

//AJAX (GET) запрос:
getUserList.addEventListener('click', function () {
    usersContainer[0].innerHTML = '';
    if (localStorage.length) { //проверяем наличие данных в LocalStorage
        soundClickButton(); //добавление звуковых эффектов
        getUsersFromLS();
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://reqres.in/api/users?page=2', true);
    xhr.send();

    xhr.onload = function () {
        var statusType = Math.round(this.status / 100);
        console.log((statusType === 2) ? JSON.parse(this.response).data : this.status);

        if (statusType === 2) {
            soundClickButton(); //добавление звуковых эффектов
            getUsers(JSON.parse(this.response).data); //отрисовка вкладок с информацией о пользователях
            checkAndSetLS(JSON.parse(this.response).data); //запись полученных данных в LocalStorage
        } else {
            soundError(); //добавление звуковых эффектов
            showError(); //отрисовка окна в случае ошибки получения данных
        }
    };

    xhr.onerror = function () {
        console.error(this.status);
        indicator++;
    };

    xhr.onloadend = function () {
        console.log('Запрос завершён');
        if (indicator) {
            soundError(); //добавление звуковых эффектов
            showError(); //отрисовка окна в случае ошибки получения данных
        }
    };
});

//формируем из полученного массива вкладки с информацией о пользователях:
function getUsers(usersArray) {
    var count = 0;
    usersArray.forEach(function (user) {
        count++;
        var userP = usersContainer[0].appendChild(document.createElement('p'));
        var userDIV = usersContainer[0].appendChild(document.createElement('div'));
        userP.classList.add('user');
        userP.innerHTML = 'User ' + count;
        userDIV.dataset.user = user.first_name;
        userDIV.innerHTML = '<img alt="avatar" src=' + user.avatar + '>' +
            '<div class="names">' + '<p>' + 'First name: ' + user.first_name + '</p>' +
            '<p>' + 'Last name: ' + user.last_name + '</p>' +
            '<p>' + 'email: ' + user.email + '</p>' +
            '<p>' + 'id: ' + user.id + '</p>' + '</div>';
    })
    var dataUser = document.querySelector('div[data-user]');
    dataUser.classList.add('visible');
    document.getElementsByClassName('user')[0].classList.add('user_clicked');
}

//показ информации о пользователе по клику:
usersContainer[0].addEventListener('click', function (event) {
    var target = event.target.closest('p');

    if (target && target.className !== 'user user_clicked') {
        var targetUser = target.nextElementSibling;
        var dataUser = document.getElementsByClassName('visible');
        var userClicked = document.getElementsByClassName('user_clicked');
        dataUser[0].classList.remove('visible');
        userClicked[0].classList.remove('user_clicked');
        targetUser.classList.toggle('visible');
        target.classList.toggle('user_clicked');
        soundClickUser();
    }
});

//звуки на кнопки:
function soundClickButton() {
    var buttonAudio = new Audio();
    buttonAudio.src = 'Sounds/button_sound.mp3';
    buttonAudio.autoplay = true;
}

function soundClickUser() {
    var userAudio = new Audio();
    userAudio.src = 'Sounds/user_sound.mp3';
    userAudio.autoplay = true;
}

function soundError() {
    var errorAudio = new Audio();
    errorAudio.src = 'Sounds/error.mp3';
    errorAudio.autoplay = true;
}

function soundOK() {
    var okAudio = new Audio();
    okAudio.src = 'Sounds/ok.mp3';
    okAudio.autoplay = true;
}

//запись полученных данных в LocalStorage:
function checkAndSetLS(usersArray) {
    if (!localStorage.length) {
        var userNumber = document.getElementsByClassName('user');
        for (var i = 0; i < usersArray.length; i++) {
            localStorage.setItem(userNumber[i].innerHTML,JSON.stringify(usersArray[i]));
        }
    }
}

//отрисовка данных из LocalStorage:
function getUsersFromLS() {
    var userArray = [];

    for (var i = 0; i < localStorage.length; i++) {
        userArray[i] = localStorage.key(i);
    }
    userArray.sort(); //получение массива ключей LocalStorage в том порядке, в каком получаем данные при AJAX (GET)-запросе

    for (var j = 0; j < localStorage.length; j++) {
        var userP = usersContainer[0].appendChild(document.createElement('p'));
        var userDIV = usersContainer[0].appendChild(document.createElement('div'));
        userP.classList.add('user');
        userP.innerHTML = userArray[j];
        var object = JSON.parse(localStorage.getItem(userArray[j]));
        userDIV.dataset.user = object.first_name;
        userDIV.innerHTML = '<img alt="avatar" src=' + object.avatar + '>' +
            '<div class="names">' + '<p>' + 'First name: ' + object.first_name + '</p>' +
            '<p>' + 'Last name: ' + object.last_name + '</p>' +
            '<p>' + 'email: ' + object.email + '</p>' +
            '<p>' + 'id: ' + object.id + '</p>' + '</div>';
        var dataUser = document.querySelector('div[data-user]');
        dataUser.classList.add('visible');
        document.getElementsByClassName('user')[0].classList.add('user_clicked');
    }
}

//отрисовка окна в случае ошибки получения данных:
var buttonOk = document.createElement('button');
buttonOk.classList.add('error_ok');
buttonOk.innerHTML = 'OK';
var divError = document.createElement('div');
divError.classList.add('error');

function showError() {
    var script = document.getElementsByTagName('script');
    divError.innerHTML = '<p>' + 'Ups! Something went wrong!' + '</p>';
    divError.appendChild(buttonOk);
    document.body.insertBefore(divError, script[0]);
    getUserList.disabled = true;
    getUserList.style.cursor = 'auto';
    getUserList.style.background = 'linear-gradient(90deg, rgba(255, 20, 147, 0.2), rgba(255, 20, 147, 0.2), rgba(138, 43, 226, 0.2))';
}

//убираем по клику сообщение об ошибке:
buttonOk.addEventListener('click', function () {
    soundOK();
    divError.remove();
    getUserList.disabled = false;
    getUserList.style.cursor = 'pointer';
    getUserList.style.background = 'linear-gradient(90deg, deeppink, deeppink, blueviolet)';
})