import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { changeRoute } from '@/pages';
import { ABOUT_PAGE_ID, ABOUT_ROUTE, P2P_GAME_PAGE_ID } from '@/consts';
import { MOCK_HTML_WITHOUT_PAGE_CONTENT } from '@/utils';

describe('src / pages / routing', () => {
  beforeEach(() => {
    document.body.innerHTML = MOCK_HTML_WITHOUT_PAGE_CONTENT;
    document.addEventListener('click', changeRoute);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    document.removeEventListener('click', changeRoute);
  });

  it('should click / double click on LI element works correctly', () => {
    const aboutNavElement = document.getElementById(ABOUT_ROUTE);

    if (!aboutNavElement) {
      throw new Error('Incorrect test case!');
    }

    aboutNavElement.click();
    expect(document.getElementById(ABOUT_PAGE_ID)).toBeDefined();

    aboutNavElement.click();
    const mainElement = document.getElementById('main');

    if (!mainElement) {
      throw new Error('Incorrect test case!');
    }

    expect(mainElement.children.length).toBe(1);
  });

  it('should click on LI child element works correctly', () => {
    const buttonElement = document.getElementsByTagName('button')[1]; // P2P Game

    buttonElement.click();
    expect(document.getElementById(P2P_GAME_PAGE_ID)).toBeDefined();
  });

  it('should not render page content if clicked outside', () => {
    const mainElement = document.getElementById('main');

    if (!mainElement) {
      throw new Error('Incorrect test case!');
    }

    mainElement.click();
    expect(mainElement.children.length).toBe(0);
  });
});
