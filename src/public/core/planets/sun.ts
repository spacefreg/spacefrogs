import vec2 from '../math/vec2.js';
import Planet from './planet.js';

export default class Sun extends Planet {

    private initialized: boolean = false;

    constructor(systemOrigin: vec2) {
        super('Sun', 'root', 0, NaN);

        this.planetElement.setImage('../../res/images/planets/sun.png');
        this.planetElement.setOrigin(systemOrigin);
    }

    public update(dt: number) {
        if (!this.initialized) {
            //(4/5/22) this is just my current (awful) way of initiliazing the sun's position after its image has already loaded
            const solarOrigin: vec2 = new vec2(this.planetElement.getOrigin().x, this.planetElement.getOrigin().y);
            this.planetElement.setOrigin(new vec2(solarOrigin.x - 52, solarOrigin.y - 52));
            this.initialized = true;
        }

        this.planetElement.update(dt);
    }
    public render() {
        super.render();
    }
}