import { getElements } from '@/utils';
import { DataConnection, Peer } from 'peerjs';
import {
  P2P_CANVASES,
  P2P_CONNECT_BUTTON_ID,
  P2P_CONNECTION_STATUS_ID,
  P2P_FORM_ID,
  P2P_GAME_STATUS,
  P2P_INPUT_ID,
  P2P_KEY_ID,
  P2P_START_BUTTON_ID,
} from './consts';

export function initP2PGamePage() {
  createPear();
  addEventListeners();
}

let peer: Peer | undefined;
let inputValue: string | undefined;
let connection: DataConnection | undefined;
let isPeerReady = false;
let amIReady = false;

function createPear() {
  if (peer) peer.destroy();

  peer = new Peer();

  const [p2pKeyElement] = getElements(P2P_KEY_ID);

  peer.on('open', (id) => {
    p2pKeyElement.innerHTML = id;
    p2pKeyElement.classList.remove('loader');
  });

  receive(peer);
}

function addEventListeners() {
  const [startButtonElelemnt, inputElement, buttonElement] = getElements([
    P2P_START_BUTTON_ID,
    P2P_INPUT_ID,
    P2P_CONNECT_BUTTON_ID,
  ]);

  inputElement.addEventListener('input', (event) => {
    inputValue = (event.target as HTMLInputElement).value;
  });

  buttonElement.addEventListener('click', () => {
    if (!inputValue) return;

    renderConnectionState('connecting..');
    connect(inputValue);
  });

  startButtonElelemnt.addEventListener('click', sendReadyStatus);
}

function receive(peer: Peer) {
  peer.on('connection', (peerConnection) => {
    connection = peerConnection;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    peerConnection.on('data', (data: any) => {
      if (data[peerConnection.peer] !== undefined) receiveReadyStatus();
    });

    peerConnection.on('iceStateChanged', (state) => {
      renderConnectionState(`someone ${state}`);

      if (state === 'connected') renderStatGameButton();
    });

    peerConnection.on('close', closeConnection);
  });
}

function connect(id: string) {
  if (!peer) throw new Error('P2P instance not found!');

  const peerConnection = peer.connect(id);
  connection = peerConnection;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  peerConnection.on('data', (data: any) => {
    if (data[peerConnection.peer] !== undefined) receiveReadyStatus();
  });

  peerConnection.on('iceStateChanged', (state) => {
    renderConnectionState(state);

    if (state === 'connected') renderStatGameButton();
  });

  peerConnection.on('close', closeConnection);
}

function receiveReadyStatus() {
  isPeerReady = true;

  if (amIReady) renderCanvases();
  else {
    const [gameStatusElement] = getElements(P2P_GAME_STATUS);

    gameStatusElement.innerHTML = 'Your opponent is ready!';
  }
}

function sendReadyStatus() {
  if (!connection || !peer) throw new Error('Cannot to start a game!');

  connection.send({ [peer.id]: true });
  amIReady = true;

  if (isPeerReady) renderCanvases();
  else {
    const [gameStatusElement] = getElements(P2P_GAME_STATUS);

    gameStatusElement.innerHTML = 'Awaiting..';
  }
}

function closeConnection() {
  alert('Your opponent has just left!');
  window.location.reload();
}

function renderCanvases() {
  const [canvasElements, formElement] = getElements([
    P2P_CANVASES,
    P2P_FORM_ID,
  ]);

  canvasElements.style.display = 'flex';
  formElement.style.display = 'none';
}

function renderConnectionState(state: string) {
  const [connectionStatusElement] = getElements([P2P_CONNECTION_STATUS_ID]);

  connectionStatusElement.style.display = 'block';
  connectionStatusElement.innerHTML = `Status: ${state}`;
}

function renderStatGameButton() {
  const [startButtonElelemnt] = getElements([P2P_START_BUTTON_ID]);

  startButtonElelemnt.style.display = 'block';
}
