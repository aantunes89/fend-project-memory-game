/*
 *  VARIABLES
 */

let icons = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o","fa fa-paper-plane-o",
"fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt",
"fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf",
"fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb",];

let deck = document.querySelector(".deck");

let cards = document.getElementsByClassName("card");

let selected = [];

let matched = [];

let move = 0;
let counter = document.querySelector(".moves");
counter.innerHTML = 0;

let stars = document.querySelectorAll(".fa-star");
let starsCounter = 3;


// TIMER VARIABLES //
let timer = document.querySelector(".timer");
let hour = 0;
let minutes = 0;
let seconds = 0;
let interval;

// MODAL VARIABLES
let overlay = document.querySelector(".overlay");
let popup = document.querySelector("popup");
let totalMove = document.querySelector(".totalMove");
let totalTime = document.querySelector(".totalTime");
let closeBtn = document.querySelector(".close");
let totalRating = document.querySelector(".totalRating");

// ----FUNCTIONS----- //



/*
 *  RATING FUNCTION 
 */
// -----> REMOVES STARS
function rating() {
    if(move === 17) {
        stars[0].classList.remove("fa-star");
        starsCounter -= 1;
    }
    else if (move === 22) {
            stars[0].classList.remove("fa-star");
            stars[1].classList.remove("fa-star");
            starsCounter -= 1;
        }
    } 

// -----> STARTING RATING
function startingRating() {
    stars[0].classList.add("fa-star");
    stars[1].classList.add("fa-star");
}

/*
 *  TIMER
 */
function starTime() {
    minutes = 0;
    seconds = 0;
    hour = 0;
    timer.innerHTML = "Time "+ minutes +" min : " + seconds +" sec";
    clearInterval(interval)
}


function clock() {
    interval = setInterval(function(){
        timer.innerHTML = "Time "+ minutes +" min : " + seconds +" sec";
        seconds++;

        if(seconds === 60) {
            minutes++;
            seconds = 0
        }
        if(minutes === 60){
            hour++;
            minutes = 0;
        }
    },1000);
    
}


function moveStart() {
    if(move === 1){
        seconds = 0;
        minutes = 0;
        hour = 0;
        clock();
    }
}


/*
 *  COUNT MOVES (CALLS TIMER AND RATING)
 */


function movesCounter() { 
    move++;
    counter.innerHTML = move;

    moveStart();
    // START RATING 
    rating();
}





/*
 *  RESTART GAME 
 */
 
function restart() {
    deck.innerHTML = "";
    init();
    selected = [];
    overlay.style.opacity = "0";
    overlay.style.zIndex = "-1"
    move = 0;
    counter.innerHTML = 0;

    starTime();
    startingRating();
    starsCounter = 3;

}


// ---- REFRESH BUTTON ---- //
function refreshBtn(){
    const reset = document.querySelector(".restart");
    reset.addEventListener("click",restart );
}



/*
 *  GAME OVER
 */
function gameOver() {
    setTimeout(function(){
        if(matched.length === icons.length) {

            congratulations();
        }
    },700);
}


function congratulations() {
    overlay.style.opacity = "1";
    overlay.style.zIndex = "2"

    totalMove.innerHTML = "Moves : "+ move;

    clearInterval(interval);
    totalTime.innerHTML = "Time : "+ minutes +" min : " + (seconds - 1) +" sec";

    totalRating.innerHTML = "Stars : " + starsCounter;

    closeBtn.addEventListener('click', function(){
        overlay.style.opacity = "0";
        overlay.style.zIndex = "-1";
    });

}


// -------------------------------------------- //
//---------- CARDS RELATED FUNCTIONS ---------- //
// -------------------------------------------- //


/*
 *  SET CARDS  
 */
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
 *  UDACITY SHUFFLE FUNCTION 
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


/*
 *  SELECT CARDS 
 */
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
    },800);    
}


/*
 *  MATCH FUNCTION 
 */
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
 * START GAME 
 */

function init() {
    shuffle(icons);
    setCards();
    refreshBtn();
    timer.innerHTML = "Time "+ minutes +" min : " + seconds +" sec";
    matched = [];
}

init();

