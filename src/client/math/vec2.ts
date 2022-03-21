export default class Vec2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    setVec(vec: Vec2): void {
        this.x = vec.x;
        this.y = vec.y;
    }

    setXY(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    setX(x: number): void {
        this.x = x;
    }
    
    setY(y: number): void {
        this.y = y;
    }

    offsetVec(offsetVec: Vec2): void {
        this.x += offsetVec.x;
        this.y += offsetVec.y;
    }

    offsetX(offset: number): void {
        this.x += offset;
    }

    offsetY(offset: number): void {
        this.y += offset;
    }
}