import React, { Component } from 'react';
import { getCoordinate } from '../gameEngine';

export class UserSpace extends Component {
	//place ships: click = gray

	//game begin: click = dark blue for attack
	//if hit computer ship: red/damage

	setStyle = () => {
		let styles = {};

		if (this.props.damage && this.props.ship) {
			const damage = {
				backgroundColor: '#a35252',
			};
			styles = Object.assign(styles, damage);
		} else if (this.props.damage) {
			const damage = {
				backgroundColor: 'rgba(0, 0, 0, .2)',
			};
			styles = Object.assign(styles, damage);
		} else if (this.props.ship) {
			const ship = {
				backgroundColor: '#8e8e8e',
			};
			styles = Object.assign(styles, ship);
		}

		return styles;
	};

	render() {
		return (
			<div
				onClick={(e) =>
					this.props.handleSpaceClick(e, this.props.index)
				}
				style={this.setStyle()}
				role='presentation'
				// style={ this.props.ship ? {backgroundColor: 'black'} : {backgroundColor: 'grey'} }
			>
				{/* <p>
					{this.props.index}{' '}
					<b style={{ color: 'grey' }}>
						{getCoordinate(this.props.index)}
					</b>
				</p> */}
			</div>
		);
	}
}

export default UserSpace;
