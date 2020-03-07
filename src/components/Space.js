import React, { Component } from 'react'

export class Space extends Component {
    constructor() {
        super();
        this.state = {
            hit: false,
            occupied: true
        }
    }

    handleClick = () => {
        this.setState({
            hit: !this.state.hit
        })
    }

    render() {
        return (
            <div onClick={this.handleClick} style={{backgroundColor: this.state.hit ? 'red' : 'grey'}}>
                <p>{this.props.index}</p>
            </div>
        )
    }
}

export default Space
