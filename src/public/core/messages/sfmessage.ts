export default class sfMessage {
    public id: string;
    public name: string;
    public timeSent: number;

    constructor(id: string, name: string, timeSent: number) {
        this.id = id;
        this.name = name;
        this.timeSent = timeSent;
    }
}