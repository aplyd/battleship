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
	checkArraysForDuplicates,
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

test.only('20 ship selections should be unique', () => {
	const ships = generateComputerBoard();
	// const randomNumArr = board.filter((num) => num[0] === true);

	const isArrayUnique = (arr) => new Set(arr).size === arr.length;

	expect(isArrayUnique(ships)).toBe(true);
});

test('check array concat methods', () => {
	const arr1 = ['a1', 'a2', 'a3', 'b5', 'c6'];
	const arr2 = ['a4', 'a5', 'a7', 'b6', 'c7'];

	let arrSpread = [...arr1, ...arr2];
	arr1.push(...arr2);

	console.log('spread is ', arrSpread);
	console.log('push is ', arr1);

	expect(arrSpread.sort()).toEqual(arr1.sort());
});

//test return value of checkarraysfordupplcated
test('duplicates in arrays', () => {
	const arr1 = ['a1', 'a2', 'a3', 'b5', 'c6'];
	const arr2 = ['a4', 'a5', 'a7', 'b6', 'c7'];
	const isArrayUnique = (arr) => new Set(arr).size === arr.length;

	let value;

	if (arr1 && !checkArraysForDuplicates(arr1, arr2)) {
		value = true;
	}

	expect(value).toBe(true);
});

test('easy comp attack returns 20 unique nums', () => {
	const arr = generateComputerAttacks();
	const isArrayUnique = (arr) => new Set(arr).size === arr.length;

	expect(isArrayUnique(arr)).toBeTruthy();
	expect(arr.length).toBe(20);
});

test('should be unique items', () => {
	const arr1 = ['a1', 'a2', 'a3', 'b5', 'c6'];
	const arr2 = ['a4', 'a5', 'a3', 'b6', 'c7'];
	const bothArr = [...arr1, ...arr2];

	let value = checkArraysForDuplicates(arr1, arr2);

	const isArrayUnique = (arr) =>
		Array.isArray(arr) && new Set(arr).size === arr.length;

	expect(isArrayUnique(bothArr)).toBe(false);
	expect(checkArraysForDuplicates(arr1, arr2)).toBe(true);
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
