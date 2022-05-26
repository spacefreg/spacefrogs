import Planet from '../../planets/planet.js';
import vec2 from '../../utils/vec2.js';
import sfuiPanel from '../sfuipanel.js';
export default class GamePanel extends sfuiPanel {
    private grid;
    constructor(origin: vec2);
    targetPlanet(planet: Planet | null): void;
    render(): void;
}
