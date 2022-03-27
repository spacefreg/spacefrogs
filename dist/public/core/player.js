export default class Player {
    constructor(id, name) {
        console.log(`creating player: ${name}, ${id}`);
        this.id = id;
        this.name = name;
    }
}
