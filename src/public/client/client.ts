import coreFunction from '../core/common.js';

//(3/25/22) the space bouncer has to get the user's name (or be told the user is anonymous)
const spaceBouncer: HTMLDivElement = <HTMLDivElement>document.getElementById('spacebouncer');
const inpForm: HTMLFormElement = <HTMLFormElement>document.getElementById('name-form');
const inpFormVal: HTMLInputElement = <HTMLInputElement>document.getElementById('textbox');
const anonButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('anon-button');

function submitPlayerName(e: SubmitEvent) {
    e.preventDefault();
    createGameHTML();
    const name: string = inpFormVal.value;
    //gc.receiveIDFromUser(name);
}

function goAnon(e: MouseEvent) {
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

    const footer = document.createElement('footer');
    footer.id = 'sf-footer';
    const sfVersion = document.createElement('p');
    sfVersion.id = 'sf-version';

    //******-----------ATTENTION-----------******
    //THIS WHAT YOU WANT TO EDIT EVERY RELEASE
    sfVersion.textContent = 'spacefrogs pre-alpha-v0.0.1 (latest build: March 25th, 2022)';
    //LOOK HERE
    //******-----------ATTENTION-----------******

    const patchNotes = document.createElement('a');
    patchNotes.textContent = 'patch notes';
    patchNotes.id = 'sf-notes';
    patchNotes.target = '_blank';

    //*** --- don't forget to add a release on the github repo when you edit the version lole --- ***
    patchNotes.href = 'https://github.com/martiangremlin/spacefrogs/releases';
    //*** --- this line above me right here --- ***


    const twitter = document.createElement('a');
    twitter.textContent = 'twitter';
    twitter.id = 'sf-twitter';
    twitter.target = '_blank';
    twitter.href = 'https://twitter.com/spacefreg';

    footer.appendChild(sfVersion);
    footer.appendChild(patchNotes);
    footer.appendChild(twitter);
    document.body.append(footer);
}

inpForm.onsubmit = submitPlayerName;
anonButton.onclick = goAnon;