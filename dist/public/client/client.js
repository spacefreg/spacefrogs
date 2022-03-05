import Application from '../client/application/application.js';
console.log('henlo from client.ts');
const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');
const application = new Application();
application.loop();
