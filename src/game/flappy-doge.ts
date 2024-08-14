import {
  GRAVITY,
  PIPE_HEIGHT,
  ADD_PIPE_INTERVAL,
  SPACE_CODE,
  VELOCITY_X,
  START_BUTTON_WIDTH,
  START_BUTTON_HEIGHT,
  VELOCITY_Y,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from './consts';
import {
  createPipe,
  getInitialPlayerState,
  updateScore,
  loadImage,
  didThePlayerLeaveGamePage,
  didThePlayerHitTheBottom,
  detectPipeCollision,
} from './utils';
import type { Pipe, Player } from './types';
import topPipeImageUrl from './assets/top-pipe.png';
import bottomPipeImageUrl from './assets/bottom-pipe.png';
import playButtonImageUrl from './assets/play-button.png';
import repeatButtonImageUrl from './assets/repeat-button.png';

export class FlappyDoge {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private isP2PGame = false;

  private isGameRunning = false;
  private didThePlayerLose = false;
  private player: Player = getInitialPlayerState();
  private pipes: Pipe[] = [];

  private topPipeImage: HTMLImageElement | undefined;
  private bottomPipeImage: HTMLImageElement | undefined;
  private startButtonImage: HTMLImageElement | undefined;
  private repeatButtonImage: HTMLImageElement | undefined;

  constructor(canvas: HTMLCanvasElement, isP2PGame = false) {
    this.canvas = canvas;

    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;

    const context = canvas.getContext('2d');
    if (!context) throw new Error('2D context is not supported');

    this.context = context;
    this.isP2PGame = isP2PGame;
  }

  async initGame() {
    await this.loadImages();

    requestAnimationFrame(() => this.updateGame());
    setInterval(() => this.addPipes(), ADD_PIPE_INTERVAL);

    document.addEventListener('keydown', (event) => this.movePlayer(event));
    this.canvas.addEventListener('mousedown', (event) => {
      this.detectImageClick(event);
      this.movePlayer(event);
    });
  }

  private updateGame() {
    if (didThePlayerLeaveGamePage(this.isP2PGame)) {
      this.isGameRunning = false;
      return;
    }

    requestAnimationFrame(() => this.updateGame());

    if (!this.isGameRunning) {
      this.drawPlayButton();
      return;
    }

    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.drawPlayer();
    this.drawScore();
    this.drawPipes();
    this.updatePlayerPosition();
  }

  private movePlayer(event: KeyboardEvent | MouseEvent) {
    if (this.didThePlayerLose) return;
    if (event instanceof KeyboardEvent && event.code !== SPACE_CODE) return;
    if (event instanceof MouseEvent && !this.isGameRunning) return;

    if (!this.isGameRunning) {
      this.isGameRunning = true;
      requestAnimationFrame(() => this.updateGame());
    }

    this.player.velocity.y -= VELOCITY_Y;
  }

  private updatePlayerPosition() {
    this.player.position.y += this.player.velocity.y;

    if (didThePlayerHitTheBottom(this.player, CANVAS_HEIGHT)) {
      this.isGameRunning = false;
      this.didThePlayerLose = true;

      this.player.velocity.y = 0;

      updateScore(this.player.score);
    } else {
      this.player.velocity.y += GRAVITY;
    }
  }

  private addPipes() {
    if (!this.isGameRunning) return;

    const pipeY = 0;
    const pipeYPosition =
      pipeY - PIPE_HEIGHT / 4 - Math.random() * (PIPE_HEIGHT / 2);
    const openingSpace = CANVAS_HEIGHT / 4;
    const bottomPipePosY = pipeYPosition + openingSpace + PIPE_HEIGHT;

    this.pipes.push(
      createPipe(CANVAS_WIDTH, pipeYPosition, this.topPipeImage),
      createPipe(CANVAS_WIDTH, bottomPipePosY, this.bottomPipeImage),
    );
  }

  // @ToDo: Add doge.
  private drawPlayer() {
    this.context.fillStyle = 'gray';
    this.context.fillRect(
      this.player.position.x,
      this.player.position.y,
      this.player.size.width,
      this.player.size.height,
    );
  }

  // @ToDo: Change to images.
  private drawScore() {
    this.context.font = '64px Lato';
    this.context.fillStyle = 'black';
    this.context.fillText(
      String(Math.round(this.player.score)),
      CANVAS_WIDTH / 2 - 15,
      CANVAS_HEIGHT / 5,
    );
  }

  private drawPipes() {
    for (const pipe of this.pipes) {
      pipe.position.x += VELOCITY_X;

      this.context.drawImage(
        pipe.image,
        pipe.position.x,
        pipe.position.y,
        pipe.size.width,
        pipe.size.height,
      );

      const didThePlayerGoThroughThePipe =
        this.player.position.x > pipe.position.x + pipe.size.width;

      if (!pipe.passed && didThePlayerGoThroughThePipe) {
        this.player.score += 0.5;
        pipe.passed = true;
      }

      if (detectPipeCollision(this.player, pipe)) {
        this.isGameRunning = false;
        this.didThePlayerLose = true;

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

  private drawPlayButton() {
    if (!this.startButtonImage || !this.repeatButtonImage)
      throw new Error('Start button image not found!');

    if (this.didThePlayerLose) {
      // @ToDo: Cleanup.
      this.context.drawImage(
        this.repeatButtonImage,
        CANVAS_WIDTH / 2 - (64 - 32),
        CANVAS_HEIGHT / 2 - (64 - 32),
        64,
        64,
      );
    } else {
      // @ToDo: Cleanup.
      this.context.drawImage(
        this.startButtonImage,
        CANVAS_WIDTH / 2 - (START_BUTTON_WIDTH - 100),
        CANVAS_HEIGHT / 2 - (START_BUTTON_HEIGHT - 42),
        START_BUTTON_WIDTH,
        START_BUTTON_HEIGHT,
      );
    }
  }

  private detectImageClick(event: MouseEvent) {
    const { offsetX, offsetY } = event;

    if (!this.isGameRunning && !this.didThePlayerLose) {
      // @ToDo: Cleanup.
      if (
        offsetX > CANVAS_WIDTH / 2 - (START_BUTTON_WIDTH - 100) &&
        offsetX <=
          CANVAS_WIDTH / 2 - (START_BUTTON_WIDTH - 100) + START_BUTTON_WIDTH &&
        offsetY > CANVAS_HEIGHT / 2 - (START_BUTTON_HEIGHT - 42) &&
        offsetY <=
          CANVAS_HEIGHT / 2 - (START_BUTTON_HEIGHT - 42) + START_BUTTON_HEIGHT
      ) {
        this.isGameRunning = true;
        requestAnimationFrame(() => this.updateGame());
      }
    }

    if (!this.isGameRunning && this.didThePlayerLose) {
      // @ToDo: Repeat button.
    }
  }

  private async loadImages() {
    const [startButtonImg, topPipeImg, bottomPipeImg, repeatButtonImg] =
      await Promise.all([
        loadImage(playButtonImageUrl),
        loadImage(topPipeImageUrl),
        loadImage(bottomPipeImageUrl),
        loadImage(repeatButtonImageUrl),
      ]);

    this.startButtonImage = startButtonImg;
    this.topPipeImage = topPipeImg;
    this.bottomPipeImage = bottomPipeImg;
    this.repeatButtonImage = repeatButtonImg;
  }
}
