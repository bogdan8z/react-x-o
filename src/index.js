import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {AppTestMe1} from './sample1-stateless.js';
import TestMe2 from './sample2-stateful.js';

//Game->Restart
//    ->Board  ->Square

//when we dont have state: we can define function instead of class
const Square = (props) => {    
    return (
      <button 
          className="square"  
          onClick={() => props.onClick()}
      >
        {props.innerValue}
      </button>
    )
  }
  
class Board extends React.Component {  
  handleClick(i){
    const squares = this.props.squares.slice()
    
    var winner = this.calculateWinner(squares)

    if(!!winner || squares[i]){
        return
    }
    
    squares[i] = this.nextValue()
    
    this.props.onSaveSquares(squares)
  }

  nextValue() {return !!this.props.xIsNext ?  'X' : 'O'}

  calculateWinner(squares) {
      const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ]
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i]
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
          }
        }
        return null
  }

  renderSquare(i) {    
    return <Square
      innerValue={this.props.squares[i]}
      onClick={() => this.handleClick(i)}
    />
  }   

  render() {      
      let status = 'Next player: ' + this.nextValue()
      var winner = this.calculateWinner(this.props.squares)

      if(!!winner){
          status = 'Winner: '+ winner
      }
      else if(!this.props.squares.includes(null)){
          status = "Game Over!"
      }

      return (
          <div>
          <div className="status">{status}</div>
          <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
          </div>
          <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
          </div>
          <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
          </div>
          </div>
        )
  }
}

class Restart extends React.Component{
  handleClick = (e) => {
    this.props.onRestart(e)
  }

  render(){
    return (
    <button 
    onClick={this.handleClick}>
    Restart the game</button>
    )
  }
}

 class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      boardSquares: Array(9).fill(null),
      xIsNext:true
    }
  }

  handleRestart = (e) =>  this.setState({
        boardSquares:Array(9).fill(null),
        xIsNext: true
      })

  handleUpdateSquares = (squares) => this.setState({
      boardSquares:squares,
      xIsNext: !this.state.xIsNext
    })

  render() {      
    return (
      [
      <div className="game" key="game">
        <div className="game-board">
          <Board xIsNext={this.state.xIsNext} squares={this.state.boardSquares} onSaveSquares={this.handleUpdateSquares}  />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol  >
          <Restart key="test3"
              onRestart={this.handleRestart}
            />
          </ol>
        </div>
      </div>,
      <AppTestMe1  key="test1" />,
      <TestMe2  key="test2" />        
    ]
    )
  }
}
  
// ========================================
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
