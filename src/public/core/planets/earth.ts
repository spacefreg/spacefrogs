import vec2 from '../math/vec2.js';
import Planet from './planet.js';

export default class Earth extends Planet {

    constructor(name: string, parentName: string, theta: number, distanceFromParent: number) {
        super(name, parentName, theta, distanceFromParent);

        this.planetElement.setImage('../../res/images/planets/urf.png');
    }

    public update(dt: number) {
        super.update(dt);
        let earthPos: vec2 = new vec2(this.parentCenter.x + this.distanceFromParent, this.parentCenter.y);
        earthPos.x -= this.planetElement.getImageSize().x / 2;
        earthPos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(earthPos);
    }

    public render() {
        super.render();
        
    }

}