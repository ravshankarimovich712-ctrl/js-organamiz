import React from 'react';
import { Sparkles, Flame } from 'lucide-react';
import { UserProgress } from '../types';
import { calculateLevel } from '../utils/storage';

interface HeaderProps {
  currentTab: 'roadmap' | 'lesson' | 'playground' | 'cheatsheet' | 'achievements';
  onSelectTab: (tab: 'roadmap' | 'lesson' | 'playground' | 'cheatsheet' | 'achievements') => void;
  progress: UserProgress;
  onContinueLearning: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  progress,
  onContinueLearning,
}) => {
  const { level } = calculateLevel(progress.totalXp);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('roadmap')}
          className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-sky-400 font-mono font-bold flex items-center justify-center text-sm shadow-sm group-hover:bg-slate-800 transition-colors">
            JS
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
              JS Ustoz
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('roadmap')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              currentTab === 'roadmap'
                ? 'text-slate-900 border-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Darslik
          </button>
          <button
            onClick={() => onSelectTab('playground')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              currentTab === 'playground'
                ? 'text-slate-900 border-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Laboratoriya
          </button>
          <button
            onClick={() => onSelectTab('cheatsheet')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              currentTab === 'cheatsheet'
                ? 'text-slate-900 border-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Konspekt
          </button>
          <button
            onClick={() => onSelectTab('achievements')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              currentTab === 'achievements'
                ? 'text-slate-900 border-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Yutuqlar
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-amber-600">
              <Flame className="w-3.5 h-3.5" />
              <span className="tabular-nums font-semibold">{progress.streakDays}</span> kun ketma-ket
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1 text-sky-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tabular-nums font-semibold">{progress.totalXp}</span> XP
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-700">Daraja {level}</span>
          </div>

          <button
            onClick={onContinueLearning}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>Darsga o'tish</span>
          </button>
        </div>
      </div>
    </header>
  );
};
