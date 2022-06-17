export default class GameTileInfo {
    constructor() {
        this.mercuryTiles = new Array();
        this.venusTiles = new Array();
        this.earthTiles = new Array();
        this.moonTiles = new Array();
        this.marsTiles = new Array();
    }
    populate(merc, venus, earth, moon, mars) {
        this.mercuryTiles = merc;
        this.venusTiles = venus;
        this.earthTiles = earth;
        this.moonTiles = moon;
        this.marsTiles = mars;
    }
}
