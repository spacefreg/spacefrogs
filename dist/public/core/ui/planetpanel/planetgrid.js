import Planet from '../../planets/planet.js';
export default class PlanetGrid {
    constructor() {
        this.currentPlanet = new Planet('', '', 0, 0, 0);
    }
    setPlanet(planet) {
        this.currentPlanet = planet;
        if (this.currentPlanet) {
            console.log(`planet grid set to planet ${this.currentPlanet.name}`);
        }
        else {
            console.log('planet grid set to null');
        }
    }
}
