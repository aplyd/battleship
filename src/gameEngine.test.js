import { generateComputerBoard, 
        generateUniqueNums, 
        generateComputerAttacks, 
        coordinatesArr, 
        getCoordinate, 
        getIndex,
        getSurroundingSpaces,
        } from './gameEngine'


test('length 20', () => {
    const arr = generateUniqueNums(20);
    expect(arr.length).toBe(20);
})

test('should have 20 selections and board size of 100', () => {
    const board = generateComputerBoard()

    const randomNumArr = board.filter((num) => {
        if (num[0] == true) {
            return num;
        }
    })

    expect(randomNumArr.length).toBe(20);
    expect(board.length).toBe(100);
})


test('20 random selections should be unique', () => {
    const board = generateComputerBoard()
    const randomNumArr = board.filter((num) => {
        if (num[0] == true) {
            return num;
        }
    })

    const isArrayUnique = arr => new Set(arr).size === arr.length;

    expect(isArrayUnique(randomNumArr)).toBeTruthy();
})

test('easy comp attack returns 20 unique nums', () => {
    const arr = generateComputerAttacks();
    const isArrayUnique = arr => new Set(arr).size === arr.length;

    expect(isArrayUnique(arr)).toBeTruthy();
    expect(arr.length).toBe(20);
})

test('a1 === 0', () => {
    const arr = coordinatesArr();

    expect(arr.length).toBe(100);
    expect(arr[0]).toBe('a1');
})


test('f6 === 55', () => {
    const arr = coordinatesArr();

    expect(arr.length).toBe(100);
    expect(arr[55]).toBe('f6');
})

test('getCoordinates', () => {
    expect(getCoordinate(88)).toBe('i9');
})


test('getIndex', () => {

    expect(getIndex('c6')).toBe(52);
})

test('surrounding spaces', () => {

        expect(getSurroundingSpaces('c6')).toStrictEqual(['b5','c5', 'd5', 'b6', 'd6', 'b7','c7', 'd7'])
})
