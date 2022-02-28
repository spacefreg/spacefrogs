"use strict";
console.log('henlo from client.ts');
const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');
let isDrawing = false;
ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = `rgb(175, 203, 204)`;
ctx.fill();
ctx.lineWidth = 5;
let mytext = document.getElementById('char');
document.addEventListener('click', function (e) {
    if (e.target instanceof Element && e.target.nodeName !== 'INPUT') {
        e.preventDefault();
    }
});
document.body.classList.add('stop-scrolling');
function beginDraw(evt) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(evt.pageX - canvas.offsetLeft, evt.pageY - canvas.offsetTop);
}
function continueDraw(evt) {
    const mouseX = evt.pageX - canvas.offsetLeft;
    const mouseY = evt.pageY - canvas.offsetTop;
    if (!isDrawing) {
        return;
    }
    ctx.lineTo(evt.pageX - canvas.offsetLeft, evt.pageY - canvas.offsetTop);
    ctx.stroke();
}
function endDraw( /*evt: Touch*/) {
    if (!isDrawing) {
        return;
    }
    //continueDraw(evt);
    isDrawing = false;
}
// function beginTouch(evt: TouchEvent) {
//     beginDraw(evt.touches[0]);
// }
// function touchMove(evt: TouchEvent) {
//     continueDraw(evt.touches[0]);
//     evt.preventDefault();
// }
// function touchEnd(/*evt: TouchEvent*/) {
//     endDraw(/*evt.changedTouches[0]*/);
// }
// canvas.addEventListener('touchstart', beginTouch, false);
// canvas.addEventListener('touchmove', touchMove, false);
// canvas.addEventListener('touchend', touchEnd, false);
canvas.addEventListener('mousedown', beginDraw, false);
canvas.addEventListener('mousemove', continueDraw, false);
canvas.addEventListener('mouseup', endDraw, false);
const clearBtn = document.getElementById('clear-btn');
clearBtn.onclick = function () {
    ctx.fillStyle = 'rgb(175, 203, 204)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
