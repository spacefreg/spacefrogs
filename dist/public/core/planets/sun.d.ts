import vec2 from '../math/vec2.js';
import Planet from './planet.js';
export default class Sun extends Planet {
    private initialized;
    constructor(systemOrigin: vec2);
    update(dt: number): void;
    render(): void;
}
