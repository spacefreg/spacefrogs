import sfMessage from './sfmessage.js';
export default class sfcNewUser extends sfMessage {
    name: string;
    constructor(id: string, name: string);
}
