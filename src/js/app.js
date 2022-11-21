import GamePlay from './gamePlay';
import GameController from './gameController';

const boardSize = 4;
const gameContainer = document.querySelector('.container-game');

const gamePlay = new GamePlay(boardSize, gameContainer);

const gameController = new GameController(gamePlay);
gameController.init();
