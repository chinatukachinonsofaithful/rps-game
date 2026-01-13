const rps = ["✊Rock", "🤚Paper", "✌️Scissors"];
const msg = ["Start Game", "Draw", "You Win", "You Lose"];
const root = document.documentElement;
const lightMode = document.querySelector("#light-mode");
const darkMode = document.querySelector("#dark-mode");
const rockBtn = document.querySelector("#rock-btn");
const papperBtn = document.querySelector("#papper-btn");
const scissorsBtn = document.querySelector("#scissors-btn");
const resetBtn = document.querySelector("#reset-btn");
const getHelp = document.querySelector("#get-help");
const donate = document.querySelector("#donate");
const secondDonate = document.querySelector(".donate-btn-2");
const gameSoundCheckBox = document.querySelector("#game-sound-checkbox");
const audio = new Audio();
const audio2 = new Audio();
let displayEl = document.querySelector("#display-el");
let aiScoreEl = document.querySelector("#ai-score-el");
let humanScoreEl = document.querySelector("#human-score-el");
let gameCountEl = document.querySelector("#game-count-el");
let chosenHumanCardEl = document.querySelector(".chosen-human-card-el");
let chosenAiCardEl = document.querySelector(".chosen-ai-card-el");
let gameCount = 0;
let aiScore = 0;
let humanScore = 0;

gameSoundCheckBox.addEventListener("change", function () {
  if (gameSoundCheckBox.checked) {
    audio2.src = "sounds/game_music.mp3";
    audio2.loop = true;
    audio2.volume = 0.5;
    audio2.play();
  } else {
    audio2.pause();
  }
});
function generateRandom(game) {
  const randomCard = Math.floor(Math.random() * game.length);
  return game[randomCard];
}

function lose() {
  aiScore++;
  aiScoreEl.textContent = aiScore;
  displayEl.textContent = msg[3];
  displayEl.style.color = "var(--err-color)";
  gameSound("sounds/fail.wav");
}

function win() {
  humanScore++;
  humanScoreEl.textContent = humanScore;
  displayEl.textContent = msg[2];
  displayEl.style.color = "var(--success-color)";
  gameSound("sounds/win.wav");
}

function checkGame() {
  // if human = ai (draw)
  if (chosenHumanCardEl.textContent === chosenAiCardEl.textContent) {
    displayEl.textContent = msg[1];
    displayEl.style.color = "var(--draw-color)";
    gameSound("sounds/draw.wav");
  }
  // if human = rock & ai = papper (you lose)
  else if (
    chosenHumanCardEl.textContent === rps[0] &&
    chosenAiCardEl.textContent === rps[1]
  ) {
    lose();
  }
  // if human = rock & ai = scissors (you win)
  else if (
    chosenHumanCardEl.textContent === rps[0] &&
    chosenAiCardEl.textContent === rps[2]
  ) {
    win();
  }
  // if human = papper & ai = scissors (you lose)
  else if (
    chosenHumanCardEl.textContent === rps[1] &&
    chosenAiCardEl.textContent === rps[2]
  ) {
    lose();
  }
  // if human = papper & ai = rock (you win)
  else if (
    chosenHumanCardEl.textContent === rps[1] &&
    chosenAiCardEl.textContent === rps[0]
  ) {
    win();
  }
  // if human = scissors & ai = rock (you lose)
  else if (
    chosenHumanCardEl.textContent === rps[2] &&
    chosenAiCardEl.textContent === rps[0]
  ) {
    lose();
  }
  // if human = scissors & ai = papper (you win)
  else if (
    chosenHumanCardEl.textContent === rps[2] &&
    chosenAiCardEl.textContent === rps[1]
  ) {
    win();
  }
}

function renderGame() {
  chosenAiCardEl.textContent = generateRandom(rps);
  checkGame();
  gameCount++;
  gameCountEl.textContent = `Game Count: ${gameCount}`;
  // gameSound("sounds/click.wav");

  if (aiScore > humanScore) {
    aiScoreEl.style.color = `var(--success-color)`;
    humanScoreEl.style.color = `var(--err-color)`;
  } else if (humanScore > aiScore) {
    aiScoreEl.style.color = `var(--err-color)`;
    humanScoreEl.style.color = `var(--success-color)`;
  } else if (humanScore === aiScore) {
    aiScoreEl.style.color = `var(--draw-color)`;
    humanScoreEl.style.color = `var(--draw-color)`;
  }
}

function gameSound(src) {
  audio.src = src;
  audio.loop = false;
  audio.volume = 0.5;
  audio.play();
}

getHelp.addEventListener("click", function () {
  alert(
    "HOW TO PLAY\n\n" +
      "1. Click Rock, Paper, or Scissors.\n" +
      "2. The computer will choose randomly.\n\n" +
      "RULES\n" +
      "Rock beats Scissors.\n" +
      "Scissors beats Paper.\n" +
      "Paper beats Rock.\n\n" +
      "RESULTS\n" +
      "Same choice = Draw.\n" +
      "Your choice wins = You win.\n" +
      "Computer wins = You lose.\n\n" +
      "Click any option to play again.",
  );
});

donate.addEventListener("click", function () {
  const userAgreed = confirm(
    "Support Rock Paper Scissors!\n\n" +
      "Your support helps improve the game, add new challenges, and make it more fun for everyone.\n\n" +
      "Do you want to go to the support page now?",
  );

  if (userAgreed) {
    window.open("https://paystack.shop/pay/xlhn9spibx", "_blank");
  }
});

secondDonate.addEventListener("click", function () {
  const userAgreed = confirm(
    "Support Rock Paper Scissors!\n\n" +
      "Your support helps improve the game, add new challenges, and make it more fun for everyone.\n\n" +
      "Do you want to go to the support page now?",
  );

  if (userAgreed) {
    window.open("https://paystack.shop/pay/xlhn9spibx", "_blank");
  }
});
lightMode.addEventListener("click", function () {
  root.style.setProperty("--light-color", "#282c33");
  root.style.setProperty("--dark-light-color", "#EDEEF5");
  root.style.setProperty("--dark-color", "#fff");
});
darkMode.addEventListener("click", function () {
  root.style.setProperty("--light-color", "#fff");
  root.style.setProperty("--dark-light-color", "#2f343e");
  root.style.setProperty("--dark-color", "#282c33");
});

rockBtn.addEventListener("click", function () {
  chosenHumanCardEl.textContent = rps[0];
  renderGame();
});

papperBtn.addEventListener("click", function () {
  chosenHumanCardEl.textContent = rps[1];
  renderGame();
});

scissorsBtn.addEventListener("click", function () {
  chosenHumanCardEl.textContent = rps[2];
  renderGame();
});

resetBtn.addEventListener("click", function () {
  aiScore = 0;
  humanScore = 0;
  gameCount = 0;
  aiScoreEl.textContent = 0;
  humanScoreEl.textContent = 0;
  gameCountEl.textContent = `Game Count: 0`;
  displayEl.textContent = msg[0];
  displayEl.style.color = `var(--light-color)`;
  aiScoreEl.style.color = `var(--light-color)`;
  humanScoreEl.style.color = `var(--light-color)`;
  chosenHumanCardEl.textContent = ``;
  chosenAiCardEl.textContent = ``;
});
