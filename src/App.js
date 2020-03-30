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
		const computer = generateComputerBoard();
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
		//copy user board because thats what computer is attacking
		const user = [...this.state.user];
		const attackArr = this.state.computerAttacks;
		const index = this.state.computerAttackCounter;

		////if attack hits ship, allow for another turn
		if (user[attackArr[index]][0] === true) {
			setTimeout(() => {
				user[attackArr[index]][1] = true;
				this.setState({
					user,
					computerAttackCounter: index + 1,
				});
				this.computerAttack();
			}, 1000);
		} else {
			setTimeout(() => {
				user[attackArr[index]][1] = true;
				this.setState({
					user,
					computerAttackCounter: index + 1,
				});
			}, 1000);

			setTimeout(() => {
				this.setState({ usersTurn: true });
			}, 2000);
		}
	};

	setDifficulty = () => {
		//easy is random, medium = every 3rd attack guarentee, hard every 2nd attack guarantee
		const computerAttacks = new Array(20).fill(null);
		if (this.state.difficulty === 'medium') {
			for (let i = 0; i < this.state.userShips.length; i++) {
				if (i % 3 === 0) {
					computerAttacks[i] = this.state.userShips[i];
				}
			}
		}

		//fills in the remainder of computer attacks with random
		for (let i = 0; i < computerAttacks.length; i++) {
			if (computerAttacks[i] === null) {
				while (true) {
					let num = generateRandomNum(100);
					if (computerAttacks.indexOf(num) < 0) {
						computerAttacks[i] = num;
						break;
					}
				}
			}
		}

		this.setState({
			computerAttacks,
		});

		console.log(this.state.userShips);
		console.log(this.state.computerAttacks);
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
