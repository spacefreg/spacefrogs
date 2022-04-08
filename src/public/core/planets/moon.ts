import vec2 from '../math/vec2.js';
import Planet from './planet.js';

export default class Moon extends Planet {
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number) {
        super(name, parentName, theta, distanceFromParent);

        this.planetElement.setImage('../../res/images/planets/moon.png');
    }
    public update(dt: number) {
        super.update(dt);
        let moonPos: vec2 = new vec2(this.parentCenter.x + this.distanceFromParent, this.parentCenter.y);
        moonPos.x -= this.planetElement.getImageSize().x / 2;
        moonPos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(moonPos);
    }

    public render() {
        super.render();
    }

}
