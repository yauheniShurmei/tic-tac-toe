import React, { Component } from "react";
import classes from "./Player.module.css";

class Player extends Component {
  state = {
    player1: "",
    player2: "",
    isWin: this.props.isWin,
    isStart: false,
    isSave: false,
  };

  changeName = (event, player) => {
    switch (player) {
      case "player1":
        this.setState({ player1: event.target.value });
        this.props.name(event.target.value, player);
        break;
      case "player2":
        this.setState({ player2: event.target.value });
        this.props.name(event.target.value, player);
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <div className={classes.Count}>
          <div>{this.props.circle}</div>
          <div>{this.props.cross}</div>
        </div>
        <div className={classes.Players}>
          <input
            disabled={this.props.isStart}
            onChange={(event) => this.changeName(event, "player1")}
            value={this.state.player1}
            placeholder="player 1"
          />
          <input
            disabled={this.props.isStart}
            onChange={(event) => this.changeName(event, "player2")}
            value={this.state.player2}
            placeholder="player 2"
          />
        </div>
      </div>
    );
  }
}

export default Player;
