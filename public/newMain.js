// Constants
let onePlayerStart = document.getElementById('1-player')
let twoPlayerStart = document.getElementById('2-player')
let playerTurn = document.getElementById('playerTurn')
let winnerContainer = document.getElementById('winner-container')

let playerOne = 'X'
let playerTwo = 'O'
let currentPlayer = playerOne
let winner = null

let cellOne = document.getElementById('cell-1')
let cellTwo = document.getElementById('cell-2')
let cellThree = document.getElementById('cell-3')
let cellFour = document.getElementById('cell-4')
let cellFive = document.getElementById('cell-5')
let cellSix = document.getElementById('cell-6')
let cellSeven = document.getElementById('cell-7')
let cellEight = document.getElementById('cell-8')
let cellNine = document.getElementById('cell-9')
let usedCellArray = []
let cellArray = [cellOne, cellTwo, cellThree, cellFour, cellFive, cellSix, cellSeven, cellEight, cellNine]

/*------------Win Condition Object-------------------*/
// object of all winning conditions
let winCondition = {
    rowOne: [cellOne, cellTwo, cellThree],
    rowTwo: [cellFour, cellFive, cellSix],
    rowThree: [cellSeven, cellEight, cellNine],
    columnOne: [cellOne, cellFour, cellSeven],
    columnTwo: [cellTwo, cellFive, cellEight],
    columnThree: [cellThree, cellSix, cellNine],
    forwardSlash: [cellOne, cellFive, cellNine],
    backSlash: [cellSeven, cellFive, cellThree]
}

// Functions

function startPlay(cellArray) {
    cellArray.forEach(function (eachCell) {
        eachCell.addEventListener('click', fillSquare)
    })
}

function stopPlay(cellArray) {
    cellArray.forEach(function (cell) {
        cell.removeEventListener('click', fillSquare)
    })
}

function fillSquare(event) {
    event.target.textContent = currentPlayer
    usedCellArray.push(event.target)
    declareWinner()
    switchPlayer()
    removeFillSquare(event)
}

function removeFillSquare(event) {
    event.target.removeEventListener('click', fillSquare)
}

function switchPlayer() {
    if(currentPlayer === playerOne) {
        currentPlayer = playerTwo
        playerTurn.textContent = currentPlayer
    } else if(currentPlayer === playerTwo) {
        currentPlayer = playerOne
        playerTurn.textContent = currentPlayer
    }   
}

function declareWinner() {
    for(let combo of Object.values(winCondition)) {
        if (combo[0].textContent === '') {
            
        } else if (combo[0].textContent === combo[1].textContent && combo[0].textContent === combo[2].textContent) {
            winner = true
            markWinner(combo)
            winnerContainer.textContent = currentPlayer + ' is the WINNER!'
            stopPlay(cellArray)
        }
    } 
    drawCondition()
}

function drawCondition() {
    if (usedCellArray.length === 9 && winner === null) {
        console.log('it be a draw yo')
        stopPlay(cellArray)
    } else{

    }
}

function markWinner(winningArray) {
    winningArray.forEach(function (winningCell) {
        winningCell.className = 'winning'
    })
}

// Game plays

twoPlayerStart.addEventListener('click', () => {
    onePlayerStart.disabled = true
    twoPlayerStart.disabled = true
    playerTurn.textContent = currentPlayer
    startPlay(cellArray)
})