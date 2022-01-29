const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');

canvas.setAttribute('width', '400');
canvas.setAttribute('height', '800');

ctx.beginPath();
ctx.rect(0, 0, 100, 100);
ctx.fillStyle = 'red';
ctx.fill();

console.log('hello frfom client.js');