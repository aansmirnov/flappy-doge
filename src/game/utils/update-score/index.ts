import { getItemFromLocalStorage, setItemToLocalStorage } from '@/utils';
import { FLAPPY_DOGE_GAME_SCORE } from '@/consts';

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
