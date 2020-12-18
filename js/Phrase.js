/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Displays phrase on game board
     */
    addPhraseToDisplay() {
        const ulElement = document.querySelector('#phrase > ul');
        for(let i in this.phrase) {
            let li = document.createElement('li');
            if (this.phrase[i] === ' ') {
                li.className = `hide space`;
            } else {
                li.className = `hide letter ${this.phrase[i]}`;
            }
            li.innerText = this.phrase[i]; 
            ulElement.appendChild(li);
        }
    }

 }