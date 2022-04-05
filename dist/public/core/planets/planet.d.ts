import sfuiElement from '../ui/sfuielement.js';
export default class Planet {
    name: string;
    parent: string;
    theta: number;
    distanceFromParent: number;
    planetElement: sfuiElement;
    constructor(name: string, parent: string, theta: number, distanceFromParent: number);
    render(): void;
}
