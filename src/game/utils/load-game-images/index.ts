import { loadImage } from '@/game/utils';
import {
  playButtonImage,
  topPipeImage,
  bottomPipeImage,
  repeatButtonImage,
} from '@/game/assets';
import dogeImage from '/public/doge.webp';

export async function loadGameImages() {
  const [startButtonImg, topPipeImg, bottomPipeImg, repeatButtonImg, dogeImg] =
    await Promise.all([
      loadImage(playButtonImage),
      loadImage(topPipeImage),
      loadImage(bottomPipeImage),
      loadImage(repeatButtonImage),
      loadImage(dogeImage),
    ]);

  return {
    startButtonImg,
    topPipeImg,
    bottomPipeImg,
    repeatButtonImg,
    dogeImg,
  };
}
