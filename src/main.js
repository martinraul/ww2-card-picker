const $startButton = document.querySelector("#start-button");
const $resetButton = document.querySelector("#reset-button");

let cardsArray = [];
let selection = [];
let matchedCards = [];
let round = 0;

$startButton.onclick = function () {
  shuffleCards();
  buildBoard();
  showScore(round);
};

function shuffleCards() {
  let $allCards = document.querySelectorAll(".card");
  let i;
  for (i = 0; i < $allCards.length; i++) {
    cardsArray.push($allCards[i].id);
  }

  let imgArray = [];
  let $img = document.getElementsByTagName("img");
  for (i = 0; i < $allCards.length; i++) {
    imgArray.push($img[i]);
  }

  cardsArray.sort(() => Math.random() - 0.5);
  let a;
  for (a = 0; a < cardsArray.length; a++) {
    $img[a].id = `${cardsArray[a]}`;
    $img[a].src = `img/${cardsArray[a]}.jpg`;
  }
  console.log(cardsArray);
}

function buildBoard() {
  document.querySelectorAll(".card").forEach((item) => {
    item.addEventListener("click", (e) => {
      const $elemento = e.target;
      handlingUser($elemento);
    });
  });
}

function handlingUser($elemento) {
  selection.push($elemento);
  console.log(selection);
  evaluateUserInput(selection);
}

function evaluateUserInput(selection) {
  if (selection.length === 1) {
    selection[0].style.opacity = 1;
  } else if (selection.length === 2) {
    if (selection[0].id === selection[1].id) {
      onMatched();
    } else {
      selection[1].style.opacity = 1;
      setTimeout(function () {
        unMatched();
      }, 1000);
    }
  }
}

function onMatched() {
  selection[0].style.opacity = 1;
  matchedCards.push(selection[0]);
  selection[1].style.opacity = 1;
  matchedCards.push(selection[1]);
  selection.length = 0;
  console.log(matchedCards);
  round++;
  showScore(round);
  checkIfWin();
}

function unMatched() {
  selection[0].style.opacity = 0;
  selection[1].style.opacity = 0;
  selection.length = 0;
  round++;
  showScore(round);
}

function showScore(round) {
  $score = document.getElementById("score");
  $score.textContent = "Round " + round;
}

function checkIfWin() {
  if (matchedCards.length === 12) {
    $score.className = "alert alert-danger";
    $score.textContent = "ITS DONE! in " + round + " rounds";
  }
}

$resetButton.onclick = function () {
  location.reload();
};
