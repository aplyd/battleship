import React, { Component } from 'react';

import './App.css';

import Gameboard from './components/Gameboard';
import StartGameModal from './components/StartGameModal';
import ShipModal from './components/ShipModal';
import Controls from './components/Controls';

import {
	generateComputerBoard,
	generateBoard,
	generateRandomNum,
	getCoordinate,
	getIndex,
	getSurroundingSpaces,
	getNextSpace,
} from './gameEngine';
import EndGameModal from './components/EndGameModal';

//TODO - refactor with "state machine"
//TODO - option to remove ship
//TODO - computer attack is "smart" (when attack hits, chooses a surrounding space)

//board spaces have 3 options [false, false, 0]. [0] is ship, [1] is damage, [0] is space touching ship
export class App extends Component {
	constructor() {
		super();
		this.initialState = {
			isModalOpen: true,
			isShipModalOpen: false,
			username: '',
			user: null,
			userShips: [],
			computer: null,
			computerShips: [],
			computerAttackCounter: 0,
			allShipsPlaced: false,
			placedShipCounter: 0,
			usersTurn: false,
			attackCounter: 0,
			difficulty: 'easy',
			placementOption: null,
			shipToPlace: [],
			length4: 1,
			length3: 2,
			length2: 3,
			length1: 4,
			gameOver: false,
			winner: null,
		};
		this.state = {};
	}

	UNSAFE_componentWillMount = () => {
		this.getInitialState();
	};

	getInitialState = () => {
		this.setState(this.initialState);
		//this is needed bc setState is shallow merge and doesn't delete userShips nested objects
		this.setState({ userShips: [] });
		const user = generateBoard();
		const [computer, computerShips] = generateComputerBoard();
		this.setState({ user, computer, computerShips });
	};

	setUserSettings = (name, difficulty, placementOption) => {
		if (placementOption === 'custom') {
			this.setState({
				username: name,
				difficulty,
				isModalOpen: false,
				isShipModalOpen: true,
				placementOption,
			});
		} else if (placementOption === 'random') {
			const [user, userShips] = generateComputerBoard();

			userShips.forEach((obj) => {
				obj.ship = obj.ship.map((i) => getCoordinate(i));
				obj.surrounding = obj.surrounding.map((j) => getCoordinate(j));
			});

			this.setState({
				userShips,
				user,
				username: name,
				difficulty,
				isModalOpen: false,
				placementOption,
			});

			setTimeout(() => {
				this.setState({
					allShipsPlaced: true,
					usersTurn: true,
				});
			}, 1000);
		}
	};

	handleSpaceClick = (e, index) => {
		const user = [...this.state.user];
		const userShips = this.state.userShips;
		let [length, direction] = this.state.shipToPlace;
		let ship = [];
		let surrounding = [];
		const available = user[index][0] === false;

		const isValidPlacement = () => {
			if (this.state.shipToPlace.length === 0) {
				return;
			}

			ship.unshift(getCoordinate(index));

			for (let i = 0; i < length - 1; i++) {
				ship.unshift(getNextSpace(ship[0], direction));
			}

			const totalSurrounding = ship.map((space) => {
				return getSurroundingSpaces(space);
			});

			//remove duplicates
			surrounding = [...new Set(totalSurrounding.flat())];

			let surroundingSpacesAvailable = surrounding.every((space) => {
				return !user[getIndex(space)][0];
			});

			if (!ship.includes(null) && surroundingSpacesAvailable) {
				return true;
			} else {
				return false;
			}
		};

		//handle ship placement
		if (!this.state.allShipsPlaced) {
			if (available && isValidPlacement() && this.state.shipToPlace) {
				userShips.push({
					index: userShips.length + 1,
					length: Number(length),
					ship,
					surrounding,
				});

				ship.forEach((space) => {
					user[getIndex(space)][0] = true;
					user[getIndex(space)][2] = userShips.length;
				});

				this.setState({
					userShips,
					user,
					shipToPlace: [],
				});

				//reopen ship modal if theres still ships to be placed
				if (userShips.length === 10) {
					setTimeout(() => {
						this.setState({
							allShipsPlaced: true,
							usersTurn: true,
						});
					}, 500);
				} else {
					setTimeout(() => {
						this.setState({ isShipModalOpen: true });
					}, 300);
				}
			}
		}
	};

