import vec2 from '../utils/vec2.js';
import sfuiElement from './sfuielement.js';
import sfDate from '../utils/sfdate.js';
import Planet from '../planets/planet.js';
export default class GameWindow extends sfuiElement {
    inGame: boolean;
    private sun;
    private earth;
    private moon;
    private mars;
    private venus;
    private mercury;
    private planetHoverText;
    planetHover: Planet | null;
    private currentMousePos;
    private dateText;
    gameHovering: boolean;
    constructor(origin: vec2, size: vec2);
    update(dt: number): void;
    getCenter(): vec2;
    mouseMove(mousePos: vec2): void;
    mouseDown(): string;
    setInGame(): void;
    goTomorrow(date: sfDate): void;
    private updateHover;
    render(): void;
}
