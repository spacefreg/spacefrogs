export default class sfMessage {
    public id: string;
    public timeSent: number;

    constructor(id: string, timeSent: number) {
        this.id = id;
        this.timeSent = timeSent;
    }
}