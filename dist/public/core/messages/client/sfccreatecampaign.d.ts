import sfMessage from '../sfmessage.js';
export default class sfcCreateCampaign extends sfMessage {
    campaignName: string;
    constructor(id: string, name: string);
}
