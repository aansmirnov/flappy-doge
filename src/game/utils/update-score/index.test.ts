import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { updateScore } from '.';
import { setItemToLocalStorage } from '@/utils';
import { FLAPPY_DOGE_GAME_SCORE } from '@/consts';

describe('updateScore', () => {
  beforeEach(() => {
    document.body.innerHTML = '<span id="game-score"></span>';
    setItemToLocalStorage(FLAPPY_DOGE_GAME_SCORE, 10);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should update score', () => {
    updateScore(20);

    const element = document.getElementById('game-score');
    if (!element) throw new Error('Incorrect test case!');

    expect(element.innerHTML).toBe('20');
  });

  it('should not update score', () => {
    const element = document.getElementById('game-score');
    if (!element) throw new Error('Incorrect test case!');

    element.innerHTML = '10';

    updateScore(1);
    expect(element.innerHTML).toBe('10');
  });

  it('should return an error', () => {
    document.body.innerHTML = '<span />';

    const func = () => updateScore(20);
    expect(func).toThrowError('Game score element not found!');
  });
});
