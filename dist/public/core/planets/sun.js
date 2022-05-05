import Planet from './planet.js';
export default class Sun extends Planet {
    constructor(systemOrigin) {
        super('Sun', 'root', 0, NaN, NaN);
        this.planetElement.setImage('../../res/images/planets/sun.png');
        this.planetElement.setOrigin(systemOrigin);
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
    }
}
