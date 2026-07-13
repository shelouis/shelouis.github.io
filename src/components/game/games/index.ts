'use client';

import dynamic from 'next/dynamic';
import type { GameId } from '@/lib/types';

const TicketTriage = dynamic(() => import('./TicketTriage'), { ssr: false });
const ServerMonitor = dynamic(() => import('./ServerMonitor'), { ssr: false });
const MultiPanel = dynamic(() => import('./MultiPanel'), { ssr: false });
const TeamRouter = dynamic(() => import('./TeamRouter'), { ssr: false });
const PipelineBuilder = dynamic(() => import('./PipelineBuilder'), { ssr: false });
const BugHunter = dynamic(() => import('./BugHunter'), { ssr: false });
const Migration = dynamic(() => import('./Migration'), { ssr: false });

export const GAME_REGISTRY: Record<GameId, React.ComponentType<{ onScore: (n: number) => void; onFinish: () => void }>> = {
  'ticket-triage': TicketTriage,
  'server-monitor': ServerMonitor,
  'multi-panel': MultiPanel,
  'team-router': TeamRouter,
  'pipeline-builder': PipelineBuilder,
  'bug-hunter': BugHunter,
  migration: Migration,
};
