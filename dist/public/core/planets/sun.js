import Planet from './planet.js';
export default class Sun extends Planet {
    constructor(systemOrigin) {
        super('Sun', 'root', 0, NaN);
        this.planetElement.setImage('../../res/images/planets/sun.png');
        this.planetElement.setOrigin(systemOrigin);
    }
    update(dt) {
        //(4/5/22) bootlet sun.init() function at the beginning of update. this.initialized flag just keeps track of if we have already centered the sun or not. this can't be done in the constuctor because the sun's image is not yet loaded
        super.update(dt);
    }
    render() {
        super.render();
    }
}
