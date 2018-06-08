/*
 * Create a list that holds all of your cards
 */
let cardsArray = ['fa-diamond','fa-paper-plane-o','fa-anchor',
'fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb',
'fa-diamond','fa-paper-plane-o','fa-anchor',
'fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];

let deck = document.querySelector(".deck");

let cardClass = document.getElementsByClassName("card");

let flippedCards = [];

let matched = [];

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
    shuffle(cardsArray);

    for(let i = 0 ; i < cardsArray.length ; i++){
        
        let liElement = document.createElement('li');
        let iElement = document.createElement('i');

        liElement.classList.add('card');
        iElement.classList.add('fa');
        iElement.classList.add(cardsArray[i]);

        liElement.appendChild(iElement);
        deck.appendChild(liElement);

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

let counter = 0;
const moves = document.querySelector(".moves");
moves.innerHTML = 0;
function movesCounter(){
    counter++;
    moves.innerHTML = counter;
}

function gameOver() {
    if(matched.length === cardsArray.length) {
        setTimeout(function(){
            alert('GAME OVER!!');
        },800);
    }
}

//RESTART FUNCTION
const restart = document.querySelector('.restart');
restart.addEventListener('click', function() {
    
    deck.innerHTML = "";
    startGame();
    matched = [];
    counter = 0;
    moves.innerHTML = counter;
});