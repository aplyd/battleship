//TODO - difficulties
//easy - computer selection is random
//normal - computer selection is random, but when it hits a ship, it sinks the rest of the ship
//hard - computer knows where your ships are, and hits every other time

//TODO - function to translate 0-99 to a-j, 0-9 cordinates. then use that for ship placement.

export function generateBoard() {
	const arr = [];
	for (let i = 0; i < 100; i++) {
		arr.push([false, false]);
	}

	return arr;
}

const generateRandomNum = (n) => Math.floor(Math.random() * n);

export const generateUniqueNums = (n) => {
	const arr = [];

	while (arr.length < 20) {
		const num = generateRandomNum(n);
		if (!arr.includes(num)) {
			arr.push(num);
		}
	}

	return arr;
};

export function coordinatesArr() {
	const arr = [...Array(100)];
	const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
	let num;

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			num = i + 1;
			arr[Number('' + i + j)] = letters[j] + num.toString();
		}
	}
	return arr;
}

export const getCoordinate = (index) => {
	const arr = coordinatesArr();

	return arr[index];
};

export const getIndex = (coordinate = 'c6') => {
	return coordinatesArr().indexOf(coordinate);
};

export const getSurroundingSpaces = (coordinate = 'c6') => {
	//instead of just add/sub from the index of coordinate, using letters helps be aware of edge of grid;
	//the x's are there for fallback. if the returned coordinate is 'x6', its not on the grid.
	//not necesarry for nums because -1 or 11 aren't on grid either
	const letters = [
		'x',
		'x',
		'x',
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'x',
		'x',
		'x',
	];
	const letter = coordinate[0];
	const num = Number(coordinate[1]);
	let arr = [];
	const letterIndex = letters.indexOf(letter);

	//god this is ugly
	arr.push(letters[letterIndex - 1] + (num - 1));
	arr.push(letters[letterIndex] + (num - 1));
	arr.push(letters[letterIndex + 1] + (num - 1));
	arr.push(letters[letterIndex - 1] + num);
	arr.push(letters[letterIndex + 1] + num);
	arr.push(letters[letterIndex - 1] + (num + 1));
	arr.push(letters[letterIndex] + (num + 1));
	arr.push(letters[letterIndex + 1] + (num + 1));

	return arr;
};

//if next space isn't on board, calls itself to try again
export const getNextSpace = (coordinates, direction = 'down') => {
	let nextSpace;

	if (coordinates === null) {
		nextSpace = null;
	} else {
		const letters = [
			'x',
			'x',
			'x',
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'x',
			'x',
			'x',
		];

		const letter = coordinates[0];
		let num;
		let nextNum;
		const letterIndex = letters.indexOf(letter);
		let nextLetter;

		coordinates.length === 2
			? (num = Number(coordinates[1]))
			: (num = Number(coordinates.slice(-2)));

		switch (direction) {
			case 'up':
				nextNum = num - 1;
				nextNum < 1
					? (nextSpace = null)
					: (nextSpace = letter + nextNum);
				break;
			case 'down':
				nextNum = num + 1;
				nextNum > 10
					? (nextSpace = null)
					: (nextSpace = letter + nextNum);
				break;
			case 'left':
				nextLetter = letters[letterIndex - 1];
				nextLetter === 'x'
					? (nextSpace = null)
					: (nextSpace = nextLetter + num);
				break;
			case 'right':
				nextLetter = letters[letterIndex + 1];
				nextLetter === 'x'
					? (nextSpace = null)
					: (nextSpace = nextLetter + num);
				break;
			default:
				console.log(
					'oh no, error in getNextSpace func. didnt pass up, down, left, or right',
				);
		}
	}

	return nextSpace;
};

export const generateComputerShip = (length) => {
	const ship = [];
	let directions = ['up', 'down', 'left', 'right'];
	let direction = directions[generateRandomNum(4)];
	let space = getCoordinate(generateRandomNum(100));

	ship.unshift(space);

	for (let i = 1; i < length; i++) {
		ship.unshift(getNextSpace(ship[0], direction));
	}

	console.log(ship);
	return ship;
};

export function generateComputerBoard() {
	// const board = generateBoard();
	const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
	// let ships = [];

	for (let i = 0; i < shipLengths.length; i++) {}

	const ship = generateComputerShip(4);

	return ship;
}

export function generateComputerAttacks(difficulty = 'easy') {
	let arr = [];

	if (difficulty === 'easy') {
		arr = generateUniqueNums(100);
	}

	return arr;
}
