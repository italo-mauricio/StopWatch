var defaults = {}
, one_second = 1000
, one_minute = one_second * 60
, one_hour = one_minute * 60
, one_day = one_hour * 24
, startDate = null
, elapsedPaused = 0 // nova variável para armazenar o tempo decorrido durante a pausa
, face = document.getElementById('screen')
, isPaused = false;

var requestsAnimationFrame = (function(){
    return (callback) => {
        window.setTimeout(callback, 1000 / 60); // 60 fps
    };
}())


function startClock(){
    if(!startDate){
        startDate = new Date()
    }
    isPaused = false;
    tick()
}

function pauseClock(){
    isPaused = true;
    elapsedPaused = new Date() - startDate; // armazena o tempo decorrido até o momento da pausa
}

function toggleClock(){
    if(isPaused){
        startDate = new Date() - elapsedPaused; // atualiza a data de início do cronômetro com o tempo decorrido durante a pausa
        isPaused = false;
        tick()
    }
    else {
        isPaused = true;
    }
}

function tick(){
    if(isPaused){
        return;
    }
    var now = new Date()
    , elapsed = now - startDate
    , parts = [];

    parts[0] = ('' + Math.floor(elapsed / one_hour)).padStart(2, '0');
    parts[1] = ('' + Math.floor((elapsed % one_hour) / one_minute)).padStart(2, '0');
    parts[2] = ('' + Math.floor(( (elapsed % one_hour) % one_minute) / one_second)).padStart(2, '0');

    face.innerText = parts.join(':');
    requestsAnimationFrame(tick)
}

function resetClock() {
    startDate = null;
    elapsedPaused = 0;
    face.innerText = '00:00:00';
  }
  
  function finalizarClock() {
    isPaused = true;
    var elapsed = new Date() - startDate - elapsedPaused;
    var parts = [];
    parts[0] = ('' + Math.floor(elapsed / one_hour)).padStart(2, '0');
    parts[1] = ('' + Math.floor((elapsed % one_hour) / one_minute)).padStart(2, '0');
    parts[2] = ('' + Math.floor(((elapsed % one_hour) % one_minute) / one_second)).padStart(2, '0');
    var time = parts.join(':');
    alert('Tempo total decorrido: ' + time);
    resetClock();
    startClock();
  }
startClock()
