export function gameEngine() {

    
}

//create non-duplicating 20 length array of numbers 0-99
export function selectRandomPositions() {
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
