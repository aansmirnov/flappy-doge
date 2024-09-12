import {
  GAME_CANVAS_ID,
  GAME_VIEW_CANVAS_ID,
  P2P_GAME_PAGE_ID,
} from '@/consts';
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

export const P2P_GAME_PAGE = `
    <div id=${P2P_GAME_PAGE_ID} class="p2p">
        <div class="block" id=${P2P_FORM_ID}>
            <div class="block__wrapper">
                <h3 class="wrapper__title">Your P2P key is: <span id=${P2P_KEY_ID} class="loader"></span></h3>
                <div class="wrapper__connect">
                    <p>Insert P2P key of your friend and press "Connect" button!</p>
                    <div class="connect__form">
                        <input type="text" class="connect__input" id=${P2P_INPUT_ID} />
                        <button class="connect__button" id=${P2P_CONNECT_BUTTON_ID}>Connect</button>
                    </div>
                    <p id=${P2P_CONNECTION_STATUS_ID}></p>
                    <button class="start__button" id=${P2P_START_BUTTON_ID}>Start Game</button>
                    <p id=${P2P_GAME_STATUS}></p>
                </div>
            </div>
        </div>
        <div class="p2p-canvas" id=${P2P_CANVASES}>
            <canvas id=${GAME_CANVAS_ID}></canvas>
            <canvas id=${GAME_VIEW_CANVAS_ID}></canvas>
        </div>
    </div>
`.trim();
