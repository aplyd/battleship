import React, { Component } from 'react';

import './App.css';

import Gameboard from './components/Gameboard';
import StartGameModal from './components/StartGameModal';
import ShipModal from './components/ShipModal';

import {
	generateComputerBoard,
	generateBoard,
	generateRandomNum,
	getCoordinate,
	getIndex,
	getSurroundingSpaces,
	getNextSpace,
} from './gameEngine';

//TODO - refactor with "state machine"
//TODO - confirm empty spaces (surrounding areas empty if ship sinks)
//TODO - handle user ship placement
//TODO - create announcements for win/lose

//board spaces have 3 options [false, false, 0]. [0] is ship, [1] is damage, [0] is space touching ship
export class App extends Component {
	constructor() {
		super();
		this.state = {
			isModalOpen: false,
			isShipModalOpen: true,
			username: '',
			user: null,
			//FIX - each click is adding to user ships
			userShips: [],
			userPlacedShipCounter: 0,
			computer: null,
			computerShips: [],
			computerAttackCounter: 0,
			allShipsPlaced: false,
			placedShipCounter: 0,
			usersTurn: false,
			attackCounter: 0,
			difficulty: 'easy',
			gameOver: false,
			shipToPlace: [],
			length4: 1,
			length3: 2,
			length2: 3,
			length1: 4,
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.placedShipCounter === 19) {
			setTimeout(() => {
				this.setState({
					allShipsPlaced: true,
					usersTurn: true,
				});
			}, 1500);
		}

		if (this.state.allShipsPlaced) {
			this.checkForWinner();
		}
	}

	UNSAFE_componentWillMount = () => {
		this.getInitialState();
	};

	getInitialState = () => {
		const user = generateBoard();
		const [computer, computerShips] = generateComputerBoard();
		this.setState({ user, computer, computerShips });
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
				console.log(this.state.shipToPlace);
				//first add ship/surrounding to state
				userShips.push({
					index: this.state.userPlacedShipCounter + 1,
					length: Number(length),
					ship,
					surrounding,
				});

				ship.forEach((space) => {
					user[getIndex(space)][0] = true;
				});

				this.setState({
					userShips,
					user,
					userPlacedShipCounter: this.state.userPlacedShipCounter + 1,
					shipToPlace: [],
				});

				setTimeout(() => {
					this.setState({ isShipModalOpen: true });
				}, 500);
			}

			//TODO - move ship length state up to app level component
			//placing the ships until all 20 are placed
		} else {
			// all ships placed so click = attack
			if (
				this.state.placedShipCounter <= 19 &&
				user[index][0] === false
			) {
				user[index][0] = true;
				this.setState({
					user,
					placedShipCounter: this.state.placedShipCounter + 1,
				});
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
				this.checkForSunkenShip(
					this.state.computer,
					computer[index][2],
				);
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
				this.checkForSunkenShip(
					this.state.computer,
					computer[index][2],
				);
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
						this.checkForSunkenShip(
							this.state.user,
							user[spaceToAttack][2],
						);
					}, 1000);
					break;
					//available to attack
				} else if (user[spaceToAttack][1] === false) {
					setTimeout(() => {
						user[spaceToAttack][1] = true;
						this.setState({ user });
						this.checkForSunkenShip(
							this.state.user,
							user[spaceToAttack][2],
						);
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
				console.log(user[this.state.userShips]);
				if (user[this.state.userShips[shipToAttack]][1] === false) {
					user[this.state.userShips[shipToAttack]][1] = true;
					setTimeout(() => {
						this.setState({ user });
						this.computerAttack();
					}, 1000);
					this.checkForSunkenShip(
						this.state.user,
						user[this.state.userShips[shipToAttack]][2],
					);
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
	};

	//TODO - fix this garbage
	checkForSunkenShip = (userOrComputer, shipIndex) => {
		const board = userOrComputer;

		//filter out if it hit a ship or not
		if (shipIndex === 0) {
			console.log('check for sunken ship, didnt hit ship');
			return;
		}

		//put all paces related to ship in an array
		const ship = board.filter((space) => {
			return space[2] === shipIndex;
		});

		//check if all spaces have been hit
		const sunk = ship.every((space) => space[1]);

		if (sunk) {
			this.state.computerShips[shipIndex - 1].surrounding.forEach((i) => {
				board[i][1] = true;
			});

			this.setState({ computer: board });
		}
	};

	checkForWinner = () => {
		if (!this.state.gameOver) {
			const { user, computer } = this.state;

			const userShips = user.filter((space) => space[0] === true);
			const computerShips = computer.filter((space) => space[0] === true);

			const userWin = userShips.every((ship) => ship[1]);
			const computerWin = computerShips.every((ship) => ship[1]);

			if (userWin || computerWin) {
				//announce winner here
				this.setState({ gameOver: true });
			}
		}
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

				{this.state.isShipModalOpen ? (
					<ShipModal
						handleShipPlacement={this.handleShipPlacement}
						length1={this.state.length1}
						length2={this.state.length2}
						length3={this.state.length3}
						length4={this.state.length4}
					/>
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
