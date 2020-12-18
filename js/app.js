/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game(); 
const startBTN = document.querySelector('#btn__reset');

startBTN.addEventListener('click', () => {
    game.startGame();
});
