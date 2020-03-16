//TODO - difficulties
//easy - computer selection is random
//normal - computer selection is random, but when it hits a ship, it sinks the rest of the ship
//hard - computer knows where your ships are, and hits every other time

//TODO - function to translate 0-99 to a-j, 0-9 cordinates. then use that for ship placement.

export function generateBoard() {
	let arr = [];
	for (let i = 0; i < 100; i++) {
		arr.push([false, false]);
	}

	return arr;
}

const generateRandomNum = n => Math.floor(Math.random() * n);

export const generateUniqueNums = n => {
	const arr = [];

	while (arr.length < 20) {
		let num = generateRandomNum(n);
		if (!arr.includes(num)) {
			arr.push(num);
		}
	}

	return arr;
};

//ships
//1.length x4 | 2.length x3 | 3.length x2 | 4.length x1

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
		'x'
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

const shipDirection = () => {
	const arr = ['up', 'down', 'right', 'left'];
};

const positionShip = direction => {
	//increment number = down
	//decrement number = up
	//increment letter = right
	//decrement letter = left
	if (direction === 'up') {
	}

	if (direction === 'down') {
	}

	if (direction === 'right') {
	}
};

export function generateComputerBoard() {
	let board = generateBoard();
	let arr = generateUniqueNums(20);

	arr.forEach(num => {
		board[num][0] = true;
	});

	return board;
}

export function generateComputerAttacks(difficulty = 'easy') {
	let arr = [];

	if (difficulty === 'easy') {
		arr = generateUniqueNums(100);
	}

	return arr;
}

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

export const getCoordinate = index => {
	const arr = coordinatesArr();

	return arr[index];
};

export const getIndex = (coordinate = 'c6') => {
	return coordinatesArr().indexOf(coordinate);
};
