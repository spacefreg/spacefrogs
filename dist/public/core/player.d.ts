export default class Player {
    id: string;
    name: string;
    isHost: boolean;
    constructor(id: string, name: string);
    setHost(): void;
}
export declare function getPlayerByID(id: string, players: Array<Player>): Player;
