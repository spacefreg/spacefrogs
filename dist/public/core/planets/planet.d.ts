import sfuiElement from '../ui/sfuielement.js';
export default class Planet {
    name: string;
    parent: string;
    theta: number;
    distanceFromParent: number;
    planetElement: sfuiElement;
    protected initialized: boolean;
    constructor(name: string, parent: string, theta: number, distanceFromParent: number);
    update(dt: number): void;
    render(): void;
    private initLocation;
}
