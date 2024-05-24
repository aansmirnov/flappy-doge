import {
  ABOUT_ROUTE,
  FLAPPY_DOGE_ROUTE,
  GAME_ROUTE,
  P2P_GAME_ROUTE,
  PROD_HOSTNAME,
} from '@/consts';
import { aboutPage, gamePage, p2pGamePage } from '@/pages';
import { ACTIVE_NAV_MENU_ITEM_CLASS, CORRECT_ROUTES } from './consts';

export function pageRenderer(targetPathame?: string) {
  const isProd = window.location.hostname === PROD_HOSTNAME;
  const prodHref = window.location.href.split('/');
  const windowPathname = isProd
    ? prodHref[prodHref.length - 1]
    : window.location.pathname;
  let pathname = targetPathame ?? windowPathname;

  if (CORRECT_ROUTES.includes(pathname)) {
    const path = isProd ? `${FLAPPY_DOGE_ROUTE}/#${pathname}` : pathname;

    window.history.replaceState(null, '', path);
  } else {
    const path = isProd ? `${FLAPPY_DOGE_ROUTE}/#${GAME_ROUTE}` : GAME_ROUTE;

    window.history.replaceState(null, '', path);
    pathname = GAME_ROUTE;
  }

  switch (pathname) {
    case GAME_ROUTE: {
      createAndRenderElement(gamePage());
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
    default: {
      throw new Error('Unknown path!');
    }
  }

  toggleActiveStyle(pathname, true);
}

function createAndRenderElement(content: string) {
  const mainElement = document.getElementById('main');

  if (!mainElement) {
    throw new Error('Main element not found!');
  }

  if (mainElement.children.length > 0) {
    removeChildFromMainElement(mainElement);
  }

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
