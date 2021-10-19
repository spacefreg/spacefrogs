class Game {
    dt;
    lastTimeStamp;


    constructor(canv) {
        this.canv = canv;
    }

    init(playerName) {
        this.playerName = playerName;
        console.log('initializing game with player name: ' + this.playerName);
        this.initTiles();
        this.lastTimeStamp = window.performance.now();
        this.gameLoop();
    }

    initFromSave(playerName /*, saveFile goes here */) {
        this.playerName = playerName;
        console.log('loading save: ' + this.playerName);
        this.initTiles(); 
        //todo(9/10/21): setting up initial gamestate based off saveFile data goes here
        this.lastTimeStamp = window.performance.now();
        this.gameLoop();
    }

    initTiles() {
        console.log('initializing tiles');
        this.earthMap = new Tilemap();
        this.marsMap = new Tilemap();

        const earthRootPosition = new Point(10, 10);
        const marsRootPosition = new Point(700, 100);
        this.earthMap.init(this.canv, 'Earth', 18, 13, earthRootPosition);
        this.marsMap.init(this.canv, 'Mars', 15, 9, marsRootPosition);

    }

    gameLoop() {
        //this.gameLoop would normally work for the rAF callback but the .bind(this) hack(?) is required because of the ES6 class
        window.requestAnimationFrame(this.gameLoop.bind(this));

        this.dt = window.performance.now() - this.lastTimeStamp;
        this.lastTimeStamp = window.performance.now();

        this.earthMap.draw();
        this.marsMap.draw();
    }
}
