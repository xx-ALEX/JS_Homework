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
newInput.setAttribute('onkeypress', 'handle(event)');
var cell;
var table = document.querySelector('table');

table.addEventListener('click', function (event) {
    var target = event.target.closest('td');
    if (target && target.className !== 'addRow') {
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
newInput.oninput = function () {
    cell.innerHTML = newInput.value;
}

newInput.onblur = function () {
    cell.removeAttribute('id');
    newInput.remove();
    cell.style.display = 'block';
}

function handle(e) {
    if(e.keyCode === 13) {
        e.preventDefault();
        cell.removeAttribute('id');
        newInput.remove();
        cell.style.display = 'block';
    }
}