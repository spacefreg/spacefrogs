export default class vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    offsetVec(offsetVec) {
        this.x += offsetVec.x;
        this.y += offsetVec.y;
    }
    offsetX(offset) {
        this.x += offset;
    }
    offsetY(offset) {
        this.y += offset;
    }
    offsetXY(x, y) {
        this.x += x;
        this.y += y;
    }
}
