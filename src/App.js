import React, { Component } from 'react'

import './App.css'

import Gameboard from './components/Gameboard'
import StartGameModal from './components/StartGameModal';

import { generateComputer, generateBoard } from './gameEngine';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: true,
      username: '',
      user: null,
      computer: null,
      allShipsPlaced: false,
      placedShipCounter: 16,
      usersTurn: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.placedShipCounter === 19) {
      this.setState({ 
        allShipsPlaced: true, 
        usersTurn: true
      })
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

    //placing the ships until all 20 are placed
    if (this.state.placedShipCounter <= 19) {
      user[index][0] = true;
      this.setState({
        user,
        placedShipCounter: this.state.placedShipCounter + 1,
      })
    }
  }
  
  handleAttack = (e, index) => {
    const computer = [...this.state.computer]
    console.log('hanlde attack')

    computer[index][1] = true;
    this.setState({
      computer
    })

    setTimeout(() => {
      // this.setState({ usersTurn: true })
    }, 3000)
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isModalOpen 
        ? <StartGameModal getUserName={this.getUserName} /> 
        : null}

        <div id="gameboard-container">
          <Gameboard user={this.state.user} 
                    handleSpaceClick={this.handleSpaceClick} 
                    computer={this.state.computer} 
                    usersTurn={this.state.usersTurn}
                    handleAttack={this.handleAttack}
                    />
        </div>
        

      </React.Fragment>
    )
  }
}

export default App
