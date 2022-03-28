import sfMessage from '../sfmessage.js';
export default class sfcNewUser extends sfMessage {
    constructor(id, name) {
        super(id, name, Date.now());
        this.name = name;
    }
}
