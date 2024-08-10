import { FlappyDoge } from './flappy-doge';

export function initGame() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;

  if (!canvas) throw new Error('Canvas not found!');

  const flappyDoge = new FlappyDoge(canvas);
  flappyDoge.initGame();
}
