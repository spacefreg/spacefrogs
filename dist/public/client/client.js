import DrawCanvas from '../client/drawcanvas.js';
console.log('henlo from client.ts');
const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');
let isDrawing = false;
const drawCanvas = new DrawCanvas();
drawCanvas.init();
ctx.lineWidth = 5;
let mytext = document.getElementById('char');
document.addEventListener('click', function (e) {
    if (e.target instanceof Element && e.target.nodeName !== 'INPUT') {
        e.preventDefault();
    }
});
document.body.classList.add('stop-scrolling');
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
const clearBtn = document.getElementById('clear-btn');
clearBtn.onclick = function () {
    ctx.fillStyle = 'rgb(175, 203, 204)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
