var defaults = {}
, one_second = 1000
, one_minute = one_second * 60
, one_hour = one_minute * 60
, one_day = one_hour * 24
, startDate = new Date()
, face = document.getElementById('screen')

var requestsAnimationFrame = (function(){
    return (callback) => {
        window.setTimeout(callback, 1000 / 60); // 60 fps
    };
}())

function tick(){
    var now = new Date()
    , elapsed = now - startDate
    , parts = [];

    parts[0] = ('' + Math.floor(elapsed / one_hour)).padStart(2, '0');
    parts[1] = ('' + Math.floor((elapsed % one_hour)) / one_minute).padStart(2, '0');
    parts[2] = ('' + Math.floor(( (elapsed % one_hour) % one_minute) / one_second)).padStart(2, '0');

    face.innerText = parts.join(':');
    requestsAnimationFrame(tick)
}

tick()