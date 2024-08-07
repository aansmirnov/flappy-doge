import { FLAPPY_DOGE_GAME_SCORE } from '@/consts';
import { initGame } from '@/game';
import { getItemFromLocalStorage } from '@/utils';

export function initGamePage() {
  initGame();
  renderScore();
}

function renderScore() {
  const scoreElement = document.getElementById('game-score');
  const score = getItemFromLocalStorage<number>(FLAPPY_DOGE_GAME_SCORE) || 0;

  if (scoreElement) {
    scoreElement.innerHTML = String(score);
  }
}
