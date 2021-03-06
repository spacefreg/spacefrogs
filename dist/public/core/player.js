export default class Player {
    constructor(id, name) {
        this.isHost = false;
        this.country = '';
        this.playerNumber = 0;
        console.log(`player constructor: name:${name}, id:${id}`);
        this.id = id;
        this.name = name;
        this.isReady = false;
    }
    setHost() {
        this.isHost = true;
    }
    //(3/27/22) only the server should probably be using this
    setPlayerNumber(num) {
        this.playerNumber = num;
    }
    setCountry(country) {
        this.country = country;
    }
}
//(3/27/22) helper functions
export function getPlayerByID(id, players) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].id === id) {
            return players[i];
        }
    }
    //(3/27/22) gremlin is the 'player not found' player
    return new Player('gremlin', 'gremlin');
}
