const body = document.body;
const navbarElement = document.getElementById('navbar');
const menuLinesElement = document.getElementById('menu-lines');
const closeIcon = document.getElementById('close-icon');

closeIcon?.addEventListener('click', () => toggleBurgerMenu(false));
menuLinesElement?.addEventListener('click', () => toggleBurgerMenu());

function toggleBurgerMenu(open = true) {
  if (!navbarElement) throw new Error('Navbar not found!');

  const method = open ? 'add' : 'remove';

  navbarElement.classList[method]('open');
  body.classList[method]('no-scroll');
}
