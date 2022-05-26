import vec2 from '../../utils/vec2.js';
import sfuiPanel from '../sfuipanel.js';
import PlanetGrid from './planetgrid.js';
export default class GamePanel extends sfuiPanel {
    constructor(origin) {
        super(origin, 'Game');
        this.setSize(new vec2(315, 748));
        this.setOutline(true);
        this.setBackgroundOpacity(0.13);
        this.grid = new PlanetGrid();
    }
    targetPlanet(planet) {
        this.grid.setPlanet(planet);
    }
    render() {
        this.grid.render();
    }
}
