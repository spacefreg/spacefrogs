import vec2 from '../math/vec2.js';
import Planet from './planet.js';

export default class Venus extends Planet {
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number) {
        super(name, parentName, theta, distanceFromParent);

        this.planetElement.setImage('../../res/images/planets/venus.png');
    }
    public update(dt: number) {
        super.update(dt);
        let venusPos: vec2 = new vec2(this.parentCenter.x + this.distanceFromParent, this.parentCenter.y);
        venusPos.x -= this.planetElement.getImageSize().x / 2;
        venusPos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(venusPos );
    }

    public render() {
        super.render();
    }

}
