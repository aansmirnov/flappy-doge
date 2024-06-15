import { PIPE_HEIGHT, PIPE_WIDTH } from './consts';
import { Pipe } from './types';

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
