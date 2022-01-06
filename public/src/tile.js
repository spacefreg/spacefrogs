class Tile {
    init(xIndex, yIndex, planet, allegiance, rootPosition) {
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.planet = planet;
        this.allegiance = allegiance;
        this.biome; //biome is declared but not initialized until setBiome is called shortly after init()
        this.rootPosition = rootPosition;
        this.point = new Point(rootPosition.x + (xIndex * 32), rootPosition.y + (yIndex * 32));
        //console.log('creating a Tile at index ' + this.xIndex + ',' + this.yIndex + ' on planet ' + this.planet);
    }

    setAllegiance(newAllegiance) {
        this.allegiance = newAllegiance;
    }

    setBiome(newBiome) {
        //manual planet-checking if statements works for now, but refactor to create a planet class so
        //planet-agnostic functions can be delegated (11/24/21)

        //Object.keys(-Object Name-)[-index of key-]
        //this function allows setBiome to receive a number (as an index) and set a tile's biome using that index without 
        //needing to know what the biome is at that index. e.g. setBiome(1) sets a tile on Earth to be OCEAN, setBiome(1)
        //on Mars sets a tile to be HIGHLANDS

        if (this.planet == planet.EARTH) {
            this.biome = Object.keys(tileBiomesEarth)[newBiome];
        }

        if (this.planet == planet.MARS) {
            this.biome = Object.keys(tileBiomesMars)[newBiome];
        }
    }

    getBiome() {
        return this.biome;
    }
    getBiomeIndex() {
        switch (this.planet) {
            case 'mars':
                return Object.keys(tileBiomesMars).indexOf(this.biome);
            case 'earth':
                return Object.keys(tileBiomesEarth).indexOf(this.biome);
        }
    }
}

class Point  {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const tileBiomesEarth = {
    TEMPERATE: 'temperate',
    OCEAN: 'ocean',
    DESERT: 'desert'
}

const tileBiomesMars = {
    LOWLANDS: 'lowlands',
    HIGHLANDS: 'highlands',
    MOUNTAINS: 'mountains'
}

const planet = {
    EARTH: 'earth',
    MARS: 'mars',
    UNCLAIMED: 'unclaimed'
    //todo(9/11/21): add moons and possibly asteroids later (much later...)
}