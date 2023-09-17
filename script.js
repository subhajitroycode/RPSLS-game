const playerName = document.querySelector(".player-name");
const submitButton = document.querySelector("button");
const games = document.querySelectorAll(".game-icon");
const playerPoints = document.querySelector(".player-points");
const computerPoints = document.querySelector(".computer-points");
const roundNumber = document.getElementById("round-number");
const result = document.querySelector(".result");
const resetBtn = document.getElementById("reset-btn");

let nameValue = "";
let playerGesture = "";
let playerScore = 0;
let computerScore = 0;
let round = 5;
let gameActive = true; // To control the game state

class Player {
  constructor(name) {
    this.name = name;
    this.choice = null;
  }

  chooseGesture(gesture) {
    this.choice = gesture;
  }
}

class Game {
  constructor() {
    this.player = new Player(nameValue);
    this.computer = new Player("Sheldon Cooper");
  }

  getRandomGesture() {
    const gestures = ["rock", "paper", "scissors", "lizard", "spock"];
    return gestures[Math.floor(Math.random() * gestures.length)];
  }

  determineWinner() {
    const playerChoice = this.player.choice;
    const computerChoice = this.computer.choice;

    result.innerText = "";

    showChoices(playerChoice, computerChoice);

    switch (playerChoice) {
      case "rock":
        if (computerChoice === "paper" || computerChoice === "spock") {
          computerScore++;
          computerScoreFunc();
        } else if (
          computerChoice === "lizard" ||
          computerChoice === "scissors"
        ) {
          playerScore++;
          playerScoreFunc();
        } else {
          result.innerText = "tie... go again";
        }

        break;

      case "paper":
        if (computerChoice === "scissors" || computerChoice === "lizard") {
          computerScore++;
          computerScoreFunc();
        } else if (computerChoice === "rock" || computerChoice === "spock") {
          playerScore++;
          playerScoreFunc();
        } else {
          result.innerText = "tie... go again";
        }

        break;

      case "scissors":
        if (computerChoice === "rock" || computerChoice === "spock") {
          computerScore++;
          computerScoreFunc();
        } else if (computerChoice === "paper" || computerChoice === "lizard") {
          playerScore++;
          playerScoreFunc();
        } else {
          result.innerText = "tie... go again";
        }

        break;

      case "lizard":
        if (computerChoice === "scissors" || computerChoice === "rock") {
          computerScore++;
          computerScoreFunc();
        } else if (computerChoice === "paper" || computerChoice === "spock") {
          playerScore++;
          playerScoreFunc();
        } else {
          result.innerText = "tie... go again";
        }

        break;

      case "spock":
        if (computerChoice === "paper" || computerChoice === "lizard") {
          computerScore++;
          computerScoreFunc();
        } else if (computerChoice === "rock" || computerChoice === "scissors") {
          playerScore++;
          playerScoreFunc();
        } else {
          result.innerText = "tie... go again";
        }

        break;

      default:
        throw new Error(
          "Invalid choice. Please choose Rock, Paper, or Scissors."
        );
    }
  }
}

const roundCounter = () => {
  roundNumber.innerText = round;
};

const computerScoreFunc = () => {
  computerPoints.innerText = `His score: ${computerScore}`;
};

const playerScoreFunc = () => {
  playerPoints.innerText = `Your score: ${playerScore}`;
};

const showChoices = (playerChoice = "", computerChoice = "") => {
  document.querySelector(
    ".player-choice"
  ).innerText = `Your choice: ${playerChoice}`;
  document.querySelector(
    ".computer-choice"
  ).innerText = `His choice: ${computerChoice}`;
};

const annouceWinner = () => {
  if (playerScore === computerScore) {
    result.innerHTML = "game over! <span>it's a tie</span>";
  } else if (playerScore > computerScore) {
    result.innerHTML = `game over! <span>You wins! 🎉</span>`;
  } else if (playerScore < computerScore) {
    result.innerHTML = "game over <span>Sheldon wins! BAZINGA...</span>";
  }

  resetBtn.style.display = "block";
};

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  nameValue = document.getElementById("name").value.trim();

  if (nameValue === "") {
    alert("Please enter your name.");
    return; // Stop execution if the name is empty
  }
  playerName.innerText = `name of the player: ${nameValue}`;
  roundCounter();
  document.querySelector(".match-box").style.display = "flex";
});

resetBtn.addEventListener("click", () => {
  round = 5;
  gameActive = true;
  playerScore = 0;
  computerScore = 0;

  roundCounter();
  computerScoreFunc();
  playerScoreFunc();
  showChoices();

  result.innerHTML = "";

  resetBtn.style.display = "none";
});

function handleClick(e) {
  if (round > 0 && gameActive) {
    round--;
    roundCounter();
    playerGesture = e.currentTarget.getAttribute("data-gesture");
    const playGame = new Game();

    try {
      playGame.player.chooseGesture(playerGesture);
      playGame.computer.chooseGesture(playGame.getRandomGesture());
      const result = playGame.determineWinner();
      console.log(result);
    } catch (error) {
      console.error(error.message);
    } finally {
      console.log("This round over!");
    }

    if (round === 0) {
      gameActive = false;
      annouceWinner();
    }
  }
}

games.forEach((game) => {
  game.addEventListener("click", handleClick);
});
