import vec2 from '../utils/vec2.js';
import Planet from './planet.js';
export default class Mars extends Planet {
    constructor(name, parentName, theta, distanceFromParent, orbitalPeriod) {
        super(name, parentName, theta, distanceFromParent, orbitalPeriod);
        this.planetElement.setImage('../../res/images/planets/mars.png');
        let marsPos = new vec2(this.parentCenter.x + this.distanceFromParent, this.parentCenter.y);
        marsPos.x -= this.planetElement.getImageSize().x / 2;
        marsPos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(marsPos);
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
    }
}
