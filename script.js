const boardContainer = document.querySelector('.board-container')
// const fleet = document.querySelector('.fleet-container')
let degrees = '0deg'
let isHorizontal = true


function createBoard(player) {
    const board = document.createElement('div')
    board.classList.add(player)
    boardContainer.append(board)
}

createBoard('player')
createBoard('computer')

function createSquares(user) {
    const boards = document.querySelector(`.${user}`)
        for (let i = 0; i < 100; i++) {
            const square = document.createElement('div')
            square.classList.add(`${user}-square`)
            square.setAttribute('location', i)
            boards.append(square)
        }
}

createSquares('player')
createSquares('computer')

function flip() {
    degrees = degrees === '0deg' ? '90deg' : '0deg' 
    isHorizontal = degrees === '0deg' ? true : false
    const fleetContainer = (Array.from(document.querySelector('.fleet-subcontainer').children))
    fleetContainer.forEach(fleet => {
        fleet.style.transform = `rotate(${degrees})`
    })
    console.log(degrees, isHorizontal)
}

class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
    }
}

const carrier = new Ship('carrier', 5)
const battleship = new Ship('battleship', 4)
const cruiser = new Ship('cruiser', 3)
const submarine = new Ship('submarine', 3)
const destroyer = new Ship('destroyer', 2)

const fleet = [carrier, battleship, cruiser, submarine, destroyer]

function placeComputerFleetHorizontal(ship) {
    let overlap = false
    let randomPlacement = Math.floor(Math.random() * 100)
    let potentialPlacement = []
    // let computerSquare = document.querySelector(`.computer > div[location='${randomPlacement}']`)
    for (let i = 0; i < ship; i++) {
        if ((randomPlacement + i) % 10 === 0 && i != 0) {
            overlap = true
        } else {
            potentialPlacement.push(randomPlacement + i)
        }
    }
    if (overlap === false) {
        for (let i = 0; i < potentialPlacement.length; i++) {
            document.querySelector(`.computer > div[location='${randomPlacement + i}']`).classList.add('taken')
            
        }
    } else {
        placeComputerFleetHorizontal(ship)
    }
}  

function placeComputerFleetVertical(ship) {
    let overlap = false
    let randomPlacement = Math.floor(Math.random() * 100)
    let potentialPlacement = []
    // let computerSquare = document.querySelector(`.computer > div[location='${randomPlacement}']`)
    for (let i = 0; i < ship; i++) {
        if (randomPlacement + (i * 10) > 99) {
            overlap = true
            // placeComputerFleetVertical(ship)
        } else {
            potentialPlacement.push(randomPlacement + (i * 10))
            console.log(randomPlacement + (i * 10))
        }
    }
    if (overlap === false) {
        for (let i = 0; i < potentialPlacement.length; i++) {
            document.querySelector(`.computer > div[location='${randomPlacement + (i * 10)}']`).classList.add('taken')
        } 
    } else {
        placeComputerFleetVertical(ship)
    }
}

for (let i = 0; i < fleet.length; i++) {
    let isHorizontalComputer = true
    isHorizontalComputer = Math.random() * 1 > 0.5 ? true : false
    if (isHorizontalComputer === true) {
        placeComputerFleetHorizontal(fleet[i].length)
    } else {
        placeComputerFleetVertical(fleet[i].length)
    }
}
