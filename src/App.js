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

		const isValidPlacement = () => {
			let [length, direction] = this.state.shipToPlace;
			direction === 'vertical'
				? (direction = 'down')
				: (direction = 'right');

			let ship = [];
			ship.unshift(getCoordinate(index));

			for (let i = 0; i < length - 1; i++) {
				ship.unshift(getNextSpace(ship[0]));
			}

			console.log(ship);
		};

		const available = user[index][0] === false;
		if (available) {
			isValidPlacement();
		}

		//check if space clicked is valid
		//not occupied
		//length fits on board
		//surrounding spaces arent occupied

		//store ship placement in userShips

		//place ship on board and reopen ship select modal (10 ships)

		if (this.state.allShipsPlaced) {
			//placing the ships until all 20 are placed
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
		} else {
			//palce ship stuff here
		}
	};

	handleShipPlacement = (length, direction) => {
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
					<ShipModal handleShipPlacement={this.handleShipPlacement} />
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
