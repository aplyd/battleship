//TODO - difficulties
//easy - computer selection is random
//normal - computer selection is random, but when it hits a ship, it sinks the rest of the ship
//hard - computer knows where your ships are, and hits every other time

//TODO - function to translate 0-99 to a-j, 0-9 cordinates. then use that for ship placement.

export function generateBoard() {
    let arr = []
    for (let i = 0; i < 100; i++) {
        arr.push([false, false])
    }
    
    return arr
}

const generateRandomNum = (n) => Math.floor(Math.random() * n)

export const generate20UniqueNums = () => {
    const arr = []

    while (arr.length < 20) {
        let num = generateRandomNum(100)
        if (!arr.includes(num)) {
            arr.push(num)
        }
    }

    return arr
}

export function generateComputerBoard() {
    let board = generateBoard();
    let arr = generate20UniqueNums();

    arr.forEach((num) => {
        board[num][0] = true;
    })
    
    return board;
}

export function generateComputerAttacks(difficulty = 'easy') { 
    let arr = [];

    if (difficulty === 'easy') {
        arr = generate20UniqueNums();
    }

    return arr;
}
