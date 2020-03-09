import { generateComputer, generateBoard } from './gameEngine'


test('test', () => {
    expect(true).toBe(true)
})

//array returned from generateBoard changed, returns array instead of inner object
// test('arr should contain correct object', () => {
//     expect(arr[0]).toMatchObject(obj)
//     expect(arr[9]).toMatchObject(obj)
// })

test('should have 20 random selections and board size of 100', () => {
    const board = generateComputer()

    const randomNumArr = board.filter((num) => {
        if (num[0] == true) {
            return num;
        }
    })

    expect(randomNumArr.length).toBe(20);
    expect(board.length).toBe(100);
})


test('items in array should be unique', () => {
    const board = generateComputer()

    const randomNumArr = board.filter((num) => {
        if (num[0] == true) {
            return num;
        }
    })

    const isArrayUnique = arr => new Set(arr).size === arr.length;

    expect(isArrayUnique(randomNumArr)).toBeTruthy();
})
