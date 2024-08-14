import { PLAYER_HEIGHT, PLAYER_WIDTH } from '../../consts';
import type { Player } from '../../types';
import { getCenterOfCanvas } from '../get-center-of-canvas';

export function getInitialPlayerState(): Player {
  const { dx, dy } = getCenterOfCanvas(PLAYER_WIDTH, PLAYER_HEIGHT);

  return {
    position: {
      x: dx,
      y: dy,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    size: {
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    },
    score: 0,
  };
}
