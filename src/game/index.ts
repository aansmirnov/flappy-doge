import { P2P_GAME_ROUTE } from '@/consts';
import {
  ADD_PIPE_INTERVAL,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GRAVITY,
  PIPE_HEIGHT,
  REPEAT_BUTTON_HEIGHT,
  REPEAT_BUTTON_WIDTH,
  SPACE_CODE,
  START_BUTTON_HEIGHT,
  START_BUTTON_WIDTH,
  VELOCITY_X,
  VELOCITY_Y,
} from './consts';
import { Pipe, Player } from './types';
import {
  createPipe,
  detectPipeCollision,
  didClickHappen,
  didThePlayerHitTheBottom,
  didThePlayerLeaveGamePage,
  getCenterOfCanvas,
  getInitialPlayerState,
  loadGameImages,
  updateScore,
} from './utils';

const IS_P2P = window.location.href.includes(P2P_GAME_ROUTE);

let context: CanvasRenderingContext2D | null;
let animationFrame: number | undefined;
let pipesInterval: NodeJS.Timeout | undefined;

let topPipeImage: HTMLImageElement | undefined;
let bottomPipeImage: HTMLImageElement | undefined;
let startButtonImage: HTMLImageElement | undefined;
let repeatButtonImage: HTMLImageElement | undefined;

let pipes: Pipe[] = [];
let player: Player = getInitialPlayerState();
let didThePlayerLose = false;
let isGameRunning = false;

export async function initGame() {
  const canvas = initCanvas();
  context = canvas.getContext('2d');

  if (!doesContextExist(context))
    throw new Error('2D context is not supported!');

  const { topPipeImg, bottomPipeImg, startButtonImg, repeatButtonImg } =
    await loadGameImages();

  topPipeImage = topPipeImg;
  bottomPipeImage = bottomPipeImg;
  startButtonImage = startButtonImg;
  repeatButtonImage = repeatButtonImg;

  update();

  pipesInterval = setInterval(addPipes, ADD_PIPE_INTERVAL);

  document.addEventListener('keydown', movePlayer);
  canvas.addEventListener('mousedown', (event) => {
    detectImageClick(event);
    movePlayer(event);
  });
}

function update() {
  if (!doesContextExist(context)) return;

  if (didThePlayerLeaveGamePage(IS_P2P)) {
    isGameRunning = false;
    return;
  }

  if (!isGameRunning) {
    drawButton();
    return;
  }

  animationFrame = requestAnimationFrame(update);

  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  drawPlayer();
  drawScore();
  drawPipes();
  updatePlayerPosition();
}

function movePlayer(event: KeyboardEvent | MouseEvent) {
  if (didThePlayerLose) return;
  if (event instanceof KeyboardEvent && event.code !== SPACE_CODE) return;
  if (event instanceof MouseEvent && !isGameRunning) return;

  if (!isGameRunning) {
    isGameRunning = true;
    animationFrame = requestAnimationFrame(update);
  }

  player.velocity.y -= VELOCITY_Y;
}

function updatePlayerPosition() {
  player.position.y += player.velocity.y;

  if (didThePlayerHitTheBottom(player, CANVAS_HEIGHT)) {
    isGameRunning = false;
    didThePlayerLose = true;

    player.velocity.y = 0;

    updateScore(player.score);
  } else {
    player.velocity.y += GRAVITY;
  }
}

function addPipes() {
  if (!isGameRunning) return;

  const pipeY = 0;
  const pipeYPosition =
    pipeY - PIPE_HEIGHT / 4 - Math.random() * (PIPE_HEIGHT / 2);
  const openingSpace = CANVAS_HEIGHT / 4;
  const bottomPipePosY = pipeYPosition + openingSpace + PIPE_HEIGHT;

  pipes.push(
    createPipe(CANVAS_WIDTH, pipeYPosition, topPipeImage),
    createPipe(CANVAS_WIDTH, bottomPipePosY, bottomPipeImage),
  );
}

function drawPlayer() {
  if (!doesContextExist(context)) return;

  context.fillStyle = 'gray';
  context.fillRect(
    player.position.x,
    player.position.y,
    player.size.width,
    player.size.height,
  );
}

function drawScore() {
  if (!doesContextExist(context)) return;

  context.font = '64px Lato';
  context.fillStyle = 'black';
  context.fillText(
    String(Math.round(player.score)),
    CANVAS_WIDTH / 2 - 15,
    CANVAS_HEIGHT / 5,
  );
}

function drawPipes() {
  if (!doesContextExist(context)) return;

  for (const pipe of pipes) {
    pipe.position.x += VELOCITY_X;

    context.drawImage(
      pipe.image,
      pipe.position.x,
      pipe.position.y,
      pipe.size.width,
      pipe.size.height,
    );

    const didThePlayerGoThroughThePipe =
      player.position.x > pipe.position.x + pipe.size.width;

    if (!pipe.passed && didThePlayerGoThroughThePipe) {
      player.score += 0.5;
      pipe.passed = true;
    }

    if (detectPipeCollision(player, pipe)) {
      isGameRunning = false;
      didThePlayerLose = true;

      updateScore(player.score);
    }

    while (pipes.length > 0 && pipes[0].position.x < -pipes[0].size.width) {
      pipes.shift();
    }
  }
}

function drawButton() {
  if (!doesContextExist(context) || !repeatButtonImage || !startButtonImage)
    return;

  if (didThePlayerLose) {
    const { dx, dy } = getCenterOfCanvas(
      REPEAT_BUTTON_WIDTH,
      REPEAT_BUTTON_HEIGHT,
    );

    context.drawImage(
      repeatButtonImage,
      dx,
      dy,
      REPEAT_BUTTON_WIDTH,
      REPEAT_BUTTON_HEIGHT,
    );
  } else {
    const { dx, dy } = getCenterOfCanvas(
      START_BUTTON_WIDTH,
      START_BUTTON_HEIGHT,
    );

    context.drawImage(
      startButtonImage,
      dx,
      dy,
      START_BUTTON_WIDTH,
      START_BUTTON_HEIGHT,
    );
  }
}

function detectImageClick(event: MouseEvent) {
  if (isGameRunning) return;

  const { offsetX, offsetY } = event;
  let flag = false;

  if (didThePlayerLose) {
    flag = didClickHappen(
      offsetX,
      offsetY,
      REPEAT_BUTTON_WIDTH,
      REPEAT_BUTTON_HEIGHT,
    );

    if (flag) {
      didThePlayerLose = false;
      pipes = [];
      player = getInitialPlayerState();

      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (pipesInterval) {
        window.clearInterval(pipesInterval);
        pipesInterval = setInterval(addPipes, ADD_PIPE_INTERVAL);
      }
    }
  } else {
    flag = didClickHappen(
      offsetX,
      offsetY,
      START_BUTTON_WIDTH,
      START_BUTTON_HEIGHT,
    );
  }

  if (!flag) return;

  isGameRunning = true;
  animationFrame = requestAnimationFrame(update);
}

function initCanvas() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;

  if (!canvas) throw new Error('Canvas not found!');

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  return canvas;
}

function doesContextExist(
  ctx: CanvasRenderingContext2D | null,
): ctx is CanvasRenderingContext2D {
  if (!ctx) throw new Error('2D context is not supported!');
  return Boolean(ctx);
}
