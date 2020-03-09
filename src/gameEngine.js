
export function generateBoard() {
    let arr = []
    for (let i = 0; i < 100; i++) {
        arr.push([false, false])
    }
    
    return arr
}

//create an array of random nums first to avoid duplicates, then place ships
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
