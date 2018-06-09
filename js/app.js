/*
 * CREATE AND SET CARDS
 */

let icons = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o","fa fa-paper-plane-o",
"fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt",
"fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf",
"fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb",];

let deck = document.querySelector(".deck");

let cards = document.getElementsByClassName("card");

function setCards() {
    for(let i = 0; i < icons.length; i++ ) {
        let liCard = document.createElement("li");
        liCard.classList.add("card");
        liCard.innerHTML = " <i class='" + icons[i] + "'></i>";
        
        deck.appendChild(liCard);
        cards[i].addEventListener("click", function(){
            this.classList.add('open', 'show');
        });
    }
}

setCards();













// let flippedCards = [];

// let matched = [];


// function flipCard(){
//     if(flippedCards.length < 2){

//         if(this.classList.length > 1){
//             return;
//         }
        
//         this.classList.add('open','show');

//         flippedCards.push(this);

//         match();
//     }
// }

// function match(){
//     if (flippedCards.length === 2){
//         if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
//             flippedCards[0].classList.toggle('match');
//             flippedCards[1].classList.toggle('match');

//             matched.push(flippedCards[0],flippedCards[1]);
//             flippedCards = [];
//         }
//         else{
//             missed();
//         }
//         movesCounter()
//     }
//     gameOver();
// }


// function missed(){
//     setTimeout(function(){
//         flippedCards[0].classList.toggle('open');
//         flippedCards[0].classList.toggle('show');
//         flippedCards[1].classList.toggle('open');
//         flippedCards[1].classList.toggle('show');
        
//         flippedCards = [];
//     },1000);
// }

// let counter = 0;
// const moves = document.querySelector(".moves");
// moves.innerHTML = 0;
// function movesCounter(){
//     counter++;
//     moves.innerHTML = counter;
// }

// function gameOver() {
//     if(matched.length === icons.length) {
//         setTimeout(function(){
//             alert('GAME OVER!!');
//         },800);
//     }
// }

// //RESTART FUNCTION
// const restart = document.querySelector('.restart');
// restart.addEventListener('click', function() {
    
//     deck.innerHTML = "";
//     startGame();
//     matched = [];
//     counter = 0;
//     moves.innerHTML = counter;
// });


// // Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }