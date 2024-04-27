const userInp = document.querySelector("#user-inp");
const submitButton = document.querySelector("input[type='submit']");
const gameOverMsg = document.querySelector(".game-over-msg h2");
const restartBtn = gameOverMsg.nextElementSibling;
const hint = document.querySelector(".message .hint");
const allGuessesSlot = document.querySelector(".all-guesses span");
const remainingChancesSlot = document.querySelector(".remaining-chances span");

let randomNumber = Math.floor(Math.random() * 100 + 1);
let guessedNumber;
let allGuesses = [];
let remainingChances = 7;
remainingChancesSlot.innerText = remainingChances;
let isPlayable = true;

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (isPlayable) {
    guessedNumber = userInp.value;
    userInp.value = "";
    validateNumber(guessedNumber);
  }
});

function validateNumber(num) {
  if (num > 100 || num < 1 || num == "" || isNaN(num)) {
    showHint(`Input ${num} is invalid!`);
  } else {
    showHint("");
    compareNumber(num);
  }
}

function showHint(msg) {
  hint.innerText = msg;
}

function compareNumber(num) {
  if (num > randomNumber) {
    if (num < randomNumber + 10)
      showHint(`${num} is slightly bigger. Try guessing lower.`);
    else showHint(`${num} is too big. Try guessing lower.`);
  } else if (num < randomNumber) {
    if (num > randomNumber - 10)
      showHint(`${num} is slightly smaller. Try guessing higher.`);
    else showHint(`${num} is too small. Try guessing higher.`);
  } else if (num == randomNumber) {
    showHint(`${num} is the right guess.`);
    gameOver(true);
    return;
  }

  allGuesses.push(num);
  allGuessesSlot.innerText = allGuesses;

  remainingChances--;
  remainingChancesSlot.innerText = remainingChances;
  if (remainingChances == 0) {
    gameOver(false);
  }
}

function gameOver(isWin) {
  isPlayable = false;
  userInp.setAttribute("disabled", "");

  let p = document.createElement("p");
  p.innerHTML = `The actual number was ${randomNumber}...!`;
  hint.appendChild(p);

  gameOverMsg.parentElement.style.display = "block";
  if (isWin) {
    gameOverMsg.innerText = "You Won...!";
  } else {
    gameOverMsg.innerText = "You Lose...!";
  }
}

restartBtn.addEventListener("click", () => {
  restart();
});

function restart() {
  randomNumber = Math.floor(Math.random() * 100 + 1);
  isPlayable = true;
  userInp.removeAttribute("disabled");
  showHint("");
  gameOverMsg.parentElement.style.display = "none";
  allGuesses = [];
  allGuessesSlot.innerText = "-";
  remainingChances = 7;
  remainingChancesSlot.innerText = remainingChances;
}
