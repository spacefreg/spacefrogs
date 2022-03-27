export default class Player {
    public id: string;
    public name: string;
    
    constructor(id: string, name: string) {
        console.log(`creating player: ${name}, ${id}`);
        this.id = id;
        this.name = name;
    }
}