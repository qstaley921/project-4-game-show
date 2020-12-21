/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game(); 
const bodyNode = document.querySelector('body');
const startBTN = document.querySelector('#btn__start');
const btnDiv = document.querySelector('#btn-div');
const resetBTN = document.querySelector('#btn__reset');
const endMessage = document.querySelector('#game-over-message');
const keyboardHTML = document.querySelector('#qwerty');
const keysHTML = keyboardHTML.querySelectorAll('.key');
const overlayHTML = document.querySelector('#overlay');
const phraseHTML = document.querySelector('#phrase');
const heartNodes = document.querySelectorAll('.tries > img');
const letterNodes = document.getElementsByClassName('letter'); // selects all the phrase's letters
let playing = false;

startBTN.addEventListener('click', () => {
    playing = true;
    game.startGame();
});

resetBTN.addEventListener('click', () => {
    playing = true;
    game.startGame();
});


keyboardHTML.addEventListener('click', (event) => {
    if( event.target.nodeName == 'BUTTON' ) {
        game.handleInteraction(event.target);
    }
});


/**
 * listens for keyboard events and 
 * handlesInteraction() based on key pressed
 */

document.addEventListener('keydown', (event) => {
    for(const key of keysHTML) {
        if(key.innerText === event.key && playing) {
            game.handleInteraction(key);
        }
    }
});
