/*-------Constants-------*/

let onePlayerStart = document.getElementById("1-player");
let twoPlayerStart = document.getElementById("2-player");
let playerTurn = document.getElementById("playerTurn");
let winnerContainer = document.getElementById("winner-container");

let playerOne = '';
let playerTwo = '';
let currentPlayer = playerOne;
let winner = null;
let nameInput = document.getElementById("nameInput");
let nameButton = document.getElementById("nameButton");

//Turns cells into variables to be used for win conditions//
let cellOne = document.getElementById("cell-1");
let cellTwo = document.getElementById("cell-2");
let cellThree = document.getElementById("cell-3");
let cellFour = document.getElementById("cell-4");
let cellFive = document.getElementById("cell-5");
let cellSix = document.getElementById("cell-6");
let cellSeven = document.getElementById("cell-7");
let cellEight = document.getElementById("cell-8");
let cellNine = document.getElementById("cell-9");
let usedCellArray = [];
let cellArray = [
  cellOne,
  cellTwo,
  cellThree,
  cellFour,
  cellFive,
  cellSix,
  cellSeven,
  cellEight,
  cellNine,
];

/*---------Win Condition Object-------------------*/

// object of all winning conditions
let winCondition = {
  rowOne: [cellOne, cellTwo, cellThree],
  rowTwo: [cellFour, cellFive, cellSix],
  rowThree: [cellSeven, cellEight, cellNine],
  columnOne: [cellOne, cellFour, cellSeven],
  columnTwo: [cellTwo, cellFive, cellEight],
  columnThree: [cellThree, cellSix, cellNine],
  forwardSlash: [cellOne, cellFive, cellNine],
  backSlash: [cellSeven, cellFive, cellThree],
};

/*--------Functions--------*/

//starts game
function startPlay(cellArray) {
  cellArray.forEach(function (eachCell) {
    eachCell.addEventListener("click", fillSquare);
  });
}
//stops games
function stopPlay(cellArray) {
  cellArray.forEach(function (cell) {
    cell.removeEventListener("click", fillSquare);
  });
}
//fills square with appropiate markers
function fillSquare(event) {
  event.target.textContent = currentPlayer;
  usedCellArray.push(event.target);
  declareWinner();
  switchPlayer();
  removeFillSquare(event);
}
//stops fillability
function removeFillSquare(event) {
  event.target.removeEventListener("click", fillSquare);
}
//input names
nameButton.addEventListener("click", function () {
  if (playerOne === '') {
    namePlayerOne(event);
  } else {
      namePlayerTwo(event)
  }
});

function namePlayerOne(event) {
  if (nameInput.value === "") {
    playerOne = "X";
    nameInput.value = "";
  } else {
    playerOne = nameInput.value;
    nameInput.value = "";
  }
  console.log(playerOne)
}

function namePlayerTwo(event) {
  if (nameInput.value === "") {
    playerTwo = "O";
    nameInput.value = "";
  } else {
    playerTwo = nameInput.value;
    nameInput.value = "";
    console.log(playerTwo)
  }
}

//toggles players
function switchPlayer() {
  if (currentPlayer === playerOne) {
    currentPlayer = playerTwo;
    playerTurn.textContent = currentPlayer;
  } else if (currentPlayer === playerTwo) {
    currentPlayer = playerOne;
    playerTurn.textContent = currentPlayer;
  }
  console.log(currentPlayer)
}
//declares winner
function declareWinner() {
  for (let combo of Object.values(winCondition)) {
    if (combo[0].textContent === "") {
    } else if (
      combo[0].textContent === combo[1].textContent &&
      combo[0].textContent === combo[2].textContent
    ) {
      winner = true;
      markWinner(combo);
      winnerContainer.textContent = currentPlayer + " is the WINNER!";
      stopPlay(cellArray);
    }
  }
  drawCondition();
}
//if tie do this
function drawCondition() {
  if (usedCellArray.length === 9 && winner === null) {
    console.log("it be a draw yo");
    stopPlay(cellArray);
  } else {
  }
}
//highlights winning marker
function markWinner(winningArray) {
  winningArray.forEach(function (winningCell) {
    winningCell.className = "winning";
  });
}

/*---------Game plays--------*/

twoPlayerStart.addEventListener("click", () => {
  onePlayerStart.disabled = true;
  twoPlayerStart.disabled = true;
  playerTurn.textContent = currentPlayer;
  startPlay(cellArray);
});
