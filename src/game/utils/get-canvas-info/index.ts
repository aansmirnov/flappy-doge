function isMobile() {
  return navigator.maxTouchPoints !== 0;
}

export function getCanvasWidth() {
  return isMobile() ? window.innerWidth - 20 : 480;
}

export function getCanvasHeight() {
  return isMobile() ? window.innerHeight - 85 : 640;
}
