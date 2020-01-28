import React, { Component, RefObject } from "react";
import GameBoard from "./GameBoard";
import Message from "./Message";
import { States, LETTERS, ENCOURAGEMENTS, MIN_LETTERS } from "../gameConsts";

interface Props {}

class Game extends Component<Props> {
  state = {
    gameState: States.Initialized,
    letters: [],
    score: 0,
    level: 0
  };

  startMessageRef: RefObject<Message>;

  constructor(props: Props) {
    super(props);
    this.startMessageRef = React.createRef();
  }

  randomizeLetters = () => {
    const numLetters = Math.min(20, this.state.level + MIN_LETTERS);
    const randomIndex = Math.floor(Math.random() * LETTERS.length);
    const chosenLetter = LETTERS[randomIndex];
    const remainingLetters = LETTERS.slice();
    remainingLetters.splice(randomIndex, 1);

    let letters = [chosenLetter];
    for (let i = 1; i < numLetters; i++) {
      letters.push(
        remainingLetters[Math.floor(Math.random() * remainingLetters.length)]
      );
    }

    return letters;
  };

  startGame = () => {
    this.setState({
      gameState: States.Started
    });
  };

  startLevel = () => {
    this.setState({
      gameState: States.Starting,
      letters: this.randomizeLetters()
    });
  };

  handleStartButtonClick = () => {
    this.startMessageRef.current?.hide();
  };

  handleOKButtonClick = () => {
    this.setState({
      gameState: States.Initialized,
      level: 0,
      score: 0
    });
  };

  handleWinLevel = (score: number) => {
    const nextLevel = this.state.level + 1;

    this.setState({
      gameState: States.WonLevel,
      level: nextLevel,
      score: this.state.score + score * 100
    });
  };

  handleGameOver = () => {
    this.setState({
      gameState: States.GameOver
    });
  };

  getComponentToShow = () => {
    switch (this.state.gameState) {
      case States.Initialized:
        return (
          <Message ref={this.startMessageRef} onHidden={this.startLevel}>
            <h1>
              <p>GAME OF</p>
              <p>LETTERS</p>
            </h1>
            <h2>A Game to Master the Letters</h2>
            <div>
              <button
                className="start-button"
                onClick={this.handleStartButtonClick}
              >
                Start Game
              </button>
            </div>
          </Message>
        );

      case States.Starting:
        return (
          <React.Fragment>
            <Message hideAfterMs={2000} onHidden={this.startGame}>
              <h1>
                Find the letter
                <span className="word">{this.state.letters[0]}</span>
              </h1>
              <h2>
                <p>Level: {this.state.level + 1}</p>
                <p>Score: {this.state.score}</p>
              </h2>
            </Message>
          </React.Fragment>
        );

      case States.Started:
        return (
          <GameBoard
            letters={this.state.letters}
            onWinLevel={this.handleWinLevel}
            onGameOver={this.handleGameOver}
          ></GameBoard>
        );

      case States.WonLevel:
        const encourgement =
          ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
        return (
          <Message hideAfterMs={2000} onHidden={this.startLevel}>
            <h1>{encourgement}!</h1>
            <h2>
              <p>Level: {this.state.level + 1}</p>
              <p>Score: {this.state.score}</p>
            </h2>
          </Message>
        );

      case States.GameOver:
        return (
          <div className="game-over game-over-animatation">
            <h1>Please Try Again</h1>
            <h2>
              <p>Level: {this.state.level + 1}</p>
              <p>Score: {this.state.score}</p>
            </h2>
            <button className="start-button" onClick={this.handleOKButtonClick}>
              OK
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    let component = this.getComponentToShow();
    return (
      <div className="game">
        {component}
        <div className="ground"></div>
      </div>
    );
  }
}

export default Game;
