import { GAME_PAGE_ID } from '@/consts';

export function gamePage() {
  return `
        <div id=${GAME_PAGE_ID}>
          <canvas id="canvas"></canvas>
        </div>
    `;
}
