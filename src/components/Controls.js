import React, { Component } from 'react';

export class Controls extends Component {
	render() {
		return (
			<div className='controls-container'>
				<button
					className='view-other-gameboard-btn'
					type='button'
					onClick={this.props.flipBoard}
				>
					{this.props.usersTurn ? 'view ships' : 'view opponent'}
				</button>

				<div></div>
				<button
					className='new-game-btn'
					type='button'
					onClick={this.props.newGame}
				>
					new game
				</button>
			</div>
		);
	}
}

export default Controls;
