import {
  getCorrectPathname,
  renderPageContent,
  setURL,
  toggleNavbarStyles,
} from '@/utils';
import { changeRoute } from '@/pages';

function main() {
  const menuElement = document.getElementById('navbar-menu');

  if (!menuElement) throw new Error('Navbar not found!');

  const path = getCorrectPathname();

  setURL(path);
  toggleNavbarStyles(path);
  renderPageContent(getCorrectPathname(path));

  menuElement.addEventListener('click', changeRoute);
}

document.addEventListener('DOMContentLoaded', main);
