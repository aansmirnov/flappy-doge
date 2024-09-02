import { loadImage } from '@/game/utils';

import {
  zeroScoreImageUrl,
  oneScoreImageUrl,
  twoScoreImageUrl,
  threeScoreImageUrl,
  fourScoreImageUrl,
  fiveScoreImageUrl,
  sixScoreImageUrl,
  sevenScoreImageUrl,
  eightScoreImageUrl,
  nineScoreImageUrl,
} from '@/game/assets';

let imagesMap: Record<string, HTMLImageElement> = {};

export async function loadScoreImages() {
  const scores = await Promise.all([
    loadImage(zeroScoreImageUrl),
    loadImage(oneScoreImageUrl),
    loadImage(twoScoreImageUrl),
    loadImage(threeScoreImageUrl),
    loadImage(fourScoreImageUrl),
    loadImage(fiveScoreImageUrl),
    loadImage(sixScoreImageUrl),
    loadImage(sevenScoreImageUrl),
    loadImage(eightScoreImageUrl),
    loadImage(nineScoreImageUrl),
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
