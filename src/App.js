import React, { Component } from 'react';

import './App.css';

import Gameboard from './components/Gameboard';
import StartGameModal from './components/StartGameModal';

import {
	generateComputerBoard,
	generateBoard,
	generateComputerAttacks,
	getCoordinate,
	getIndex,
	getSurroundingSpaces,
} from './gameEngine';

//TODO - refactor with "state machine"
//TODO - confirm empty spaces (ships cant touch, so surrounding areas empty if ship sinks)

export class App extends Component {
	constructor() {
		super();
		this.state = {
			isModalOpen: true,
			username: '',
			user: null,
			computer: null,
			computerAttacks: [],
			computerAttackCounter: 0,
			allShipsPlaced: false,
			placedShipCounter: 0,
			usersTurn: false,
			attackCounter: 0,
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.placedShipCounter === 19) {
			setTimeout(() => {
				this.setState({
					allShipsPlaced: true,
					usersTurn: true,
				});
			}, 2000);
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

	getUserName = (name) => {
		this.setState({
			username: name,
		});
		this.toggleStartGameModal();
	};

	toggleStartGameModal = () => {
		this.setState({ isModalOpen: !this.state.isModalOpen });
	};

	handleSpaceClick = (e, index) => {
		const user = [...this.state.user];

		//placing the ships until all 20 are placed
		if (this.state.placedShipCounter <= 19 && user[index][0] === false) {
			user[index][0] = true;
			this.setState({
				user,
				placedShipCounter: this.state.placedShipCounter + 1,
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
				}, 3000);
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
			}, 1500);
		} else {
			setTimeout(() => {
				user[attackArr[index]][1] = true;
				this.setState({
					user,
					computerAttackCounter: index + 1,
				});
			}, 1500);

			setTimeout(() => {
				this.setState({ usersTurn: true });
			}, 3000);
		}
	};

	render() {
		return (
			<React.Fragment>
				{this.state.isModalOpen ? (
					<StartGameModal getUserName={this.getUserName} />
				) : null}

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
