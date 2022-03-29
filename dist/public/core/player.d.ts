export default class Player {
    id: string;
    name: string;
    isHost: boolean;
    playerNumber: number;
    constructor(id: string, name: string);
    setHost(): void;
    getPlayerNumber(): number;
    setPlayerNumber(num: number): void;
}
export declare function getPlayerByID(id: string, players: Array<Player>): Player;
