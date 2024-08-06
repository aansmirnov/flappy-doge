const MENU_ITEMS = document.getElementsByClassName('menu__item');
const ACTIVE_NAV_MENU_ITEM_CLASS = 'menu__item__active';

export function toggleNavbarStyles(route: string) {
  for (const menu of MENU_ITEMS) {
    if (menu.className.includes(ACTIVE_NAV_MENU_ITEM_CLASS)) {
      menu.classList.remove(ACTIVE_NAV_MENU_ITEM_CLASS);
      continue;
    }

    if (menu.id === route) {
      menu.classList.add(ACTIVE_NAV_MENU_ITEM_CLASS);
    }
  }
}
