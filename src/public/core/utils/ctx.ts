export const canvas = <HTMLCanvasElement>document.getElementById('sf-canvas');
canvas.style.visibility = 'hidden';
export const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');