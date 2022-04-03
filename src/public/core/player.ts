export default class Player {
    public id: string;
    public name: string;
    public isHost: boolean = false;
    
    public playerNumber: number;

    //(4/2/22) used to advance from the lobby to the game
    public isReady: boolean;

    constructor(id: string, name: string) {
        this.playerNumber = 0;
        console.log(`player constructor: name:${name}, id:${id}`);
        this.id = id;
        this.name = name;
        this.isReady = false;
    }

    public setHost(): void {
        this.isHost = true;
    }

    public getPlayerNumber(): number {
        return this.playerNumber;
    }

    //(3/27/22) only the server should probably be using this
    public setPlayerNumber(num: number): void {
        this.playerNumber = num;
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