import React, { Component } from 'react';

export class StartGameModal extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			difficulty: 'medium',
			placement: 'random',
		};
	}

	componentDidMount = () => {
		if (this.props.isModalOpen) {
			document.body.style.overflow = 'hidden';
		}
	};

	componentWillUnmount = () => {
		document.body.style.overflow = 'unset';
	};

	handleChange = (event) => {
		this.setState({ name: event.target.value });
	};

	handleDifficultyChange = (event) => {
		this.setState({ difficulty: event.target.value });
	};

	handleShipPlacementOption = (event) => {
		this.setState({ placement: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		this.props.setUserSettings(
			this.state.name,
			this.state.difficulty,
			this.state.placement,
		);

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
							maxLength='20'
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

						<div>
							<p className='placement'>
								<b>ship placement</b>
							</p>
							<div
								onChange={this.handleShipPlacementOption}
								className='placement-select'
							>
								<label
									style={
										this.state.placement === 'custom'
											? selected
											: null
									}
								>
									custom
									<input
										type='radio'
										name='placement-select'
										value='custom'
									/>
									<span className='placement-select'></span>
								</label>
								<label
									style={
										this.state.placement === 'random'
											? selected
											: null
									}
								>
									random
									<input
										type='radio'
										name='placement-select'
										value='random'
									/>
									<span className='placement-select'></span>
								</label>
							</div>
						</div>

						<button type='submit'>play</button>
					</form>
				</div>
			</div>
		);
	}
}

const selected = {
	backgroundColor: 'white',
	color: '#808080',
	borderRadius: '5px',
	fontWeight: 'bold',
};

export default StartGameModal;
