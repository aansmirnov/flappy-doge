import { CANVAS_HEIGHT, CANVAS_WIDTH } from './consts';
import { Player } from './player';

export function initGame() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;

  if (!canvas) {
    throw new Error('Canvas not found!');
  }

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  canvas.style.background = 'skyblue';

  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Context is null');
  }
  
  const player = new Player(context);
  player.initPlayer();
}
