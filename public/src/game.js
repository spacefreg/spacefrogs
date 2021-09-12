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
        this.earthMap = new Tilemap(this.canv);
        this.marsMap = new Tilemap(this.canv);
        this.earthMap.init('Earth', 18, 13);
        this.marsMap.init('Mars', 6, 2);

    }

    gameLoop() {
        //this.gameLoop would normally work for the rAF callback but the .bind(this) hack(?) is required because of the ES6 class
        window.requestAnimationFrame(this.gameLoop.bind(this));

        this.dt = window.performance.now() - this.lastTimeStamp;
        this.lastTimeStamp = window.performance.now();

        this.earthMap.draw();
        //this.marsMap.draw();
    }
}
