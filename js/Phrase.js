/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase(); // holds a string
    }

    /**
     * Displays phrase on game board
     */
    addPhraseToDisplay() {
        for(const i in this.phrase) { // for letters in phrase string
            const li = document.createElement('li');
            if (this.phrase[i] === ' ') { // if a space character
                li.className = `hide space`;
            } else {   // if a letter
                li.className = `hide letter ${this.phrase[i]}`;
            }
            li.innerText = this.phrase[i]; 
            ulElement.appendChild(li);
        }
    }

    /**
     * checks if passed letter is in the phrase 
     * @param {string} letter - the letter the player has clicked 
     * @returns {array of nodes} matches -  an array of the filtered, correct letters
     * passes matches to this.showMatches()
     */
    checkLetter( letter ) {
        const nodeList = document.getElementsByClassName('letter'); // selects all the phrase's letters
        const matches = [];
        for(let node of nodeList) {
            if(node.innerText === letter) {
                matches.push(node);
            }
        }
        return matches;
    }

    /**
     * displays passed letter on screen when/if a match is found
     * @param {array} matches  - 'unhides' matches from this.checkletter() 
     */
    showMatches( matches ) {
        for(let match of matches) {
            match.classList.add('show');
            match.classList.remove('hide');
        }
    }

 }