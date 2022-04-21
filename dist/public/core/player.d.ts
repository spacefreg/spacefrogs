export default class Player {
    id: string;
    name: string;
    isHost: boolean;
    playerNumber: number;
    country: string;
    isReady: boolean;
    constructor(id: string, name: string);
    setHost(): void;
    setPlayerNumber(num: number): void;
    setCountry(country: string): void;
}
export declare function getPlayerByID(id: string, players: Array<Player>): Player;
