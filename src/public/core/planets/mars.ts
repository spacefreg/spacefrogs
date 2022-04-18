import vec2 from '../math/vec2.js';
import Planet from './planet.js';

export default class Mars extends Planet {
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number) {
        super(name, parentName, theta, distanceFromParent);

        this.planetElement.setImage('../../res/images/planets/mars.png');
    }
    public update(dt: number) {
        super.update(dt);
        let marsPos: vec2 = new vec2(this.parentCenter.x + this.distanceFromParent, this.parentCenter.y);
        marsPos.x -= this.planetElement.getImageSize().x / 2;
        marsPos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(marsPos);
    }

    public render() {
        super.render();
        
    }

}