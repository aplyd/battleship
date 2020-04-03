import React, { Component } from 'react';

export class ShipModal extends Component {
	constructor() {
		super();
		this.state = {
			shipLength4: 1,
			shipLength3: 2,
			shipLength2: 3,
			shipLength1: 4,
		};
	}

	handleClick = (event) => {
		console.log(event.target);
	};

	render() {
		return (
			<div className='modal-background'>
				<div className='modal ship-select-modal'>
					<h2>select a ship to place:</h2>
					<div className='ship-selection-container'>
						<div
							onClick={this.handleClick}
							className='ship ship-v4'
							data-ship-length='4'
							data-ship-direction='vertical'
							role='button'
						></div>
						<div
							className='ship ship-v3'
							data-ship-length='4'
							data-ship-direction='vertical'
							onClick={this.handleClick}
							role='button'
						></div>
						<div
							className='ship ship-v2'
							data-ship-length='4'
							data-ship-direction='vertical'
							onClick={this.handleClick}
							role='button'
							tabIndex='-42'
						></div>
						<div
							className='ship ship-h4'
							data-ship-length='4'
							data-ship-direction='vertical'
							onClick={this.handleClick}
							role='button'
							tabIndex='-43'
						></div>
						<div
							className='ship ship-h3'
							data-ship-length='4'
							data-ship-direction='vertical'
							onClick={this.handleClick}
							role='button'
							tabIndex='-44'
						></div>
						<div
							className='ship ship-h2'
							data-ship-length='4'
							data-ship-direction='vertical'
							onClick={this.handleClick}
							role='button'
							tabIndex='-45'
						></div>
						<div
							className='ship ship-h1'
							data-ship-length='4'
							data-ship-direction='vertical'
							onClick={this.handleClick}
							role='button'
							tabIndex='-46'
						></div>
					</div>
				</div>
			</div>
		);
	}
}

export default ShipModal;
