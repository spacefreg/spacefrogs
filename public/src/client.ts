const canvas = document.getElementById('canv') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let isDrawing = false;




ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = `rgb(175, 203, 204)`;
ctx.fill();

ctx.lineWidth = 5;

console.log('hello from client.js');


document.addEventListener('click', function(e) {
    e.preventDefault();
});

document.body.classList.add('stop-scrolling');





function beginDraw(evt) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(evt.pageX - canvas.offsetLeft, evt.pageY - canvas.offsetTop);
}

function continueDraw(evt) {
    if (!isDrawing) {
        return;
    } 
    ctx.lineTo(evt.pageX - canvas.offsetLeft, evt.pageY - canvas.offsetTop);
    ctx.stroke();
}

function endDraw(evt) {
    if (!isDrawing) {
        return;
    }
    continueDraw(evt);
    isDrawing = false;
}



function beginTouch(evt) {
    beginDraw(evt.touches[0]);
}

function touchMove(evt) {
    continueDraw(evt.touches[0]);
    evt.preventDefault();
}

function touchEnd(evt) {
    endDraw(evt.changedTouches[0]);
}

canvas.addEventListener('touchstart', beginTouch, false);
canvas.addEventListener('touchmove', touchMove, false);
canvas.addEventListener('touchend', touchEnd, false);



const clearBtn = document.getElementById('clear-btn');
clearBtn.onclick = function() {
    ctx.fillStyle = 'rgb(175, 203, 204)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

