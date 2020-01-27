import React, { Component } from 'react';
import classNames from 'classnames';

export class Message extends Component {
   state = {
      hiding: false,
      hidden: false
   };

   constructor(props) {
      super(props);
      if (this.props.hideAfter) {
         setTimeout(() => {
            this.hide();
         }, this.props.hideAfter);
      }
   }

   hide = () => {
      this.setState({
         hiding: true
      });
   };

   hidden = event => {
      if (event.animationName === 'fadeOut') {
         this.setState({
            hidden: true
         });
         if (this.props.onHidden) {
            this.props.onHidden();
         }
      }
   };

   render() {
      const classes = classNames({
         message: true,
         'message-fadeout': this.state.hiding
      });
      const styles = {
         visibility: this.state.hidden ? 'hidden' : 'visible'
      };

      return (
         <div className={classes} style={styles} onAnimationEnd={this.hidden}>
            {this.props.children}
         </div>
      );
   }
}

export default Message;
