'use client';

import { useCallback, useEffect } from 'react';
import { sfx, initAudio } from '@/lib/sound';

/**
 * Hook to play sound effects in game components.
 * Automatically initializes audio on first use.
 */
export function useSfx() {
  useEffect(() => {
    // Pre-init on mount (will be ready when user clicks)
    return () => {};
  }, []);

  const play = useCallback((sound: keyof typeof sfx) => {
    initAudio();
    sfx[sound]?.();
  }, []);

  return play;
}

/**
 * Play a sound on a good action (convenience wrapper).
 */
export function useGoodSound(sound: keyof typeof sfx) {
  const play = useSfx();
  return useCallback(() => play(sound), [play, sound]);
}
