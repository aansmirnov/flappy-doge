import {
  GRAVITY,
  PIPE_HEIGHT,
  ADD_PIPE_INTERVAL,
  SPACE_CODE,
  VELOCITY_X,
} from './consts';
import {
  createPipe,
  getCanvasHeight,
  getCanvasWidth,
  updateScore,
} from './utils';
import type { Pipe, Player } from './types';
import { IS_PROD, GAME_ROUTE } from '@/consts';

const CANVAS_WIDTH = getCanvasWidth();
const CANVAS_HEIGHT = getCanvasHeight();

export class FlappyDoge {
  private context: CanvasRenderingContext2D;
  private isGameRunning = true;

  private player: Player = {
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

  private pipes: Pipe[] = [];

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  initGame() {
    setInterval(() => this.addPipes(), ADD_PIPE_INTERVAL);
    this.update();

    document.addEventListener('keydown', (event) => this.movePlayer(event));
  }

  private update() {
    if (!this.isGameRunning) return;

    requestAnimationFrame(() => this.update());

    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.updatePlayerPosition();
    this.renderPipes();
    this.drawScore();

    if (!this.isThePlayerOnTheGamePage()) this.isGameRunning = false;
  }

  private updatePlayerPosition() {
    this.drawPlayer();

    this.player.position.y += this.player.velocity.y;

    if (this.isPlayerHitTheBottom()) {
      this.isGameRunning = false;
      this.player.velocity.y = 0;

      updateScore(this.player.score);
    } else {
      this.player.velocity.y += GRAVITY;
    }
  }

  private renderPipes() {
    for (const pipe of this.pipes) {
      pipe.position.x += VELOCITY_X;

      this.context.fillStyle = 'green';
      this.context.fillRect(
        pipe.position.x,
        pipe.position.y,
        pipe.size.width,
        pipe.size.height,
      );

      if (
        !pipe.passed &&
        this.player.position.x > pipe.position.x + pipe.size.width
      ) {
        this.player.score += 0.5;
        pipe.passed = true;
      }

      if (this.detectPipeCollision(pipe)) {
        this.isGameRunning = false;
        updateScore(this.player.score);
      }

      while (
        this.pipes.length > 0 &&
        this.pipes[0].position.x < -this.pipes[0].size.width
      ) {
        this.pipes.shift();
      }
    }
  }

  private detectPipeCollision(pipe: Pipe) {
    const {
      position: { x: playerXPositon, y: playerYPosition },
      size: { width: playerWidth, height: playerHeight },
    } = this.player;

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

  private addPipes() {
    if (!this.isGameRunning) return;

    const pipeY = 0;
    const pipeYPosition =
      pipeY - PIPE_HEIGHT / 4 - Math.random() * (PIPE_HEIGHT / 2);
    const openingSpace = CANVAS_HEIGHT / 4.5;

    this.pipes.push(
      createPipe(CANVAS_WIDTH, pipeYPosition),
      createPipe(CANVAS_WIDTH, pipeYPosition + openingSpace + PIPE_HEIGHT),
    );
  }

  private drawPlayer() {
    this.context.fillStyle = 'gray';
    this.context.fillRect(
      this.player.position.x,
      this.player.position.y,
      this.player.size.width,
      this.player.size.height,
    );
  }

  private drawScore() {
    this.context.font = '64px Lato';
    this.context.fillStyle = 'black';
    this.context.fillText(
      String(Math.round(this.player.score)),
      CANVAS_WIDTH / 2 - 15,
      CANVAS_HEIGHT / 5,
    );
  }

  private movePlayer(event: KeyboardEvent) {
    if (!this.isGameRunning) return;

    if (event.code === SPACE_CODE) this.player.velocity.y -= 6;
  }

  private isPlayerHitTheBottom() {
    return (
      this.player.position.y +
        this.player.size.height +
        this.player.velocity.y >=
      CANVAS_HEIGHT
    );
  }

  private isThePlayerOnTheGamePage() {
    const { hash, pathname } = window.location;

    return IS_PROD ? hash === `#${GAME_ROUTE}` : pathname === GAME_ROUTE;
  }
}
