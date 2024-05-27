import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import {
  ABOUT_PAGE_ID,
  ABOUT_ROUTE,
  GAME_PAGE_ID,
  GAME_ROUTE,
  P2P_GAME_PAGE_ID,
  P2P_GAME_ROUTE,
} from '@/consts';
import { MOCK_HTML_WITHOUT_PAGE_CONTENT } from '@/utils';
import { pageRenderer } from '..';

describe('src / utils / pageRenderer', () => {
  beforeEach(() => {
    document.body.innerHTML = MOCK_HTML_WITHOUT_PAGE_CONTENT;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render game page for unknown route', () => {
    pageRenderer('Unknown');

    expect(document.getElementById(GAME_PAGE_ID)).toBeDefined();
  });

  it('should render p2p page', () => {
    pageRenderer(P2P_GAME_ROUTE);

    expect(document.getElementById(GAME_PAGE_ID)).toBe(null);
    expect(document.getElementById(P2P_GAME_PAGE_ID)).toBeDefined();
  });

  it('click on nav menu works correctly', () => {
    pageRenderer(ABOUT_ROUTE);

    expect(document.getElementById(ABOUT_PAGE_ID)).toBeDefined();

    const gameNavElement = document.getElementById(GAME_ROUTE);

    if (!gameNavElement) throw new Error('Incorrect test case!');

    gameNavElement.click();
    pageRenderer(GAME_ROUTE);

    expect(document.getElementById(GAME_PAGE_ID)).toBeDefined();
    expect(document.getElementById(ABOUT_PAGE_ID)).toBe(null);
  });

  it('should return an error for main element', () => {
    document.body.innerHTML = '';

    expect(pageRenderer).toThrowError('Main element not found!');
  });
});
