type Position = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

type Velocity = Position;

export type Player = {
  position: Position;
  size: Size;
  velocity: Velocity;
  score: number;
};

export type Pipe = {
  position: Position;
  size: Size;
  passed: boolean;
  image: HTMLImageElement;
};
