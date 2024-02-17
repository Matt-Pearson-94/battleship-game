const flipButton = document.querySelector('#flip-button')
const optionContainer = document.querySelector('.option-container')
const gamesBoardContainer = document.querySelector('#gamesboard-container')

let degrees = 0
colors = ['red', 'yellow', 'blue', 'orange', 'green', 'pink']

// Option choosing
function flip() {
    const optionShips = Array.from(optionContainer.children)
    degrees = degrees === 0 ? 90 : 0
    // if (degrees === 90) {
    //     degrees = 0
    // } else {
    //     degrees = 90
    // }
    optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${degrees}deg)`)
}

flipButton.addEventListener('click', flip)

// Creating boards
const width = 10

function createBoard(colors, user) {
    const gameBoardContainer = document.createElement('div')
    gameBoardContainer.classList.add('game-board')
    gameBoardContainer.style.backgroundColor = colors
    gameBoardContainer.id = user
    gamesBoardContainer.append(gameBoardContainer)
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        square.id = i
        gameBoardContainer.append(square)
        
    }
}

createBoard(colors[Math.floor(Math.random()*colors.length)], 'player')
createBoard(colors[Math.floor(Math.random()*colors.length)], 'computer')

// Creating ships
class Ship {
    constructor(name, length) {
    this.name = name
    this.length = length
    }
}

const destroyer = new Ship('destroyer', 2)
const submarine = new Ship('submarine', 3)
const cruiser = new Ship('cruiser', 3)
const battleship = new Ship('battleship', 4)
const carrier = new Ship('carrier', 5)

const ship = [destroyer, submarine, cruiser, battleship, carrier]

function addShipPiece() {
    const allBoardBlocks = document.querySelectorAll('#computer div')
    let randomBoolean = Math.random() < 0.5
    let isHorizontal = randomBoolean
    let randomStartIndex = Math.floor(Math.random() * width * width)
    let shipSquares = []
    for (let i = 0; i < ship.length; i++) {
        if (isHorizontal) {
            shipSquares.push(allBoardBlocks[Number(randomStartIndex) + i])
        } else {
            shipSquares.push(allBoardBlocks[Number(randomStartIndex) + i * width])
        }
      
    }
    shipSquares.forEach(shipSquare => {
        shipSquare.classList.add(ship.name)
        shipSquare.classList.add('taken')
    })
    console.log(shipSquares)
}

addShipPiece(destroyer)


