import React, { Component, CSSProperties } from "react";
import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  hideAfterMs?: number;
  onHidden?: () => void;
}

export class Message extends Component<Props> {
  state = {
    hiding: false,
    hidden: false
  };

  constructor(props: Props) {
    super(props);

    if (this.props.hideAfterMs) {
      setTimeout(() => {
        this.hide();
      }, this.props.hideAfterMs);
    }
  }

  hide = () => {
    this.setState({
      hiding: true
    });
  };

  hidden = (event: React.AnimationEvent) => {
    if (event.animationName === "fadeOut") {
      this.setState({
        hidden: true
      });
      if (this.props.onHidden) {
        this.props.onHidden();
      }
    }
  };

  render() {
    const styles = {
      visibility: this.state.hidden ? "hidden" : "visible"
    } as CSSProperties;

    const classes = classNames({
      message: true,
      "message-fadeout": this.state.hiding
    });

    return (
      <div className={classes} style={styles} onAnimationEnd={this.hidden}>
        {this.props.children}
      </div>
    );
  }
}

export default Message;
