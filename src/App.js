import React, { Component } from 'react'
import './App.css'

import Gameboard from './components/Gameboard'
import StartGameModal from './components/StartGameModal';

import { generateComputer, generateBoard } from './gameEngine';


export class App extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      username: '',
      user: null,
      computer: null,
      allShipsPlaced: false,
      placedShipCounter: 0,
    }
  }

  UNSAFE_componentWillMount = () => {
    this.getInitialState();
  }

  getInitialState = () => {
    const user = generateBoard();
    const computer = generateComputer();
    this.setState({ user, computer })
  }
  
  getUserName = (name) => {
    this.setState({ 
      username: name,
    })
    this.toggleStartGameModal()
  }

  toggleStartGameModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen})
  }

  handleSpaceClick = (e, index) => {

    //need to deep copy with JSON stringify so it doesn't update state directly
    //im an idiot and like using objects in arrays in state
    const tempState = JSON.stringify(this.state.user)
    const newState = JSON.parse(tempState)

    //here we handle placing the ships until all 20 are placed
    if (!this.state.allShipsPlaced) {
      newState[index].ship = true;
      newState.placedShipCounter++;
    }

    this.setState({ user: newState })
    console.log(newState[0].ship)
    console.log(this.state.user[0].ship)
}
  

  render() {
    return (
      <React.Fragment>

        {this.state.isModalOpen 
        ? <StartGameModal getUserName={this.getUserName} /> 
        : null}

        <div id="gameboard-container">
          <Gameboard user={this.state.user} handleSpaceClick={this.handleSpaceClick}/>
        </div>
        

      </React.Fragment>
    )
  }
}

export default App
