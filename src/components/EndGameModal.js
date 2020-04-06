import React, { Component } from 'react';

export class EndGameModal extends Component {
	render() {
		return (
			<div
				className='modal-background'
				onClick={this.props.newGame}
				role='presentation'
			>
				<h2>{this.props.winner === 'user' ? 'you won' : 'you lost'}</h2>
			</div>
		);
	}
}

export default EndGameModal;
