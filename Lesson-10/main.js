//task 1:
//исходный код
function filterNumbersArr(numbers) {
    var newArr = [];

    for (var i = 0; i < numbers.length; i++) {
        var el = numbers[i];

        if (el > 0) {
            newArr[newArr.length] = el;
        }
    }

    return newArr;
}

console.log(filterNumbersArr([-1, 0, 2, 34, -2]));

//фильтрация массива через функцию
var arr1 = [-1, 0, 2, 34, -2];
var newArr1 = arr1.filter(function (number) {
    return number > 0;
});

console.log(newArr1);

//task 2:
var arr2 = [-1, 0, 2, 34, -2];
var newArr2 = arr2.find(function (number) {
    return number > 0;
})

console.log(newArr2);

//task 3:
function isPalindrome(str) {
    if (typeof str !== 'string') {
        return 'переданный аргумент - не строка!'
    } else if (str.length === 0 || str === ' ') {
        return false;
    } else if (str.length === 1) {
        return true;
    } else {
        return str.toLowerCase() === str.toLowerCase().split('').reverse().join('');
    }
}

console.log(isPalindrome('шалаШ'));
console.log(isPalindrome('привет'));

//task 4:
function areAnagrams(str1,str2) {
    if (typeof str1 !== 'string' && str2 !== 'string') {
        return 'переданные аргументы - не строки!';
    } else if (str1.length !== str2.length) {
        return false;
    } else if (str1.length === 0 && str2.length === 0) {
        return false;
    } else { //делаем подсчет числовых значений Unicode для каждого слова и сравниваем их значения
        var sumOfCodes1 = 0;
        for (var i = 0; i < str1.length; i++) {
            sumOfCodes1 += str1.toLowerCase().charCodeAt(i);
        }
        var sumOfCodes2 = 0;
        for (var j = 0; j < str2.length; j++) {
            sumOfCodes2 += str2.toLowerCase().charCodeAt(j);
        }
        return sumOfCodes1 === sumOfCodes2;
    }
}

console.log(areAnagrams('кот','Отк'));
console.log(areAnagrams('кот','атк'));
console.log(areAnagrams('кот','отко'));

//task 5:
function divideArr(array, n) {
    if (!Array.isArray(array) || n < 0) {
        return 'аргументы функции не корректны!';
    } else if (n === 0) {
        return array;
    } else if (n === 1) {
        var newArr1 = [];
        newArr1.push(array);

        return newArr1;
    } else if (n > array.length) {
        var newArr2 = [];

        for (var i = 0; i < array.length; i++) {
            newArr2.push(array.slice(i,i+1));
        }
        for (var j = array.length; j < n; j++) {
            newArr2.push([]);
        }

        return newArr2;
    } else if (n <= array.length) {
        var newArr3 = [];
        var startIndex = 0;

        for (var k = 0; k < n; k++) {
            newArr3.push(array.slice(startIndex, startIndex + Math.ceil(array.length / n)));
            startIndex += Math.ceil(array.length / n);
        }

        return newArr3;
    }
}

console.log(divideArr([1, 2, 3, 4], 2));
console.log(divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3));
console.log(divideArr([1, 2, 3, 4, 5], 0));

//task 6*:
function isNumberPowerOfTwo(number) {
    if (typeof number !== 'number' || number < 1) { //валидация
        return false;
    } else if ( number === 1) {
        return true;
    } else if (number % 2 !== 0) { //убираем нечетные числа
        return false;
    } else if (number > 1) { //проверяем делится ли число без остатка до единицы
        while (number > 1) {
            if (number % 2 !== 0) { //проверяем во время цикла делятся ли все число на 2
                return false;
            }
            number = number / 2;
        }
        return true;
    }
}

console.log(isNumberPowerOfTwo(1));
console.log(isNumberPowerOfTwo(2));
console.log(isNumberPowerOfTwo(10));