import sfMessage from '../sfmessage.js';
export default class sfcCreateCampaign extends sfMessage {
    constructor(id, name) {
        super(id, Date.now());
        this.campaignName = name;
    }
}
