import React, { Component } from 'react';
import UserSpace from './UserSpace';
import ComputerSpace from './ComputerSpace';

export class Gameboard extends Component {
	//cant get this to work so i just conditionally map each instead
	//not sure why that works and this wont
	// turn = !this.props.usersTurn ? this.props.user : this.props.computer

	render() {
		return (
			<React.Fragment>
				<div id='gameboard'>
					{/* {console.log(this.turn)}
                    {this.turn.map((space, index) => {
                        return <UserSpace 
                            index={index} 
                            key={index} 
                            handleSpaceClick={this.props.handleSpaceClick}
                            //space[0] = ship is placed in that space
                            //space[1] = space has been hit by missile
                            ship={space[0]}
                            damage={space[1]}
                            />
                    })} */}
					{!this.props.usersTurn
						? this.props.user.map((space, index) => {
								return (
									<UserSpace
										index={index}
										key={index}
										handleSpaceClick={
											this.props.handleSpaceClick
										}
										//space[0] = ship is placed in that space
										//space[1] = space has been hit by missile
										ship={space[0]}
										damage={space[1]}
									/>
								);
						  })
						: this.props.computer.map((space, index) => {
								return (
									<ComputerSpace
										index={index}
										key={index}
										handleAttack={this.props.handleAttack}
										ship={space[0]}
										damage={space[1]}
									/>
								);
						  })}
				</div>
			</React.Fragment>
		);
	}
}

export default Gameboard;
