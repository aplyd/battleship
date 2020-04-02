import React, { Component } from 'react';

export class ShipModal extends Component {
	render() {
		return (
			<div className='modal-background'>
				<div className='modal'>
					<h2>select a ship to place:</h2>
					<div className='ship-selection-container'>
						<div className='ship ship-v4'></div>
						<div className='ship ship-v3'></div>
						<div className='ship ship-v2'></div>
						<div className='ship ship-h4'></div>
						<div className='ship ship-h3'></div>
						<div className='ship ship-h2'></div>
						<div className='ship ship-h1'></div>
					</div>
				</div>
			</div>
		);
	}
}

export default ShipModal;
