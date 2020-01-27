import React from 'react';
import Timer from './Timer';
import Letter from './Letter';

class GameBoard extends React.Component {
   state = {
      startTime: null,
      letters: [],
      letterRefs: [],
      charIndex: 0
   };

   constructor(props) {
      super(props);
      this.timer = React.createRef();
   }

   componentDidMount() {
      const letterRefs = [];
      let letters = this.props.letters.map((char, i) => {
         const ref = React.createRef();
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

      this.timer.current.startTimer();
   }

   winLevel = () => {
      const score = Math.round(this.timer.current.stopTimer() / 100);
      setTimeout(() => this.props.onWinLevel(score), 1000);
   };

   handleTimerExhausted = () => {
      this.timer.current.stopTimer();
      this.state.letterRefs.forEach(l => l.current.hide());
      setTimeout(() => this.props.onGameOver(), 1000);
   };

   handleLetterClicked = (letter, component) => {
      if (letter !== this.props.letters[this.state.charIndex]) {
         component.spin();
         return;
      }

      component.hide();

      // const charIndex = this.state.charIndex + 1;
      // if (charIndex >= this.props.letters.length) {
      this.winLevel();
      // } else {
      //    this.setState({
      //       charIndex
      //    });
      // }
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
