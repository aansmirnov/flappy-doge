import type { Player } from '@/game/types';

export function didThePlayerHitTheBottom(player: Player, canvasHeight: number) {
  const {
    position: { y: posY },
    size: { height },
    velocity: { y: velocityY },
  } = player;

  return posY + height + velocityY >= canvasHeight;
}
