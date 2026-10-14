import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RoadmapView } from './components/RoadmapView';
import { LessonWorkspace } from './components/LessonWorkspace';
import { PlaygroundView } from './components/PlaygroundView';
import { CheatsheetView } from './components/CheatsheetView';
import { AchievementsView } from './components/AchievementsView';
import { UserProgress } from './types';
import { loadUserProgress, saveUserProgress } from './utils/storage';
import { CURRICULUM } from './data/curriculum';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'roadmap' | 'lesson' | 'playground' | 'cheatsheet' | 'achievements'>('roadmap');
  const [activeLessonId, setActiveLessonId] = useState<string>('mod1_les1');
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());

  // Save to localStorage on progress changes
  const handleUpdateProgress = (updated: UserProgress) => {
    setProgress(updated);
    saveUserProgress(updated);
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentTab('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueLearning = () => {
    // Find first uncompleted lesson
    const allLessons = CURRICULUM.flatMap((m) => m.lessons);
    const firstUncompleted = allLessons.find(
      (l) => !progress.completedLessons.includes(l.id)
    );
    const targetId = firstUncompleted ? firstUncompleted.id : allLessons[0].id;
    handleSelectLesson(targetId);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-sky-100 selection:text-sky-900">
      {/* 3-Zone Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        progress={progress}
        onContinueLearning={handleContinueLearning}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'roadmap' && (
          <RoadmapView
            progress={progress}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {currentTab === 'lesson' && (
          <LessonWorkspace
            lessonId={activeLessonId}
            onSelectLesson={handleSelectLesson}
            onBackToRoadmap={() => setCurrentTab('roadmap')}
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {currentTab === 'playground' && <PlaygroundView />}

        {currentTab === 'cheatsheet' && <CheatsheetView />}

        {currentTab === 'achievements' && (
          <AchievementsView progress={progress} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">JS Ustoz</span>
            <span aria-hidden="true">·</span>
            <span>JavaScriptdan Reactgacha bosqichma-bosqich o'rganish platformasi</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentTab('roadmap')}
              className="hover:text-slate-900 transition-colors"
            >
              Darslik
            </button>
            <button
              onClick={() => setCurrentTab('playground')}
              className="hover:text-slate-900 transition-colors"
            >
              Laboratoriya
            </button>
            <button
              onClick={() => setCurrentTab('cheatsheet')}
              className="hover:text-slate-900 transition-colors"
            >
              Konspekt
            </button>
            <button
              onClick={() => setCurrentTab('achievements')}
              className="hover:text-slate-900 transition-colors"
            >
              Yutuqlar
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
