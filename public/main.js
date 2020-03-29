/*----- constants -----*/
let onePlayerStart = document.getElementById('1-player')
let twoPlayerStart = document.getElementById('2-player')


let crosses = '<img scr-"Kenny-Xs.png" id=X>';
let noughts = '<img src="Percy-Os.png" id=O>';
let player = crosses
let numPlayers = 1;
let playerTurn = document.getElementById('turn');
let playerCrosses = [];
let playerNoughts = [];
let currentArray = playerCrosses;
let opponentArray = playerNoughts;
let turnCount = 0;
let lineDiv = document.getElementById('top');
let winner = null;

const corners = [0, 2, 6, 8];

// Corner moves for AI, obviously middle and corners are ideal moves
const cornerMoves = [
  [0, 2, 6],
  [2, 8, 0],
  [8, 6, 2],
  [6, 0, 8]
];

// Only moves that can win
const winningCombos = [
  [0, 1, 2, 'top-row'],
  [3, 4, 5, 'mid-row'],
  [6, 7, 8, 'bottom-row'],
  [0, 3, 6, 'left-col'],
  [1, 4, 7, 'mid-col'],
  [2, 5, 8, 'right-col'],
  [0, 4, 8, 'back-slash'],
  [2, 4, 6, 'forward-slash'],
];


/*----- functions -----*/

//human v. computer
function singlePlayer() {
  numPlayers = 1;
  gameStart();
}

//human v. human
function twoPlayers() {
  numPlayers = 2;
  gameStart();
}


//initializes start buttons, this is called at the very beginning to setup the game





function boardReset() {
  winner = null;
  lineDiv.innerHTML = '';
  player = crosses
  playerCrosses = [];
  playerNoughts = [];
  currentArray = playerCrosses;
  playerTurn.innertext = "It is Cats turn";
  turnCount = 0;
  for (let i = 0; i < 9; i++) {
    let boardClear = document.getElementById(`cell-${i}`);
    boardClear.innerHTML = '';
  }
}

function gameStart() {
  for (let i = 0; i < 9; i++) {
    let startSquare = document.getElementById(`cell-${i}`);
    startSquare.addEventListener('click', play);
  }
  // boardReset();
}

function gonnaLooseReset() {
  for (let i = 0; i < 9; i++) {
    let stopSquare = document.getElementById(`cell-${i}`);
    stopSquare.removeEventListener('click', play);
  }
  boardReset();
}

function winningPet() {
  if (player === crosses) {
    winner = "crosses";
    playerTurn.innerHTML = 'Congratulations! Kenny the Kitty Wins!!!';
  } else {
    winner = "noughts";
    playerTurn.innerHTML = 'Congratulations! Percy the Good Boi Wins!!!';
  }
  stop();
}

function winningThree(a, b, c) {
  if (currentArray.includes(`cell-${a}`) && currentArray.includes(`cell-${b}`) && currentArray.includes(`cell-${c}`)) {
    return true;
  }
}

function winCheck() {
  for (let win of winningCombos) {
    if (winCheck(win[0], win[1], win[2])) {
      showWinner(win[3])
      return true
    }
  } if (turnCount === 9) {
    playerTurn.innerHTML = "Cats and Dogs don't Mix, But somehow you got them to for a moment"
  } else {
    toggle()
  }
}

//checks if a winning move is available for the computer
function compWin(a, b, c) {
  if (currentArray.includes(`cell-${a}`) && currentArray.includes(`cell-${b}`) && document.getElementById(`cell-${c}`).innerHTML === '') {
    return `cell-${c}`
  } else if (currentArray.includes(`cell-${b}`) && currentArray.includes(`cell-${c}`) && document.getElementById(`cell-${a}`).innerHTML === '') {
    return `cell-${a}`
  } else if (currentArray.includes(`cell-${a}`) && currentArray.includes(`cell-${c}`) && document.getElementById(`cell-${b}`).innerHTML === '') {
    return `cell-${b}`
  }
}

//if a winning move is available the computer will play there
function winComputer() {
  for (let win of winningCombos) {
    if (compWin(win[0], win[1], win[2])) {
      let winCell = canIWin(win[0], win[1], win[2])
      return winCell
    }
  }
}

//computer checks if the other player is about to win
function blockWin(a, b, c) {
  if (opponentArray.includes(`cell-${a}`) && opponentArray.includes(`cell-${b}`) && document.getElementById(`cell-${c}`).innerHTML === '') {
    return `cell-${c}`
  } else if (opponentArray.includes(`cell-${b}`) && opponentArray.includes(`cell-${c}`) && document.getElementById(`cell-${a}`).innerHTML === '') {
    return `cell-${a}`
  } else if (opponentArray.includes(`cell-${a}`) && opponentArray.includes(`cell-${c}`) && document.getElementById(`cell-${b}`).innerHTML === '') {
    return `cell-${b}`
  }
}


function blockMove() {
  for (let win of winningCombos) {
    if (blockWin(win[0], win[1], win[2])) {
      let blocked = winBlock(win[0], win[1], win[2])
      return blocked
    }
  }
}

function createArray(array) {
  return array[(Math.floor(Math.random() * array.length))]
}

function cornerAdvantage() {
  for(array of cornerMoves) {
    if(opponentArray[0] ==`cell-${array[0]}`) {
      return array[createArray([1, 2])]
    }
  }
}

function randoMoves() {
  let emptyArray = []
  for (let i= 0; i < 9; i++){
    if (document.getElementById("cell-" +i).innerHTML === '') {
      emptyArray.push("cell-" + i)
      return createArray(emptyArray)
    }
  }
}

function compAI() {
  if (document.getElementById("cell-4").innerHTML === '') {
    return "cell-4"
  } else if (turnCount === 1) {
    return `cell-${createArray(corners)}`
  } else if (turnCount === 2) {
    return `cell-${nextCorner()}`
  } else if (winComputer()) {
    console.log("win")
    return (winComputer())
  } else if (blockMove()) {
    console.log("block")
    return (blockMove())
  } else if (turnCount === 9) {
    playerTurn.innerHTML = "Cats and Dogs don't Mix, But somehow you got them to for a moment"
    return true
  } else {
    console.log("random")
    return (nextSquares())
  }
}

function play(game) {
  if (game.currentTarget.innerHTML === '') {
    game.currentTarget.innerHTML = player
    currentArray.push(game.currentTarget.id)
    turnCount++
    winCheck()
    if (numPlayers === 1) {
      computerPlayer()
    }
  } else {
    playerTurn.innerHTML = "Space Taken! Move along!"
  }
}

function toggle() {
  if (player === kennyCat) {
    player = letterO
    currentArray = playerOMoves
    opponentArray = playerXMoves
    playerTurn.innerHTML = "It is player O's turn"
  }
  else {
    player = kennyCat
    currentArray = playerXMoves
    opponentArray = playerOMoves
    playerTurn.innerHTML = "It is player X's turn"
  }
}


// refactored game

twoPlayerStart.addEventListener('click', function () {
  console.log('the game has started')
  gameStart()
})