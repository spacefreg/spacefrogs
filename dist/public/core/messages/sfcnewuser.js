//(3/25/22) todo: make a base message class from which sfcNewUser (and all messages) extend
export default class sfcNewUser {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
