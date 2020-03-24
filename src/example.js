const checkArraysForDuplicates = (arr1, arr2) => {
	for (let i = 0; i < arr1.length; i++) {
		for (let j = 0; j < arr2.length; j++) {
			if (arr1[j] === arr2[i]) {
				return true;
			}
		}
	}
};

const arr1 = [null, 1, 2, 3];
const arr2 = [4, 5, 6, 7]; //unique
const arr3 = [3, 8, 9, 10]; //unique
const arr4 = [3, 12, 13, 14];
const arr5 = [15, 16, 17, null];

const allArrs = [arr1, arr2, arr3, arr4, arr5];

const nonDuplicates = [];

for (let i = 0; i < allArrs.length; i++) {
	if (
		!allArrs[i].includes(null) &&
		!checkArraysForDuplicates(nonDuplicates, allArrs[i])
	) {
		nonDuplicates.push(allArrs[i]);
	}
}

console.log(nonDuplicates);
