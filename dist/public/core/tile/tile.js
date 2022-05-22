export default class Tile {
    constructor(x, y, planet) {
        this.x = x;
        this.y = y;
        this.planet = planet;
        console.log(`${this.planet} tile created at ${this.x}, ${this.y}`);
    }
}
