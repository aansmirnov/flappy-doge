import { GAME_ROUTE } from '@/consts';
import { isProd, isValidPathname, getProdPathname } from '@/utils';

export function getCorrectPathname(pathname?: string) {
  let path = pathname || window.location.pathname;

  if (isProd()) {
    path = getProdPathname();
  }

  const isValidPath = isValidPathname(path);

  return isValidPath ? path : GAME_ROUTE;
}
