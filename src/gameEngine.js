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

//create an array of random nums first to avoid duplicates
export function generateComputer() {
    let board = generateBoard();

    const arrayOfUniqeNums = [];
    const generateNum = () => Math.floor(Math.random() * 100);

    while (arrayOfUniqeNums.length < 20) {
        let num = generateNum();
        if (!arrayOfUniqeNums.includes(num)) {
            arrayOfUniqeNums.push(num);
            board[num][0] = true;
        }
    }

    return board;
}

export function generateComputerAttackArr() {
    const arrayOfUniqeNums = [];
    const generateNum = () => Math.floor(Math.random() * 100);

    while (arrayOfUniqeNums.length < 20) {
        let num = generateNum();
        if (!arrayOfUniqeNums.includes(num)) {
            arrayOfUniqeNums.push(num);
        }
    }

    return arrayOfUniqeNums;
}
