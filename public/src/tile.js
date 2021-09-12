class Tile {
    init(xIndex, yIndex, planet, allegiance, biome) {
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.planet = planet;
        this.allegiance = allegiance;
        this.biome = biome;
        console.log('creating a Tile at index ' + this.xIndex + ',' + this.yIndex);
    }

    setAllegiance(newAllegiance) {
        this.allegiance = newAllegiance;
    }
}

const tileBiomesEarth = {
    TEMPERATE: 'temperate',
    DESERT: 'desert',
    OCEAN: 'ocean'
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