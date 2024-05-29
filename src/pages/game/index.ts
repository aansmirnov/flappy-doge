import { GAME_PAGE_ID } from '@/consts';

export function gamePage() {
  return `
        <div id=${GAME_PAGE_ID} class="game">
          <canvas id="canvas"></canvas>
          <div class="block">
              <h3 class="block__title">Flappy Dode</h3>
              <p class="block__description">
                Play flappy doge here online for free. Click on the screen, or use your spacebar to get started.
                Fly the doge as far as you can without hitting a pipe.
              </p>
              <h3 class="block__record">Your record: <span id="game_score">0</span></h3>
          </div>
        </div>
    `;
}
