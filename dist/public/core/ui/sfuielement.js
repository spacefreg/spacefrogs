import vec2 from '../utils/vec2.js';
export default class sfuiElement {
    constructor(origin, title) {
        this.isButton = false;
        this.hasToggle = false;
        this.isTooltip = false;
        this.active = false;
        this.titleShowing = false;
        this.titleFontSize = 12;
        this.initialized = false;
        this.outlineSize = new vec2(0, 0);
        this.outlineOrigin = new vec2(0, 0);
        this.hasImage = false;
        this.hasOutline = false;
        this.isMouseHovering = false;
        this.isHidden = false;
        this.canvas = document.getElementById('sf-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.origin = origin;
        this.title = title;
        this.titleOrigin = new vec2(0, 0);
        this.imageHTML = new Image();
        this.size = new vec2(0, 0);
        this.imageSize = new vec2(0, 0);
        this.backgroundColor = '#271E4C';
        this.opacity = 0;
    }
    //(3/27/22) for passive elements like animations
    update(dt) {
        this.imageSize.x = this.imageHTML.width;
        this.imageSize.y = this.imageHTML.height;
    }
    //(4/19/22) please clean this up someday soon
    render() {
        const oldAlpha = this.ctx.globalAlpha;
        const oldFillStyle = this.ctx.fillStyle;
        if (!this.isHidden) {
            if (this.hasImage) {
                this.ctx.drawImage(this.imageHTML, this.origin.x, this.origin.y);
                if (this.isMouseHovering && this.isButton) {
                    this.ctx.globalAlpha = 0.33;
                    this.ctx.fillStyle = 'purple';
                    this.ctx.fillRect(this.origin.x, this.origin.y, this.size.x, this.size.y);
                }
            }
            if (this.backgroundColor) {
                this.ctx.globalAlpha = this.opacity;
                if (this.isMouseHovering && this.isButton) {
                    this.ctx.fillStyle = 'purple';
                }
                else {
                    this.ctx.fillStyle = this.backgroundColor;
                }
                this.ctx.fillRect(this.origin.x, this.origin.y, this.size.x, this.size.y);
                this.ctx.globalAlpha = oldAlpha;
                this.ctx.fillStyle = oldFillStyle;
            }
            if (this.hasOutline) {
                if (this.outlineSize.x > 0) {
                    this.ctx.strokeRect(this.outlineOrigin.x, this.outlineOrigin.y, this.outlineSize.x, this.outlineSize.y);
                }
                else {
                    this.ctx.strokeRect(this.origin.x, this.origin.y, this.size.x, this.size.y);
                }
            }
            const oldFont = this.ctx.font;
            this.ctx.font = `${this.titleFontSize}px Arial`;
            if (this.titleShowing) {
                if (this.isButton) {
                    this.ctx.fillText(this.title, this.titleOrigin.x, this.titleOrigin.y);
                }
                else {
                    this.ctx.fillText(this.title, this.origin.x, this.origin.y);
                }
            }
            else if (this.isTooltip) {
                //console.log(`tooltip draw: ${this.title}`);
                this.ctx.fillText(this.title, this.titleOrigin.x, this.titleOrigin.y);
            }
            this.ctx.font = oldFont;
        }
    }
    getOrigin() {
        return this.origin;
    }
    setOrigin(origin) {
        this.origin = origin;
    }
    setTitleOrigin(origin) {
        this.titleOrigin = origin;
    }
    getText() {
        return this.title;
    }
    setText(text) {
        this.title = text;
        if (this.isTooltip) {
            this.size.x = this.getTextWidth();
            this.size.y = this.titleFontSize;
            this.origin.x = this.origin.x - this.size.x / 2;
            this.origin.y -= 12;
            this.titleOrigin.x = this.origin.x;
            this.titleOrigin.y = this.origin.y + 10;
        }
    }
    setFontSize(size) {
        this.titleFontSize = size;
    }
    setOutlineSize(size) {
        this.outlineSize = size;
    }
    setOutlineOrigin(origin) {
        this.outlineOrigin = origin;
    }
    getTextWidth() {
        return this.ctx.measureText(this.title).width;
    }
    setSize(size) {
        this.size = size;
    }
    getSize() {
        return this.size;
    }
    getImageSize() {
        return this.imageSize;
    }
    setBackgroundColor(color) {
        this.backgroundColor = color;
    }
    setBackgroundOpacity(opacity) {
        this.opacity = opacity;
    }
    setImage(src) {
        this.hasImage = true;
        this.imageHTML.src = src;
        this.imageHTML.onload = () => {
            this.onImageLoad();
        };
    }
    setOutline(bool) {
        this.hasOutline = bool;
    }
    onImageLoad() {
        this.initialized = true;
        this.size.x = this.imageHTML.width;
        this.size.y = this.imageHTML.height;
    }
    isInitialized() {
        return this.initialized;
    }
    isActive() {
        return this.active;
    }
    enableTitle() {
        this.titleShowing = true;
    }
    setAsTooltip() {
        this.isTooltip = true;
    }
    setAsButton() {
        this.isButton = true;
        this.titleShowing = true;
    }
    setAsToggle() {
        this.hasToggle = true;
    }
    mouseMove(mousePos) {
        if (mousePos.x >= this.origin.x && mousePos.x <= this.origin.x + this.getSize().x &&
            mousePos.y >= this.origin.y && mousePos.y <= this.origin.y + this.getSize().y) {
            this.isMouseHovering = true;
        }
        else {
            this.isMouseHovering = false;
        }
    }
    mouseDown(mousePos) {
        if (!this.isHidden) {
            if (this.isMouseHovering && this.hasToggle) {
                this.toggleActive();
            }
            else if (this.isMouseHovering) {
                this.active = true;
            }
            else {
                if (!this.hasToggle) {
                    this.active = false;
                }
            }
        }
    }
    isHovering() {
        return this.isMouseHovering;
    }
    setHovering(bool) {
        this.isMouseHovering = bool;
    }
    hide() {
        this.isHidden = true;
        this.active = false;
    }
    show() {
        this.isHidden = false;
    }
    toggleActive() {
        this.active = !this.active;
    }
}
