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
			const damage = {
				backgroundColor: 'rgba(0, 0, 0, .3)',
			};
			styles = Object.assign(styles, damage);
		}
		return styles;
	};

	render() {
		return (
			<div
				onClick={(e) => this.props.handleAttack(e, this.props.index)}
				style={this.setStyle()}
				role='presentation'
			></div>
		);
	}
}

export default ComputerSpace;
