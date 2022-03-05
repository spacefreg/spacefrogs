export default class Application {
    private worldCanvas;
    private dt;
    private timeOfLastUpdate;
    constructor();
    loop(): void;
    handleInput(): void;
    update(dt: number): void;
    render(): void;
}
