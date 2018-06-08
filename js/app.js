/*
 * Create a list that holds all of your cards
 */
let cardsArray = ['fa-diamond','fa-paper-plane-o','fa-anchor',
'fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb',
'fa-diamond','fa-paper-plane-o','fa-anchor',
'fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];

let deck = document.getElementsByClassName('deck');

let cardClass = document.getElementsByClassName('card');

let flippedCards = [];

let matched = [];

let counter = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

startGame()

function startGame(){
    matched = [];

    flippedCards = [];

    let cards = shuffle(cardsArray);

    for(let i = 0 ; i < cards.length ; i++){
        
        let liElement = document.createElement('li');
        let iElement = document.createElement('i');

        liElement.classList.add('card');
        iElement.classList.add('fa');
        iElement.classList.add(cards[i]);

        liElement.appendChild(iElement);
        deck[0].appendChild(liElement);

        cardClass[i].addEventListener('click', flipCard, false);
    }
};

function flipCard(){
    if(flippedCards.length < 2){

        if(this.classList.length > 1){
            return;
        }
        
        this.classList.add('open','show');

        flippedCards.push(this);

        match();
    }
}

function match(){
    if (flippedCards.length === 2){
        if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
            flippedCards[0].classList.toggle('match');
            flippedCards[1].classList.toggle('match');

            matched.push(flippedCards[0],flippedCards[1]);
            flippedCards = [];
        }
        else{
            missed();
        }
        movesCounter()
    }
    gameOver();
}


function missed(){
    setTimeout(function(){
        flippedCards[0].classList.toggle('open');
        flippedCards[0].classList.toggle('show');
        flippedCards[1].classList.toggle('open');
        flippedCards[1].classList.toggle('show');
        
        flippedCards = [];
    },1000);
}

function movesCounter(){
    if(flippedCards.length === 2){
        document.getElementsByClassName('moves')[0].innerHTML = ++counter;
    }
}

function gameOver() {
    if(matched.length === cardsArray.length) {
        setTimeout(function(){
            alert('GAME OVER!!');
        },800);
    }
}

/*
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