	handleShipPlacement = (length, direction) => {
		switch (Number(length)) {
			case 4:
				this.setState({ length4: this.state.length4 - 1 });
				break;
			case 3:
				this.setState({ length3: this.state.length3 - 1 });
				break;
			case 2:
				this.setState({ length2: this.state.length2 - 1 });
				break;
			case 1:
				this.setState({ length1: this.state.length1 - 1 });
				break;
			default:
				console.log('error in handleShipPlacement switch');
		}
		this.setState({ isShipModalOpen: false });
		this.setState({ shipToPlace: [length, direction] });
	};

	handleAttack = (e, index) => {
		//copy computer board because thats what were attacking
		const computer = [...this.state.computer];
		if (
			this.state.attackCounter < 1 &&
			!this.state.gameOver &&
			computer[index][1] === false
		) {
			//using attack counter to ensure only 1 attack per turn
			this.setState({ attackCounter: this.state.attackCounter + 1 });
			//computer[index][0] = occupied by ship, [1] = has been damaged
			//if attack hits ship, allow for another turn
			if (computer[index][0] === true) {
				computer[index][1] = true;
				this.setState({
					computer,
				});

				this.setState({ attackCounter: 0 });
				this.checkForSunkenShip(
					this.state.computer,
					computer[index][2],
					'user',
				);
				this.checkForWinner();
				//if not, dont allow for another turn
			} else {
				computer[index][1] = true;
				this.setState({
					computer,
				});

				setTimeout(() => {
					this.checkForWinner();
					this.setState({ usersTurn: false, attackCounter: 0 });
					this.computerAttack();
				}, 1000);
				this.checkForSunkenShip(
					this.state.computer,
					computer[index][2],
					'user',
				);
			}
		}
	};

