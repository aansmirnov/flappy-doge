import { getCenterOfCanvas } from '@/game/utils';

export function didClickHappen(
  offsetX: number,
  offsetY: number,
  elementWidth: number,
  elementHeight: number,
) {
  const { dx, dy } = getCenterOfCanvas(elementWidth, elementHeight);

  return (
    offsetX > dx &&
    offsetX <= dx + elementWidth &&
    offsetY > dy &&
    offsetY <= dy + elementHeight
  );
}
