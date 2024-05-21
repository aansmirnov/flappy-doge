import { pageRenderer } from '@/utils';
import { changeRoute } from '@/pages';

function main() {
  const menuElement = document.getElementById('navbar-menu');

  if (!menuElement) {
    throw new Error('Navbar not found!');
  }

  pageRenderer();

  menuElement.addEventListener('click', changeRoute);
}

document.addEventListener('DOMContentLoaded', main);
