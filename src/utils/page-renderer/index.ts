import { ABOUT_ROUTE, GAME_ROUTE, P2P_GAME_ROUTE } from '@/consts';
import { aboutPage, gamePage, p2pGamePage } from '@/pages';
import { ACTIVE_NAV_MENU_ITEM_CLASS, CORRECT_ROUTES } from './consts';

const mainElement = document.getElementById('main');

export function pageRenderer(targetPathame?: string) {
  let pathname = targetPathame ?? window.location.pathname.slice(1);

  if (CORRECT_ROUTES.includes(pathname)) {
    window.history.replaceState(null, '', pathname);
  } else {
    window.history.replaceState(null, '', GAME_ROUTE);
    pathname = GAME_ROUTE;
  }

  switch (pathname) {
    case GAME_ROUTE: {
      createAndRenderElement(gamePage(), GAME_ROUTE);
      break;
    }
    case P2P_GAME_ROUTE: {
      createAndRenderElement(p2pGamePage(), P2P_GAME_ROUTE);
      break;
    }
    case ABOUT_ROUTE: {
      createAndRenderElement(aboutPage(), ABOUT_ROUTE);
      break;
    }
    default: {
      throw new Error('Unknown path!');
    }
  }

  toggleActiveStyle(pathname, true);
}

function createAndRenderElement(content: string, elementID: string) {
  const element = document.createElement('div');
  element.setAttribute('id', elementID);
  element.insertAdjacentHTML('beforeend', content);

  if (!mainElement) {
    throw new Error('Main element not found!');
  }

  if (mainElement.childNodes.length > 0) {
    removeChildFromMainElement(mainElement);
  }

  mainElement.appendChild(element);
}

function toggleActiveStyle(navID: string, isAdded: boolean) {
  const navItemElement = document.getElementById(navID);

  if (navItemElement) {
    const key = isAdded ? 'add' : 'remove';
    navItemElement.classList[key](ACTIVE_NAV_MENU_ITEM_CLASS);
  }
}

function removeChildFromMainElement(mainElement: HTMLElement) {
  const child = mainElement.childNodes[0] as HTMLElement;

  mainElement.removeChild(child);
  toggleActiveStyle(child.id, false);
}
