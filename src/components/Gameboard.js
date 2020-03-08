import React, { Component } from 'react'
import Space from './Space'


export class Gameboard extends Component {

    render() {
        return (
            <div id="gameboard">
                {this.props.user.map((spaceOnTheBoard, index) => {
                    return <Space 
                        index={index} 
                        key={index} 
                        handleSpaceClick={this.props.handleSpaceClick}
                        ship={spaceOnTheBoard[0]}
                        damage={spaceOnTheBoard[1]}
                        />
                })}
            </div>
        )
    }
}

export default Gameboard
