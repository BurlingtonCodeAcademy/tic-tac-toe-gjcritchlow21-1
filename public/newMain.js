// Constants
let twoPlayerStart = document.getElementById('2-player')

let playerOne = 'X'
let playerTwo = 'O'
let currentPlayer = playerOne

let cellOne = document.getElementById('cell-1')
let cellTwo = document.getElementById('cell-2')
let cellThree = document.getElementById('cell-3')
let cellFour = document.getElementById('cell-4')
let cellFive = document.getElementById('cell-5')
let cellSix = document.getElementById('cell-6')
let cellSeven = document.getElementById('cell-7')
let cellEight = document.getElementById('cell-8')
let cellNine = document.getElementById('cell-9')

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
    } else if(currentPlayer === playerTwo) {
        currentPlayer = playerOne
    }   
}

function declareWinner() {
    for(let combo of Object.values(winCondition)) {
        if (combo[0].textContent === '') {
            
        } else if (combo[0].textContent === combo[1].textContent && combo[0].textContent === combo[2].textContent) {
            console.log(currentPlayer + 'WINS!')
            stopPlay(cellArray)
        }
    }
}

// Game plays

twoPlayerStart.addEventListener('click', () => {
    console.log('the game has started')
    startPlay(cellArray)

})