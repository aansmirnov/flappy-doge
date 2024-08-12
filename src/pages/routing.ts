import {
  checkIfCorrectElement,
  getCorrectPathname,
  renderPageContent,
  setURL,
  toggleNavbarStyles,
} from '@/utils';

export function changeRoute(e: MouseEvent) {
  const element = e.target as HTMLElement;
  let route;

  if (checkIfCorrectElement(element, 'li')) {
    route = element.id;
  } else {
    const parentID = element.parentElement?.id;
    const isButton = checkIfCorrectElement(element, 'button');

    if (parentID && isButton) route = parentID;
  }

  if (!route || window.location.href.includes(route)) return;

  setURL(route);
  toggleNavbarStyles(route);
  renderPageContent(getCorrectPathname(route));
}
