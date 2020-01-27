import React from 'react';
import GameBoard from './GameBoard';
import wordList from '../wordList';
import Message from './Message';

const states = {
   INITIALIZED: 'initialized',
   STARTING: 'gameStarting',
   STARTED: 'gameStarted',
   WON_LEVEL: 'wonLevel',
   GAME_OVER: 'gameOver'
};

class Game extends React.Component {
   state = {
      gameState: states.INITIALIZED,
      word: null,
      score: 0,
      level: 0
   };

   constructor() {
      super();
      this.refGameBoard = React.createRef();
      this.refStartMessage = React.createRef();
   }

   selectWord = (userLevel = null) => {
      const level = Math.min(
         wordList.length - 1,
         userLevel ? userLevel : this.state.level
      );
      const random = Math.floor(Math.random() * wordList[level].length);
      return wordList[level][random];
   };

   startGame = () => {
      this.setState({
         gameState: states.STARTED
      });
   };

   startLevel = () => {
      this.setState({
         gameState: states.STARTING,
         word: this.selectWord()
      });
   };

   handleStartButtonClick = () => {
      this.refStartMessage.current.hide();
      setTimeout(() => {
         this.startLevel();
      }, 1000);
   };

   handleOKButtonClick = () => {
      this.setState({
         gameState: states.INITIALIZED,
         level: 0,
         score: 0
      });
   };

   handleWinLevel = score => {
      const nextLevel = this.state.level + 1;

      this.setState({
         gameState: states.WON_LEVEL,
         level: nextLevel,
         word: this.selectWord(nextLevel),
         score: this.state.score + score
      });
   };

   handleGameOver = () => {
      this.setState({
         gameState: states.GAME_OVER
      });
   };

   render() {
      const startMessage =
         this.state.gameState === states.INITIALIZED ? (
            <Message ref={this.refStartMessage}>
               <h1>
                  <p>GAME OF</p>
                  <p>WORDS</p>
               </h1>
               <h2>A Game of Reflexes and Spelling</h2>
               <div>
                  <button
                     className="start-button"
                     onClick={this.handleStartButtonClick}
                  >
                     Start Game
                  </button>
               </div>
            </Message>
         ) : null;

      const startingMessage =
         this.state.gameState === states.STARTING ? (
            <Message hideAfter={2000} onHidden={this.startGame}>
               <h1>
                  The word is <span className="word">{this.state.word}</span>
               </h1>
               <h2>
                  <p>Score: {this.state.score}</p>
                  <p>Level: {this.state.level + 1}</p>
               </h2>
            </Message>
         ) : null;

      const winLevelMessage =
         this.state.gameState === states.WON_LEVEL ? (
            <Message hideAfter={2000} onHidden={this.startLevel}>
               <h1>NICE!</h1>
               <h2>
                  <p>Score: {this.state.score}</p>
                  <p>Level: {this.state.level + 1}</p>
               </h2>
            </Message>
         ) : null;

      const gameOver =
         this.state.gameState === states.GAME_OVER ? (
            <div className="game-over game-over-animatation">
               <h1>Game Over</h1>
               <h2>
                  <p>Score: {this.state.score}</p>
                  <p>Level: {this.state.level + 1}</p>
               </h2>
               <button
                  className="start-button"
                  onClick={this.handleOKButtonClick}
               >
                  OK
               </button>
            </div>
         ) : null;

      const gameBoard =
         this.state.gameState === states.STARTED ? (
            <GameBoard
               gameStarted={this.state.gameState === states.STARTED}
               ref={this.refGameBoard}
               word={this.state.word}
               onWinLevel={this.handleWinLevel}
               onGameOver={this.handleGameOver}
            ></GameBoard>
         ) : null;

      return (
         <div className="game">
            {gameBoard}
            {gameOver}
            {startMessage}
            {startingMessage}
            {winLevelMessage}
            <div className="ground"></div>
         </div>
      );
   }
}

export default Game;
