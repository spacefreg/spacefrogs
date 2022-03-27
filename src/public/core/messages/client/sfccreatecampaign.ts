import sfMessage from '../sfmessage.js';

export default class sfcCreateCampaign extends sfMessage {
    public campaignName: string;
    
    constructor(id: string, name: string) {
        super(id, Date.now());
        this.campaignName = name;
    }
 }
