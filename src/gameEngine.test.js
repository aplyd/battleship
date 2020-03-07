import { generateCompShipPlacement } from './gameEngine'

test('loops 10 times', () => {
    expect(generateCompShipPlacement()).toBe(10)
})
