import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../consts';

export function getCenterOfCanvas(elementWidth: number, elementHeight: number) {
  return {
    dx: CANVAS_WIDTH / 2 - (elementWidth - elementWidth / 2),
    dy: CANVAS_HEIGHT / 2 - (elementHeight - elementHeight / 2),
  };
}
