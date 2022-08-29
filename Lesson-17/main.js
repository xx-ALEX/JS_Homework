//task 1:
{
    const object = {a: 1, b: 2, c: 3, d: 4};
    let {a, b, ...obj} = object;

    console.log(a);
    console.log(b);
    console.log(obj);
    console.log('');
}

//task 2:
{
    let name = prompt('Type your name');
    const obj = {
        name,
        sayHi() {
            return `Hi, ${this.name}!`;
        }
    }

    console.log(obj.sayHi());
    console.log('');
}

//task 3:
{
    function multiplyNumbers(x, y, z = 1) {
        let {a: x1 = x, b: y1 = y} = x;
        [x, y] = [x1, y1];
        return x ** y * z;
    }

    console.log(multiplyNumbers({a: 2, b: 3}, 10));
    console.log('');
}

//task 4:
{
    const array = ['Vasya', 40];
    function person(name, age) {
        return `Hello, I'm ${name} and I'm ${age} years old.`;
    }

    console.log(person(...array));
    console.log('');
}

//task 5:
{
    function showNumbers(...array) {
        for (let number of array) {
            console.log(number);
        }
    }

    showNumbers(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
    console.log('');
}

//task 6:
{
    function countVowelLetters(text) {
        text = text.toLowerCase().split('');
        const vowelLetters = ['а', 'я', 'ы', 'и', 'о', 'ё', 'у', 'ю', 'э', 'е', 'a', 'e', 'i', 'o', 'u', 'y'];
        let counter  = 0;

        for (let vowel of text) {
                vowelLetters.includes(vowel) && counter++;
        }

        return `Количество гласных: ${counter}`;
    }

    console.log(countVowelLetters('Шла Саша по шоссе И сосала сУшку'));
    console.log('');
}

//task 7:
{
    const array = [
        {name: 'Vasya Pupkin', age: 25},
        {name: 'Ivan Petrov', age: 30},
        {name: 'Fedor Ivanov', age: 42}
    ];

    function getObjectFromArray(array) {
        return {
            ['Пользователи младше 40'] : array.filter(user => user.age < 40),
            ['Пользователь с именем Федор'] : array.find(user => user.name.startsWith('Fedor')),
        }
    }

    console.log(getObjectFromArray(array));
    console.log('');
}

//task 8:
{
    const array = ['Вася', 'Петя'];

    function getUsersList(array) {
        return array.map((user, index) => ({[`Пользователь ${++index}`] : user}));
    }

    console.log(getUsersList(array));
    console.log('');
}

//task 9:
{
    const array = [
        {name: 'Vasya'},
        {name: 'Piotr', age: 25},
        {salary: '2000$'}
    ];

    function getUser(array) {
        return array.reduce((total, currentValue) => Object.assign({}, total, currentValue));
    }

    console.log(array);
    console.log(getUser(array));
    console.log('');
}

//task 10:
{
    /*
    function Animal(name) {
        this.name = name;
        this._foodAmount = 50;
    }

    Animal.prototype._formatFoodAmount = function() {
        return this._foodAmount + ' гр.';
    };

    Animal.prototype.dailyNorm = function(amount) {
        if (!arguments.length) return this._formatFoodAmount();

        if (amount < 30 || amount > 100) {
            return 'Недопустимое количество корма.';
        }

        this._foodAmount = amount;
    };

    Animal.prototype.feed = function() {
        console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
    };

    function Cat(name) {
        Animal.apply(this, arguments);
    }

    Cat.prototype = Object.create(Animal.prototype);
    Cat.prototype.constructor = Cat;

    Cat.prototype.feed = function() {
        Animal.prototype.feed.call(this);

        console.log('Кот доволен ^_^');
        return this;
    };

    Cat.prototype.stroke = function() {
        console.log('Гладим кота.');
        return this;
    };

    var barsik = new Cat('Барсик');

    barsik.feed().stroke().stroke().feed();
    */

    class Animal {
        constructor(name) {
            this.name = name
            this._foodAmount = 50
        }
        _formatFoodAmount() {
            return `${this._foodAmount} гр.`
        }
        dailyNorm(amount) {
            if (!arguments.length) return this._formatFoodAmount();

            if (amount < 30 || amount > 100) {
                return 'Недопустимое количество корма.';
            }

            this._foodAmount = amount;
        }
        feed() {
            console.log(`Насыпаем в миску ${this.dailyNorm()} корма.`);
        }
    }

    class Cat extends Animal {
        constructor(name) {
            super(name)
        }
        feed() {
            super.feed()
            console.log('Кот доволен ^_^')
            return this
        }
        stroke() {
            console.log('Гладим кота.')
            return this
        }
    }

    const barsik = new Cat('Барсик');

    barsik.feed().stroke().stroke().feed();
    console.log('');
}

//task 11:
{
    function createPromiseForNumbers(firstNumber, secondNumber) {

        return new Promise((resolve, reject) => {
            console.log('Промис запущен');

            if (Number.isInteger(firstNumber) && Number.isInteger(secondNumber)) {
                firstNumber > secondNumber ? [firstNumber, secondNumber] = [secondNumber, firstNumber] : [firstNumber, secondNumber] = [firstNumber, secondNumber];

                let timerId = setTimeout(function showNumber() {
                    console.log(firstNumber);
                    if (firstNumber < secondNumber) {
                        setTimeout(showNumber, 1000);
                        firstNumber++;
                    } else {
                        resolve(firstNumber);
                    }
                }, 1000);

            } else {
                reject('переданные параметры не числа или дробные числа!');
            }
        });
    }

    createPromiseForNumbers(5,10)
        .then(result => console.log(`Результат промиса: ${result}`))
        .catch(error => console.log(`Возникла ошибка в промисе: ${error}`))
        .finally(() => console.log('Работа промиса завершена'));
}