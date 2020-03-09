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
      usersTurn: true,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.placedShipCounter >= 20) {
      this.setState({ allShipsPlaced: true })
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
    const user = [...this.state.user]

    //here we handle placing the ships until all 20 are placed
    if (this.state.placedShipCounter < 20) {
      user[index][0] = true;
      this.state.placedShipCounter++;
      this.setState({user})
    }
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
