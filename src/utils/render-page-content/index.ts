import { ABOUT_ROUTE, GAME_ROUTE, P2P_GAME_ROUTE } from '@/consts';
import { ABOUT_PAGE, GAME_PAGE, initGamePage, P2P_GAME_PAGE } from '@/pages';

export function renderPageContent(pathname: string) {
  switch (pathname) {
    case GAME_ROUTE: {
      addContentToMainElement(GAME_PAGE);
      initGamePage();
      break;
    }
    case P2P_GAME_ROUTE: {
      addContentToMainElement(P2P_GAME_PAGE);
      break;
    }
    case ABOUT_ROUTE: {
      addContentToMainElement(ABOUT_PAGE);
      break;
    }
  }
}

function addContentToMainElement(content: string) {
  const mainElement = document.getElementById('main');

  if (!mainElement) throw new Error('Main element not found!');

  if (mainElement.children.length > 0) {
    const child = mainElement.children[0];
    mainElement.removeChild(child);
  }

  mainElement.insertAdjacentHTML('beforeend', content);
}
