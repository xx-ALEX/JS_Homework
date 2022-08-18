let start = document.getElementsByClassName('start')[0];
let reset = document.getElementsByClassName('reset_save')[0];
let save = document.getElementsByClassName('reset_save')[1];
let screen = document.getElementsByClassName('screen')[0];
let ms = document.getElementsByClassName('ms')[0];
let sec = document.getElementsByClassName('sec')[0];
let min = document.getElementsByClassName('min')[0];
let script = document.getElementsByTagName('script')[0];
let resultsCounter = 0;
let results;
let timerId;
let timerArray;

//таймер:
function displayTimer() {
    ms.innerHTML++;
    +ms.innerHTML < 10 ? ms.innerHTML = `0${ms.innerHTML}` : ms.innerHTML;
    if (+ms.innerHTML === 100) {
        ms.innerHTML = '00';
        sec.innerHTML++;
        +sec.innerHTML < 10 ? sec.innerHTML = `0${sec.innerHTML}` : sec.innerHTML;

        if (+sec.innerHTML === 60) {
            sec.innerHTML = '00';
            min.innerHTML++;
            +min.innerHTML < 10 ? min.innerHTML = `0${min.innerHTML}` : min.innerHTML;

            if (+min.innerHTML === 60) {
                clearInterval(timerId);
                save.classList.remove('reset_save_visible');
                start.classList.add('reset_save');
            }
        }
    }
    //записываем данные таймера в массив и сохраняем текущее значение в sessionStorage
    timerArray = [min.innerHTML, sec.innerHTML, ms.innerHTML];
    sessionStorage.setItem('timer', JSON.stringify(timerArray));
}

//команды кнопки 'Start'
function setStart() {
    if (screen.dataset.state === 'initial') { //нажатие 'Start'
        soundStart();

        // меняем подпись кнопки при нажатии
        start.innerHTML = 'Stop';

        //меняем data-атрибут таймера
        screen.dataset.state = 'running';

        //записываем значение data-атрибута в sessionStorage
        sessionStorage.setItem('data-state', JSON.stringify('running'));

        //делаем видимыми кнопки 'Reset' и 'Save'
        reset.classList.add('reset_save_visible');
        save.classList.add('reset_save_visible');

        //новый запуск таймера
        timerId = setInterval(displayTimer, 10);

    } else if (screen.dataset.state === 'running') { //нажатие 'Stop'
        soundStopRun();

        // меняем подпись кнопки при нажатии
        start.innerHTML = 'Run';

        //меняем data-атрибут таймера
        screen.dataset.state = 'stopped';

        //записываем значение data-атрибута в sessionStorage
        sessionStorage.setItem('data-state', JSON.stringify('stopped'));

        //остановка таймера
        clearInterval(timerId);

    } else if (screen.dataset.state === 'stopped') { //нажатие 'Run'
        soundStopRun();

        // меняем подпись кнопки при нажатии
        start.innerHTML = 'Stop';

        //меняем data-атрибут таймера
        screen.dataset.state = 'running';

        //записываем значение data-атрибута в sessionStorage
        sessionStorage.setItem('data-state', JSON.stringify('running'));

        //продолжение работы таймера
        timerId = setInterval(displayTimer, 10);
    }
}

//команды кнопки 'Reset'
function setReset() {
    soundReset();

    start.innerHTML = 'Start';

    //возвращаем data-атрибут таймера
    screen.dataset.state = 'initial';

    //убираем кнопки 'Reset' и 'Save'
    reset.classList.remove('reset_save_visible');
    save.classList.remove('reset_save_visible');

    //обнуляем таймер
    ms.innerHTML = sec.innerHTML = min.innerHTML = '00';
    start.classList.remove('reset_save');

    //останавливаем таймер
    clearInterval(timerId);

    //обнуляем сохраненные результаты
    if (results) {
        resultsCounter = 0;
        results.innerHTML = '';
    }
    sessionStorage.clear();
}

