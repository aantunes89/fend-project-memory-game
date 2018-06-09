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


// ----FUNCTIONS----- //


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
    },500);    
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
 *  COUNT MOVES 
 */


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

 // CAN BE REUSED!!!
function refresh() {
    deck.innerHTML = "";
    init();
    move = 0;
    counter.innerHTML = 0;
    stars[0].classList.add("fa-star");
    stars[1].classList.add("fa-star");
}

function restart(){
    const reset = document.querySelector(".restart");
    reset.addEventListener("click",refresh );
}



/*
 *  RATING FUNCTION 
 */


function rating() {
    if(move > 12){
        stars[0].classList.remove("fa-star");
        if (move > 18) {
            stars[1].classList.remove("fa-star");
        }
    } 
}



/*
 *  TIMER
 */

function clock() {
    setInterval(refresh, 60000);
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