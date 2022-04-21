import vec2 from '../math/vec2.js';
import sfuiElement from './sfuielement.js';
export default class LobbyCountrySelection extends sfuiElement {
    private promptElement;
    private countryElements;
    constructor(origin: vec2, title: string);
    render(): void;
    private addCountry;
    mouseMove(mousePos: vec2): void;
    mouseDown(mousePos: vec2): string;
}