	computerAttack = () => {
		const user = [...this.state.user];
		let computerAttackCounter = this.state.computerAttackCounter;

		const userShipCoordinates = this.state.userShips.map((i) => i.ship);
		const flatCoordinates = [].concat(...userShipCoordinates);
		const userShipIndexes = flatCoordinates.map((coord) => getIndex(coord));

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
					}, 750);
					setTimeout(() => {
						this.checkForSunkenShip(
							this.state.user,
							user[spaceToAttack][2],
							'computer',
						);
						this.checkForWinner();
					}, 750);
					setTimeout(() => {
						this.computerAttack();
					}, 750);
					break;
					//available to attack
				} else if (user[spaceToAttack][1] === false) {
					setTimeout(() => {
						user[spaceToAttack][1] = true;
						this.setState({ user });
					}, 750);
					setTimeout(() => {
						this.checkForSunkenShip(
							this.state.user,
							user[spaceToAttack][2],
							'computer',
						);
						this.checkForWinner();
					}, 750);

					setTimeout(() => {
						this.setState({ usersTurn: true });
					}, 1500);
					break;
				}
			}
		};

		const cheatAttack = () => {
			while (true) {
				let shipToAttack = generateRandomNum(userShipIndexes.length);

				console.log(userShipIndexes);

				if (user[userShipIndexes[shipToAttack]][1] === false) {
					user[userShipIndexes[shipToAttack]][1] = true;
					setTimeout(() => {
						this.setState({ user });
						this.checkForSunkenShip(
							this.state.user,
							user[userShipIndexes[shipToAttack]][2],
							'computer',
						);
						this.checkForWinner();
					}, 750);
					setTimeout(() => {
						this.computerAttack();
					}, 750);
					break;
				}
			}
		};

		const incrementAttackCounter = () => {
			this.setState({ computerAttackCounter: computerAttackCounter + 1 });
		};

		//checks for difficulty
		if (this.state.difficulty === 'easy' && !this.state.gameOver) {
			incrementAttackCounter();
			attack();
		} else if (this.state.difficulty === 'medium' && !this.state.gameOver) {
			//medium - every 3rd attack is a cheat
			if (this.state.computerAttackCounter % 5 === 0) {
				incrementAttackCounter();
				cheatAttack();
			} else {
				incrementAttackCounter();
				attack();
			}
		} else if (this.state.difficulty === 'hard' && !this.state.gameOver) {
			//hard - every 2nd attack is a cheat
			if (this.state.computerAttackCounter % 2 === 0) {
				incrementAttackCounter();
				cheatAttack();
			} else {
				incrementAttackCounter();
				attack();
			}
		}
	};

	//TODO - fix this garbage
	checkForSunkenShip = (board, shipIndex, userOrComputer) => {
		//filter out if it hit a ship or not
		if (shipIndex === 0) {
			return;
		}

		//put all paces related to ship in an array
		const ship = board.filter((space) => {
			return space[2] === shipIndex;
		});

		//check if all spaces have been hit
		const sunk = ship.every((space) => space[1]);

		//user attack
		if (sunk && userOrComputer === 'user') {
			this.state.computerShips[shipIndex - 1].surrounding.forEach((i) => {
				board[i][1] = true;
			});

			this.setState({ computer: board });
			//computer attack
		} else if (sunk && userOrComputer === 'computer') {
			this.state.userShips[shipIndex - 1].surrounding.forEach((i) => {
				board[i][1] = true;
			});

			this.setState({ user: board });
		}
	};

	checkForWinner = () => {
		if (!this.state.gameOver) {
			const { user, computer } = this.state;

			const userShips = user.filter((space) => space[0] === true);
			const computerShips = computer.filter((space) => space[0] === true);

			const computerWin = userShips.every((ship) => ship[1]);
			const userWin = computerShips.every((ship) => ship[1]);

			if (userWin) {
				this.setState({
					gameOver: true,
					winner: 'user',
					isShipModalOpen: false,
					isModalOpen: false,
				});
			} else if (computerWin) {
				this.setState({
					gameOver: true,
					winner: 'computer',
					isShipModalOpen: false,
					isModalOpen: false,
				});
			}
		}
	};

	displayTurnKeeper = () => {
		if (this.state.allShipsPlaced) {
			return this.state.usersTurn ? '<' : '>';
		}
	};

	flipBoard = () => {
		this.setState({ usersTurn: !this.state.usersTurn });
	};

	newGame = () => {
		this.getInitialState();
	};

	render() {
		return (
			<React.Fragment>
				{this.state.gameOver ? (
					<EndGameModal
						winner={this.state.winner}
						newGame={this.newGame}
						gameOver={this.state.gameOver}
					/>
				) : null}

				{this.state.isModalOpen ? (
					<StartGameModal
						setUserSettings={this.setUserSettings}
						isModalOpen={this.state.isModalOpen}
					/>
				) : null}

				{this.state.isShipModalOpen ? (
					<ShipModal
						handleShipPlacement={this.handleShipPlacement}
						isShipModalOpen={this.state.isShipModalOpen}
						length1={this.state.length1}
						length2={this.state.length2}
						length3={this.state.length3}
						length4={this.state.length4}
					/>
				) : null}

				<div className='turn-keeper'>
					<h2>{this.state.username ? this.state.username : 'you'}</h2>
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

				{this.state.allShipsPlaced ? (
					<Controls
						usersTurn={this.state.usersTurn}
						flipBoard={this.flipBoard}
						newGame={this.newGame}
					/>
				) : null}
			</React.Fragment>
		);
	}
}

export default App;
