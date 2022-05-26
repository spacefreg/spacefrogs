import vec2 from '../utils/vec2.js';
import sfuiElement from './sfuielement.js';
import Sun from '../planets/sun.js';
import Earth from '../planets/earth.js';
import Moon from '../planets/moon.js';
import Mars from '../planets/mars.js';
import Venus from '../planets/venus.js';
import Mercury from '../planets/mercury.js';
import { dateToString } from '../utils/sfdate.js';
import sfText from './sftext.js';
import Planet from '../planets/planet.js';
export default class GameWindow extends sfuiElement {
    constructor(origin, size) {
        super(origin, 'Game Window');
        this.inGame = false;
        this.gameHovering = false;
        this.setSize(size);
        this.setOutline(true);
        this.backgroundColor = '';
        let systemOrigin = new vec2(this.origin.x + this.size.x / 2, this.origin.y + this.size.y / 2);
        this.sun = new Sun(systemOrigin);
        this.earth = new Earth('Earth', 'Sun', 0, 260, 365);
        this.moon = new Moon('Moon', 'Earth', 0, 30, 27);
        this.mars = new Mars('Mars', 'Sun', 0, 355, 687);
        this.venus = new Venus('Venus', 'Sun', 0, 180, 225);
        this.mercury = new Mercury('Mercury', 'Sun', 0, 120, 88);
        this.currentMousePos = new vec2(0, 0);
        this.planetHoverText = new sfText('', new vec2(0, 0), 16, 'Arial');
        this.planetHoverText.toggleBackground();
        this.planetHover = new Planet('', '', 0, 0, 0);
        this.dateText = new sfText('January 1st, 2030', new vec2(this.origin.x + 4, this.origin.y + 4), 16, 'Arial');
        this.dateText.toggleBackground();
    }
    update(dt) {
        this.gameHovering = this.isMouseHovering;
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
        if (this.isMouseHovering) {
            if (this.sun.containsPoint(this.currentMousePos)) {
                this.planetHoverText.setText('Sun');
                this.planetHover = this.sun;
            }
            else if (this.mercury.containsPoint(this.currentMousePos)) {
                this.planetHoverText.setText('Mercury');
                this.planetHover = this.mercury;
            }
            else if (this.venus.containsPoint(this.currentMousePos)) {
                this.planetHoverText.setText('Venus');
                this.planetHover = this.venus;
            }
            else if (this.earth.containsPoint(this.currentMousePos)) {
                this.planetHoverText.setText('Earth');
                this.planetHover = this.earth;
            }
            else if (this.moon.containsPoint(this.currentMousePos)) {
                this.planetHoverText.setText('Moon');
                this.planetHover = this.moon;
            }
            else if (this.mars.containsPoint(this.currentMousePos)) {
                this.planetHoverText.setText('Mars');
                this.planetHover = this.mars;
            }
            else {
                this.planetHover = null;
                this.planetHoverText.setText('');
            }
            let hoverCenter = new vec2(this.currentMousePos.x - this.planetHoverText.getHalfSize().x, this.currentMousePos.y - (this.planetHoverText.getHalfSize().y * 1.8));
            this.planetHoverText.setPosition(hoverCenter);
        }
    }
    getCenter() {
        const center = new vec2(this.origin.x + this.size.x / 2, this.origin.y + this.size.y / 2);
        return center;
    }
    mouseMove(mousePos) {
        super.mouseMove(mousePos);
        if (this.isMouseHovering) {
            this.currentMousePos = mousePos;
        }
    }
    mouseDown() {
        return 'lole mouse down';
    }
    setInGame() {
        this.inGame = true;
    }
    goTomorrow(date) {
        if (this.isMouseHovering) {
            this.mouseMove(this.currentMousePos);
        }
        // this.dateElement.setText(dateToString(date));
        // this.dateElement.setOrigin(new vec2(300, 40));
        this.dateText.setText(dateToString(date));
        this.mercury.orbitTick();
        this.venus.orbitTick();
        this.moon.orbitTick();
        this.earth.orbitTick();
        this.mars.orbitTick();
    }
    updateHover() {
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
        this.planetHoverText.render();
        this.dateText.render();
    }
}
