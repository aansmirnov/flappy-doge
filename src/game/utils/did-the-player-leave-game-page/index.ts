import { GAME_ROUTE, P2P_GAME_ROUTE } from '@/consts';

export function didThePlayerLeaveGamePage(isP2P = false) {
  const href = window.location.href;

  return isP2P ? !href.includes(P2P_GAME_ROUTE) : !href.includes(GAME_ROUTE);
}
