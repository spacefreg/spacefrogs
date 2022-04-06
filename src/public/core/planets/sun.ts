import vec2 from '../math/vec2.js';
import Planet from './planet.js';

export default class Sun extends Planet {



    constructor(systemOrigin: vec2) {
        super('Sun', 'root', 0, NaN);

        this.planetElement.setImage('../../res/images/planets/sun.png');
        this.planetElement.setOrigin(systemOrigin);
    }

    
    public update(dt: number) {
        super.update(dt);
    }

    public render() {
        super.render();
    }

}