import Planet from '../../planets/planet.js';
import vec2 from '../../utils/vec2.js';

import sfuiPanel from '../sfuipanel.js';

import PlanetGrid from './planetgrid.js';

export default class GamePanel extends sfuiPanel {

    private grid: PlanetGrid;

    constructor(origin: vec2) {
        super(origin, 'Game');
        this.setSize(new vec2(315, 748));
        this.setOutline(true);
        this.setBackgroundOpacity(0.13);

        this.grid = new PlanetGrid();
    }

    public targetPlanet(planet: Planet | null): void {
        this.grid.setPlanet(planet);
    }

    public render(): void {
        this.grid.render();
    }
    
}