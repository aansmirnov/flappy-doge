import type { Player } from '../../types';
import { getCanvasHeight, getCanvasWidth } from '../get-canvas-info';

const CANVAS_WIDTH = getCanvasWidth();
const CANVAS_HEIGHT = getCanvasHeight();

export function getInitialPlayerState(): Player {
  return {
    position: {
      x: CANVAS_WIDTH / 2 - 15,
      y: CANVAS_HEIGHT / 2 - 15,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    size: {
      width: 30,
      height: 30,
    },
    score: 0,
  };
}
