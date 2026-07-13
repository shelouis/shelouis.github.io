'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';
import { JOB_LEVELS } from '@/lib/cv-data';
import BootScreen from '@/components/game/BootScreen';
import StatusBar from '@/components/game/StatusBar';
import CareerMap from '@/components/game/CareerMap';
import SkillsPanel from '@/components/game/SkillsPanel';
import GameModal from '@/components/game/GameModal';
import FinalCV from '@/components/game/FinalCV';
import { Footer } from '@/components/game/Footer';

export default function Home() {
  const screen = useGameStore((s) => s.screen);
  const booted = useGameStore((s) => s.booted);
  const setScreen = useGameStore((s) => s.setScreen);
  const results = useGameStore((s) => s.results);

  // After hydration: skip boot if already booted before
  useEffect(() => {
    if (booted && screen === 'boot') {
      setScreen('map');
    }
  }, []);

  const isBoot = screen === 'boot';

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Decorative top scanline (subtle) */}
      {!isBoot && (
        <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent z-50" />
      )}

      {/* Boot screen is full-screen */}
      {isBoot ? (
        <main className="flex-1">
          <BootScreen />
        </main>
      ) : (
        <>
          <StatusBar />
          <main className="flex-1 pb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
              >
                {screen === 'map' && <CareerMap />}
                {screen === 'game' && <GameModal />}
                {screen === 'cv' && <FinalCV />}
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer completedCount={Object.keys(results).length} totalLevels={JOB_LEVELS.length} />
        </>
      )}
    </div>
  );
}
