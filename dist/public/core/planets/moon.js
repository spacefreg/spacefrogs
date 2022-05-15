import vec2 from '../utils/vec2.js';
import Planet from './planet.js';
export default class Moon extends Planet {
    constructor(name, parentName, theta, distanceFromParent, orbitalPeriod) {
        super(name, parentName, theta, distanceFromParent, orbitalPeriod);
        this.planetElement.setImage('../../res/images/planets/moon.png');
        let moonPos = new vec2(this.planetElement.getOrigin().x, this.planetElement.getOrigin().y);
        //moonPos.x -= this.planetElement.getImageSize().x / 2;
        //moonPos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(moonPos);
    }
    update(dt) {
        super.update(dt);
    }
    orbitTick() {
        super.orbitTick();
        //this.planetElement.setOrigin(new vec2(this.planetElement.getOrigin().x - this.planetElement.getImageSize().x / 2, this.planetElement.getOrigin().y - this.planetElement.getImageSize().y / 2));
    }
    render() {
        super.render();
    }
}
