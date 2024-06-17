import { FlappyDoge } from './flappy-doge';
import { getCanvasHeight, getCanvasWidth } from './utils';

export function initGame() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;

  if (!canvas) throw new Error('Canvas not found!');

  canvas.width = getCanvasWidth();
  canvas.height = getCanvasHeight();
  canvas.style.background = 'skyblue';

  const context = canvas.getContext('2d');

  if (!context) throw new Error('2D context is not supported');

  const flappyDoge = new FlappyDoge(context);
  flappyDoge.initGame();
}
