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
        //(4/5/22) bootlet sun.init() function at the beginning of update. this.initialized flag just keeps track of if we have already centered the sun or not. this cna't be done in the constuctor because the sun's image is not yet loaded
        if (!this.initialized && this.planetElement.getImageSize().x > 0) {
            if (this.planetElement.getImageSize().x > 0) {
                const oldOrigin: vec2 = new vec2(this.planetElement.getOrigin().x, this.planetElement.getOrigin().y);
                this.planetElement.setOrigin(new vec2(oldOrigin.x - (this.planetElement.getImageSize().x / 2), oldOrigin.y - (this.planetElement.getImageSize().y / 2)));
                this.initialized = true;
            }
        }

        this.planetElement.update(dt);
    }
    public render() {
        super.render();
    }
}