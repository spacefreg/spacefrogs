export default class Tile {
    public x: number;
    public y: number;
    public planet: string;

    constructor(x: number, y: number, planet: string) {
        this.x = x;
        this.y = y;
        this.planet = planet;

        console.log(`${this.planet} tile created at ${this.x}, ${this.y}`);
    }
}