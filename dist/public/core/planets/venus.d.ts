import Planet from './planet.js';
export default class Venus extends Planet {
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number);
    update(dt: number): void;
    render(): void;
}
