import {
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

  navbarElement.addEventListener('click', changeRoute);
}

document.addEventListener('DOMContentLoaded', main);
