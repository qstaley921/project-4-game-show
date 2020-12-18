/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [];
        this.activePhrase = null;
    }

    /**
     * @returns {integer} - a random number based on array.length
     * @param {array} wordList - the words.prop of random words
     */
    randomIndex(wordList) {
        return Math.floor( Math.random() * wordList.length );
    }

    /**
     * Generates random phrases based on random parts of speech 
     * @param {integer} quantity - the desired amount of phrases 
     * @returns {array} phrases - an array of a quantified number of phrases
     */
    createPhrases( quantity ) {
        const phrases = [];
        const words = {  // excuse the absurdities; I got carried away 
            adjectives: ['rich', 'ugly', 'divorced', 'skilled','widowed', 'frisky', 'pregnant', 'infected', 'smart', 'scared', 'pretty', 'nice', 'evil', 'virgin', 'married', 'baptised', 'acquitted', 'drunk', 'christian'],
            nouns: ['dogs', 'women', 'athletes','housewives', 'zoomers', 'cosmonauts','immigrants','hipsters', 'lawyers', 'priests', 'artists', 'fish', 'zombies', 'veterans', 'inmates', 'hippies'],
            declarations: ['never', 'always', 'rarely', 'long to','often', 'cannot', 'refuse to', 'are willing to', 'love to', 'eagerly'],
            verbs: ['cry', 'smile', 'snuggle','surrender', 'offend', 'lose', 'win','say thank you','settle','beg', 'spoon','die', 'nark', 'drive','eat', 'lie', 'sleep', 'fart', 'sweat', 'puke', 'help', 'talk', 'divorce', 'kill', 'have sex', 'remarry', 'pray', 'protest']
        } 

        for (let i = 0; i < quantity; i++) {
            let randomPhrase = '';
            for (let prop in words) {
                const wordList = words[`${prop}`]; // this is just the words.prop array
                randomPhrase += `${wordList[this.randomIndex(wordList)]} `; // adds a random word to the random phrase
            }

            phrases.push(randomPhrase);
        }
        return phrases; 
    }

    /**
     * Selects random phrase from phrases property
     * @returns {object} Phrase object chose to be used
     */
    getRandomPhrase() {
        const randomIndex = this.randomIndex( this.phrases ); 
        return new Phrase( this.phrases[`${randomIndex}`] );
    }

    /**
     * Begins game by
     *  1. Sets the Games phrase array with 5 random phrases
     *  2. Gets random Phrase from game's phrase array
     *  3. Prints Phrase to Display 
     *  4. Hides Start Menu Overlay 
     */
    startGame() {
        const overlayHTML = document.querySelector('#overlay');

        this.phrases = this.createPhrases(5);
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay(); 
        overlayHTML.style.display = 'none';
        console.log(`The current phrase is: ${this.activePhrase.phrase}`)
    }

 }

