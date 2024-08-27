import { loadImage } from '../load-image';
import topPipeImageUrl from '../../assets/top-pipe.png';
import bottomPipeImageUrl from '../../assets/bottom-pipe.png';
import playButtonImageUrl from '../../assets/play-button.webp';
import repeatButtonImageUrl from '../../assets/repeat-button.webp';

export async function loadGameImages() {
  const [startButtonImg, topPipeImg, bottomPipeImg, repeatButtonImg] =
    await Promise.all([
      loadImage(playButtonImageUrl),
      loadImage(topPipeImageUrl),
      loadImage(bottomPipeImageUrl),
      loadImage(repeatButtonImageUrl),
    ]);

  return {
    startButtonImg,
    topPipeImg,
    bottomPipeImg,
    repeatButtonImg,
  };
}
