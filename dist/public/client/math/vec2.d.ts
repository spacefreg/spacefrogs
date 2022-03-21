export default class Vec2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    setVec(vec: Vec2): void;
    setXY(x: number, y: number): void;
    setX(x: number): void;
    setY(y: number): void;
    offsetVec(offsetVec: Vec2): void;
    offsetX(offset: number): void;
    offsetY(offset: number): void;
}
