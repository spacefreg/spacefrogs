import vec2 from '../math/vec2.js';
import Planet from './planet.js';

export default class Earth extends Planet {
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number, orbitalPeriod: number) {
        super(name, parentName, theta, distanceFromParent, orbitalPeriod);

        this.planetElement.setImage('../../res/images/planets/urf.png');
        let earthPos: vec2 = new vec2(this.planetElement.getOrigin().x + this.parentCenter.x, this.planetElement.getOrigin().y + this.parentCenter.y) ;
        //earthPos.x -= this.planetElement.getImageSize().x / 2;
        //earthPos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(earthPos);
    }

    public update(dt: number) {
        super.update(dt);

    }

    public render() {
        super.render();
        
    }

}