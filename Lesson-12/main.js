var container = document.getElementById('container');

var firstPar = document.createElement('p'),
    secondPar = document.createElement('p');

firstPar.innerHTML = 'Hello, here are <a href="https://www.facebook.com">Link 1</a> and <a href="https://twitter.com">Link 2</a>';
secondPar.innerHTML = 'Hello, here are <a href="http://google.by">Link 3</a> and <a href="https://vk.com">Link 4</a>';

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
    let target = event.target;
    if (target.tagName === 'A') {
        showLink(target);
    }
}
function showLink(A) {
    alert(A.getAttribute('href'));
}

//HomeWork #10
//добавление ячеек
var addRow = document.querySelector('td[colspan="3"]');
addRow.addEventListener('click', function () {
    var table = document.querySelector('table tbody');
    var newRow = document.createElement('tr');
    var firstRow = table.firstChild;
    table.insertBefore(newRow, firstRow);
    firstRow = table.firstChild;
    firstRow.innerHTML = '<td><span></span></td>\n' +
        '<td><span></span></td>\n' + '<td><span></span></td>';
});

//добавление текстового ввода по клику на ячейку
var newInput = document.createElement('input');
newInput.setAttribute('type', 'text');
var cell;
var table = document.querySelector('table');

table.addEventListener('click', function (event) {
    var target = event.target.closest('td');
    var createdInput = event.target.closest('input');

    if (createdInput) { //если уже есть input, тогда убираем фокус
        createdInput.blur();
    }
    else if (target && target.className !== 'addRow') { //если нет input, тогда добавляем его и устанавливаем фокус
        cell = target.firstElementChild;
        cell.setAttribute('id','added');
        cell.style.display = 'none';
        newInput.value = cell.innerHTML;
        addInput(target);
    }
});

function addInput(td) {
    td.appendChild(newInput);
    newInput.focus();
}

//исчезновение текстового ввода при потере фокуса
newInput.addEventListener('input', function () {
    cell.innerHTML = newInput.value;
});

newInput.addEventListener('blur', hideInput);

function hideInput() {
    cell.removeAttribute('id');
    cell.style.display = 'block';
    newInput.remove();
}

newInput.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        newInput.removeEventListener('blur', hideInput);
        handle(event);
        newInput.addEventListener('blur', hideInput);
    }
});

function handle(e) {
    if(e.code === 'Enter' ) {
        e.preventDefault();
        cell.removeAttribute('id');
        cell.style.display = 'block';
        newInput.remove();
    }
}