import React, { Component } from 'react'
import Space from './Space'


export class Gameboard extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }

    

    render() {
        return (
            <div id="gameboard">
                {this.props.user.map((space, index) => {
                    return <Space index={index} key={index} handleSpaceClick={this.props.handleSpaceClick}> {space} </Space>
                })}
            </div>
        )
    }
}

export default Gameboard
