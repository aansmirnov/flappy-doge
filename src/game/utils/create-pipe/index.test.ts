import { describe, expect, it } from 'vitest';
import { PIPE_HEIGHT, PIPE_WIDTH } from '../../consts';
import { createPipe } from '.';

describe('createPipe', () => {
  it('should work correctly', () => {
    const pipe = createPipe(10, 20);

    expect(pipe.passed).toBe(false);
    expect(pipe.size).toStrictEqual({ width: PIPE_WIDTH, height: PIPE_HEIGHT });
    expect(pipe.position).toStrictEqual({ x: 10, y: 20 });
  });
});
