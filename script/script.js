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
var icounter = 0;

var clearLogButton = document.getElementById('clear-log-button');
clearLogButton.addEventListener('click', clearLog);
var animElement = document.querySelector('.timer.minute .hand span');


var requestsAnimationFrame = (function(){
    return (callback) => {
        window.setTimeout(callback, 1000 / 60); // 60 fps
    };
}())

function startClock(){
    if(startDate && !isPaused){ // Verifica se o cronômetro já está em andamento  
        return;
    }
    startDate = new Date();
    isPaused = false;
    tick();  
}

function pauseClock(){
    isPaused = true;
    elapsedPaused = now - startDate - elapsedTotal; // atualiza elapsedPaused com a diferença correta

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
    isPaused = true; 
}

function finalizarClock() {
    isPaused = true;
    var time = formatTime(elapsedTotal);
    resetClock();
    startClock();
    var logEntry = document.createElement('p');
    counter += 1;
    var currentDate = new Date();
    var formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    logEntry.innerText = `Completion: ${counter}\nCount date: ${formattedDate}\nTotal elapsed time: ${time}`;
    var log = document.getElementById('log');
    log.appendChild(logEntry);
    pauseClock();
}

function formatTime(time) {
    var parts = [];
    parts[0] = ('' + Math.floor(time / one_hour)).padStart(2, '0');
    parts[1] = ('' + Math.floor((time % one_hour) / one_minute)).padStart(2, '0');
    parts[2] = ('' + Math.floor(((time % one_hour) % one_minute) / one_second)).padStart(2, '0');
    
    return parts.join(':');
}

function clearLog() {
    var log = document.getElementById('log');
    while (log.firstChild) {
        log.removeChild(log.firstChild);
    }
    resetClock();
    counter = 0;
    face.innerText = '00:00:00'; // Limpa o tempo na tela
    isPaused = true; // Define o cronômetro como pausado
    pauseClock()
    startClock()
}

pauseClock();
startClock();