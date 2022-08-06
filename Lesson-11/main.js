//task 1:
var arrayNames = ['Vasya', 'Sasha', 'Petya', 'Inna'];

function toObject (person) {
    if (typeof person === 'string' && person.length !== 0) {
        return {['name']: person};
    }
}
function fromArrayToObject (array) {
    return array.map(toObject);
}

console.log(fromArrayToObject(arrayNames));

//task 2:
var currentTime = ['00', '13', '24'];

function changeString(a,b) {
    return  a + ' : ' + b;
}
function setCurrentTime (array) {
    return array.reduce(changeString, 'Текущее время');
}

console.log(setCurrentTime(currentTime));

//task 3:
var someText = 'concat() - возвращает строку, содержащую результат ' +
    'объединения двух и более предоставленных строк.';

function getVowelsAmount (text) {
    var vowels = ['а','у','о','ы','э','я','ю','ё','и','е']; //создаем массив гласных
    var vowelsCounter = 0;
    text = text.toLowerCase().split(''); //создаем массив символов переданного текста

    for (var i = 0; i < vowels.length; i++) { //ищем гласные в тесте
        for (j = 0; j < text.length; j++) {
            if (vowels[i] !== text[j]) {
                continue;
            }
            vowelsCounter++;
        }
    }

    return 'количество гласных в тексте: ' + vowelsCounter;
}

console.log(getVowelsAmount(someText));

//task 4:
function countSentencesLetters(text) {
    text = text.split('');
    var arr = [];
    var startIndex = 0;

    for(var i = 0; i < text.length; i++) {
        if (text[i] === '.' && text[i+1] === '.' && text[i+2] === '.' || //проверка на '...'
            text[i] === '.' && text[i-1] !== '.' && text[i+1] !== '.' || //проверка на '.'
            text[i] === '!' || text[i] === '?') { //проверка на '!' и '?'
            arr = text.slice(startIndex,i); //убираем из массива значения до знаков '...', '.', '!', '?'

            if (arr[0] === ' ' || arr[0] === '.' || //убираем лишние пробелы и точки в начале предложения
                arr[1] === ' ' || arr[1] === '.') {
                arr = arr.slice(2);
            }

            var charCounter = 0;

            for (var j = 0; j < arr.length; j++) { //ведем подсчет букв в предложении
                if (arr[j] === ' ' || arr[j] === ',') {
                    continue;
                }
                charCounter++;
            }

            startIndex = i + 2;
            console.log(arr.join('') + ': Letters quantity is: ' + charCounter);
        }
    }
}

countSentencesLetters('Привет, студент! Студент... Как дела, студент?');

//task 5:
var anyText1 = 'Сёння спаўняецца 140 гадоў з дня, калі нарадзіўся славуты беларускі' +
    ' пясняр Янка Купала. На жыццё пісьменніка выпала нямала цяжкасцей і складаных' +
    ' гістарычных перыядаў, а смерць Купалы дагэтуль тоіць у сабе шмат незразумелага.' +
    ' Нягледзячы ні на што, паэт паклаў сваё жыццё на карысць беларускай культуры і мовы.' +
    ' Сёння мы прапануем вам адгадаць, якія звесткі з жыцця пісьменніка праўдзівыя, а якія — не.';

var anyText2 =  'Please record the pump model and serial number, Albany will need this ' +
    'information when you require parts or service, should any problems occur with the ' +
    'pump in its lifetime we have a spares and repair service. The use of genuine Albany ' +
    'parts will provide the safest and most reliable operation of your pump. ISO certification ' +
    'and quality control procedures ensure the parts are manufactured to the highest quality and ' +
    'safety levels. Please contact Albany for details on genuine pump parts.';

function getPopularWord(text) {
    if (typeof text !== 'string' || text.trim().length === 0) {
        return 'это не текст!'
    }
    text = text.trim(); //не учитываем пустую строку и пробелы вокруг текста
    text = text.split(' '); //создаем массив из слов
    var arr = [];

    for (var i = 0; i < text.length; i++) {
        if (text[i][text[i].length - 1] === '.' || //для сравнения слов убираем знаки препинания после слов
            text[i][text[i].length - 1] === ',' ||
            text[i][text[i].length - 1] === '!' ||
            text[i][text[i].length - 1] === '?' ||
            text[i][text[i].length - 1] === ';') {
            text[i] = text[i].slice(0,-1);
        }
        var counter = 1;

        for (var j = 0; j < text.length; j++) {
            if (text[j][text[j].length - 1] === '.' || //для сравнения слов убираем знаки препинания после слов
                text[j][text[j].length - 1] === ',' ||
                text[j][text[j].length - 1] === '!' ||
                text[j][text[j].length - 1] === '?' ||
                text[j][text[j].length - 1] === ';') {
                text[j] = text[j].slice(0,-1);
            } else if (i === j) {
                continue;
            } else if (text[i] === text[j]) {
                counter++; //считаем число повторений каждого слова в тексте
            }
        }
        arr.push(counter); //создаем массив из числа повторений
    }

    for (var key in arr) { //получаем первое максимальное число из массива повторений
        if (arr[key] === Math.max(...arr)) { //индексы массивов чисел соответствуют индексам слов
            return 'максимальное повторение у слова ' + '"' +
                text[key] + '" - ' + Math.max(...arr);
        }
    }
}

console.log(getPopularWord(anyText1));
console.log(getPopularWord(anyText2));