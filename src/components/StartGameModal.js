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
						<p className='difficulty'>difficulty:</p>
						<div
							onChange={this.handleDifficultyChange}
							className='difficulty-select'
						>
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
						<p>dark mode:</p>*/}
						<button type='submit'>play</button>
					</form>
					<p className='about-info'>
						made by austin ftacnik{' '}
						<a
							href='https://github.com/aplyd/battleship'
							target='_blank'
						>
							github
						</a>{' '}
						<a
							href='https://twitter.com/austinftacnik'
							target='_blank'
						>
							twitter
						</a>
					</p>
				</div>
			</div>
		);
	}
}

export default StartGameModal;
