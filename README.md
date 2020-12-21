# project-4-game-show
 *A Team Treehouse Object-Oriented Game Show App*

 Editor's note:
 > This README is written as a programatic step-through — sorta. 

 Possible point of failure: 
 > As you'll see below, because my `createPhrase()` method generates a random phrase from a list of random words, it felt redundant to include a `Game.phrases` property since there are not a 'set' amount of phrases, but a combination factor of, well, a lot. At that, the `game.Phrase` is what Treehouse has named `Game.activePhrase` – `@return {object}`. Hopefully, that's not an issue for grading. However, if it is, I'm happy to add the `Game.phrases` property for cumpulsory's sake. :stuck_out_tongue_closed_eyes: Fail me if you must. 

# Components
1. app.js
    - stores all the `document.querySelectors()` in various variables :wink:
    - creates the `new Game()` object
2. Game.js 
     - a `new Game() class` with two `constructors()`: 
        - `this.missed` {**integer**} - stores the total number of missed guesses during the game
        - `this.Phrase` {**Object**} - stores a Phrase object 
    -  7 Methods *// yikes – could I have gotten away with less ...* :flushed:
        1. `createPhrase()` - creates a random phrase based on random parts of speech; that phrase is stored in a `new Phrase()` object. 
        2. `startGame()` - resets styles and values from last game; initiates `createPhrase()` method and begins the game again
        3. `handleInteraction(target)` - calls various `Phrase.Methods()` based on a `target @param` 
        4. `checkForWin()` - checks if any letters remain to be guessed
        5. `removeLife()` - removes a heart and adds a `this.missed` += 1. 
        6. `revealPhrase()` -  reveals any remaining letters after all lives are lost, thus revealing the phrase at gameEnd. 
        7. `gameOver(gameWon)` - styles the page based `gameWon` parameter. If true, the page is styled victoriously :smile:. If false, the page is styled unfortunately :rage: 
3. Phrase.js
    - stores a `this.phrase` string
    - 3 Methods *// that sounds better until you look at the complexity LoL :weary:* 
        1. `addPhraseToDisplay()` - creates a `<ul>` for each of the `this.phrase` words, and creates a `<li>` for each of the `this.phrase` letters. 
         - *that seems simple enough, except in order to do that, I put the `this.phrase` string into its own `phraseArray`, then looped over the array based on the number of `/\s/` in the array (assuming a space equals a word), then within the loop, looped over the remaining characters, `.shifting()` the characters out of the `phraseArray` into individual `<li>${phraseArray[i]}<li>` items until the `phraseArray` was emptied. And I did all this so letters within words didn't break from the line on smaller viewports, but the entire word would carry over. There's no way this is the best solution because it feels mightily convoluted. Oh well*
        2. `checkLetter(letter)` - checks the `target.innerText` against the `node.innerText` of a the aforementioned `<li>` nodes. For every `node.innerText` that === `target.innerText` that `node` is pushed to a `matches` array. The `matches` array is then returned `const matches` within the `Game.handleInteraction()` — more on that below. 
        3. `showMatches(matches)` - styles and 'reveals' the `<li>` node if it is included in the aforementioned `matches` node list. 

 ## Step 0
 0. *Because even step zero has a zeroeth step* `const game = new Game()` - create a game. 
 1. Declare — *seemingly too many* — `DOM.querySelectors` *// what are these properly called? I've just called them DOM Nodes/Elements. You get what I mean even if I don't mean what I say, or say what I mean, or ...*
 2. add `EventListeners()`
    - a click event added to the initial startBtn
    - another click event added to the in-game `resetBTN`
    - a keydown event so users can `key` their guesses

## Step 1 - Start Game
1. `startGame()` 
    - first this resets the game as previously mentioned. Then it calls `Game.createPhrase()`
2. `Game.createPhrase()` generates a random phrase based on random words, then passes those 'generations' into a `new Phrase(phrase, noun, adj)` where `@param {phrase}` is the phrase string used for the guessing game, `@param {noun}` is a string and the second word of the phrase (used for the endGame message), and `@param {adj}` is the same thing, except an adjective, not a noun — duh. 
3. `startGame()` continues and `addsPhraseToDisplay()`. 
4. That's it. Now we listen for user inputs. 

## Step 2 - Listen, I have something to say, it's just not really worth listening ... wait. Are we listening or not? No. We're just adding `click` events. 
1.  `handleInteraction(target)` is called from one of the three `EventListeners()`
2. `handle...()` gets the `const matches` which is an array of the `<li>` nodes which match the `handle...()'s target`.
    - `const matches = Phrase.checkLetter(target.innerText)` - the `Phrase.checkLetter` method runs, and if there are any matches, they're all returned as a `nodeArray`
3. `handle...()` checks for a win. If true, handle calls `Game.gameOver(true)` and that's it. 
4. If `handle...()` receives a match that is `wrong`, then `Game.removeLife()` is called. And if `removeLife()` is called `x` amount of times, that's it. `RemoveLife()` calls `GameOver()` and that's the game. You lose. 

## Step 3 - Beautify. 
1. I wanted a personalized message at the Game's end, so `endMessage.innerText = 'So close! ${this.Phrase.adjective[0].toUpperCase()}${this.Phrase.adjective.substring(1, this.Phrase.adjective.length)} ${this.Phrase.noun} are a tough guess.';` <- that happened. This is where the `Phrase.Nouns` are called. I wanted a dynamic message. C'mon, Man!  I can't have it just be `You lose!` How boring. 
2. `gameOver()` calls the `revealPhrase()` method. This method reveals the letters which were not guessed, and styles them differently than if they were. I mean, these randomly generated phrases are just too good not to celebrate with a grand reveal. `windowed hipsters rarely remarry`. C'mon, Man! I had to add a reveal. 
