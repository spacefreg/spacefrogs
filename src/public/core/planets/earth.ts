import Planet from './planet.js';

export default class Earth extends Planet {

    constructor(name: string, parent: string, theta: number, distanceFromParent: number) {
        super(name, parent, theta, distanceFromParent);

        this.planetElement.setImage('../../res/images/planets/urf.png');
    }

    public update(dt: number) {
        super.update(dt);
    }

    public render() {
        super.render();
    }
}