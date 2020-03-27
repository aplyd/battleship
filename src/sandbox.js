const generateRandomNum = (n) => Math.floor(Math.random() * n);

let userShips = [];

for (let i = 0; i < 20; i++) {
	userShips.push(i + 1);
}

const setDifficulty = (difficulty = 'medium') => {
	const computerAttacks = new Array(20).fill(null);
	if (this.state.difficulty === 'medium') {
		for (let i = 0; i < userShips.length; i++) {
			if (i % 3 === 0) {
				computerAttacks[i] = this.state.userShips[i];
			}
		}
	}
};

// //working here
// while (computerAttacks.includes(null)) {
// 	let index = computerAttacks.indexOf(null);
// 	let num = generateRandomNum(100);
// 	if (!computerAttacks.includes(num)) {
// 		computerAttacks[index] = num;
// 	}
// 	break;
// }
