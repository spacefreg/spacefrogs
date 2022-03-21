export default class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    setVec(vec) {
        this.x = vec.x;
        this.y = vec.y;
    }
    setXY(x, y) {
        this.x = x;
        this.y = y;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
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
}
