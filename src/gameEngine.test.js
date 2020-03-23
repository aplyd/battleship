import {
	generateComputerBoard,
	generateUniqueNums,
	generateComputerAttacks,
	coordinatesArr,
	getCoordinate,
	getIndex,
	getSurroundingSpaces,
	getNextSpace,
	generateComputerShip,
	isValid,
} from './gameEngine';

test('length 20', () => {
	const arr = generateUniqueNums(20);
	expect(arr.length).toBe(20);
});

test('should get next space down', () => {
	expect(getNextSpace('c6', 'down')).toBe('c7');
});

test('space after b10 should be null', () => {
	expect(getNextSpace('b10', 'down')).toBe(null);
});

test('should get next space left', () => {
	expect(getNextSpace('j6', 'left')).toBe('i6');
});

test('should get next space right', () => {
	expect(getNextSpace('h8', 'right')).toBe('i8');
});

test('should get next space up', () => {
	expect(getNextSpace('d8', 'up')).toBe('d7');
	expect(getNextSpace('i9', 'up')).toBe('i8');
	expect(getNextSpace('d1', 'up')).toBe(null);
});

test('comp ship length of 1', () => {
	const ship = generateComputerShip(1);

	expect(ship.length).toBe(1);
});

test('ship length 4', () => {
	let ship = generateComputerShip(4);

	expect(ship.length).toBe(4);
});

test('gameboard', () => {
	const board = generateComputerBoard();

	expect(board).toBe();
});

// test.only('20 random selections should be unique', () => {
// 	const board = generateComputerBoard();
// 	const randomNumArr = board.filter(num => {
// 		if (num[0] == true) {
// 			return num;
// 		}
// 	});

// 	const isArrayUnique = arr => new Set(arr).size === arr.length;

// 	expect(isArrayUnique(randomNumArr)).toBeTruthy();
// });

test('easy comp attack returns 20 unique nums', () => {
	const arr = generateComputerAttacks();
	const isArrayUnique = (arr) => new Set(arr).size === arr.length;

	expect(isArrayUnique(arr)).toBeTruthy();
	expect(arr.length).toBe(20);
});

test('a1 === 0', () => {
	const arr = coordinatesArr();

	expect(arr.length).toBe(100);
	expect(arr[0]).toBe('a1');
});

test('f6 === 55', () => {
	const arr = coordinatesArr();

	expect(arr.length).toBe(100);
	expect(arr[55]).toBe('f6');
});

test('getCoordinates', () => {
	expect(getCoordinate(88)).toBe('i9');
});

test('getIndex', () => {
	expect(getIndex('c6')).toBe(52);
});

test('surrounding spaces', () => {
	expect(getSurroundingSpaces('c6')).toStrictEqual([
		'b5',
		'c5',
		'd5',
		'b6',
		'd6',
		'b7',
		'c7',
		'd7',
	]);
});

test.only('valid surrounding spaces', () => {
	expect(isValid()).toBe();
});
