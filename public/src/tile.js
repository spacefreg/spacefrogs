class Tile {
    init(xIndex, yIndex, planet, allegiance, biome, rootPosition) {
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.planet = planet;
        this.allegiance = allegiance;
        this.biome = biome;
        this.rootPosition = rootPosition;
        this.point = new Point(rootPosition.x + (xIndex * 32), rootPosition.y + (yIndex * 32));
        //console.log('creating a Tile at index ' + this.xIndex + ',' + this.yIndex);
    }

    setAllegiance(newAllegiance) {
        this.allegiance = newAllegiance;
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