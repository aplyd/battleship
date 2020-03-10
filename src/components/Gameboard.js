import React, { Component } from 'react'
import UserSpace from './UserSpace'
import ComputerSpace from './ComputerSpace'
import NewsTicker from './NewsTicker'


export class Gameboard extends Component {

    render() {
        return (
            <React.Fragment>
                <div id="gameboard">
                    {!this.props.usersTurn
                    ? 
                    this.props.user.map((space, index) => {
                        return <UserSpace 
                            index={index} 
                            key={index} 
                            handleSpaceClick={this.props.handleSpaceClick}
                            ship={space[0]}
                            damage={space[1]}
                            />
                    })
                    :
                    this.props.computer.map((space, index) => {
                        return <ComputerSpace 
                            index={index} 
                            key={index} 
                            handleAttack={this.props.handleAttack}
                            ship={space[0]}
                            damage={space[1]}
                            />
                    })}
                    
                </div>
            <NewsTicker />
            </React.Fragment>
        )
    }
}

export default Gameboard
