import vec2 from '../math/vec2.js';
import sfuiElement from './sfuielement.js';

import Sun from '../planets/sun.js';
import Earth from '../planets/earth.js';
import Moon from '../planets/moon.js';
import Mars from '../planets/mars.js';
import Venus from '../planets/venus.js';
import Mercury from '../planets/mercury.js';
import sfDate, { dateToString } from '../math/sfdate.js';

export default class GameWindow extends sfuiElement {

    public inGame: boolean = false;

    private sun: Sun;
    private earth: Earth;
    private moon: Moon;
    private mars: Mars;
    private venus: Venus;
    private mercury: Mercury;

    private currentPlanetHover: string = '';
    private planetHoverElement: sfuiElement;
    private currentMousePos: vec2;

    private dateElement: sfuiElement;


    constructor(origin: vec2, size: vec2) {
        super(origin, 'Game Window');
        this.setSize(size);
        this.setOutline(true);
        this.backgroundColor = '';

        let systemOrigin: vec2 = new vec2(this.origin.x + this.size.x / 2, this.origin.y + this.size.y / 2);
        this.sun = new Sun(systemOrigin);
        this.earth = new Earth('Earth', 'Sun', 0, 260);
        this.moon = new Moon('Moon', 'Earth', 0, 30);
        this.mars = new Mars('Mars', 'Sun', 0, 355);
        this.venus = new Venus('Venus', 'Sun', 0, 180);
        this.mercury = new Mercury('Mercury', 'Sun', 0, 120);

        this.currentMousePos = new vec2(0, 0);
        this.planetHoverElement = new sfuiElement(new vec2(0, 0), 'Planet Hover');
        this.planetHoverElement.setAsTooltip();
        this.planetHoverElement.setBackgroundOpacity(1);
        this.planetHoverElement.setOutline(true);

        this.dateElement = new sfuiElement(new vec2(this.origin.x, this.origin.y), 'January 1st, 2030');
        this.dateElement.setBackgroundOpacity(.66);
        this.dateElement.setAsTooltip();
        this.dateElement.setFontSize(16);
        this.dateElement.setTitleOrigin(new vec2(this.origin.x + 4, this.origin.y + 19));
        this.dateElement.setSize(new vec2(138, 25));
    }

    public update(dt: number): void {
        this.sun.update(dt);
        let systemOrigin: vec2 = new vec2(this.origin.x + this.size.x / 2, this.origin.y + this.size.y / 2);

        this.earth.receiveParentCenter(systemOrigin);
        this.earth.update(dt);

        let earthCenter: vec2 = new vec2(this.earth.planetElement.getOrigin().x, this.earth.planetElement.getOrigin().y);
        earthCenter.x += this.earth.planetElement.getImageSize().x / 2;
        earthCenter.y += this.earth.planetElement.getImageSize().y / 2;
        this.moon.receiveParentCenter(earthCenter);
        this.moon.update(dt);

        this.mars.receiveParentCenter(systemOrigin);
        this.mars.update(dt);
        
        this.venus.receiveParentCenter(systemOrigin);
        this.venus.update(dt);

        this.mercury.receiveParentCenter(systemOrigin);
        this.mercury.update(dt);

    }

    public getCenter(): vec2 {
        const center: vec2 = new vec2(this.origin.x + this.size.x / 2, this.origin.y + this.size.y / 2);
        return center;
    }

    public mouseMove(mousePos: vec2): void {
        super.mouseMove(mousePos);
        if (this.isMouseHovering) {
            this.currentMousePos = mousePos;

            //(4/19/22) I hate this entire thing 
            let hoverCandidate: string = '';
            this.currentPlanetHover = '';

            hoverCandidate = this.sun.mouseMove(mousePos);

            if (hoverCandidate == '') {
                hoverCandidate = this.earth.mouseMove(mousePos);
            }

            if (hoverCandidate == '') {
                hoverCandidate = this.moon.mouseMove(mousePos);
            }

            if (hoverCandidate == '') {
                hoverCandidate = this.mars.mouseMove(mousePos);
            }

            if (hoverCandidate == '') {
                hoverCandidate = this.venus.mouseMove(mousePos);
            }

            if (hoverCandidate == '') {
                hoverCandidate = this.mercury.mouseMove(mousePos);
            }

            this.currentPlanetHover = hoverCandidate;

            
            if (this.currentPlanetHover != '') {
                this.planetHoverElement.setOrigin(this.currentMousePos);
                this.planetHoverElement.setText(this.currentPlanetHover);
            }
        }
    }

    public mouseDown(): string {
        return this.currentPlanetHover;
    }

    public setInGame(): void {
        this.inGame = true;
    }

    public goTomorrow(date: sfDate): void {
        this.dateElement.setText(dateToString(date));
        this.dateElement.setOrigin(new vec2(300, 40));
    }

    public render(): void {
        super.render();

        this.ctx.strokeStyle = '#5f4c73';

        this.sun.render();
        this.earth.render();
        this.moon.render();
        this.mars.render();
        this.venus.render();   
        this.mercury.render();

        if (this.currentPlanetHover != '') {
            this.planetHoverElement.render();
        }

        this.dateElement.render();
    }
}