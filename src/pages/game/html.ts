import { GAME_CANVAS_ID, GAME_PAGE_ID } from '@/consts';

export const GAME_PAGE = `
    <div id=${GAME_PAGE_ID} class="game">
        <canvas id=${GAME_CANVAS_ID}></canvas>
        <div class="block">
            <h3 class="block__title">Flappy Doge</h3>
            <p class="block__description">
                Play flappy doge here online for free. 
                Use your spacebar or click the "Play" button to get started.
                Fly the doge as far as you can without hitting a pipe.
            </p>
            <h3 class="block__record">Your record: <span id="game-score"></span></h3>
        </div>
    </div>
`.trim();
