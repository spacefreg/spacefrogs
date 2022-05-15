import vec2 from '../utils/vec2.js';
import sfuiElement from './sfuielement.js';

export default class LobbyCountrySelection extends sfuiElement {

    private promptElement: sfuiElement;

    private countryElements: Array<sfuiElement>; 


    constructor(origin: vec2, title: string) {
        super(origin, title);
        this.setSize(new vec2(295, 200));
        this.setBackgroundOpacity(0.45);

        this.promptElement = new sfuiElement(new vec2(this.origin.x + this.size.x / 2, this.origin.y), '');
        this.promptElement.setAsTooltip();
        this.promptElement.setFontSize(18);
        this.promptElement.setBackgroundOpacity(0);
        this.promptElement.setText("Select the origin of your frogs");
        this.promptElement.setTitleOrigin(new vec2(this.origin.x + 32, this.origin.y - 10));
        
        this.countryElements = new Array<sfuiElement>();
        this.addCountry(new vec2(this.origin.x + 25, this.origin.y + 40), 'US');
        this.addCountry(new vec2(this.origin.x + 110, this.origin.y + 40), 'China');
        this.addCountry(new vec2(this.origin.x + 195, this.origin.y + 40), 'Russia');
        this.addCountry(new vec2(this.origin.x + 70, this.origin.y + 130), 'India');
        this.addCountry(new vec2(this.origin.x + 160, this.origin.y + 130), 'Japan');
    }

    public render(): void {
        super.render();
        this.promptElement.render();
        
        for (let i = 0; i < this.countryElements.length; i++) {
            this.countryElements[i].render();
        }
    }


    private addCountry(origin: vec2, country: string): void {
        this.countryElements.push(new sfuiElement(origin, country));
        const newestElement = this.countryElements[this.countryElements.length - 1];

        newestElement.setAsButton();
        newestElement.enableTitle();
        newestElement.setFontSize(16);
        newestElement.setText(country);
        let textOffset: vec2 = new vec2(0, -6);
        switch (country) {
            case 'US':
                newestElement.setImage('../../../res/images/flags/us_large.png');
                textOffset.x = 22;
                //newestElement.setTitleOrigin(new vec2(newestElement.getOrigin().x + 28, newestElement.getOrigin().y));
                break;
            case 'China':
                newestElement.setImage('../../../res/images/flags/cn_large.png');
                textOffset.x = 11;
                break;
            case 'Russia':
                newestElement.setImage('../../../res/images/flags/ru_large.png');
                textOffset.x = 7
                break;
            case 'India':
                newestElement.setImage('../../../res/images/flags/in_large.png');
                textOffset.x = 15;
                break;
            case 'Japan':
                newestElement.setImage('../../../res/images/flags/jp_large.png');
                textOffset.x = 10;
                break;
        }

        const titlePos: vec2 = new vec2(newestElement.getOrigin().x + textOffset.x, newestElement.getOrigin().y + textOffset.y);
        newestElement.setTitleOrigin(titlePos);
    }

    public mouseMove(mousePos: vec2): void {
        super.mouseMove(mousePos);
        for (let i = 0; i< this.countryElements.length; i++) {
            this.countryElements[i].mouseMove(mousePos);
        }
    }

    public mouseDown(mousePos: vec2): string {
        super.mouseDown(mousePos);
        for (let i = 0; i < this.countryElements.length; i++) {
            this.countryElements[i].mouseDown(mousePos);
            if (this.countryElements[i].isActive()) {
                return this.countryElements[i].getText();
            }
            else 
            {
                //console.log(`${this.countryElements[i].getText()}: ${this.countryElements[i].isHovering()} ishovering`);
            }
        }
        return '';
    }

}