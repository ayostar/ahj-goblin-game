import GamePlay from '../gamePlay';

test('should throw error if no container passes for the game', () => {
  const expected = 'HTMLElement is not defined';
  const gamePlay = new GamePlay(4, 'not a container');
  const received = () => gamePlay.drawUi();
  expect(received).toThrow(expected);
});
