import { getItemFromLocalStorage, setItemToLocalStorage } from '@/utils';
import { PIPE_HEIGHT, PIPE_WIDTH } from './consts';
import { Pipe } from './types';
import { FLAPPY_DOGE_GAME_SCORE } from '@/consts';

function isMobile() {
  return navigator.maxTouchPoints !== 0;
}

export function getCanvasWidth() {
  return isMobile() ? window.innerWidth - 20 : 480;
}

export function getCanvasHeight() {
  return isMobile() ? window.innerHeight - 85 : 640;
}

export function createPipe(x: number, y: number): Pipe {
  return {
    position: {
      x,
      y,
    },
    size: {
      width: PIPE_WIDTH,
      height: PIPE_HEIGHT,
    },
    passed: false,
  };
}

export function updateScore(newScore: number) {
  const currentScore =
    getItemFromLocalStorage<number>(FLAPPY_DOGE_GAME_SCORE) || 0;

  if (currentScore < newScore) {
    setItemToLocalStorage(FLAPPY_DOGE_GAME_SCORE, newScore);

    const element = document.getElementById('game-score');

    if (!element) throw new Error('Game score element not found!');

    element.innerHTML = String(newScore);
  }
}
