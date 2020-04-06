import React, { Component } from 'react';

export class Controls extends Component {
	render() {
		return (
			<div className='controls-container'>
				<button
					className='view-other-gameboard'
					type='button'
					onClick={this.props.flipBoard}
				>
					{this.props.usersTurn ? 'view my ships' : 'view opponent'}
				</button>
			</div>
		);
	}
}

export default Controls;
