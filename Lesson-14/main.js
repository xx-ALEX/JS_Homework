var container = document.getElementById('container');

var firstPar = document.createElement('p'),
    secondPar = document.createElement('p');

firstPar.innerHTML = 'Hello, here are <a href="https://www.facebook.com/">Link 1</a> and <a href="https://twitter.com/">Link 2</a>';
secondPar.innerHTML = 'Hello, here are <a href="http://google.by/">Link 3</a> and <a href="https://vk.com/">Link 4</a>';

container.appendChild(firstPar);
container.appendChild(secondPar);

//Practice:
var button = document.querySelector('button');
button.addEventListener('click',function () {
    var linksFirst = firstPar.children;

    for (let i = 0; i < linksFirst.length; i++) {
        linksFirst[i].classList.add('link_style');
    }

});

secondPar.onclick = function (event) {
    event.preventDefault();
    var target = event.target;

    if (target.tagName === 'A') {
        //showLink(target);
        if (target.innerHTML && !localStorage[target.innerHTML]) {
            checkAndSetLS(target.innerHTML,target.getAttribute('href'), target);
        } else if (target.innerHTML && localStorage[target.innerHTML]) {
            alert(JSON.parse(localStorage.getItem(target.innerHTML))['path']);
        }
    }

}

function showLink(A) {
    alert(A.getAttribute('href'));
}

//Practise (WEBSTORAGE):
localStorage.clear();

function checkAndSetLS(link, path, A) {

    if (!localStorage.getItem(link)) {
        path = JSON.stringify({path: path});
        localStorage.setItem(link,path);
        A.setAttribute('href','#');
        alert('Информация о ссылке сохранена');
    }

}

//HomeWork #11
var inputX = document.getElementById('x');
var inputY = document.getElementById('y');
var buttonCreate = document.getElementById('create');
var board = document.getElementsByClassName('board');
var cell = document.createElement('div');

inputX.addEventListener('input', enableButton);
inputY.addEventListener('input', enableButton);

//делаем активной кнопку "create"
function enableButton() {

    if (inputX.value && inputY.value) {
        document.getElementById('create').disabled = false;
    } else if (!inputX.value || !inputY.value) {
        document.getElementById('create').disabled = true;
    }

}

buttonCreate.addEventListener('click', checkInput);

//Проверяем введенные значения X и Y и при корректном вводе вызываем добаление шахматной доски
function checkInput() {
    var dataX = +inputX.value;
    var dataY = +inputY.value;

    if (isNaN(dataX) && isNaN(dataY) || isNaN(dataX) && !isNaN(dataY) && (dataY < 1 || dataY > 10) ||
        !isNaN(dataX) && isNaN(dataY) && (dataX < 1 || dataX > 10) ||
        !isNaN(dataX) && (dataX < 1 || dataX > 10) && !isNaN(dataY) && (dataY < 1 || dataY > 10) ||
        !isNaN(dataX) && !isNaN(dataY) && parseInt(inputX.value) !== dataX && parseInt(inputY.value) !== dataY ||
        !isNaN(dataX) && parseInt(inputX.value) !== dataX && !isNaN(dataY) && (dataY < 1 || dataY > 10) ||
        !isNaN(dataY) && parseInt(inputY.value) !== dataY && !isNaN(dataX) && (dataX < 1 || dataX > 10) ||
        !isNaN(dataX) && parseInt(inputX.value) !== dataX && isNaN(dataY) ||
        !isNaN(dataY) && parseInt(inputY.value) !== dataY && isNaN(dataX)) {
        alert('Введите корректные значения в поля X и Y - целое число от 1 до 10');
        document.getElementById('create').disabled = true;
        inputX.value = '';
        inputY.value = '';
    } else if (isNaN(dataX) && !isNaN(dataY) && (dataY >= 1 || dataY <= 10) ||
        !isNaN(dataX) && (dataX < 1 || dataX > 10) || !isNaN(dataX) && parseInt(inputX.value) !== dataX) {
        alert('Введите корректное значение в поле X - целое число от 1 до 10');
        document.getElementById('create').disabled = true;
        inputX.value = '';
        inputY.value = '';
    } else if (isNaN(dataY) && !isNaN(dataX) && (dataX >= 1 || dataX <= 10) ||
        !isNaN(dataY) && (dataY < 1 || dataY > 10) || !isNaN(dataY) && parseInt(inputY.value) !== dataY) {
        alert('Введите корректное значение в поле Y - целое число от 1 до 10');
        document.getElementById('create').disabled = true;
        inputX.value = '';
        inputY.value = '';
    } else {
        addChessBoard(dataX,dataY);
        document.getElementById('create').disabled = true;
        inputX.value = '';
        inputY.value = '';
    }

}

//Добавление шахматной доски
function addChessBoard (x,y) {
    board[0].style.border = '1px solid';
    cell.classList.add('cell');
    var inner = '';
    var counter = 0;

    for (var i = 0; i < y; i++) {

        for (var j = 0; j < x; j++) {
            counter++;
            if (counter % 2 === 0) {
                inner +='<div class="cell_black" data-type="square"></div>';
            } else {
                inner +='<div class="cell" data-type="square"></div>';
            }
        }

        if (x % 2 === 0) {
            counter++;
        }
        inner += '<br>';
    }

    board[0].innerHTML = inner;
}

//Изменяем цвет клетки по клику
board[0].addEventListener('click', function (event) {
    var target = event.target.closest('div');

    if (target && target.getAttribute('data-type')) {
        var allDiv = document.getElementsByTagName('div');
        for (var k = 0; k < allDiv.length; k++) {
            if (allDiv[k].hasAttribute('data-type') && allDiv[k].classList.contains('cell')) {
                allDiv[k].classList.toggle('cell_black');
                allDiv[k].classList.remove('cell');
            } else if (allDiv[k].hasAttribute('data-type') && allDiv[k].classList.contains('cell_black')) {
                allDiv[k].classList.toggle('cell');
                allDiv[k].classList.remove('cell_black');
            }
        }
    }

});