//команды кнопки 'Save'
function setSave() {
    soundSave();

    //порядковый номер результата
    if (sessionStorage['resultsCounter']) {
        resultsCounter = JSON.parse(sessionStorage['resultsCounter']);
    }
    resultsCounter++;
    sessionStorage.setItem('resultsCounter', JSON.stringify(resultsCounter));

    if (!results) {
        results = document.createElement('div');
        results.classList.add('saved_results');
        document.body.insertBefore(results, script);
        let time = document.createElement('p');
        time.innerHTML = `${resultsCounter}) ${min.innerHTML} : ${sec.innerHTML} : ${ms.innerHTML}`

        //сохраняем результаты в sessionStorage
        sessionStorage.setItem(resultsCounter, JSON.stringify(`${min.innerHTML} : ${sec.innerHTML} : ${ms.innerHTML}`));

        results.appendChild(time);
    } else {
        let time = document.createElement('p');
        time.innerHTML = `${resultsCounter}) ${min.innerHTML} : ${sec.innerHTML} : ${ms.innerHTML}`

        //сохраняем результаты в sessionStorage
        sessionStorage.setItem(resultsCounter, JSON.stringify(`${min.innerHTML} : ${sec.innerHTML} : ${ms.innerHTML}`));

        results.appendChild(time);
    }
}

//Поведение секундомера при обновлении страницы
function setWindowLoad() {
    if (sessionStorage.length && JSON.parse(sessionStorage['data-state']) === 'running') {
        screen.dataset.state = 'running';
        start.innerHTML = 'Stop';

        min.innerHTML = JSON.parse(sessionStorage['timer'])[0];
        sec.innerHTML = JSON.parse(sessionStorage['timer'])[1];
        ms.innerHTML = JSON.parse(sessionStorage['timer'])[2];

        reset.classList.add('reset_save_visible');
        save.classList.add('reset_save_visible');

        timerId = setInterval(displayTimer, 10);

        //если есть хотя бы 1 сохраненный результат в sessionStorage
        if (sessionStorage['1']) {
            results = document.createElement('div');
            results.classList.add('saved_results');
            document.body.insertBefore(results, script);

            let array = [];
            let j = 0;
            for (let i = 0; i < sessionStorage.length; i++) {
                if (sessionStorage.key(i) !== 'data-state' && sessionStorage.key(i) !== 'timer' &&
                    sessionStorage.key(i) !== 'resultsCounter') {
                    array[j++] = JSON.parse(sessionStorage[sessionStorage.key(i)]);
                }
            }
            array = array.sort();

            for (let i = 0; i < array.length; i++) {
                let time = document.createElement('p');
                time.innerHTML = `${i+1}) ${array[i]}`;
                results.appendChild(time);
            }
        }

    } else if (sessionStorage.length && JSON.parse(sessionStorage['data-state']) === 'stopped') {
        screen.dataset.state = 'stopped';
        start.innerHTML = 'Run';

        min.innerHTML = JSON.parse(sessionStorage['timer'])[0];
        sec.innerHTML = JSON.parse(sessionStorage['timer'])[1];
        ms.innerHTML = JSON.parse(sessionStorage['timer'])[2];

        reset.classList.add('reset_save_visible');
        save.classList.add('reset_save_visible');

        //если есть хотя бы 1 сохраненный результат в sessionStorage
        if (sessionStorage['1']) {
            results = document.createElement('div');
            results.classList.add('saved_results');
            document.body.insertBefore(results, script);

            let array = [];
            let j = 0;
            for (let i = 0; i < sessionStorage.length; i++) {
                if (sessionStorage.key(i) !== 'data-state' && sessionStorage.key(i) !== 'timer' &&
                    sessionStorage.key(i) !== 'resultsCounter') {
                    array[j++] = JSON.parse(sessionStorage[sessionStorage.key(i)]);
                }
            }
            array = array.sort();

            for (let i = 0; i < array.length; i++) {
                let time = document.createElement('p');
                time.innerHTML = `${i+1}) ${array[i]}`;
                results.appendChild(time);
            }
        }
    }
}

//звуки на кнопки
function soundStart() {
    let startAudio = new Audio();
    startAudio.src = 'Sounds/start.wav';
    startAudio.autoplay = true;
}

function soundSave() {
    let saveAudio = new Audio();
    saveAudio.src = 'Sounds/save.mp3';
    saveAudio.autoplay = true;
}

function soundReset() {
    let resetAudio = new Audio();
    resetAudio.src = 'Sounds/reset.mp3';
    resetAudio.autoplay = true;
}

function soundStopRun() {
    let stopRunAudio = new Audio();
    stopRunAudio.src = 'Sounds/stop_run.mp3';
    stopRunAudio.autoplay = true;
}

start.addEventListener('click', setStart);
reset.addEventListener('click', setReset);
save.addEventListener('click', setSave);
window.addEventListener('load', setWindowLoad);