import vec2 from '../math/vec2.js';
import sfuiElement from './sfuielement.js';
import Sun from '../planets/sun.js';
import Earth from '../planets/earth.js';
import Moon from '../planets/moon.js';
import Mars from '../planets/mars.js';
import Venus from '../planets/venus.js';
import Mercury from '../planets/mercury.js';
import { dateToString } from '../math/sfdate.js';
export default class GameWindow extends sfuiElement {
    constructor(origin, size) {
        super(origin, 'Game Window');
        this.inGame = false;
        this.currentPlanetHover = '';
        this.setSize(size);
        this.setOutline(true);
        this.backgroundColor = '';
        let systemOrigin = new vec2(this.origin.x + this.size.x / 2, this.origin.y + this.size.y / 2);
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
    update(dt) {
        this.sun.update(dt);
        let systemOrigin = new vec2(this.origin.x + this.size.x / 2, this.origin.y + this.size.y / 2);
        this.earth.receiveParentCenter(systemOrigin);
        this.earth.update(dt);
        let earthCenter = new vec2(this.earth.planetElement.getOrigin().x, this.earth.planetElement.getOrigin().y);
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
    getCenter() {
        const center = new vec2(this.origin.x + this.size.x / 2, this.origin.y + this.size.y / 2);
        return center;
    }
    mouseMove(mousePos) {
        super.mouseMove(mousePos);
        if (this.isMouseHovering) {
            this.currentMousePos = mousePos;
            //(4/19/22) I hate this entire thing 
            let hoverCandidate = '';
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
    mouseDown() {
        return this.currentPlanetHover;
    }
    setInGame() {
        this.inGame = true;
    }
    goTomorrow(date) {
        this.dateElement.setText(dateToString(date));
        this.dateElement.setOrigin(new vec2(300, 40));
    }
    render() {
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
