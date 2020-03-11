import React, { Component } from 'react'

import './App.css'

import Gameboard from './components/Gameboard'
import StartGameModal from './components/StartGameModal';

import { generateComputer, generateBoard, generateComputerAttackArr } from './gameEngine';

//TODO - implement "go again" if hit a ship

export class App extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: true,
      username: '',
      user: null,
      computer: null,
      computerAttacks: [],
      computerAttackCounter: 0,
      allShipsPlaced: false,
      placedShipCounter: 15,
      usersTurn: false,
      attackCounter: 0,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.placedShipCounter === 19) {
      setTimeout(() => {
        this.setState({ 
          allShipsPlaced: true, 
          usersTurn: true
      })}, 2000)
      
    }
  }

  UNSAFE_componentWillMount = () => {
    this.getInitialState();
  }


  getInitialState = () => {
    const user = generateBoard();
    const computer = generateComputer();
    const computerAttacks = generateComputerAttackArr();
    this.setState({ user, computer, computerAttacks });
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
    if (this.state.placedShipCounter <= 19 && user[index][0] === false) {
      user[index][0] = true;
      this.setState({
        user,
        placedShipCounter: this.state.placedShipCounter + 1,
      })
    }
  }
  
  handleAttack = (e, index) => {
    //using attack counter to ensure only 1 attack per turn 
    this.setState({ attackCounter:  this.state.attackCounter + 1})
    if (this.state.attackCounter < 1) {
      //copy computer board because thats what were attacking
      const computer = [...this.state.computer]

      computer[index][1] = true;
      this.setState({
        computer
      })

      setTimeout(() => {
        this.setState({ usersTurn: false, attackCounter: 0 })
        this.computerAttack();
      }, 3000)

    }
  }

  computerAttack = () => {
    //copy user board because thats what computer is attacking
    const user = [...this.state.user];

    setTimeout(() => {
      user[this.state.computerAttacks[this.state.computerAttackCounter]][1] = true;
      this.setState({ 
        user,
        computerAttackCounter: this.state.computerAttackCounter + 1 
      })
    }, 1500)
    
    setTimeout(() => {
        this.setState({ usersTurn: true })
    }, 4500)
    
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
