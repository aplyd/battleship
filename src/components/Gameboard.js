import React, { Component } from 'react'
import Space from './Space'

export class Gameboard extends Component {
    constructor() {
        super();
        this.state = {
            board: [...Array(99), false]
        }
    }

    render() {
        return (
            <div id="gameboard">
                {this.state.board.map((space, index) => {
                    return <Space index={index} key={index}> {space} </Space>
                })}
            </div>
        )
    }
}

export default Gameboard
