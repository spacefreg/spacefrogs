import vec2 from '../math/vec2.js';
import sfuiElement from './sfuielement.js';

export default class LobbyCountrySelection extends sfuiElement {

    private prompt: sfuiElement;

    constructor(origin: vec2, title: string) {
        super(origin, title);
        this.setSize(new vec2(295, 200));
        this.setBackgroundOpacity(0.5);

        this.prompt = new sfuiElement(new vec2(this.origin.x + this.size.x / 2, this.origin.y), '');
        this.prompt.setAsTooltip();
        this.prompt.setFontSize(18);
        this.prompt.setBackgroundOpacity(0);
        this.prompt.setText('Select your society of space frogs');
        this.prompt.setTitleOrigin(new vec2(this.origin.x + 10, this.origin.y - 10));
        
    }

    public render(): void {
        super.render();
        this.prompt.render();
    }
}