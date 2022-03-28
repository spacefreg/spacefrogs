export default class Player {
    constructor(id, name) {
        this.isHost = false;
        console.log(`player constructor: name:${name}, id:${id}`);
        this.id = id;
        this.name = name;
    }
    setHost() {
        this.isHost = true;
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
