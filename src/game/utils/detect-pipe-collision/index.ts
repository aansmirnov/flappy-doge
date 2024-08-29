import type { Pipe, Player } from '@/game/types';

export function detectPipeCollision(player: Player, pipe: Pipe) {
  const {
    position: { x: playerXPositon, y: playerYPosition },
    size: { width: playerWidth, height: playerHeight },
  } = player;

  const {
    position: { x: pipeXPositon, y: pipeYPosition },
    size: { width: pipeWidth, height: pipeHeight },
  } = pipe;

  return (
    playerXPositon < pipeXPositon + pipeWidth &&
    playerXPositon + playerWidth > pipeXPositon &&
    playerYPosition < pipeYPosition + pipeHeight &&
    playerYPosition + playerHeight > pipeYPosition
  );
}
