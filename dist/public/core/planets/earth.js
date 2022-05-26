import vec2 from '../utils/vec2.js';
import Planet from './planet.js';
export default class Earth extends Planet {
    constructor(name, parentName, theta, distanceFromParent, orbitalPeriod) {
        super(name, parentName, theta, distanceFromParent, orbitalPeriod);
        this.planetElement.setImage('../../res/images/planets/urf.png');
        let earthPos = new vec2(this.planetElement.getOrigin().x + this.parentCenter.x, this.planetElement.getOrigin().y + this.parentCenter.y);
        //earthPos.x -= this.planetElement.getImageSize().x / 2;
        //earthPos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(earthPos);
        this.initTileMap(18, 13);
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
    }
}
