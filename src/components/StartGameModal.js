import React, { Component } from 'react';

export class StartGameModal extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			difficulty: 'medium',
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
							placeholder='name (optional)'
							autoFocus
						></input>
						<p className='difficulty'>
							<b>difficulty</b>
						</p>
						<div
							onChange={this.handleDifficultyChange}
							className='difficulty-select'
						>
							<label
								style={
									this.state.difficulty === 'easy'
										? selected
										: null
								}
							>
								easy
								<input
									type='radio'
									name='difficulty'
									value='easy'
								/>
								<span className='difficulty-radio'></span>
							</label>
							<label
								style={
									this.state.difficulty === 'medium'
										? selected
										: null
								}
							>
								medium
								<input
									type='radio'
									name='difficulty'
									value='medium'
								/>
								<span className='difficulty-radio'></span>
							</label>
							<label
								style={
									this.state.difficulty === 'hard'
										? selected
										: null
								}
							>
								hard
								<input
									type='radio'
									name='difficulty'
									value='hard'
								/>
								<span className='difficulty-radio'></span>
							</label>
						</div>

						<button type='submit'>play</button>
					</form>
					<p className='about-info'>
						made by austin ftacnik{' '}
						<a
							href='https://github.com/aplyd/battleship'
							target='_blank'
							rel='noopener noreferrer'
						>
							github
						</a>{' '}
						<a
							href='https://twitter.com/austinftacnik'
							target='_blank'
							rel='noopener noreferrer'
						>
							twitter
						</a>
					</p>
				</div>
			</div>
		);
	}
}

const selected = {
	backgroundColor: 'white',
	color: 'black',
	borderRadius: '5px',
};

export default StartGameModal;
