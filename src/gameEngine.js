//TODO - difficulties
//easy - computer selection is random
//normal - computer selection is random, but when it hits a ship, it sinks the rest of the ship
//hard - computer knows where your ships are, and hits every other time

export function generateBoard() {
	const arr = [];
	for (let i = 0; i < 100; i++) {
		arr.push([false, false, 0]);
	}

	return arr;
}

export const generateRandomNum = (n) => Math.floor(Math.random() * n);

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

export const getIndex = (coordinate) => {
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

	//var because something something block scoped
	if (coordinate !== null) {
		var num;
		var letter = coordinate[0];
		coordinate.length === 2
			? (num = Number(coordinate[1]))
			: (num = Number(coordinate.slice(-2)));
		var letterIndex = letters.indexOf(letter);
	}

	let arr = [];

	//god this is ugly
	arr.push(letters[letterIndex - 1] + (num - 1));
	arr.push(letters[letterIndex] + (num - 1));
	arr.push(letters[letterIndex + 1] + (num - 1));
	arr.push(letters[letterIndex - 1] + num);
	arr.push(letters[letterIndex + 1] + num);
	arr.push(letters[letterIndex - 1] + (num + 1));
	arr.push(letters[letterIndex] + (num + 1));
	arr.push(letters[letterIndex + 1] + (num + 1));

	let filtered = arr.filter(
		(coords) =>
			!!coords &&
			Number(coords.substring(1)) <= 10 &&
			Number(coords.substring(1)) >= 1 &&
			coords[0] !== 'x',
	);

	return filtered;
};

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

	return ship;
};

//TODO - get surrounding spaces
export function generateComputerBoard() {
	const board = generateBoard();
	const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
	let ships = [];
	let shipsAndSurrounding = [];

	const checkForDuplicates = (mainArr, newArr) => {
		let value = false;
		mainArr.forEach((item) => {
			if (newArr.includes(item)) {
				value = true;
			}
		});
		return value;
	};

	const getCorrectSurroundingSpaces = (ship) => {
		let arr = [];
		ship.forEach((space) => {
			arr.push(getSurroundingSpaces(space));
		});

		return [...new Set(arr.flat())];
	};

	for (let i = 0; i < shipLengths.length; i++) {
		while (true) {
			const ship = generateComputerShip(shipLengths[i]);
			const surrounding = getCorrectSurroundingSpaces(ship);

			if (
				!ship.includes(null) && //valid placement
				!checkForDuplicates(ships, ship) && //no duplicate ship spaces
				!checkForDuplicates(ships, surrounding)
			) {
				ships.push(...ship);
				//storing surrounding spaces to use for when the ship sinks and need to reveal surrounding
				shipsAndSurrounding.push({
					index: i,
					length: shipLengths[i],
					ship: ship.map((s) => getIndex(s)),
					surrounding: surrounding.map((s) => getIndex(s)),
				});

				break;
			}
		}
	}

	shipsAndSurrounding.forEach((i) => {
		i.ship.forEach((j) => {
			board[j][2] = i.index;
		});
	});

	ships.forEach((i) => {
		board[getIndex(i)][0] = true;
	});

	console.log(board);

	return [board, shipsAndSurrounding];
}
