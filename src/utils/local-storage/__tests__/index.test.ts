import { describe, expect, it } from 'vitest';
import { getItemFromLocalStorage, setItemToLocalStorage } from '..';

const KEY = 'something';

describe('src / utils / local-storage', () => {
  it('should return null', () => {
    const item = getItemFromLocalStorage(KEY);

    expect(item).toBe(null);
  });

  it('should set and get value correctly', () => {
    setItemToLocalStorage(KEY, 10);

    const item = getItemFromLocalStorage<number>(KEY);

    expect(item).not.toBe(null);
    expect(item).toBe(10);
  });
});
