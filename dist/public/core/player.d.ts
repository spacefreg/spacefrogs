export default class Player {
    id: string;
    name: string;
    playerNumber: number;
    isHost: boolean;
    constructor(id: string, name: string, playerNumber: number);
    setHost(): void;
}
export declare function getPlayerByID(id: string, players: Array<Player>): Player;
