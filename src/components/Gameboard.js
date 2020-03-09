import React, { Component } from 'react'
import Space from './Space'


export class Gameboard extends Component {

    render() {
        return (
            <div id="gameboard">
                {this.props.usersTurn
                ? 
                this.props.user.map((space, index) => {
                    return <Space 
                        index={index} 
                        key={index} 
                        handleSpaceClick={this.props.handleSpaceClick}
                        ship={space[0]}
                        damage={space[1]}
                        />
                })
                :
                this.props.computer.map((space, index) => {
                    return <Space 
                        index={index} 
                        key={index} 
                        handleSpaceClick={this.props.handleSpaceClick}
                        ship={space[0]}
                        damage={space[1]}
                        />
                })}

                {}
            </div>
        )
    }
}

export default Gameboard
