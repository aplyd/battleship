import React, { Component } from 'react'

export class StartGameModal extends Component {
    constructor() {
        super();
        this.state = {
            name: ''
        }
    }

    handleChange = (event) => {
        this.setState({ name: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        
        this.props.getUserName(this.state.name);

        this.setState({ name: '' })
    }

    render() {
        return (
            <div className="modal-background">
                <div className="modal">
                    <h1>battleship</h1>
                    <form onSubmit={this.handleSubmit}>
                                
                    <input type="text" value={this.state.name} onChange={this.handleChange} placeholder="Name"></input>
                        
                    <button type="submit">play</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default StartGameModal
