import { FLAPPY_DOGE_ROUTE } from '@/consts';
import { isProd } from '@/utils';

export function setURL(path: string) {
  const pathByEnvironment = isProd() ? `${FLAPPY_DOGE_ROUTE}/#${path}` : path;
  window.history.replaceState(null, '', pathByEnvironment);
}
