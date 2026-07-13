'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { JOB_LEVELS } from '@/lib/cv-data';
import { useGameStore } from '@/store/game-store';
import { GameFrame } from './GameFrame';
import { GAME_REGISTRY } from './games';

export default function GameModal() {
  const currentLevelId = useGameStore((s) => s.currentLevelId);
  const setScreen = useGameStore((s) => s.setScreen);
  const setCurrentLevel = useGameStore((s) => s.setCurrentLevel);
  const completeLevel = useGameStore((s) => s.completeLevel);

  const level = JOB_LEVELS.find((l) => l.id === currentLevelId);

  const handleExit = useCallback(() => {
    setCurrentLevel(null);
    setScreen('map');
  }, [setCurrentLevel, setScreen]);

  const handleComplete = useCallback(
    (score: number) => {
      if (currentLevelId) {
        // Only mark as completed (and unlock next level) if the player passed
        // (score meets or exceeds the goal). Failed attempts don't unlock progression.
        const passed = score >= level.gameGoal;
        if (passed) {
          completeLevel(currentLevelId, score);
        }
      }
      setCurrentLevel(null);
      setScreen('map');
    },
    [currentLevelId, level, completeLevel, setCurrentLevel, setScreen],
  );

  if (!level) {
    return null;
  }

  const GameComponent = GAME_REGISTRY[level.gameId];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <GameFrame level={level} onExit={handleExit} onComplete={handleComplete}>
        {({ onScore, onFinish }) => <GameComponent onScore={onScore} onFinish={onFinish} />}
      </GameFrame>
    </motion.div>
  );
}
