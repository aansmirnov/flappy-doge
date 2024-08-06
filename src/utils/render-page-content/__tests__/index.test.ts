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
import { renderPageContent } from '@/utils';

describe('src / utils / renderPageContent', () => {
  beforeEach(() => {
    document.body.innerHTML = MOCK_HTML_WITHOUT_PAGE_CONTENT;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render game page for unknown route', () => {
    renderPageContent('Unknown');

    expect(document.getElementById(GAME_PAGE_ID)).toBeDefined();
  });

  it('should render p2p page', () => {
    renderPageContent(P2P_GAME_ROUTE);

    expect(document.getElementById(GAME_PAGE_ID)).toBe(null);
    expect(document.getElementById(P2P_GAME_PAGE_ID)).toBeDefined();
  });

  it('click on nav menu works correctly', () => {
    renderPageContent(ABOUT_ROUTE);

    expect(document.getElementById(ABOUT_PAGE_ID)).toBeDefined();

    const gameNavElement = document.getElementById(GAME_ROUTE);

    if (!gameNavElement) throw new Error('Incorrect test case!');

    gameNavElement.click();
    renderPageContent(GAME_ROUTE);

    expect(document.getElementById(GAME_PAGE_ID)).toBeDefined();
    expect(document.getElementById(ABOUT_PAGE_ID)).toBe(null);
  });

  it('should return an error for main element', () => {
    document.body.innerHTML = '';

    expect(() => renderPageContent(GAME_ROUTE)).toThrowError(
      'Main element not found!',
    );
  });
});
