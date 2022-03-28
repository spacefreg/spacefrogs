export default class vec2 {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    offsetVec(offsetVec: vec2): void {
        this.x += offsetVec.x;
        this.y += offsetVec.y;
    }

    offsetX(offset: number): void {
        this.x += offset;
    }

    offsetY(offset: number): void {
        this.y += offset;
    }

    offsetXY(x: number, y: number): void {
        this.x += x;
        this.y += y;
    }
}