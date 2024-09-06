export function getP2PGameElements() {
  const p2pKeyElement = document.getElementById('p2p-key');
  const inputElement = document.getElementById('p2p-input');
  const buttonElement = document.getElementById('p2p-connect-button');
  const canvasElements = document.getElementById('canvases');
  const formElement = document.getElementById('p2p-form');
  const connectionStatusElement = document.getElementById('connection-status');
  const startButtonElelemnt = document.getElementById('start-button');
  const gameStatusElement = document.getElementById('game-status');

  if (
    !p2pKeyElement ||
    !inputElement ||
    !buttonElement ||
    !canvasElements ||
    !formElement ||
    !connectionStatusElement ||
    !startButtonElelemnt ||
    !gameStatusElement
  )
    throw new Error('Elements not found!');

  return {
    p2pKeyElement,
    inputElement,
    buttonElement,
    canvasElements,
    formElement,
    connectionStatusElement,
    startButtonElelemnt,
    gameStatusElement,
  };
}
