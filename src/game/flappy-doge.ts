import { GAME_ROUTE } from '@/consts';
import { CANVAS_HEIGHT, CANVAS_WIDTH, GRAVITY, SPACE_CODE } from './consts';

export class FlappyDoge {
  private context: CanvasRenderingContext2D;

  private player = {
    position: {
      x: CANVAS_WIDTH / 2 - 30,
      y: CANVAS_HEIGHT / 2 - 30,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    width: 30,
    height: 30,
  };

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  initGame() {
    document.addEventListener('keydown', (event) => this.movePlayer(event));

    this.animatePlayer();
  }

  private animatePlayer() {
    if (this.isGameOver()) return;

    requestAnimationFrame(() => this.animatePlayer());

    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.updatePlayerPosition();
  }

  private updatePlayerPosition() {
    this.drawPlayer();

    this.player.position.y += this.player.velocity.y;

    if (this.isPlayerHitTheBottom()) this.player.velocity.y = 0;
    else this.player.velocity.y += GRAVITY;
  }

  private drawPlayer() {
    this.context.fillStyle = 'gray';
    this.context.fillRect(
      this.player.position.x,
      this.player.position.y,
      this.player.width,
      this.player.height,
    );
  }

  private isPlayerHitTheBottom() {
    return (
      this.player.position.y + this.player.height + this.player.velocity.y >=
      CANVAS_HEIGHT
    );
  }

  private movePlayer(event: KeyboardEvent) {
    if (this.isGameOver()) return;

    if (event.code === SPACE_CODE) this.player.velocity.y -= 6;
  }

  private isGameOver() {
    return !window.location.href.includes(GAME_ROUTE);
  }
}
