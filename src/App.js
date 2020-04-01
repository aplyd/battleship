import React, { Component } from 'react';

import './App.css';

import Gameboard from './components/Gameboard';
import StartGameModal from './components/StartGameModal';

import {
	generateComputerBoard,
	generateBoard,
	generateComputerAttacks,
	generateRandomNum,
	getCoordinate,
	getIndex,
	getSurroundingSpaces,
	shuffleArr,
} from './gameEngine';

//TODO - refactor with "state machine"
//TODO - confirm empty spaces (surrounding areas empty if ship sinks)
//TODO - handle user ship placement
//TODO - fix game timing and create announcements for win/lose
//TODO - implement difficulty for computer attacks

//board spaces have 3 options [false, false, 0]. [0] is ship, [1] is damage, [0] is space touching ship
export class App extends Component {
	constructor() {
		super();
		this.state = {
			isModalOpen: true,
			username: '',
			user: null,
			userShips: [],
			computer: null,
			computerAttacks: [],
			computerAttackCounter: 0,
			allShipsPlaced: false,
			placedShipCounter: 0,
			usersTurn: false,
			attackCounter: 0,
			difficulty: 'easy',
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.placedShipCounter === 19) {
			console.log(this.state.userShips);
			this.setDifficulty();
			setTimeout(() => {
				this.setState({
					allShipsPlaced: true,
					usersTurn: true,
				});
			}, 1500);
		}
	}

	UNSAFE_componentWillMount = () => {
		this.getInitialState();
	};

	getInitialState = () => {
		const user = generateBoard();
		const [computer, computerShips] = generateComputerBoard();
		console.log(computerShips);
		const computerAttacks = generateComputerAttacks();
		this.setState({ user, computer, computerAttacks });
	};

	setUserSettings = (name, difficulty) => {
		this.setState({
			username: name,
			difficulty,
		});
		this.toggleStartGameModal();
	};

	toggleStartGameModal = () => {
		this.setState({ isModalOpen: !this.state.isModalOpen });
	};

	handleSpaceClick = (e, index) => {
		const user = [...this.state.user];
		const userShips = this.state.userShips;

		userShips.push(index);

		//placing the ships until all 20 are placed
		if (this.state.placedShipCounter <= 19 && user[index][0] === false) {
			user[index][0] = true;
			this.setState({
				user,
				placedShipCounter: this.state.placedShipCounter + 1,
				userShips,
			});
		}
	};

	handleAttack = (e, index) => {
		//using attack counter to ensure only 1 attack per turn
		this.setState({ attackCounter: this.state.attackCounter + 1 });
		if (this.state.attackCounter < 1) {
			//copy computer board because thats what were attacking
			const computer = [...this.state.computer];

			//computer[index][0] = occupied by ship, [1] = has been damaged
			//if attack hits ship, allow for another turn
			if (computer[index][0] === true) {
				computer[index][1] = true;
				this.setState({
					computer,
				});

				this.setState({ attackCounter: 0 });
				//if not, dont allow for another turn
			} else {
				computer[index][1] = true;
				this.setState({
					computer,
				});

				setTimeout(() => {
					this.setState({ usersTurn: false, attackCounter: 0 });
					this.computerAttack();
				}, 1500);
			}
		}
	};

