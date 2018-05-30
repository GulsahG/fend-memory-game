//Timer function: https://codepad.co/snippet/YMYUDYgr

/*
 * Create a list that holds all of your cards
 */

//Setting up the all variables
const star1 = document.querySelector('.star1');
const star2 = document.querySelector('.star2');
const again = document.querySelector('.again');
const timer = document.querySelector('.timer');
const totalTime = document.querySelector('.total');
const moves = document.querySelector('.moves');
const score = document.querySelector('.score');
const repeat = document.querySelector('.fa-repeat');
const stars = document.querySelector('.star');
const star = document.querySelector('#stars');
const deck = document.querySelector('.deck');
const final = document.querySelector('.final');
const card = document.getElementsByClassName('card');
let cardElements = document.getElementsByClassName('fa');
let cardsArray = [...card];
let itemList = ["fa-github", "fa-firefox", "fa-android", "fa-code", "fa-bug", "fa-headphones", "fa-codepen", "fa-slack"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//Setting up the whole items in the game and shuffling them 
function setup() {

    cardsArray = shuffle(cardsArray);
    itemList = shuffle(itemList);

    for (let i = 0; i < cardsArray.length; i++) {
        let random = itemList[Math.floor(Math.random() * itemList.length)].split("").join("");
        cardsArray[i].firstElementChild.className = "";
        cardsArray[i].firstElementChild.classList.add("fa", random);
        if (itemList.length > 1) {
            itemList = itemList.reduce((p, c) => (c !== random && p.push(c), p), []);
        } else {
            itemList.splice(0, 1, "fa-github", "fa-firefox", "fa-android", "fa-code", "fa-bug", "fa-headphones", "fa-codepen", "fa-slack");
        }
    }

}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let seconds = 0;
let minutes = 0;
let hours = 0;
let g;
const cardsList = [];
let moveCounter = 0;
let matched = 0;

//Stops the function if the user clicks more than 2 cards at a time 
function start(e) {
    if (cardsList.length >= 2) return;
    openCards(e);
    storeCards(e);
}
//opens the cards at the first click
function openCards(e) {
    if (e.target.classList.contains(open)) return;
    e.target.classList.toggle('open');
    e.target.classList.toggle('show');
}

//storing the cards to see if they are matched 
function storeCards(e) {
    cardsList.push(e.target);
    if (cardsList.length > 1) {
        if (cardsList[0].firstElementChild.className == cardsList[1].firstElementChild.className) {
            lockCards(e);
            matched++;
            cardsList.splice(0, cardsList.length);
        }
        // hiding the cards if they are not matched
        else {
            t = setTimeout(hideCards, 2000, e);
        }
        countMoves();
    } else {
        t = setTimeout(hideCards, 2000, e);
        return;
    }

}

//locking the cards if they are matched and changing their colour
function lockCards(e) {
    e.target.classList.add('open');
    e.target.classList.add('show');
    cardsList[0].classList.add('match');
    cardsList[1].classList.add('match');
}
//hiding the cards depending on the number of cards opened
function hideCards(e) {
    //not hiding the card if the user clicked only one card
    if (cardsList.length === 1) {
        cardsList[0].classList.add("open", "show");
    }
    //hiding the cards if user clicked two of them
    else if (cardsList.length === 2) {
        cardsList[0].classList.remove("open", "show");
        cardsList[1].classList.remove("open", "show");
        cardsList.splice(0, cardsList.length);
    } else {
        return;
    }
}
//counting the time and updating it on the game screen
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    timer.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    startTimer();
}
//starting the timer function
function startTimer() {
    g = setTimeout(add, 1000);
}
startTimer();
//counting the moves and updating it on the screen
function countMoves() {
    moveCounter++;
    moves.innerHTML = moveCounter;
}
//counting the stars depending on the number of moves
function countStars() {
    totalTime.innerHTML = timer.textContent;
    // 1 star if there's more than 25 moves
    if (moveCounter >= 25) {
        stars.innerHTML = 1;
        star2.style.display = "none";
        star.innerHTML = "Star!";
    }
    // 2 stars if it's between 20 and 25 moves
    else if (moveCounter >= 20) {
        stars.innerHTML = 2;
        star1.style.display = "none";
    }
    // 3 stars if there's less than 20 moves
    else {
        stars.innerHTML = 3;
    }

}

for (const y of cardsArray) {
    y.addEventListener("click", start);
    y.addEventListener("click", finalScore);
}
//creating the modal screen if there's 8 matched cards
function finalScore() {
    if (matched === 8) {
        final.style.display = "block";
        deck.style.display = "none";
        score.innerHTML = moveCounter;
        clearTimeout(g);
    }
    countStars();
}
//reloading the page and starting the game again
function reloadPage() {
    window.location.reload();
}

repeat.addEventListener('click', reloadPage);
again.addEventListener('click', reloadPage);

setup();