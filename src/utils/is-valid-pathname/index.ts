import { ABOUT_ROUTE, GAME_ROUTE, P2P_GAME_ROUTE } from '@/consts';

const CORRECT_ROUTES = [ABOUT_ROUTE, GAME_ROUTE, P2P_GAME_ROUTE];

export function isValidPathname(pathname: string) {
  return CORRECT_ROUTES.includes(pathname);
}
