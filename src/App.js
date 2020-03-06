import React, { Component } from 'react'
import './App.css'

import Gameboard from './components/Gameboard'
import StartGameModal from './components/StartGameModal';

export function works (message) {
  return message;
}

export class App extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: true,
      username: ''
    }
  }

  getUserName = (name) => {
    this.setState({ username: name })
    this.toggleStartGameModal()
  }

  toggleStartGameModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen})
  }

  render() {
    return (
      <React.Fragment>

        {this.state.isModalOpen 
        ? <StartGameModal getUserName={this.getUserName}/> 
        : null}

        <div id="gameboard-container">
          <Gameboard />
        </div>
        

      </React.Fragment>
    )
  }
}

export default App
