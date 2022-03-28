import sfMessage from '../sfmessage.js';

export default class sfcCreateCampaign extends sfMessage {
    public campaignName: string;
    
    constructor(id: string, name: string, campName: string) {
        super(id, name, Date.now());
        this.campaignName = campName;
    }
 }
