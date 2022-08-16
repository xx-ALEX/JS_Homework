//task 1:
var regEx1 = /^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@([a-z\d]{2,21}|[a-z\d]{1,10}[-.]?[a-z\d]{1,10})\.com$/i;

console.log('name_surname-1234@gmail.com' + ' is ' + regEx1.test('name_surname-1234@gmail.com')); //true
console.log('name_surname-1234@gmail-gmail.com' + ' is ' + regEx1.test('name_surname-1234@gmail-gmail.com')); //true
console.log('name_surname-1234@gmail.gmail.com' + ' is ' + regEx1.test('name_surname-1234@gmail.gmail.com')); //true
console.log('name_surname@gmail.com' + ' is ' + regEx1.test('name_surname@gmail.com')); //true
console.log('name_surName@gmail.com' + ' is ' + regEx1.test('name_surName@gmail.com')); //true

console.log('name_surname-12@gmail.com' + ' is ' + regEx1.test('name_surname-12@gmail.com')); //false
console.log('name_surname-1234@gmail.gm-ail.com' + ' is ' + regEx1.test('name_surname-1234@gmail.gm-ail.com')); //false
console.log('name_surname-1234@-gmail.com' + ' is ' + regEx1.test('name_surname-1234@-gmail.com')); //false
console.log('');

//task 2:
function checkTelNumber(number) {
    var regEx = /(\+?375-?|8-?0)(2[59]|33|44|17)(-?[1-9]\d{2})(-?\d{2}){2}/;
    return regEx.test(number);
}

console.log('+375-25-777-77-77' + ' is ' + checkTelNumber('+375-25-777-77-77')); //true
console.log('+37525-777-77-77' + ' is ' + checkTelNumber('+37525-777-77-77')); //true
console.log('+37525777-77-77' + ' is ' + checkTelNumber('+37525777-77-77')); //true
console.log('+375257777777' + ' is ' + checkTelNumber('+375257777777')); //true
console.log('+37525-7777777' + ' is ' + checkTelNumber('+37525-7777777')); //true
console.log('37525-7777777' + ' is ' + checkTelNumber('37525-7777777')); //true
console.log('+375251000000' + ' is ' + checkTelNumber('+375251000000')) //true

console.log('+375-25-77-77777' + ' is ' + checkTelNumber('+375-25-77-77777')); //false (расположение тире не там)
console.log('+375-25-0777777' + ' is ' + checkTelNumber('+375-25-0777777')); //false (основная часть номера начинается с 0)
console.log('+375-32-7777777' + ' is ' + checkTelNumber('+375-32-7777777')); //false (неправильный код оператора);

console.log('375299999999' + ' is ' + checkTelNumber('375299999999')); //true
console.log('8-044-444-44-44' + ' is ' + checkTelNumber('8-044-444-44-44')); //true
console.log('8033-6666666' + ' is ' + checkTelNumber('8033-6666666')); //true
console.log('');

//task 3:
var someText = 'concat() - возвращает строку, содержащую результат ' +
    'объединения двух и более предоставленных строк.';

//Case 1:
function getVowelsAmountCase1 (text) {
    var regExp = /[ауоыэяюёиеaeiouy]/ig;
    if (text.match(regExp) === null) {
        return 'количество гласных в тексте: 0';
    } else {
        return 'количество гласных в тексте - ' + text.match(regExp).length;
    }
}

console.log('Case 1: ' + getVowelsAmountCase1(someText));

//Case 2:
function getVowelsAmountCase2 (text) {
    var regExp = /[ауоыэяюёиеaeiouy]/ig;
    var vowelsCounter = 0;

    while (regExp.exec(text)) {
        vowelsCounter++;
    }

    return 'количество гласных в тексте - ' + vowelsCounter;
}

console.log('Case 2: ' + getVowelsAmountCase2(someText));

//Case 3:
function getVowelsAmountCase3 (text) {
    var regExp = /[ауоыэяюёиеaeiouy]/i;
    var vowelsCounter = 0;

    for (var i = 0; i < text.length; i++) {
        if (regExp.test(text[i])) {
            vowelsCounter++;
        }
    }

    return 'количество гласных в тексте - ' + vowelsCounter;
}

console.log('Case 3: ' + getVowelsAmountCase3(someText));