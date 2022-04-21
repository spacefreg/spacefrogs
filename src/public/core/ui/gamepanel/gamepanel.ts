import vec2 from '../../math/vec2.js';
import LobbyCountrySelection from '../lobbycountryselection.js';
import sfuiPanel from '../sfuipanel.js';

export default class GamePanel extends sfuiPanel {

    private lobbyPrompt: LobbyCountrySelection;

    constructor(origin: vec2, title: string) {
        super(origin, title);
        this.setSize(new vec2(315, 748));
        this.setOutline(true);
        this.setBackgroundOpacity(0.13);

        this.lobbyPrompt = new LobbyCountrySelection(new vec2(this.origin.x + 10, this.origin.y + 275), 'Select Country');
    }

    public update(dt: number): void {
        super.update(dt);
    }
    
    public render(): void {
        super.render();
        this.lobbyPrompt.render();
    }

    public mouseMove(mousePos: vec2) {
        super.mouseMove(mousePos);
        this.lobbyPrompt.mouseMove(mousePos);
    }

    public mouseDown(mousePos: vec2): string {
            return this.lobbyPrompt.mouseDown(mousePos);
    }

    public gameWindowSelection(selection: string): void {

        switch (selection) {
            case 'Earth':
                console.log('gamePanel: selected urf');
                break;
        
        }   
     }
}