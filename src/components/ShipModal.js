import React, { Component } from 'react';

export class ShipModal extends Component {
	constructor() {
		super();
		this.state = {
			length4: 1,
			length3: 2,
			length2: 3,
			length1: 4,
		};
	}

	handleClick = (event) => {
		const { shipLength, shipDirection } = event.target.dataset;

		switch (Number(shipLength)) {
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
				console.log('error in shipModal switch');
		}

		this.props.handleShipPlacement(shipLength, shipDirection);
	};

	render() {
		return (
			<div className='modal-background'>
				<div className='modal ship-select-modal'>
					<h2>select a ship to place on the map</h2>

					<div className='ship-selection-container'>
						<div
							onClick={this.handleClick}
							className='ship ship-v4'
							data-ship-length='4'
							data-ship-direction='vertical'
							role='button'
							tabIndex='-40'
							style={this.state.length4 ? null : disabled}
						></div>
						<div
							className='ship ship-v3'
							data-ship-length='3'
							data-ship-direction='vertical'
							onClick={this.handleClick}
							role='button'
							tabIndex='-41'
							style={this.state.length3 ? null : disabled}
						></div>
						<div
							className='ship ship-v2'
							data-ship-length='2'
							data-ship-direction='vertical'
							onClick={this.handleClick}
							role='button'
							tabIndex='-42'
							style={this.state.length2 ? null : disabled}
						></div>
						<div
							className='ship ship-h4'
							data-ship-length='4'
							data-ship-direction='horizontal'
							onClick={this.handleClick}
							role='button'
							tabIndex='-43'
							style={this.state.length4 ? null : disabled}
						></div>
						<div
							className='ship ship-h3'
							data-ship-length='3'
							data-ship-direction='horizontal'
							onClick={this.handleClick}
							role='button'
							tabIndex='-44'
							style={this.state.length3 ? null : disabled}
						></div>
						<div
							className='ship ship-h2'
							data-ship-length='2'
							data-ship-direction='horizontal'
							onClick={this.handleClick}
							role='button'
							tabIndex='-45'
							style={this.state.length2 ? null : disabled}
						></div>
						<div
							className='ship ship-h1'
							data-ship-length='1'
							data-ship-direction='horizontal'
							onClick={this.handleClick}
							role='button'
							tabIndex='-46'
							style={this.state.length1 ? null : disabled}
						></div>
					</div>
				</div>
			</div>
		);
	}
}

const disabled = {
	backgroundColor: 'black',
	pointerEvents: 'none',
	outline: 'none',
};

export default ShipModal;
