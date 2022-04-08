import Planet from './planet.js';
export default class Mars extends Planet {
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number);
    update(dt: number): void;
    render(): void;
}
