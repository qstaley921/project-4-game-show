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
        let adjective = '';
        let noun = '';
        let declaration = '';
        let verb = '';
        const words = {  // excuse the absurdities; I got carried away. This is an object of arrays. 
            adjective: ['rich', 'ugly', 'divorced', 'skilled','widowed', 'frisky', 'pregnant', 'infected', 'smart', 'scared', 'pretty', 'nice', 'evil', 'virgin', 'married', 'baptised', 'acquitted', 'drunk', 'christian'],
            noun: ['dogs', 'cats', 'husbands', 'women', 'athletes','housewives', 'zoomers', 'cosmonauts','immigrants','hipsters', 'lawyers', 'priests', 'artists', 'fish', 'zombies', 'veterans', 'inmates', 'hippies'],
            declaration: ['never', 'always', 'rarely', 'long to','often', 'cannot', 'refuse to', 'are willing to', 'love to', 'eagerly'],
            verb: ['cry', 'smile', 'snuggle','surrender', 'offend', 'lose', 'win','say thank you','settle','beg', 'spoon','die', 'nark', 'drive','eat', 'lie', 'sleep', 'fart', 'sweat', 'puke', 'help', 'talk', 'divorce', 'kill', 'have sex', 'remarry', 'pray', 'protest']
        } 
        /**
         * generates a random index based on @param.length
         * @param {array} wordList - an object of arrays 
         */
        const randomIndex = (wordList) => Math.floor( Math.random() * wordList.length );
        let randomPhrase = '';

        for (let prop in words) {
            const list = words[`${prop}`];
            const index = randomIndex(list);
            if (prop === 'adjective') adjective = words[`${prop}`][index];
            if (prop === 'noun') noun = words[`${prop}`][index];
            if (prop === 'declaration') declaration = words[`${prop}`][index];
            if (prop === 'verb') verb = words[`${prop}`][index];
        }
        randomPhrase = `${adjective} ${noun} ${declaration} ${verb}`; 
        return new Phrase(randomPhrase, noun, adjective); 
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
        keyboardHTML.style.display = ''; // re-shows keyboard
        btnDiv.style.display = 'none'; // re-hides play button
        bodyNode.className = ''; // resets body color
        phraseHTML.innerHTML = ''; // clears previous phrase list items
        endMessage.style.display = '';
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

        if (matches.length > 0) { // if a match was made
            target.classList.add('chosen'); 
            this.Phrase.showMatches(matches); 
            if (this.checkForWin()) {
                this.gameOver(true);
            }
        }  
        
        if ( matches.length === 0 && target.classList[1] !== 'wrong') { 
            target.classList.add('wrong');
            this.removeLife();
        }
    }

    /**
     * Checks if a letter is hidden. If a letter is still hidden, the player hasn't won
     * @returns {boolean} win - if the game is won
     */
    checkForWin() {
        for (const letter of letterNodes) { // for all the letters
            for (const className of letter.classList) { // for all class names in each letter
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
     * Reveals the letters that weren't guessed on GameOver
     */
    revealPhrase() {
        for (const node of letterNodes) { // for all the letter nodes
            for (const className of node.classList) { // for all class names in each letter
                if (className === 'hide') {
                    node.classList.add('show');
                    node.classList.add('reveal');
                    node.classList.remove('hide');
                }
            }
        }
    }

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        keyboardHTML.style.display = 'none';
        btnDiv.style.display = 'block';
        endMessage.innerText = '';
        
        if (gameWon) {
            bodyNode.classList.add('body-win');
            endMessage.innerText = `Congrats! ${this.Phrase.adjective[0].toUpperCase()}${this.Phrase.adjective.substring(1, this.Phrase.adjective.length)} ${this.Phrase.noun} always win.`; 
            endMessage.style.display = 'inline-block';
        }   else {
            bodyNode.classList.add('body-lose');
            this.revealPhrase();
            endMessage.innerText = `So close! ${this.Phrase.adjective[0].toUpperCase()}${this.Phrase.adjective.substring(1, this.Phrase.adjective.length)} ${this.Phrase.noun} are a tough guess.`; 
            endMessage.style.display = 'inline-block';
            return;
        }
    };

 }