	computerAttack = () => {
		const user = [...this.state.user];
		let computerAttackCounter = this.state.computerAttackCounter;

		const attack = () => {
			while (true) {
				const spaceToAttack = generateRandomNum(user.length);

				//available to attack + ship occupied
				if (
					user[spaceToAttack][1] === false &&
					user[spaceToAttack][0] === true
				) {
					setTimeout(() => {
						user[spaceToAttack][1] = true;
						this.setState({ user });
						this.computerAttack();
					}, 1000);
					break;
					//available to attack
				} else if (user[spaceToAttack][1] === false) {
					setTimeout(() => {
						user[spaceToAttack][1] = true;
						this.setState({ user });
					}, 1000);

					setTimeout(() => {
						this.setState({ usersTurn: true });
					}, 2000);
					break;
				}
			}
		};

		const cheatAttack = () => {
			while (true) {
				let shipToAttack = generateRandomNum(
					this.state.userShips.length,
				);
				if (user[this.state.userShips[shipToAttack]][1] === false) {
					user[this.state.userShips[shipToAttack]][1] = true;
					setTimeout(() => {
						this.setState({ user });
						this.computerAttack();
					}, 1000);
					break;
				}
			}
		};

		const incrementAttackCounter = () => {
			this.setState({ computerAttackCounter: computerAttackCounter + 1 });
		};

		//checks for difficulty
		if (this.state.difficulty === 'easy') {
			incrementAttackCounter();
			attack();
		} else if (this.state.difficulty === 'medium') {
			//medium - every 3rd attack is a cheat
			if (this.state.computerAttackCounter % 3 === 0) {
				incrementAttackCounter();
				cheatAttack();
			} else {
				incrementAttackCounter();
				attack();
			}
		} else if (this.state.difficulty === 'hard') {
			//hard - every 2nd attack is a cheat
			if (this.state.computerAttackCounter % 2 === 0) {
				incrementAttackCounter();
				cheatAttack();
			} else {
				incrementAttackCounter();
				attack();
			}
		}

		////if attack hits ship, allow for another turn
		// if (user[attackArr[index]][0] === true) {
		// 	setTimeout(() => {
		// 		user[attackArr[index]][1] = true;
		// 		this.setState({
		// 			user,
		// 			computerAttackCounter: index + 1,
		// 		});
		// 		this.computerAttack();
		// 	}, 1000);
		// } else {
		// 	setTimeout(() => {
		// 		user[attackArr[index]][1] = true;
		// 		this.setState({
		// 			user,
		// 			computerAttackCounter: index + 1,
		// 		});
		// 	}, 1000);

		// 	setTimeout(() => {
		// 		this.setState({ usersTurn: true });
		// 	}, 2000);
		// }
	};

	setDifficulty = () => {
		// 	let computerAttacks;
		// 	let userShipsCounter = 0;
		// 	//easy is random, medium = every 3rd attack garuantee, hard every 2nd attack garuantee
		// 	if (this.state.difficulty === 'easy') {
		// 		computerAttacks = new Array(100).fill(null);
		// 		console.log('easy');
		// 	} else if (this.state.difficulty === 'medium') {
		// 		computerAttacks = new Array(60).fill(null);
		// 		for (let i = 0; i < computerAttacks.length; i++) {
		// 			if (i % 3 === 0) {
		// 				computerAttacks[i] = this.state.userShips[userShipsCounter];
		// 				userShipsCounter++;
		// 			}
		// 		}
		// 		console.log('medum');
		// 	} else if (this.state.difficulty === 'hard') {
		// 		computerAttacks = new Array(40).fill(null);
		// 		for (let i = 0; i < computerAttacks.length; i++) {
		// 			if (i % 2 === 0) {
		// 				computerAttacks[i] = this.state.userShips[userShipsCounter];
		// 				userShipsCounter++;
		// 			}
		// 		}
		// 		console.log('hard');
		// 	}
		// 	for (let i = 0; i < computerAttacks.length; i++) {
		// 		if (computerAttacks[i] === null) {
		// 			while (true) {
		// 				let num = generateRandomNum(100);
		// 				if (computerAttacks.indexOf(num) < 0) {
		// 					computerAttacks[i] = num;
		// 					break;
		// 				}
		// 			}
		// 		}
		// 	}
		// 	shuffleArr(computerAttacks);
		// 	this.setState({
		// 		computerAttacks,
		// 	});
	};

	displayTurnKeeper = () => {
		if (this.state.allShipsPlaced) {
			return this.state.usersTurn ? '<' : '>';
		}
	};

	render() {
		return (
			<React.Fragment>
				{this.state.isModalOpen ? (
					<StartGameModal setUserSettings={this.setUserSettings} />
				) : null}

				<div className='turn-keeper'>
					<h2>
						{this.state.username ? this.state.username : 'player'}
					</h2>
					<h2 className='turn-keeper-arrow'>
						{this.displayTurnKeeper()}
					</h2>
					<h2>computer</h2>
				</div>

				<div id='gameboard-container'>
					<Gameboard
						user={this.state.user}
						handleSpaceClick={this.handleSpaceClick}
						computer={this.state.computer}
						usersTurn={this.state.usersTurn}
						handleAttack={this.handleAttack}
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
