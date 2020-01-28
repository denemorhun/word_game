import React, { Component, CSSProperties } from "react";
import classNames from "classnames";

interface Props {
  letter: string;
  zIndex: number;
  onClick: (letter: string, component: Letter) => void;
}

class Letter extends Component<Props> {
  state = {
    x: 0,
    y: 0,
    visible: true,
    spin: false,
    fade: false
  };

  constructor(props: Props) {
    super(props);
    this.state.x = Math.floor(Math.random() * 80) + 10;
    this.state.y = Math.floor(Math.random() * 70) + 10;
  }

  hide() {
    this.setState({
      fade: true
    });
    setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 500);
  }

  handleOnClick = () => {
    if (this.state.visible && !this.state.spin && !this.state.fade) {
      this.props.onClick(this.props.letter, this);
    }
  };

  spin = () => {
    this.setState({
      spin: true
    });
    setTimeout(() => {
      this.setState({
        spin: false
      });
    }, 1000);
  };

  render() {
    const style = {
      left: this.state.x + "%",
      top: this.state.y + "%",
      visibility: this.state.visible ? "visible" : "hidden",
      zIndex: this.props.zIndex
    } as CSSProperties;

    const classes = classNames("letter", {
      "letter-spin": this.state.spin,
      "letter-fade": this.state.fade
    });

    return (
      <div className={classes} style={style} onClick={this.handleOnClick}>
        {this.props.letter}
      </div>
    );
  }
}

export default Letter;
