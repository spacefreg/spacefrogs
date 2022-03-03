import DrawCanvas from "./drawcanvas.js";
export default class Tile {
    xPosition: number;
    yPosition: number;
    size: number;
    constructor(x: number, y: number, size: number);
    render(dc: DrawCanvas): void;
}
