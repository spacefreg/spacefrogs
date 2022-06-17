import vec2 from '../utils/vec2.js';
import Planet from './planet.js';

export default class Venus extends Planet {
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number, orbitalPeriod: number) {
        super(name, parentName, theta, distanceFromParent, orbitalPeriod);

        this.planetElement.setImage('../../res/images/planets/venus.png');
        let venusPos: vec2 = new vec2(this.parentCenter.x + this.distanceFromParent, this.parentCenter.y);
        venusPos.x -= this.planetElement.getImageSize().x / 2;
        venusPos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(venusPos);

        //this.initTileMap(17, 12);
        this.tileDimensions.x = 17;
        this.tileDimensions.y = 12;
    }

    public update(dt: number) {
        super.update(dt);

    }

    public render() {
        super.render();
    }

}
