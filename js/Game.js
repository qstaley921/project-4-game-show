/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
    constructor() {
        this.missed = 0;
        this.Phrase = null; // holds a phrase object
    }

    /**
     * Generates a random phrase based on random parts of speech 
     * @returns {obj} phrase - with a string param 
     */
    createPhrase( ) {
        const phrases = [];
        const words = {  // excuse the absurdities; I got carried away. This is an object of arrays. 
            adjectives: ['rich', 'ugly', 'divorced', 'skilled','widowed', 'frisky', 'pregnant', 'infected', 'smart', 'scared', 'pretty', 'nice', 'evil', 'virgin', 'married', 'baptised', 'acquitted', 'drunk', 'christian'],
            nouns: ['dogs', 'cats', 'husbands', 'women', 'athletes','housewives', 'zoomers', 'cosmonauts','immigrants','hipsters', 'lawyers', 'priests', 'artists', 'fish', 'zombies', 'veterans', 'inmates', 'hippies'],
            declarations: ['never', 'always', 'rarely', 'long to','often', 'cannot', 'refuse to', 'are willing to', 'love to', 'eagerly'],
            verbs: ['cry', 'smile', 'snuggle','surrender', 'offend', 'lose', 'win','say thank you','settle','beg', 'spoon','die', 'nark', 'drive','eat', 'lie', 'sleep', 'fart', 'sweat', 'puke', 'help', 'talk', 'divorce', 'kill', 'have sex', 'remarry', 'pray', 'protest']
        } 
        /**
         * generates a random index based on @param.length
         * @param {array} wordList - an object of arrays 
         */
        const randomIndex = (wordList) => Math.floor( Math.random() * wordList.length );
        let randomPhrase = '';

        for (let prop in words) {
            const wordList = words[`${prop}`]; // this is just the words.prop array
            randomPhrase += `${wordList[randomIndex(wordList)]} `; // adds a random word to the random phrase
        }

        return new Phrase(randomPhrase); 
    }

    /**
     * Begins game by
     *  0. resets prior game
     *  1. Sets the Games phrase array with 5 random phrases
     *  2. Gets random Phrase from game's phrase array
     *  3. Prints Phrase to Display 
     *  4. Hides Start Menu Overlay 
     */
    startGame() {
        // resets prior game. Step 0. 
        ulElement.innerHTML = ''; // clears previous phrase list items
        for (let key of keysHTML) { // resets 'qwerty key' classes
            key.className = 'key';
        }
        for (let heart of heartNodes) { // resets heart images
            heart.src = 'images/liveHeart.png';
        }
        game.missed = 0; // resets the game's misses

        // begins the game ... steps 1-4. 
        this.Phrase = this.createPhrase();
        this.Phrase.addPhraseToDisplay(); 
        overlayHTML.style.display = 'none';
        overlayHTML.className = 'start';
        console.log(`The current phrase is: ${this.Phrase.phrase}`)
    }


    /**
     * 1. checks the target.innerText with each Phrase.phrase[letter]. returns matches.
     * 2. based on matches, adds either 'chosen' class or 'wrong' class
     *     a. removesLife() if 'wrong' class is not already present.
     * 3. checks for win and ends game if 'checkForWin()' returns true.
     * @param {object node} target - the HTML node that was targeted from the 'click' event.
     */
    handleInteraction( target ) {
        const letter = target.innerText; // a 1 character string
        const matches = this.Phrase.checkLetter(letter); // returns an array of nodes whose `letter.innerText` is the same as `target.innerText`

        if(matches.length > 0) { // if a match was made
            target.classList.add('chosen'); 
            this.Phrase.showMatches(matches); 
        } else if ( matches.length === 0 && target.classList[1] !== 'wrong') { 
            target.classList.add('wrong');
            this.removeLife();
        }

        if (this.checkForWin()) {
            this.gameOver(true);
        }
     
    }

    /**
     * Checks if a letter is hidden. If a letter is still hidden, the player hasn't won
     * @returns {boolean} win - if the game is won
     */
    checkForWin() {
        const letterNodes = document.querySelectorAll('.letter');
        for (let letter of letterNodes) { // for all the letters
            for (let className of letter.classList) { // for all class names in each letter
                if (className === 'hide') {
                    return false;
                }
            }
        }

        return true;
    }

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        heartNodes[this.missed].src = 'images/lostHeart.png';
        this.missed += 1;
        if (this.missed === heartNodes.length) {
            this.gameOver(false);
        }
    }

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        overlayHTML.style.display = '';
        if (gameWon) {
            overlayHTML.classList.add('win');
            messageHTML.innerText = `Congrats! You correctly guessed the phrase: "${this.Phrase.phrase}"`;
        }   else {
            overlayHTML.classList.add('lose');
            messageHTML.innerText = `Sorry, you lose. You did not guess the phrase: "${this.Phrase.phrase}"`;
        }
    };

 }

