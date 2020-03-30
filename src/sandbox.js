const generateRandomNum = (n) => Math.floor(Math.random() * n);

let userShips = [];

for (let i = 0; i < 20; i++) {
	userShips.push(i + 1);
}

const setDifficulty = (difficulty = 'medium') => {
	const computerAttacks = new Array(60).fill(null);
	let userShipsCounter = 0;
	if (difficulty === 'medium') {
		for (let i = 0; i < computerAttacks.length; i++) {
			if (i % 3 === 0) {
				computerAttacks[i] = userShips[userShipsCounter];
				userShipsCounter++;
			}
		}
	}
	return computerAttacks;
};

let arr = setDifficulty();
let easyArr = new Array(100).fill(null);

//fills in the remainder of the array with unique, random values
for (let i = 0; i < easyArr.length; i++) {
	if (easyArr[i] === null) {
		while (true) {
			let num = generateRandomNum(100);
			if (easyArr.indexOf(num) < 0) {
				easyArr[i] = num;
				break;
			}
		}
	}
}

console.log(easyArr);

/////////////////

// let userShipsCounter = 0;
// let computerAttacks = [];

// for (let i = 0; i < 60; i++) {
// 	if (i % 3 === 0 && userShips[userShipsCounter]) {
// 		computerAttacks.push(userShips[userShipsCounter]);
// 		userShipsCounter++;
// 	} else {
// 		while (true) {
// 			let num = generateRandomNum(100);
// 			if (computerAttacks.indexOf(num) < 0) {
// 				computerAttacks.push(num);
// 				break;
// 			}
// 		}
// 	}
// }

// console.log(computerAttacks);

//test for unique
const isArrayUnique = (arr) =>
	Array.isArray(arr) && new Set(arr).size === arr.length;

console.log(isArrayUnique(easyArr));
