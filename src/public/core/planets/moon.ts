import vec2 from '../utils/vec2.js';
import Planet from './planet.js';

export default class Moon extends Planet {
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number, orbitalPeriod: number) {
        super(name, parentName, theta, distanceFromParent, orbitalPeriod);

        this.planetElement.setImage('../../res/images/planets/moon.png');
        let moonPos: vec2 = new vec2(this.planetElement.getOrigin().x, this.planetElement.getOrigin().y);
        //moonPos.x -= this.planetElement.getImageSize().x / 2;
        //moonPos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(moonPos);

        this.initTileMap(6, 3);
    }

    public update(dt: number) {
        super.update(dt);


    }

    public orbitTick(): void {
        super.orbitTick();
        //this.planetElement.setOrigin(new vec2(this.planetElement.getOrigin().x + this.planetElement.getImageSize().x / 2, this.planetElement.getOrigin().y - this.planetElement.getImageSize().y / 2));
    }

    public render() {
        super.render();
    }

}
