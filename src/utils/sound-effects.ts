import { LocalPath } from './path-pointers';
import { game } from '@/services/game/game.service';

export function playSound(soundPath: LocalPath) {
  if (!game.settings.useSounds) return;

  const requireFromContext = require.context('../');
  const file = requireFromContext(soundPath);
  const sound: HTMLAudioElement = new Audio(file);
  sound.play().catch();
}
