import Planet from '../../planets/planet.js';
export default class PlanetGrid {
    private currentPlanet;
    private tiles;
    private tileAtlas;
    constructor();
    setPlanet(planet: Planet | null): void;
    render(): void;
}
