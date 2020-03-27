import React, { Component } from 'react';

export class StartGameModal extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			difficulty: 'easy',
		};
	}

	handleChange = (event) => {
		this.setState({ name: event.target.value });
	};

	handleDifficultyChange = (event) => {
		this.setState({ difficulty: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		this.props.setUserSettings(this.state.name, this.state.difficulty);

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
						difficulty:
						<div onChange={this.handleDifficultyChange}>
							<label>
								easy
								<input
									type='radio'
									name='difficulty'
									value='easy'
								/>
							</label>
							<label>
								medium
								<input
									type='radio'
									name='difficulty'
									value='medium'
								/>
							</label>
							<label>
								hard
								<input
									type='radio'
									name='difficulty'
									value='hard'
								/>
							</label>
						</div>
						{/* <p>ship color:</p>
						<p>dark mode:</p>

						<p>about me and how i made this</p> */}
						<button type='submit'>play</button>
					</form>
				</div>
			</div>
		);
	}
}

export default StartGameModal;
