import {
  ABOUT_ROUTE,
  FLAPPY_DOGE_ROUTE,
  GAME_ROUTE,
  P2P_GAME_ROUTE,
  IS_PROD,
} from '@/consts';
import { aboutPage, GAME_PAGE, renderScore, p2pGamePage } from '@/pages';
import { ACTIVE_NAV_MENU_ITEM_CLASS, CORRECT_ROUTES } from './consts';
import { initGame } from '@/game';

export function pageRenderer(targetPathame?: string) {
  let pathname = getCorrectPathname(targetPathame);

  const isCorrectRoute = CORRECT_ROUTES.includes(pathname);

  replaceURL(pathname, isCorrectRoute);
  pathname = isCorrectRoute ? pathname : GAME_ROUTE;

  createAndRenderElementByPathname(pathname);
  toggleActiveStyle(pathname, true);
}

function getCorrectPathname(targetPathame?: string) {
  const prodHref = window.location.href.split('/');
  const windowPathname = IS_PROD
    ? prodHref[prodHref.length - 1]
    : window.location.pathname.slice(1);

  return targetPathame ?? `/${windowPathname}`;
}

function replaceURL(pathname: string, isCorrectRoute: boolean) {
  const path = isCorrectRoute ? pathname : GAME_ROUTE;
  const pathByEnvironment = IS_PROD ? `${FLAPPY_DOGE_ROUTE}/#${path}` : path;

  window.history.replaceState(null, '', pathByEnvironment);
}

function createAndRenderElementByPathname(pathname: string) {
  switch (pathname) {
    case GAME_ROUTE: {
      createAndRenderElement(GAME_PAGE);
      renderScore();
      initGame();
      break;
    }
    case P2P_GAME_ROUTE: {
      createAndRenderElement(p2pGamePage());
      break;
    }
    case ABOUT_ROUTE: {
      createAndRenderElement(aboutPage());
      break;
    }
  }
}

function createAndRenderElement(content: string) {
  const mainElement = document.getElementById('main');

  if (!mainElement) throw new Error('Main element not found!');

  if (mainElement.children.length > 0) removeChildFromMainElement(mainElement);

  mainElement.insertAdjacentHTML('beforeend', content);
}

function toggleActiveStyle(navID: string, isAdded: boolean) {
  const navItemElement = document.getElementById(navID);

  if (navItemElement) {
    const key = isAdded ? 'add' : 'remove';
    navItemElement.classList[key](ACTIVE_NAV_MENU_ITEM_CLASS);
  }
}

function removeChildFromMainElement(mainElement: HTMLElement) {
  const child = mainElement.children[0];

  mainElement.removeChild(child);
  toggleActiveStyle(`/${child.id}`, false);
}
