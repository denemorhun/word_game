import React, { CSSProperties } from "react";

interface Props {
  timeLimit: number;
  onTimeExhausted: () => void;
}

class Timer extends React.Component<Props> {
  state = {
    timerId: 0,
    totalTime: 0,
    startTime: 0,
    percent: 100,
    stopped: false
  };

  updateTimer = () => {
    if (!this.state.stopped) {
      let percent = Math.max(
        0,
        Math.round(
          ((this.props.timeLimit - this.getTimeConsumedInMs() / 1000) /
            this.props.timeLimit) *
            100
        )
      );
      this.setState({
        percent
      });
    }

    if (this.getTimeConsumedInMs() > this.props.timeLimit * 1000) {
      this.props.onTimeExhausted();
    }
  };

  startTimer = () => {
    let timerId = this.state.timerId
      ? this.state.timerId
      : setInterval(this.updateTimer, 100);

    this.setState({
      startTime: Date.now(),
      timerId: timerId,
      stopped: false
    });
  };

  stopTimer = (): number => {
    if (!this.state.startTime || this.state.stopped) {
      return 0;
    }

    if (this.state.timerId) {
      clearInterval(this.state.timerId);
    }

    const totalTime = this.getTimeConsumedInMs();

    this.setState({
      totalTime: totalTime,
      startTime: null,
      timerId: null,
      stopped: true
    });

    return this.props.timeLimit * 1000 - totalTime;
  };

  getTimeConsumedInMs = (): number => {
    return Date.now() - this.state.startTime + this.state.totalTime;
  };

  getBarColor = (): string => {
    if (this.state.percent < 25) {
      return "red";
    } else if (this.state.percent < 50) {
      return "orange";
    } else {
      return "lime";
    }
  };

  render() {
    const style = {
      width: this.state.percent + "%",
      backgroundColor: this.getBarColor()
    } as CSSProperties;

    return (
      <div className="timer">
        <div className="timer-bar" style={style}></div>
      </div>
    );
  }
}

export default Timer;
