import { hitSound, wingSound, pointSound } from '@/game/assets';

type TypeSounds = 'hit' | 'wing' | 'point';

let hit: HTMLAudioElement | undefined;
let wing: HTMLAudioElement | undefined;
let point: HTMLAudioElement | undefined;

export async function loadSounds() {
  hit = new Audio(hitSound);
  wing = new Audio(wingSound);
  point = new Audio(pointSound);
}

export function playSound(key: TypeSounds) {
  switch (key) {
    case 'hit': {
      hit?.play();
      break;
    }
    case 'point': {
      point?.play();
      break;
    }
    case 'wing': {
      if (wing) {
        wing.currentTime = 0;
        wing.play();
      }
      break;
    }
    default: {
      throw new Error('Unknown sound!');
    }
  }
}
