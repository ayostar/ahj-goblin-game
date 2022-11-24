/* eslint-disable no-alert */
export default class GamePlay {
  constructor(boardSize, container) {
    this.boardSize = boardSize;
    this.container = container;
    this.boardElements = null;
    this.cells = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Контейнер не является элементом "HTMLElement"');
    }
    this.container = container;
  }

  drawUi() {
    this.bindToDOM(this.container);
    this.checkBinding();

    const gameBoardContainer = document.createElement('div');
    gameBoardContainer.classList.add('container-gameboard');
    this.container.append(gameBoardContainer);

    const gameScoreBoard = document.createElement('div');
    gameScoreBoard.classList.add('score-board');
    gameBoardContainer.append(gameScoreBoard);

    const hitCounter = document.createElement('div');
    hitCounter.classList.add('hit-counter');
    hitCounter.innerText = 'Попаданий';
    gameScoreBoard.append(hitCounter);

    const hitNumber = document.createElement('div');
    hitNumber.classList.add('hit-number');
    hitNumber.innerText = 0;
    hitCounter.append(hitNumber);

    const missCounter = document.createElement('div');
    missCounter.classList.add('miss-counter');
    missCounter.innerText = 'Промахов';
    gameScoreBoard.append(missCounter);

    const missNumber = document.createElement('div');
    missNumber.classList.add('miss-number');
    missNumber.innerText = 0;
    missCounter.append(missNumber);

    const gameBoard = document.createElement('div');
    gameBoard.classList.add('gameboard');
    gameBoardContainer.append(gameBoard);

    this.boardElements = this.container.querySelector('.gameboard');
    this.boardElements.setAttribute(
      'style',
      `grid-template-columns: repeat(${this.boardSize}, 1fr)`,
    );

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      this.boardElements.append(cellElement);
    }

    this.cells = Array.from(this.boardElements.children);
    this.hitElement = document.querySelector('.hit-number');
    this.missElement = document.querySelector('.miss-number');
  }

  getHitNumber() {
    return this.hitElement.innerText;
  }

  setHitNumber(number) {
    this.hitElement.innerText = number;
  }

  getMissNumber() {
    return this.missElement.innerText;
  }

  setMissNumber(number) {
    this.missElement.innerHTML = number;
  }

  static showMessage(message) {
    alert(message);
  }

  deselectAll() {
    for (const cell of this.cells) {
      cell.classList.remove();
    }
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('Игровой процесс не привязан к DOM');
    }
  }
}
