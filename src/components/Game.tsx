import React, { Component, RefObject } from "react";
import GameBoard from "./GameBoard";
import Message from "./Message";
import { States, LETTERS, MIN_LETTERS } from "../gameConsts";
import i18n from "../i18n";
import LanguagePicker from "./LanguagePicker";

interface Props {}

class Game extends Component<Props> {
  state = {
    gameState: States.Initialized,
    letters: [],
    score: 0,
    level: 0,
    language: "en"
  };

  startMessageRef: RefObject<Message>;

  constructor(props: Props) {
    super(props);
    this.startMessageRef = React.createRef();

    let lang = localStorage.getItem("language");
    if (lang) {
      this.state.language = lang;
      i18n.changeLanguage(lang);
    }
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

  handleLanguageChanged = (language: string) => {
    localStorage.setItem("language", language);
    i18n.changeLanguage(language, () => {
      this.setState({
        language
      });
    });
  };

  getComponentToShow = () => {
    switch (this.state.gameState) {
      case States.Initialized:
        return (
          <Message ref={this.startMessageRef} onHidden={this.startLevel}>
            <h1>
              <p>{i18n.t("main.title1")}</p>
              <p>{i18n.t("main.title2")}</p>
            </h1>
            <h2>{i18n.t("main.subtitle")}</h2>
            <div>
              <button
                className="start-button"
                onClick={this.handleStartButtonClick}
              >
                {i18n.t("main.start")}
              </button>
            </div>
            <LanguagePicker
              language={this.state.language}
              onChange={this.handleLanguageChanged}
            ></LanguagePicker>
          </Message>
        );

      case States.Starting:
        let rightToLeft = ["tr"].indexOf(i18n.language) !== -1;
        let findMsg = rightToLeft ? (
          <React.Fragment>
            <span className="word">{this.state.letters[0]} </span>
            {i18n.t("start.find")}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {i18n.t("start.find")}
            <span className="word"> {this.state.letters[0]}</span>
          </React.Fragment>
        );

        return (
          <React.Fragment>
            <Message hideAfterMs={2000} onHidden={this.startGame}>
              <h1>{findMsg}</h1>
              <h2>
                <p>
                  {i18n.t("start.level")} {this.state.level + 1}
                </p>
                <p>
                  {i18n.t("start.score")} {this.state.score}
                </p>
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
        const encourgement = `encouragements.${Math.floor(Math.random() * 9)}`;
        return (
          <Message hideAfterMs={2000} onHidden={this.startLevel}>
            <h1 className="encouragement">{i18n.t(encourgement)}!</h1>
            <h2>
              <p>
                {i18n.t("start.level")} {this.state.level + 1}
              </p>
              <p>
                {i18n.t("start.score")} {this.state.score}
              </p>
            </h2>
          </Message>
        );

      case States.GameOver:
        return (
          <div className="game-over game-over-animatation">
            <h1>{i18n.t("gameOver.tryAgain")}</h1>
            <h2>
              <p>
                {i18n.t("start.level")} {this.state.level + 1}
              </p>
              <p>
                {i18n.t("start.score")} {this.state.score}
              </p>
            </h2>
            <button className="start-button" onClick={this.handleOKButtonClick}>
              {i18n.t("gameOver.ok")}
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
