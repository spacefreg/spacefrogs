//(3/25/22) todo: make a base message class from which sfcNewUser (and all messages) extend
export default class sfcNewUser {
    public id: string;
    public name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}