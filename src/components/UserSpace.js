import React, { Component } from 'react'

export class UserSpace extends Component {

    //place ships: click = gray

    //game begin: click = black for attack
    //if hit computer ship: red/damage

    setStyle = () => {
        let styles = {};    

        if (this.props.damage) {
            const damage = {
                backgroundColor: 'red'
            }
            styles = Object.assign(styles, damage)
        }
        if (this.props.ship) {
            const ship = {
                backgroundColor: '#8e8e8e'
            }
            styles = Object.assign(styles, ship)
        }

        return styles;
    }

    render() {
        return (
            <div onClick={(e) => this.props.handleSpaceClick(e, this.props.index)} 
            style={this.setStyle()}
            // style={ this.props.ship ? {backgroundColor: 'black'} : {backgroundColor: 'grey'} }
            >
                <p>{this.props.index}</p>
            </div>
        )
    }
}

export default UserSpace
