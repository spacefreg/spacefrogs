import vec2 from '../math/vec2.js';
import Planet from './planet.js';
export default class Mercury extends Planet {
    constructor(name, parentName, theta, distanceFromParent) {
        super(name, parentName, theta, distanceFromParent);
        this.planetElement.setImage('../../res/images/planets/mercury.png');
    }
    update(dt) {
        super.update(dt);
        let moonPos = new vec2(this.parentCenter.x + this.distanceFromParent, this.parentCenter.y);
        moonPos.x -= this.planetElement.getImageSize().x / 2;
        moonPos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(moonPos);
    }
    render() {
        super.render();
    }
}
