import Planet from './planet.js';
export default class Earth extends Planet {
    constructor(name, parent, theta, distanceFromParent) {
        super(name, parent, theta, distanceFromParent);
        this.planetElement.setImage('../../res/images/planets/urf.png');
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
    }
}
