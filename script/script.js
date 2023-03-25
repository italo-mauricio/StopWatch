var defaults = {}
, one_second = 1000
, one_minute = one_second * 60
, one_hour = one_minute * 60
, one_day = one_hour * 24
, startDate = null
, elapsedPaused = 0
, elapsedTotal = 0 // nova variável para armazenar o tempo total decorrido
, face = document.getElementById('screen')
, isPaused = false;

var counter = 0;
var requestsAnimationFrame = (function(){
    return (callback) => {
        window.setTimeout(callback, 1000 / 60); // 60 fps
    };
}())

function startClock(){
    if(!startDate || isPaused){ // verifica se o cronômetro não está em andamento ou está pausado
        startDate = new Date()
    }
    isPaused = false;
    tick()
}

function pauseClock(){
    isPaused = true;
    elapsedPaused = new Date() - startDate;
}


function tick(){
    var now = new Date();
    elapsedTotal += now - startDate - elapsedPaused;
    if(!isPaused){
        face.innerText = formatTime(elapsedTotal);
        requestsAnimationFrame(tick);
    }
    startDate = now;
}

function resetClock() {
    startDate = null;
    elapsedPaused = 0;
    elapsedTotal = 0;
    face.innerText = '00:00:00';
}

function finalizarClock() {
    isPaused = true;
    var time = formatTime(elapsedTotal);
    resetClock();
    startClock();
    var logEntry = document.createElement('p');
    counter += 1;
    logEntry.innerText = `Finalização: ${counter}\nTempo total decorrido: ${time}`;
    var log = document.getElementById('log');
    log.appendChild(logEntry);
}

function formatTime(time) {
    var parts = [];
    parts[0] = ('' + Math.floor(time / one_hour)).padStart(2, '0');
    parts[1] = ('' + Math.floor((time % one_hour) / one_minute)).padStart(2, '0');
    parts[2] = ('' + Math.floor(((time % one_hour) % one_minute) / one_second)).padStart(2, '0');
    
    return parts.join(':');
}

startClock();