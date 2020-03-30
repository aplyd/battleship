const generateRandomNum = (n) => Math.floor(Math.random() * n);

let userShips = [];

for (let i = 0; i < 20; i++) {
	userShips.push(i + 1);
}

const setDifficulty = (difficulty = 'medium') => {
	const computerAttacks = new Array(20).fill(null);
	if (difficulty === 'medium') {
		for (let i = 0; i < userShips.length; i++) {
			if (i % 3 === 0) {
				computerAttacks[i] = userShips[i];
			}
		}
	}
	return computerAttacks;
};

let arr = setDifficulty();

//fills in the remainder of the array with unique, random values
for (let i = 0; i < arr.length; i++) {
	if (arr[i] === null) {
		while (true) {
			let num = generateRandomNum(100);
			if (arr.indexOf(num) < 0) {
				arr[i] = num;
				break;
			}
		}
	}
}

//test for unique
const isArrayUnique = (arr) =>
	Array.isArray(arr) && new Set(arr).size === arr.length;

console.log(isArrayUnique(arr));
