import React, { Component } from 'react'
import Space from './Space'
import { selectRandomPositions } from './gameEngine';

export class Gameboard extends Component {
    constructor() {
        super();
        this.state = {
            userBoard: [...Array(99), false],
            userPositions: [],
            userShots: [],

            computerBoard: [],
            computerPositions: [],
            computerShots: [],
        }
    }

    render() {
        return (
            <div id="gameboard">
                {this.state.userBoard.map((space, index) => {
                    return <Space index={index} key={index}> {space} </Space>
                })}
            </div>
        )
    }
}

export default Gameboard
