//(3/25/22) the space bouncer has to get the user's name (or be told the user is anonymous)
const spaceBouncer = document.getElementById('spacebouncer');
const inpForm = document.getElementById('name-form');
const inpFormVal = document.getElementById('textbox');
const anonButton = document.getElementById('anon-button');
inpForm.onsubmit = submitPlayerName;
anonButton.onclick = goAnon;
function submitPlayerName(e) {
    e.preventDefault();
    createGameHTML();
    const name = inpFormVal.value;
    //gc.receiveIDFromUser(name);
}
function goAnon(e) {
    e.preventDefault();
    createGameHTML();
    //gc.receiveIDFromUser('anon');
}
//(3/15/22) this function now also controls the release/patch version. remember to sync it with github releases!
function createGameHTML() {
    //commonFunction('commmmmmmmmmmmmmmon');
    spaceBouncer.remove();
    const canvas = document.createElement('canvas');
    canvas.id = 'sf-canvas';
    canvas.width = 1366;
    canvas.height = 768;
    document.body.append(canvas);
}
export {};
