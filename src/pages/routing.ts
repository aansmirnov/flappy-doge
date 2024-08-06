import {
  getCorrectPathname,
  renderPageContent,
  setURL,
  toggleNavbarStyles,
} from '@/utils';

export function changeRoute(e: MouseEvent) {
  const element = e.target as HTMLElement;
  let route;

  if (element.nodeName.toLocaleLowerCase() === 'li') {
    route = element.id;
  } else {
    const parentID = element.parentElement?.id;

    if (parentID) route = parentID;
  }

  if (!route || window.location.href.includes(route)) return;

  setURL(route);
  toggleNavbarStyles(route);
  renderPageContent(getCorrectPathname(route));
}
