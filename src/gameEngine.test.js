import { generateComputerBoard, generate20UniqueNums, generateComputerAttacks } from './gameEngine'


test('length 20', () => {
    const arr = generate20UniqueNums();
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
