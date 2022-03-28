import sfMessage from '../sfmessage.js';

export default class sfcNewUser extends sfMessage {
    public name: string;

    constructor(id: string, name: string) {
        super(id, name, Date.now());
        this.name = name;
    }
}