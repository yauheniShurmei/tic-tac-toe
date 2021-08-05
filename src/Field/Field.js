import React, { Component } from "react";
import Square from "../Square/Square";
import classes from "./Field.module.css";
import Player from "../Player/Player";
import History from "../HIstory/History";
// const History = React.lazy(() => import "../HIstory/History");
import NavBar from "../NavBar/NavBar";
import axios from "axios";

const EMPTY = 0;
const CIRCLE = 1;
const CROSS = 2;

class Field extends Component {
  state = {
    squares: [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    isCircle: false,
    isWin: false,
    circle: 0,
    cross: 0,
    isStartGame: false,
    squareOfWin: [],
    isStandoff: false,
    isHistoryShow: false,
    isSave: false,
    player1: "player1",
    player2: "player2",
    listOfWinner: [],
  };

  clickedOnSquare = (index) => {
    if (this.state.squares[index] !== EMPTY || this.state.isWin) {
      return;
    }
    const copySquares = [...this.state.squares];
    copySquares[index] = !this.state.isCircle ? CIRCLE : CROSS;
    this.setState(
      { squares: copySquares, isCircle: !this.state.isCircle },
      () => {
        this.checkingOfWinner();
      }
    );
  };

  //   changeStateIsWin = () => {
  //     if (this.state.squares.indexOf(0) === -1 && !this.state.isWin) {
  //     }
  //   };

  checkingOfStandoff = () => {
    if (this.state.squares.indexOf(0) === -1 && !this.state.isWin) {
      this.setState({ isStandoff: true });
    }
    this.getTheName();
  };

  whoWon = (index) => {
    if (this.state.squares[index] === 1) {
      this.setState({ circle: this.state.circle + 1 });
    } else {
      this.setState({ cross: this.state.cross + 1 });
    }
  };

  checkingOfWinner = () => {
    if (
      this.state.squares.reduce((sum, el) => {
        return sum + el;
      }) === 1
    ) {
      this.setState({ isStartGame: true });
    }

    for (let x = 0; x < 3; x++) {
      if (
        this.state.squares[x * 3] === this.state.squares[x * 3 + 1] &&
        this.state.squares[x * 3] === this.state.squares[x * 3 + 2]
      ) {
        if (this.state.squares[x * 3] !== EMPTY) {
          this.setState({
            isWin: !this.state.isWin,
            squareOfWin: [x * 3, x * 3 + 1, x * 3 + 2],
          });
          this.whoWon(x * 3);
          return;
        }
      }
    }

    for (let y = 0; y < 3; y++) {
      if (
        this.state.squares[0 * 3 + y] === this.state.squares[1 * 3 + y] &&
        this.state.squares[0 * 3 + y] === this.state.squares[2 * 3 + y]
      ) {
        if (this.state.squares[y] !== EMPTY) {
          this.setState({
            isWin: !this.state.isWin,
            squareOfWin: [y, 3 + y, 6 + y],
          });
          this.whoWon(y);
          return;
        }
      }
    }

    if (this.state.squares[4] !== EMPTY) {
      if (
        this.state.squares[0] === this.state.squares[4] &&
        this.state.squares[0] === this.state.squares[8]
      ) {
        this.setState({ isWin: !this.state.isWin, squareOfWin: [0, 4, 8] });
        this.whoWon(4);
        return;
      }

      if (
        this.state.squares[2] === this.state.squares[4] &&
        this.state.squares[2] === this.state.squares[6]
      ) {
        this.setState({ isWin: true, squareOfWin: [2, 4, 6] }, () => {
          this.checkingOfStandoff();
        });
        this.whoWon(4);
        return;
      }
    }

    if (this.state.squares.indexOf(EMPTY) === -1) {
      // && !this.state.isWin
      this.setState({ isStandoff: true });
      console.log("stadoff");
    }
  };

  newGame = (isNewGame) => {
    if (isNewGame) {
      this.setState({
        squares: [
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
        ],
        isWin: false,
        isCircle: false,
        circle: 0,
        cross: 0,
        squareOfWin: [],
        isStandoff: false,
        isStartGame: false,
      });
      this.saveResult();
    } else {
      this.setState({
        squares: [
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
        ],
        isWin: false,
        isCircle: false,
        squareOfWin: [],
        isStandoff: false,
      });
    }
  };

  showHistory = () => {
    this.setState({ isHistoryShow: !this.state.isHistoryShow });
    if (!this.state.isHistoryShow) {
      axios
        .get("https://kulko-krzyzyk-default-rtdb.firebaseio.com/history.json")
        .then((res) => {
          this.setState({ ...this.state, listOfWinner: res.data });
        })
        .catch();
    }
  };

  saveResult = () => {
    let game = {
      data: new Date().toDateString(),
      id: new Date(),
      player1: this.state.player1,
      player2: this.state.player2,
      player1Count: this.state.circle,
      player2Count: this.state.cross,
    };
    axios
      .post(
        "https://kulko-krzyzyk-default-rtdb.firebaseio.com/history.json",
        game
      )
      .then((res) => {
        console.log(res);
      })
      .catch();
  };

  getTheName = (name, player) => {
    switch (player) {
      case "player1":
        this.setState({ player1: name });
        break;
      case "player2":
        this.setState({ player2: name });
        break;
      default:
        break;
    }
  };

  render() {
    let columns = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <Square
            color={!this.state.isCircle}
            isWin={this.state.squareOfWin.indexOf(i * 3 + j) !== -1}
            isStandoff={this.state.standoff}
            key={i * 3 + j}
            keyValue={i * 3 + j}
            value={this.state.squares[i * 3 + j]}
            onClick={() => this.clickedOnSquare(i * 3 + j)}
          />
        );
      }
      columns[i] = (
        <div key={i} className={classes.Row}>
          {row}
        </div>
      );
    }

    let style =
      this.state.isWin || this.state.isStandoff
        ? { opacity: 1, transition: "opacity 0.5s", whiteSpace: "nowrap" }
        : { opacity: 0, transition: "opacity 0.5s" };

    return (
      <div className={classes.Field}>
        <NavBar onClick={this.showHistory} />
        <div className={classes.NewGame}>
          <button style={style} onClick={() => this.newGame(false)}>
            Next Round
          </button>
          <button style={style} onClick={() => this.newGame(true)}>
            Save Result & New Game
          </button>
        </div>
        <History
          show={this.state.isHistoryShow}
          listOfWinner={this.state.listOfWinner}
        />
        {columns}
        <Player
          name={this.getTheName}
          circle={this.state.circle}
          cross={this.state.cross}
          isWin={this.state.isWin}
          isStart={this.state.isStartGame}
          isSave={this.state.isSave}
        />
      </div>
    );
  }
}

export default React.memo(Field);
