import vec2 from '../math/vec2.js';
import Planet from './planet.js';
export default class Venus extends Planet {
    constructor(name, parentName, theta, distanceFromParent, orbitalPeriod) {
        super(name, parentName, theta, distanceFromParent, orbitalPeriod);
        this.planetElement.setImage('../../res/images/planets/venus.png');
        let venusPos = new vec2(this.parentCenter.x + this.distanceFromParent, this.parentCenter.y);
        venusPos.x -= this.planetElement.getImageSize().x / 2;
        venusPos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(venusPos);
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
    }
}
