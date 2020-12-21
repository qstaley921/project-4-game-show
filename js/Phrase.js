/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor(phrase, noun, adjective, verb) {
        this.phrase = phrase; // holds a string
        this.noun = noun;
        this.adjective = adjective;
        this.verb = verb;
    }

    /**
     * Displays phrase on game board
     */
    addPhraseToDisplay() {
        const phraseArray = [...this.phrase]; // converts phrase to character array. 
        const wordCount = getWordCount();
        function getWordCount() {
            let count = 1;
            for(const char of phraseArray) {
                if (/\s/.test(char)) {
                    count += 1;
                }
            }
            return count;
        }

        // This loopty-loop puts each word into its own ul so words aren't broken in the middle depending on browser width. 
        for (let i = 0; i < wordCount; i++) { // for number of words
            const ul = document.createElement('ul'); 
            ul.className = `word`;
            phraseHTML.appendChild(ul); // adds a UL to the HTML div
            for (let i = 0; i < phraseArray.length;) { // until phraseArray has been shifted to 0
                const li = document.createElement('li');
                if (/\s/.test(phraseArray[i])) { // if a space
                    phraseArray.shift();
                    break;
                } else { // assumed letter if not a space; Originally I had it the other way around; it really make a difference. 
                    li.className = `hide letter`;
                    li.innerText = phraseArray[i];
                    ul.appendChild(li); // adds a LI to current UL 
                    phraseArray.shift();
                }
            } 
        }
    }

    /**
     * checks if passed letter is in the phrase 
     * @param {string} letter - the letter the player has clicked 
     * @returns {array of nodes} matches -  an array of the filtered, correct letters
     * passes matches to this.showMatchedLetter()
     */
    checkLetter( letter ) {
        const matches = [];
        for(const node of letterNodes) {
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
    showMatchedLetter( matches ) {
        for(let match of matches) {
            match.classList.add('show');
            match.classList.remove('hide');
        }
    }

 }