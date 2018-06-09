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
        cards[i].addEventListener("click", selectCards);
    }
}

/*
 *  SELECT CARD 
 */

 let selected = [];
 function selectCards() {
    if(selected.length < 2){
        if(this.classList.length > 1){
            return;
        } 
        this.classList.add("open" ,"show");      
        selected.push(this);
        
        // CHECK IF IT IS A MATCH
        match();
    }
 } 

/*
 *  MISSED TRY 
 */
 
function missed() {
    setTimeout(function missed(){
        selected[0].classList.remove("open" ,"show");
        selected[1].classList.remove("open" ,"show");

        selected = [];
    },500);    
}

/*
 *  MATCH FUNCTION 
 */

let matched = [];
function match() {
    if(selected.length === 2){
        if(selected[0].innerHTML === selected[1].innerHTML) {
            selected[0].classList.toggle("match");
            selected[1].classList.toggle("match");
            
            matched.push(selected[0], selected[1]);

            selected = [];
        } else {
            //IF IT'S NOT A MATCH FACE CARDS DOWN
            missed();
        }
        //  ADD A MOVE TO THE COUNTER
        movesCounter();
        //  IF ALL CARDS ARE MATCHED THAN GAME OVER
        gameOver() 
    }
}


/*
 *  COUNT MOVES 
 */

let move = 0;
let counter = document.querySelector(".moves");
counter.innerHTML = 0;
function movesCounter() { 
    move++;
    counter.innerHTML = move;
    
    // START RATING 
    rating();
}


/*
 *  GAME OVER
 */

function gameOver() {
    setTimeout(function(){
        if(matched.length === icons.length) {
            alert("CONGRATULATIONS!!");
        }
    },700);
}

/*
 *  RESTART GAME 
 */

 function refresh() {
    deck.innerHTML = "";
    init();
    move = 0;
    counter.innerHTML = 0;
}


function restart(){
    const reset = document.querySelector(".restart");
    reset.addEventListener("click",refresh );
}

/*
 *  RATING FUNCTION 
 */

let stars = document.querySelectorAll(".fa-star");
function rating() {
    if(move > 12){
        stars[0].classList.remove("fa-star");
        if (move > 18) {
            stars[1].classList.remove("fa-star");
        }
    }
}

/*
 *  GAME CLOCK
 */

function clock() {
    setInterval(refresh, 5000);
}




/*
 * START GAME 
 */

function init() {
    clock();
    // shuffle(icons);
    setCards();
    matched = [];
    restart();
}

init();















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