import { loadImage } from '../load-image';

import zeroImageUrl from '@/game/assets/score/0.png';
import oneImageUrl from '@/game/assets/score/1.png';
import twoImageUrl from '@/game/assets/score/2.png';
import threeImageUrl from '@/game/assets/score/3.png';
import fourImageUrl from '@/game/assets/score/4.png';
import fiveImageUrl from '@/game/assets/score/5.png';
import sixImageUrl from '@/game/assets/score/6.png';
import sevenImageUrl from '@/game/assets/score/7.png';
import eightImageUrl from '@/game/assets/score/8.png';
import nineImageUrl from '@/game/assets/score/9.png';

let imagesMap: Record<string, HTMLImageElement> = {};

export async function loadScoreImages() {
  const scores = await Promise.all([
    loadImage(zeroImageUrl),
    loadImage(oneImageUrl),
    loadImage(twoImageUrl),
    loadImage(threeImageUrl),
    loadImage(fourImageUrl),
    loadImage(fiveImageUrl),
    loadImage(sixImageUrl),
    loadImage(sevenImageUrl),
    loadImage(eightImageUrl),
    loadImage(nineImageUrl),
  ]);

  imagesMap = scores.reduce(
    (acc, curr, index) => ({ ...acc, [`${index}`]: curr }),
    {},
  );
}

export function getScoreImages(gameScore: string) {
  const splittedScore = gameScore.split('');
  const images = [];

  for (const score of splittedScore) {
    images.push(imagesMap[score]);
  }

  return images;
}
