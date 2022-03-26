import sfMessage from '../sfmessage.js';

//(3/25/22) todo: make a base message class from which sfcNewUser (and all messages) extend
export default class sfcNewUser extends sfMessage {
    public name: string;

    constructor(id: string, name: string) {
        super(id, Date.now());
        this.name = name;
    }
}