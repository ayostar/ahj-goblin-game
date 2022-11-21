import GamePlay from './gamePlay';

import { getRandomInt } from './utils';

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.timerId = null;
  }

  init() {
    this.gamePlay.drawUi();
    this.startRandom();

    this.gamePlay.cells.forEach((cell) => {
      cell.addEventListener('mousedown', (event) => {
        event.preventDefault();
        const goblinActiveCell = cell.classList.contains('goblin');

        if (goblinActiveCell) {
          this.gamePlay.setHitNumber(
            Number.parseInt(this.gamePlay.getHitNumber(), 10) + 1,
          );
          cell.classList.remove('goblin');
        }
      });
    });
  }

  startRandom() {
    let randomIndex;

    this.timerId = setInterval(() => {
      for (const cell of this.gamePlay.cells) {
        const goblinActiveCell = cell.classList.contains('goblin');
        if (goblinActiveCell) {
          cell.classList.remove('goblin');
          this.gamePlay.setMissNumber(
            Number.parseInt(this.gamePlay.getMissNumber(), 10) + 1,
          );
        }
      }

      if (Number.parseInt(this.gamePlay.getMissNumber(), 10) === 5) {
        this.gameRestart();
        return;
      }

      const randomNumber = getRandomInt(0, this.gamePlay.cells.length - 1);

      if (randomNumber === randomIndex) {
        if (randomNumber === this.gamePlay.cells.length - 1) {
          randomIndex -= 1;
        } else {
          randomIndex += 1;
        }
      } else {
        randomIndex = randomNumber;
      }

      this.gamePlay.cells[randomIndex].classList.add('goblin');
    }, 1000);
  }

  deactivateGoblin() {
    const goblinActiveCell = [...this.gamePlay.cells].find((n) =>
      n.classList.contains('goblin'),
    );
    if (goblinActiveCell) {
      goblinActiveCell.classList.remove('goblin');
    }
  }

  gameRestart() {
    this.gamePlay.setMissNumber(0);
    this.gamePlay.setHitNumber(0);
    this.gamePlay.deselectAll();
    clearInterval(this.timerId);
    GamePlay.showMessage('Игра окончена!');
    this.startRandom();
  }
}
