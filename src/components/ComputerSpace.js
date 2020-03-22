import React, { Component } from 'react';

export class ComputerSpace extends Component {
	//game begin:
	//dark blue = missile
	//red = damage

	setStyle = () => {
		let styles = {};

		if (this.props.damage && this.props.ship) {
			const damage = {
				backgroundColor: '#a35252',
			};
			styles = Object.assign(styles, damage);
		} else if (this.props.damage) {
			const ship = {
				backgroundColor: '#4B6672',
			};
			styles = Object.assign(styles, ship);
		}

		return styles;
	};

	render() {
		return (
			<div
				onClick={(e) => this.props.handleAttack(e, this.props.index)}
				style={this.setStyle()}
				role='presentation'
				// style={ this.props.ship ? {backgroundColor: 'black'} : {backgroundColor: 'grey'} }
			>
				<p>{this.props.index}</p>
			</div>
		);
	}
}

export default ComputerSpace;
