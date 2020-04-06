import React, { Component } from 'react';

export class EndGameModal extends Component {
	render() {
		return (
			<div className='modal-background end-game-modal'>
				<div
					className='end-game-display'
					onClick={this.props.newGame}
					role='presentation'
				>
					<h2>
						{this.props.winner === 'user' ? 'you won' : 'you lost'}
					</h2>
					<p>(click anywhere to play again)</p>
				</div>
			</div>
		);
	}
}

export default EndGameModal;
