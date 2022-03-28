export default class vec2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    offsetVec(offsetVec: vec2): void;
    offsetX(offset: number): void;
    offsetY(offset: number): void;
    offsetXY(x: number, y: number): void;
}
