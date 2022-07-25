//task 1:
/*
function Animal(name) {
    var foodAmount = 50;

    function formatFoodAmount() {
        return foodAmount + ' гр.';
    };

    this.dailyNorm = function(amount) {
        if (!arguments.length) return formatFoodAmount();

        if (amount < 30 || amount > 100) {
            return 'Недопустимое количество корма.';
        }

        foodAmount = amount;
    };

    this.name = name;

    var self = this;
    this.feed = function() {
        console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
    };
}

function Cat(name) {
    Animal.apply(this, arguments);

    var animalFeed = this.feed;
    this.feed = function() {
        animalFeed();

        console.log('Кот доволен ^_^');
        return this;
    };

    this.stroke = function() {
        console.log('Гладим кота.');
        return this;
    };
}

var barsik = new Cat('Барсик');

barsik.feed().stroke().stroke().feed();
console.log(barsik);
*/
//прототипный стиль класса Animal (класс-родитель):
function Animal(name) {
    this._foodAmount = 50;
    this.name = name;
}

Animal.prototype._formatFoodAmount = function () {
    return this._foodAmount + ' гр.';
};

Animal.prototype.dailyNorm = function (amount) {
    if (!arguments.length) return this._formatFoodAmount();

    if (amount < 30 || amount > 100) {
        return 'Недопустимое количество корма.';
    }

    this._foodAmount = amount;
};

Animal.prototype.feed = function () {
    console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
};

//прототипный стиль класса Cat (класс-потомок):
function Cat(name) {
    Animal.apply(this, arguments);
}

//наследование
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.stroke = function () {
    console.log('Гладим кота.');
    return this;
};

//полиморфизм
Cat.prototype.feed = function () {
    Animal.prototype.feed.apply(this);
    console.log('Кот доволен ^_^');
    return this;
}

var barsik = new Cat('Барсик');

barsik.feed().stroke().stroke().feed();
console.log(barsik);

//task 2:
var initialObj = {
    string: 'Vasya',
    number: 30,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object3: {}
    },
    method: function() {
        alert('Hello');
    }
};

function deepClone(object) {
//динамически в зависимости от переданного аргумента создаем пустой массив или пустой объект
    var clone = (typeof object === 'object' && object !== null && object.length >= 0) ? [] : {};
//определяем вложенные объекты и массивы и рекурсивно проходимся по ним
    for (var key in object) {
        if (object[key] !== null && typeof object[key] === 'object') {
            clone[key] = deepClone(object[key]);
            continue;
        }
//клонируем все остальные типы данных в новый объект
        clone[key] = object[key];
    }

    return clone;
}

var clonedObj = deepClone(initialObj);

clonedObj.object.object2.array2[1].name = 'Vasya';
clonedObj.array.push(2);

console.log(initialObj);
console.log(clonedObj);
console.log('');

//task 3:
function deepCompare(obj1, obj2) {

    //функция проверки объектов и массивов на пустоту
    function isEmpty(obj) {
        for (var key in obj) {
            return false;
        }

        return true;
    }

    //функция проверки массивов разной степени вложенности на идентичность
    function equalArrays(arrA,arrB) {
        if (arrA.length !== arrB.length) return false;

        for (var i = 0; i < arrA.length; i++) {
            if (arrA[i] !== arrB[i] && String(arrA[i]) !== String(arrB[i]) ||
                arrA[i] !== arrB[i] && typeof arrA[i] !== typeof arrB[i]) {
                return false;
            } else if (Array.isArray(arrA[i]) && Array.isArray(arrB[i])) {
                return equalArrays(arrA[i], arrB[i]);
            } else if (String(arrA[i]) === '[object Object]' && String(arrB[i]) === '[object Object]') { //если в массиве встречаем объект
                if (equalObjects(arrA[i], arrB[i]) === false) { //поочередно сравниваем все объекты в массиве
                    return false;
                }
            }
        }

        return true;
    }

    //функция проверки объектов разной степени вложенности на идентичность
    function equalObjects(objA, objB) {
        if (equalArrays(Object.keys(objA), Object.keys(objB))) { //проверка на идентичность ключей объектов

            //проверка на идентичность свойств объектов
            var arrA = []; //создание массива свойств объекта objA
            var i = 0;
            for (var keyA in objA) {
                arrA[i] = objA[keyA];
                i++;
            }
            var arrB = []; //создание массива свойств объекта objB
            var j = 0;
            for (var keyB in objB) {
                arrB[j] = objB[keyB];
                j++;
            }

            //сравниваем 2 созданных массива свойств объектов objA и objB с проверкой на вложенные объекты
            if (equalArrays(arrA, arrB)) {
                for (var k = 0; k < arrA.length; k++) {
                    if (String(arrA[k]) === '[object Object]') { //если находим вложенные объекты, тогда их тоже сравниваем
                        if (equalObjects(arrA[k], arrB[k]) === false) {
                            return false;
                        }
                    } else if (typeof arrA[k] === 'function' && typeof arrB[k] === 'function') { //если в массивах встречаем функцию
                        if (arrA[k].toString() !== arrB[k].toString()) { //приводим их к строке и производим сравнение
                            return false;
                        }
                    }
                }
                return true;
            }
        }

        return false;
    }

    if (obj1 === null && obj2 === null) {
        return true;
    } else if (obj1 === null && obj2 !== null || obj1 !== null && obj2 === null) {
        return false;
    } else if (typeof obj1 === 'object' && typeof obj2 !== 'object' ||
        typeof obj1 !== 'object' && typeof obj2 === 'object' ||
        typeof obj1 !== 'object' && typeof obj2 !== 'object') {
        return false;
    } else if (!Array.isArray(obj1) && Array.isArray(obj2) ||
        Array.isArray(obj1) && !Array.isArray(obj2)) {
        return false;
    } else if (Array.isArray(obj1) && isEmpty(obj1) && Array.isArray(obj2) && isEmpty(obj2)) { //проверка пустых массивов
        return true;
    } else if (!Array.isArray(obj1) && isEmpty(obj1) && !Array.isArray(obj2) && isEmpty(obj2)) { //проверка пустых объектов
        return true;
    } else if (Array.isArray(obj1) && Array.isArray(obj2) && obj1.length !== obj2.length) { //проверка массивов с разной длиной
        return false;
    } else if (!Array.isArray(obj1) && !Array.isArray(obj2) &&
        Object.keys(obj1).length !== Object.keys(obj2).length) { //проверка объектов с разным количеством ключей
        return false;
    } else if (Array.isArray(obj1) && Array.isArray(obj2) && obj1.length === obj2.length) { //проверка массивов с одинаковой длиной
        return equalArrays(obj1, obj2);
    } else if (!Array.isArray(obj1) && !Array.isArray(obj2) &&
        Object.keys(obj1).length === Object.keys(obj2).length) { //проверка объектов с одинаковыми ключами
        return equalObjects(obj1, obj2);
    }
}
console.log(deepCompare(initialObj, clonedObj));