import { PIPE_WIDTH, PIPE_HEIGHT } from '../../consts';
import { Pipe } from '../../types';

export function createPipe(
  x: number,
  y: number,
  image?: HTMLImageElement,
): Pipe {
  if (!image) {
    throw new Error('Cannot create a pipe');
  }

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
    image,
  };
}
