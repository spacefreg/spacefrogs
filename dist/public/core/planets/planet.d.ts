import vec2 from '../utils/vec2.js';
import sfuiElement from '../ui/sfuielement.js';
export default class Planet {
    name: string;
    parentName: string;
    parentCenter: vec2;
    theta: number;
    distanceFromParent: number;
    orbitalPeriod: number;
    planetElement: sfuiElement;
    protected initialized: boolean;
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number, orbitalPeriod: number);
    update(dt: number): void;
    render(): void;
    receiveParentCenter(center: vec2): void;
    private initLocation;
    mouseMove(mousePos: vec2): string;
    orbitTick(): void;
}
