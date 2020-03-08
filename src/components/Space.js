import React, { Component } from 'react'

export class Space extends Component {

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
                backgroundColor: 'black'
            }
            styles = Object.assign(styles, ship)
        }

        return styles;
    }

    render() {
        return (
            <div onClick={(e) => this.props.handleSpaceClick(e, this.props.index)} 
            className="space"
            style={this.setStyle()}
            // style={ this.props.ship ? {backgroundColor: 'black'} : {backgroundColor: 'grey'} }
            >
                <p>{this.props.index}</p>
            </div>
        )
    }
}

export default Space
