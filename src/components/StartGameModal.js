import React, { Component } from 'react';

export class StartGameModal extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			value: 'easy',
		};
	}

	handleChange = (event) => {
		this.setState({ name: event.target.value });
	};

	handleDifficultyChange = (event) => {
		this.setState({ value: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		this.props.setUserSettings(this.state.name, this.state.value);

		this.setState({ name: '' });
	};

	render() {
		return (
			<div className='modal-background'>
				<div className='modal'>
					<h1>battleship</h1>
					<form onSubmit={this.handleSubmit}>
						<input
							type='text'
							value={this.state.name}
							onChange={this.handleChange}
							placeholder='Name'
						></input>

						<label>
							difficulty:
							<select
								value={this.state.value}
								onChange={this.handleDifficultyChange}
							>
								<option value='easy'>Easy</option>
								<option value='medium'>Medium</option>
								<option value='hard'>Hard</option>
							</select>
						</label>

						<button type='submit'>play</button>
					</form>
				</div>
			</div>
		);
	}
}

export default StartGameModal;
