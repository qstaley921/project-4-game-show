/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game(); 
const startBTN = document.querySelector('#btn__reset');
const keyboardHTML = document.querySelector('#qwerty');
const keysHTML = keyboardHTML.querySelectorAll('.key');
const overlayHTML = document.querySelector('#overlay');
const messageHTML = overlayHTML.querySelector('h1');
const ulElement = document.querySelector('#phrase > ul');
const heartNodes = document.querySelectorAll('.tries > img');

startBTN.addEventListener('click', () => {
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
        if(key.innerText === event.key) {
            game.handleInteraction(key);
        }
    }
})