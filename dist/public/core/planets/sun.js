import vec2 from '../math/vec2.js';
import Planet from './planet.js';
export default class Sun extends Planet {
    constructor(systemOrigin) {
        super('Sun', 'root', 0, NaN);
        this.initialized = false;
        this.planetElement.setImage('../../res/images/planets/sun.png');
        this.planetElement.setOrigin(systemOrigin);
    }
    update(dt) {
        if (!this.initialized) {
            //(4/5/22) this is just my current (awful) way of initiliazing the sun's position after its image has already loaded
            const solarOrigin = new vec2(this.planetElement.getOrigin().x, this.planetElement.getOrigin().y);
            this.planetElement.setOrigin(new vec2(solarOrigin.x - 52, solarOrigin.y - 52));
            this.initialized = true;
        }
        this.planetElement.update(dt);
    }
    render() {
        super.render();
    }
}
