import vec2 from '../utils/vec2.js';
import Planet from './planet.js';
export default class Sun extends Planet {
    constructor(systemOrigin: vec2);
    update(dt: number): void;
    render(): void;
}
