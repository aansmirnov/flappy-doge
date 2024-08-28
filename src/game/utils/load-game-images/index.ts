import { loadImage } from '../load-image';
import topPipeImageUrl from '@/game/assets/top-pipe.png';
import bottomPipeImageUrl from '@/game/assets/bottom-pipe.png';
import playButtonImageUrl from '@/game/assets/play-button.webp';
import repeatButtonImageUrl from '@/game/assets/repeat-button.webp';
import dogeImageUrl from '@/game/assets/doge.webp'

export async function loadGameImages() {
  const [startButtonImg, topPipeImg, bottomPipeImg, repeatButtonImg, dogeImg] =
    await Promise.all([
      loadImage(playButtonImageUrl),
      loadImage(topPipeImageUrl),
      loadImage(bottomPipeImageUrl),
      loadImage(repeatButtonImageUrl),
      loadImage(dogeImageUrl),
    ]);

  return {
    startButtonImg,
    topPipeImg,
    bottomPipeImg,
    repeatButtonImg,
    dogeImg,
  };
}
