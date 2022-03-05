import Application from '../client/application/application.js';

console.log('henlo from client.ts');

const canvas = <HTMLCanvasElement>document.getElementById('canv');
const ctx = canvas.getContext('2d')!;

const application: Application = new Application();


application.loop();