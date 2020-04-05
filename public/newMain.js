/*--------------------------------Constants-------------------------------*/

//constants that link buttons and display game conditions
let onePlayerStart = document.getElementById("onePlayer");
let twoPlayerStart = document.getElementById("twoPlayer");
let playerTurn = document.getElementById("playerTurn");
let winnerContainer = document.getElementById("winner-container");

//player and game conditions
let playerOne = "X";
let playerTwo = "O";
let currentPlayer = playerOne;
let winner = null;
let nameInput = document.getElementById("nameInput");
let nameButton = document.getElementById("nameButton");
let gameTimer = document.getElementById("game-timer");
let seconds = 0;
let timer;
let gameMode;

//turns cells into variables to be used for win conditions
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

/*---------------------------Win Condition Object-------------------------*/

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

/*---------------------------------Functions--------------------------------*/

//starts game
function startPlay(event, cellArray) {
    if (event.target.id === "twoPlayer") {
        cellArray.forEach(function (eachCell) {
            eachCell.addEventListener("click", fillSquare);
        });
        timer = setInterval(incrementSeconds, 1000);
        gameMode = "twoPlayer";
    } else {
        cellArray.forEach(function (eachCell) {
            eachCell.addEventListener("click", fillSquare);
        });
        timer = setInterval(incrementSeconds, 1000);
        gameMode = "onePlayer";
        playerTwo = "Computer"
    }
}

//stops game
function stopPlay(cellArray) {
    cellArray.forEach(function (cell) {
        cell.removeEventListener("click", fillSquare);
    });
}

//fills square with appropiate markers and switches players, plays game
function fillSquare(event) {
    if (gameMode === "twoPlayer") {
        if (currentPlayer === playerOne) {
            event.target.textContent = "X";
            usedCellArray.push(event.target);
            switchPlayer();
        } else if (currentPlayer === playerTwo) {
            event.target.textContent = "O";
            usedCellArray.push(event.target);
            switchPlayer();
        }
    } else if (gameMode === 'onePlayer') {
        if (currentPlayer === playerOne) {
            event.target.textContent = "X";
            usedCellArray.push(event.target);
            switchPlayer()
            if (usedCellArray.length < 9) {
                computer()
            }
        } else if (currentPlayer === playerTwo) {
            event.target.textContent = "O";
            usedCellArray.push(event.target);
            switchPlayer();
        }
    }
    declareWinner();
    removeFillSquare(event);
}

//stops fillability
function removeFillSquare(event) {
    event.target.removeEventListener("click", fillSquare);
}

//input names
nameButton.addEventListener("click", function () {
    if (playerOne === "") {
        namePlayerOne(event);
    } else {
        namePlayerTwo(event);
    }
});

//allows player one to enter a name, otherwise player is marker
function namePlayerOne(event) {
    if (nameInput.value === "") {
        playerOne = "X";
        nameInput.value = "";
    } else {
        playerOne = nameInput.value;
        nameInput.value = "";
    }
    currentPlayer = playerOne;
}
//same as above function, but for player two
function namePlayerTwo(event) {
    if (nameInput.value === "") {
        playerTwo = "O";
        nameInput.value = "";
    } else {
        playerTwo = nameInput.value;
        nameInput.value = "";
    }
}

//computer plays
function computer() {
    let compPick = cellArray[Math.floor(Math.random() * cellArray.length)];
    while (usedCellArray.includes(compPick)) {
        compPick = cellArray[Math.floor(Math.random() * cellArray.length)]
    }
    compPick.click()
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
}

//seconds timer starts
function incrementSeconds() {
    seconds += 1;
    if (seconds < 10) {
        gameTimer.textContent = "0" + seconds;
    } else {
        gameTimer.textContent = seconds;
    }
}

//stops timer
function stopTimer() {
    clearInterval(timer);
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
            stopTimer();
        }
    }
    drawCondition();
}

//if tie do this
function drawCondition() {
    if (usedCellArray.length === 9 && winner === null) {
        winnerContainer.textContent = "It's a draw...."
        stopPlay(cellArray);
        stopTimer();
    } else {
    }
}
//highlights winning marker
function markWinner(winningArray) {
    winningArray.forEach(function (winningCell) {
        winningCell.className = "winning";
    });
}

/*-------------------------------Game plays----------------------------*/

//event listeners for player buttons and starts game
onePlayerStart.addEventListener("click", () => {
    onePlayerStart.disabled = true;
    twoPlayerStart.disabled = true;
    playerTurn.textContent = currentPlayer;
    startPlay(event, cellArray);
});

twoPlayerStart.addEventListener("click", () => {
    onePlayerStart.disabled = true;
    twoPlayerStart.disabled = true;
    playerTurn.textContent = currentPlayer;
    startPlay(event, cellArray);
});


