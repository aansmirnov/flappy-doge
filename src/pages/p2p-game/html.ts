import { P2P_GAME_PAGE_ID } from '@/consts';

export const P2P_GAME_PAGE = `
    <div id=${P2P_GAME_PAGE_ID} class="p2p">
        <div class="block" id="p2p-form">
            <div class="block__wrapper">
                <h3 class="wrapper__title">Your P2P key is: <span id="p2p-key" class="loader"></span></h3>
                <div class="wrapper__connect">
                    <p>Insert P2P key of your friend and press "Connect" button!</p>
                    <div class="connect__form">
                        <input type="text" class="input" id="p2p-input" />
                        <button class="connect__button" id="p2p-connect-button">Connect</button>
                    </div>
                    <p id="connection-status"></p>
                    <button class="start__button" id="start-button">Start Game</button>
                    <p id="game-status"></p>
                </div>
            </div>
        </div>
        <div class="p2p-canvas" id="canvases">
            <canvas id="canvas"></canvas>
            <canvas id="canvas-view"></canvas>
        </div>
    </div>
`.trim();
