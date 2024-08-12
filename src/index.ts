import {
  checkIfCorrectElement,
  getCorrectPathname,
  renderPageContent,
  setURL,
  toggleNavbarStyles,
} from '@/utils';
import { changeRoute } from '@/pages';

function main() {
  const navbarElement = document.getElementById('navbar');

  if (!navbarElement) throw new Error('Navbar not found!');

  const path = getCorrectPathname();

  setURL(path);
  toggleNavbarStyles(path);
  renderPageContent(getCorrectPathname(path));

  navbarElement.addEventListener('click', (event) => {
    const element = event.target as HTMLElement;
    const shouldChangeStyles =
      checkIfCorrectElement(element, 'li') ||
      checkIfCorrectElement(element, 'button');

    if (window.innerWidth <= 500 && shouldChangeStyles)
      navbarElement.classList.remove('open');

    changeRoute(event);
  });
}

document.addEventListener('DOMContentLoaded', main);
