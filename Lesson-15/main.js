var getUserList = document.getElementsByClassName('userList')[0];
var usersContainer = document.getElementsByClassName('users')[0];
var indicator = 0;

//AJAX (GET) запрос:
getUserList.addEventListener('click', function () {
    usersContainer.innerHTML = '';
    if (localStorage['users']) { //проверяем наличие данных в LocalStorage по ключу 'users'
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
        var userP = usersContainer.appendChild(document.createElement('p'));
        var userDIV = usersContainer.appendChild(document.createElement('div'));
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
usersContainer.addEventListener('click', function (event) {
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
    if (!localStorage['users']) {
        localStorage.setItem('users',JSON.stringify(usersArray));
    }
}

//отрисовка данных из LocalStorage:
function getUsersFromLS() {
    var arrayLS = JSON.parse(localStorage['users']);

    for (var i = 0; i < arrayLS.length; i++) {
        var userP = usersContainer.appendChild(document.createElement('p'));
        var userDIV = usersContainer.appendChild(document.createElement('div'));
        userP.classList.add('user');
        userP.innerHTML = 'User ' + (i + 1);
        userDIV.dataset.user = arrayLS[i].first_name;
        userDIV.innerHTML = '<img alt="avatar" src=' + arrayLS[i].avatar + '>' +
            '<div class="names">' + '<p>' + 'First name: ' + arrayLS[i].first_name + '</p>' +
            '<p>' + 'Last name: ' + arrayLS[i].last_name + '</p>' +
            '<p>' + 'email: ' + arrayLS[i].email + '</p>' +
            '<p>' + 'id: ' + arrayLS[i].id + '</p>' + '</div>';
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
    var script = document.getElementsByTagName('script')[0];
    divError.innerHTML = '<p>' + 'Ups! Something went wrong!' + '</p>';
    divError.appendChild(buttonOk);
    document.body.insertBefore(divError, script);
    getUserList.disabled = true;
    getUserList.classList.toggle('userList');
    getUserList.classList.toggle('dis');
}

//убираем по клику сообщение об ошибке:
buttonOk.addEventListener('click', function () {
    soundOK();
    divError.remove();
    getUserList.disabled = false;
    getUserList.classList.toggle('userList');
    getUserList.classList.toggle('dis');
})