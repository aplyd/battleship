import React, { Component } from 'react'

export class Ship extends Component {
    constructor() {
        this.state = {
            length:'',
            damage: [, , , ],
            sunk: '',
            location: ''
        }
    }

    hit = () => {
        //location of hit should be passed down from gameboard, then up to damage
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Ship
