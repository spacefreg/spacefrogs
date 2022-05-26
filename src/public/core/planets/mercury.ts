import vec2 from '../utils/vec2.js';
import Planet from './planet.js';

export default class Mercury extends Planet {
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number, orbitalPeriod: number) {
        super(name, parentName, theta, distanceFromParent, orbitalPeriod);

        this.planetElement.setImage('../../res/images/planets/mercury.png');
        let moonPos: vec2 = new vec2(this.parentCenter.x + this.distanceFromParent, this.parentCenter.y);
        moonPos.x -= this.planetElement.getImageSize().x / 2;
        moonPos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(moonPos);

        this.initTileMap(8, 5);
    }
    public update(dt: number) {
        super.update(dt);

    }

    public render() {
        super.render();
    }

}
