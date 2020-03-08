import { generateRandomSelection, generateBoard } from './gameEngine'

let arr = generateBoard();
let obj = {ship: false, damage: false}

test('test', () => {
    expect(true).toBe(true)
})

test('arr should contain correct object', () => {
    expect(arr[0]).toMatchObject(obj)
    expect(arr[9]).toMatchObject(obj)
})

test('should be unique objects', () => {
    expect(arr[0]).toEqual(arr[1])
})
