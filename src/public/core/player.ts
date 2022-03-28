export default class Player {
    public id: string;
    public name: string;
    public isHost: boolean = false;
    
    constructor(id: string, name: string) {
        console.log(`player constructor: name:${name}, id:${id}`);
        this.id = id;
        this.name = name;
    }

    public setHost(): void {
        this.isHost = true;
    }
}

//(3/27/22) helper functions

export function getPlayerByID(id: string, players: Array<Player>): Player {
    for (let i = 0; i < players.length; i++) {
        if (players[i].id === id) {
            return players[i];
        }
    }
    //(3/27/22) gremlin is the 'player not found' player
    return new Player('gremlin', 'gremlin');
}