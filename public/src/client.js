const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');

document.documentElement.requestFullscreen();

//canvas.setAttribute('width', '400');
//canvas.setAttribute('height', '800');

const canvWidth = canvas.width;
const canvHeight = canvas.height;

ctx.beginPath();
ctx.rect(0, 0, canvWidth, canvHeight);
ctx.fillStyle = `rgb(175, 203, 204)`;
ctx.fill();

console.log('hello from client.js');


document.addEventListener('click', function(e) {
    console.log('click');
    if (e.target.nodeName !== 'INPUT') {
        e.preventDefault();
    }
});

document.body.classList.add('stop-scrolling');


