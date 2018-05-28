//Timer function: https://codepad.co/snippet/YMYUDYgr

/*
 * Create a list that holds all of your cards
 */
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

function start(e) {
    if (cardsList.length >= 2) return;
    openCards(e);
    storeCards(e);
}

function openCards(e) {
    if (e.target.classList.contains(open)) return;
    e.target.classList.toggle('open');
    e.target.classList.toggle('show');
}

function storeCards(e) {
    cardsList.push(e.target);
    if (cardsList.length > 1) {
        if (cardsList[0].firstElementChild.className == cardsList[1].firstElementChild.className) {
            lockCards(e);
            matched++;
            cardsList.splice(0, cardsList.length);
        } else {
            t = setTimeout(hideCards, 2000, e);
        }
        countMoves();
    } else {
        t = setTimeout(hideCards, 2000, e);
        return;
    }

}

function lockCards(e) {
    e.target.classList.add('open');
    e.target.classList.add('show');
    cardsList[0].classList.add('match');
    cardsList[1].classList.add('match');
}

function hideCards(e) {
    if (cardsList.length === 1) {
        cardsList[0].classList.add("open", "show");
    } else if (cardsList.length === 2) {
        cardsList[0].classList.remove("open", "show");
        cardsList[1].classList.remove("open", "show");
        cardsList.splice(0, cardsList.length);
    } else {
        return;
    }
}

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

function startTimer() {
    g = setTimeout(add, 1000);
}
startTimer();

function countMoves() {
    moveCounter++;
    moves.innerHTML = moveCounter;
}

function countStars() {
    totalTime.innerHTML = timer.textContent;
    if (moveCounter >= 25) {
        stars.innerHTML = 1;
        star.innerHTML = "Star!";
    } else if (moveCounter >= 20) {
        stars.innerHTML = 2;
    } else {
        stars.innerHTML = 3;
    }

}

for (const y of cardsArray) {
    y.addEventListener("click", start);
    y.addEventListener("click", finalScore);
}

function finalScore() {
    if (matched === 8) {
        final.style.display = "block";
        deck.style.display = "none";
        score.innerHTML = moveCounter;
        clearTimeout(g);
    }
    countStars();
}

function reloadPage() {
    window.location.reload();
}

repeat.addEventListener('click', reloadPage);

setup();