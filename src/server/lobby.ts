import Player, { getPlayerByID } from '../public/core/player.js'

export default class Lobby {
    public isActive: boolean = false;
    public campaignName: string;
    public lobbyPlayers: Array<Player>
    public lobbyHostID: string;

    public readyToStartCampaign: boolean = false;

    constructor() {
        this.campaignName = '';
        this.lobbyHostID = '';
        this.lobbyPlayers = new Array();

    }

    public activate(hostID: string, hostName: string, campaignName: string): void {
        console.log(`lobby: activating. hostID: ${hostID}, hostName: ${hostName}, campaignName: ${campaignName}`);
        this.isActive = true;
        this.lobbyHostID = hostID;
        this.campaignName = campaignName;
        this.lobbyPlayers.push(new Player(hostID, hostName));
        this.lobbyPlayers[0].setHost();
        this.lobbyPlayers[0].setPlayerNumber(1);
    }

    public addPlayerToLobby(id: string, name: string): Player {
        console.log(`lobby: adding player to lobby. id: ${id}, name: ${name}`);
        this.lobbyPlayers.push(new Player(id, name));

        const newIndex: number = this.lobbyPlayers.length - 1;
        this.lobbyPlayers[newIndex].setPlayerNumber(this.lobbyPlayers.length);

        return this.lobbyPlayers[newIndex];
    }

    public dropPlayerFromLobby(id: string): void {
        console.log(`lobby: dropping player from lobby. id: ${id}`);
        for (let i = 0; i < this.lobbyPlayers.length; i++) {
            if (this.lobbyPlayers[i].id === id) {
                this.lobbyPlayers.splice(i, 1);
                break;
            }
        }
    }


    public deactivate(): void {
        console.log('lobby: deactivating');
        this.isActive = false;
        this.lobbyHostID = '';
        this.lobbyPlayers.length = 0;
    }
}