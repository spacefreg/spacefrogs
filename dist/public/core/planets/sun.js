import Planet from './planet.js';
export default class Sun extends Planet {
    constructor(systemOrigin) {
        super('Sun', 'root', 0, NaN, NaN);
        this.planetElement.setOrigin(systemOrigin);
        this.planetElement.setImage('../../res/images/planets/sun.png');
        this.tileDimensions.x = 1;
        this.tileDimensions.y = 0;
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
    }
}
