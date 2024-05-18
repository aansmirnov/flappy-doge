import { pageRenderer } from '@/utils';
import { changeRoute } from '@/pages';

const menuElement = document.getElementById('navbar-menu');

function main() {
  if (!menuElement) {
    throw new Error('Navbar not found!');
  }

  pageRenderer();

  menuElement.addEventListener('click', changeRoute);
}

document.addEventListener('DOMContentLoaded', main);
