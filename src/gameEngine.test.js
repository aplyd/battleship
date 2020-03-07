import { generateRandomSelection } from './gameEngine'

test('numbers are from 0-99', () => {
    let arr = generateRandomSelection();

    arr.forEach(number => {
        expect(number).toBeGreaterThanOrEqual(0);
        expect(number).toBeLessThan(100);
    })
})

test.only(' ')

//need to test to make sure that there are never duplicates in array
