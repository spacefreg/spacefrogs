import Planet from './planet.js';
export default class Mercury extends Planet {
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number, orbitalPeriod: number);
    update(dt: number): void;
    render(): void;
}
