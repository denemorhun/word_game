import React, { Component, RefObject } from "react";
import Timer from "./Timer";
import Letter from "./Letter";

interface Props {
  letters: string[];
  onGameOver: () => void;
  onWinLevel: (score: number) => void;
}

class GameBoard extends Component<Props> {
  state = {
    startTime: null,
    letters: [],
    letterRefs: []
  };

  timer: RefObject<Timer>;

  constructor(props: Props) {
    super(props);
    this.timer = React.createRef();
  }

  componentDidMount() {
    const letterRefs: RefObject<Letter>[] = [];
    let letters = this.props.letters.map((char, i) => {
      const ref: RefObject<Letter> = React.createRef();
      letterRefs.push(ref);
      return (
        <Letter
          key={i}
          letter={char}
          onClick={this.handleLetterClicked}
          ref={ref}
          zIndex={1000 - i}
        ></Letter>
      );
    });

    this.setState({
      startTime: Date.now(),
      letters,
      letterRefs
    });

    this.timer.current?.startTimer();
  }

  winLevel = () => {
    const score = Math.round((this.timer.current?.stopTimer() || 0) / 100);
    setTimeout(() => this.props.onWinLevel(score), 1000);
  };

  handleTimerExhausted = () => {
    this.timer.current?.stopTimer();
    this.state.letterRefs.forEach((letter: RefObject<Letter>) =>
      letter.current?.hide()
    );
    setTimeout(() => this.props.onGameOver(), 1000);
  };

  handleLetterClicked = (letter: string, component: Letter) => {
    if (letter !== this.props.letters[0]) {
      component.spin();
      return;
    }

    component.hide();
    this.winLevel();
  };

  render() {
    const timeLimit = this.props.letters.length + 1;

    return (
      <React.Fragment>
        <div className="game-board">
          <Timer
            ref={this.timer}
            timeLimit={timeLimit}
            onTimeExhausted={this.handleTimerExhausted}
          ></Timer>
          {this.state.letters}
        </div>
      </React.Fragment>
    );
  }
}

export default GameBoard;
