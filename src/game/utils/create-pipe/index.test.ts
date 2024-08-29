import { describe, expect, it } from 'vitest';
import { PIPE_HEIGHT, PIPE_WIDTH } from '@/game/consts';
import { createPipe } from '.';

describe('createPipe', () => {
  it('should work correctly', () => {
    const image = new Image();
    const pipe = createPipe(10, 20, image);

    expect(pipe.passed).toBe(false);
    expect(pipe.size).toStrictEqual({ width: PIPE_WIDTH, height: PIPE_HEIGHT });
    expect(pipe.position).toStrictEqual({ x: 10, y: 20 });
  });
});
