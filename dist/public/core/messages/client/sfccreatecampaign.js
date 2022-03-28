import sfMessage from '../sfmessage.js';
export default class sfcCreateCampaign extends sfMessage {
    constructor(id, name, campName) {
        super(id, name, Date.now());
        this.campaignName = campName;
    }
}
