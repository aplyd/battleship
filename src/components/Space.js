import React, { Component } from 'react'

export class Space extends Component {
    constructor() {
        super();
        this.state = {
            ship: false,
            occupied: true
        }
    }

    // handleClick = () => {
    //     this.setState({
    //         hit: !this.state.hit
    //     })

    //     this.props.handleSpaceClick(this.props.index);
    // }

    render() {
        return (
            <div onClick={(e) => this.props.handleSpaceClick(e, this.props.index)} style={{backgroundColor: this.state.ship ? 'black' : 'grey'}}>
                <p>{this.props.index}</p>
            </div>
        )
    }
}

export default Space
