const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');

document.documentElement.requestFullscreen();

canvas.setAttribute('width', '400');
canvas.setAttribute('height', '800');

ctx.beginPath();
ctx.rect(0, 0, 100, 100);
ctx.fillStyle = 'red';
ctx.fill();

console.log('hello frfom client.js');


document.addEventListener('click', function(e) {
    console.log('click');
    if (e.target.nodeName !== 'INPUT') {
        e.preventDefault();
    }
});

document.body.classList.add('stop-scrolling');


