import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(this.props.boardSize).fill(null),
      nextPlayer: 'X',
      won: false,
    };
  }

  handleClick(i) {
    if(this.state.won) {
      this.setState({
        squares: Array(this.props.boardSize).fill(null),
        nextPlayer: 'X',
        won: false,
      });
    } else if(this.state.squares[i] == null) {
      const squares = this.state.squares.slice();
      squares[i] = this.state.nextPlayer;
      let nextPlayer = this.state.nextPlayer === 'X' ? 'O' : 'X';
      let winner = this.checkWinner(squares);
      this.setState({
        squares: squares,
        nextPlayer: nextPlayer,
        won: winner !== undefined
      });
    }
  }

  checkWinner(squares) {
    for(let i = 0; i < this.props.boardSize; i++) {
      // check row and top-left-to-bottom-right diag for winner
      let startIdx = i * this.props.boardSize;
      let startPlayer = squares[startIdx];
      let won = true;
      let diagWon = i === 0;
      if(i === 0) console.log('checking diagonal...');
      for(let j = 1; j < this.props.boardSize; j++) {
        let idx = startIdx + j;
        if(squares[idx] !== startPlayer) {
          won = false;
        }
        if(diagWon) {
          diagWon = squares[j*(this.props.boardSize + 1)] === startPlayer;
        }
        if(!won && !diagWon) break;
      }
      if(won || diagWon) {
        return startPlayer;
      }
      
      // check column and top-right-to-bottom-left diag for winner
      startPlayer = squares[i];
      won = true;
      diagWon = i === this.props.boardSize - 1;
      for(let j = 1; j < this.props.boardSize; j++) {
        let idx = i + j*this.props.boardSize;
        if(squares[idx] !== startPlayer) {
          won = false;
        }
        if(diagWon) {
          diagWon =
            squares[(j + 1)*(this.props.boardSize - 1)] === startPlayer;
        }
        if(!won && !diagWon) break;
      }
      if(won || diagWon) {
        return startPlayer;
      }
    }
    return null;
  }

  renderSquare(i) {
    return (
      <Square
        key={"square-" + i}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}/>
    );
  }

  render() {
    const winner = this.checkWinner(this.state.squares);
    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + this.state.nextPlayer;
    }
    
    let boardContents = [<div key="game-status" className='status'>{status}</div>];
    for(let i = 0; i < this.props.boardSize; i++) {
      let boardRowContents = [];
      for(let j = 0; j < this.props.boardSize; j++) {
        boardRowContents.push(this.renderSquare(i*this.props.boardSize + j));
      }
      let boardRow = <div key={"board-row-" + i} className='board-row'>{boardRowContents}</div>;
      boardContents.push(boardRow);
    }
    let boardJSX = <div>{boardContents}</div>

    return boardJSX;
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board boardSize={4} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
