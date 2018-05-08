/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
const card = document.getElementsByClassName('card');
let cardElements = document.getElementsByClassName('fa');
let cardsArray = [...card];
let itemList = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];

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
function setup() {

    cardsArray = shuffle(cardsArray);
    itemList = shuffle(itemList);

    for(let i = 0; i < cardsArray.length; i++) {
    let random = itemList[Math.floor(Math.random()*itemList.length)].split("").join("");
    cardsArray[i].firstElementChild.className = "";
    cardsArray[i].firstElementChild.classList.add("fa",random);
    if(itemList.length > 1) {
        itemList = itemList.reduce((p,c) => (c !== random && p.push(c),p),[]);
    }
    else  {
        itemList.splice(0,1,"fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb");
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
var cardsList = [];
var moveCounter = 0;
var moves = document.querySelector('.moves');
function start(e) {
    openCards(e);
    storeCards(e);
}
function openCards(e) {
    e.target.classList.toggle('open');
    e.target.classList.toggle('show');
}

function storeCards (e) {
  cardsList.push(e.target);
  if(cardsList.length > 1) {
      if (cardsList[0].firstElementChild.className == cardsList[1].firstElementChild.className ) {
        lockCards(e);
      }
      else {
        hideCards(e);
      }
      countMoves();
      cardsList.splice(0,cardsList.length);
  }
  else {
      return;
  }

}
function lockCards (e) {
    e.target.classList.add('open');
    e.target.classList.add('show');
    cardsList[0].classList.add('match');
    cardsList[1].classList.add('match');
}

function hideCards (e) {
    openCards(e);
    cardsList[0].classList.remove("open","show");
    cardsList[1].classList.remove("open","show");
}

function countMoves () {
    moveCounter ++;
    moves.innerHTML = moveCounter;
}

for (const y of cardsArray) {
    y.addEventListener("click", start);
  }

setup();