/*
function Cat(name) {
    var foodAmount = 50;

    function formatFoodAmount() {
        return foodAmount + ' гр.';
    }

    this.dailyNorm = function(amount) {
        if (!arguments.length) return formatFoodAmount();

        if (amount < 30 || amount > 100) {
            return 'Недопустимое количество корма.';
        }

        foodAmount = amount;
    };

    this.name = name;

    this.feed = function() {
        console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
    };
}

var barsik = new Cat('Барсик');

console.log(barsik.dailyNorm());
barsik.feed();

console.log(barsik.dailyNorm(200));
barsik.feed();

console.log(barsik.dailyNorm(75));
barsik.feed();
*/

//task 4:
function Animal(name) {
    var self = this;
    var foodAmount = 50;

    function formatFoodAmount() {
        return foodAmount + ' гр.';
    }

    this.dailyNorm = function(amount) {
        if (!arguments.length) return formatFoodAmount();

        if (amount < 30 || amount > 100) {
            return 'Недопустимое количество корма.';
        }

        foodAmount = amount;
    };

    this.name = name;

    self.animalFeed = function() {
        console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
    };
}

function Cat() {
    Animal.apply(this, arguments);
    var happyCat = this.animalFeed;
    this.animalFeed = function () {
        happyCat();
        console.log('Кот доволен ^_^');
        return this;
    }
}

var murzik = new Cat('Мурзик');

console.log(murzik);
murzik.animalFeed();
console.log(' ');

//task 5:
function Cat() {
    Animal.apply(this, arguments);
    var happyCat = this.animalFeed;
    this.animalFeed = function () {
        happyCat();
        console.log('Кот доволен ^_^');
        return this;
    }
    this.stroke = function () {
        console.log('Гладим кота');
        return this;
    }
}

murzik.animalFeed().stroke();
console.log(' ');
murzik.stroke().animalFeed();