import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Code2,
  HelpCircle,
  Play,
  CheckCircle,
  Lightbulb,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Layout,
  CheckCircle2,
} from 'lucide-react';
import { Lesson, ConsoleLogEntry, TestResult, UserProgress } from '../types';
import { CURRICULUM } from '../data/curriculum';
import { executeJavaScript, runTestCases } from '../utils/codeRunner';
import { CodeEditor } from './CodeEditor';
import { ConsoleOutput } from './ConsoleOutput';
import { TestResultsPanel } from './TestResultsPanel';
import { ReactLivePreview } from './ReactLivePreview';
import { QuizSection } from './QuizSection';

interface LessonWorkspaceProps {
  lessonId: string;
  onSelectLesson: (id: string) => void;
  onBackToRoadmap: () => void;
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const LessonWorkspace: React.FC<LessonWorkspaceProps> = ({
  lessonId,
  onSelectLesson,
  onBackToRoadmap,
  progress,
  onUpdateProgress,
}) => {
  // Find current lesson and module
  const currentModule = CURRICULUM.find((m) =>
    m.lessons.some((l) => l.id === lessonId)
  );
  const currentLesson = currentModule?.lessons.find((l) => l.id === lessonId);

  // Flattened all lessons for previous/next navigation
  const allLessons = CURRICULUM.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Tabs on left pane
  const [leftTab, setLeftTab] = useState<'theory' | 'challenge' | 'quiz'>('theory');

  // Tabs on right pane
  const [rightTab, setRightTab] = useState<'console' | 'tests' | 'preview'>(
    currentLesson?.isReactLesson ? 'preview' : 'console'
  );

  // Code editor state
  const [code, setCode] = useState<string>(
    progress.savedCode[lessonId] || currentLesson?.challenge.starterCode || ''
  );

  // Execution states
  const [logs, setLogs] = useState<ConsoleLogEntry[]>([]);
  const [execResult, setExecResult] = useState<unknown>(undefined);
  const [execError, setExecError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Test states
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [allPassed, setAllPassed] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  // Hints and solutions
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // When lesson changes, re-init code
  useEffect(() => {
    if (currentLesson) {
      setCode(
        progress.savedCode[lessonId] || currentLesson.challenge.starterCode || ''
      );
      setLogs([]);
      setExecResult(undefined);
      setExecError(null);
      setTestResults(null);
      setAllPassed(false);
      setShowHint(false);
      setShowSolution(false);
      setLeftTab('theory');
      setRightTab(currentLesson.isReactLesson ? 'preview' : 'console');
    }
  }, [lessonId]);

  if (!currentLesson || !currentModule) {
    return (
      <div className="p-12 text-center text-slate-600">
        Dars topilmadi.{' '}
        <button onClick={onBackToRoadmap} className="underline text-sky-600">
          Yo'l xaritasiga qaytish
        </button>
      </div>
    );
  }

  // Handle Code Execution
  const handleRunCode = async () => {
    setIsRunning(true);
    setExecError(null);
    setRightTab('console');

    const { logs: capturedLogs, result, error } = await executeJavaScript(code);
    setLogs(capturedLogs);
    setExecResult(result);
    setExecError(error);
    setIsRunning(false);
  };

  // Handle Automated Tests Execution
  const handleRunTests = async () => {
    setIsTesting(true);
    setRightTab('tests');

    const { testResults: results, allPassed: passed, logs: testLogs } =
      await runTestCases(code, currentLesson.challenge.testCases);

    setTestResults(results);
    setAllPassed(passed);
    setLogs((prev) => [...prev, ...testLogs]);
    setIsTesting(false);

    if (passed) {
      // Fire confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      // Update progress
      const updatedSolved = progress.solvedChallenges.includes(lessonId)
        ? progress.solvedChallenges
        : [...progress.solvedChallenges, lessonId];

      const updatedCompleted = progress.completedLessons.includes(lessonId)
        ? progress.completedLessons
        : [...progress.completedLessons, lessonId];

      const xpBonus = progress.solvedChallenges.includes(lessonId)
        ? 0
        : currentLesson.xp;

      onUpdateProgress({
        ...progress,
        completedLessons: updatedCompleted,
        solvedChallenges: updatedSolved,
        totalXp: progress.totalXp + xpBonus,
        savedCode: {
          ...progress.savedCode,
          [lessonId]: code,
        },
      });
    }
  };

  const handleResetCode = () => {
    setCode(currentLesson.challenge.starterCode);
    setTestResults(null);
    setLogs([]);
  };

  const handleQuizCompleted = (score: number, total: number) => {
    const isNew = !progress.quizScores[lessonId];
    const xpBonus = isNew ? score * 10 : 0;

    const updatedCompleted = progress.completedLessons.includes(lessonId)
      ? progress.completedLessons
      : [...progress.completedLessons, lessonId];

    onUpdateProgress({
      ...progress,
      completedLessons: updatedCompleted,
      totalXp: progress.totalXp + xpBonus,
      quizScores: {
        ...progress.quizScores,
        [lessonId]: { score, total },
      },
    });

    if (score === total) {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 },
      });
    }
  };

  const isLessonCompleted = progress.completedLessons.includes(lessonId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={onBackToRoadmap}
            className="hover:text-slate-900 font-medium transition-colors"
          >
            ← Barcha Darslar
          </button>
          <span aria-hidden="true">·</span>
          <span>{currentModule.title}</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-900 font-semibold">{currentLesson.title}</span>
          {isLessonCompleted && (
            <span className="flex items-center gap-1 text-emerald-600 font-medium ml-1">
              <CheckCircle className="w-3.5 h-3.5" /> Bajarildi
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => prevLesson && onSelectLesson(prevLesson.id)}
            disabled={!prevLesson}
            className={`px-2.5 py-1 text-xs font-medium rounded border transition-colors flex items-center gap-1 ${
              prevLesson
                ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                : 'border-slate-200 text-slate-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Oldingi</span>
          </button>

          <button
            onClick={() => nextLesson && onSelectLesson(nextLesson.id)}
            disabled={!nextLesson}
            className={`px-2.5 py-1 text-xs font-medium rounded border transition-colors flex items-center gap-1 ${
              nextLesson
                ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                : 'border-slate-200 text-slate-300 cursor-not-allowed'
            }`}
          >
            <span>Keyingi</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2-Zone Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Theory / Challenge / Quizzes (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs max-h-[820px]">
          {/* Segmented Tab Controls */}
          <div className="flex items-center p-1.5 bg-slate-100 border-b border-slate-200 gap-1 text-xs">
            <button
              onClick={() => setLeftTab('theory')}
              className={`flex-1 py-1.5 px-3 rounded-md font-medium transition-colors flex items-center justify-center gap-1.5 ${
                leftTab === 'theory'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Nazariya</span>
            </button>
            <button
              onClick={() => setLeftTab('challenge')}
              className={`flex-1 py-1.5 px-3 rounded-md font-medium transition-colors flex items-center justify-center gap-1.5 ${
                leftTab === 'challenge'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Topshiriq</span>
            </button>
            <button
              onClick={() => setLeftTab('quiz')}
              className={`flex-1 py-1.5 px-3 rounded-md font-medium transition-colors flex items-center justify-center gap-1.5 ${
                leftTab === 'quiz'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Testlar ({currentLesson.quizzes.length})</span>
            </button>
          </div>

          {/* Left Content Area with Scroll */}
          <div className="p-5 overflow-y-auto space-y-4 text-slate-800 leading-relaxed text-sm">
            {leftTab === 'theory' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {currentLesson.title}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span>{currentLesson.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>+{currentLesson.xp} XP</span>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none text-xs sm:text-sm space-y-3 whitespace-pre-line leading-relaxed">
                  {currentLesson.theory}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Nazariyani o'qib bo'lgach amaliyotga o'ting:
                  </span>
                  <button
                    onClick={() => setLeftTab('challenge')}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Topshiriqni Yechish</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {leftTab === 'challenge' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-sky-600" />
                    <span>{currentLesson.challenge.title}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Kodingizni o'ng tarafdagi muharrirda yozing va testlardan o'tkazing
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Vazifa Talablari:
                  </h4>
                  <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                    {currentLesson.challenge.instructions}
                  </p>
                </div>

                {/* Hint Toggle */}
                <div className="border border-slate-200 rounded-lg p-3 bg-white">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900"
                  >
                    <span className="flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>{showHint ? "Maslahatni yashirish" : "Yordam / Maslahat kerakmi?"}</span>
                    </span>
                    <span className="text-slate-400">{showHint ? "▲" : "▼"}</span>
                  </button>
                  {showHint && (
                    <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-xs text-slate-600 bg-amber-50/50 p-2.5 rounded">
                      {currentLesson.challenge.hint}
                    </div>
                  )}
                </div>

                {/* Solution Toggle */}
                <div className="border border-slate-200 rounded-lg p-3 bg-white">
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900"
                  >
                    <span className="flex items-center gap-1.5">
                      {showSolution ? (
                        <EyeOff className="w-4 h-4 text-slate-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-500" />
                      )}
                      <span>{showSolution ? "Yechimni yashirish" : "To'g'ri yechimni ko'rish"}</span>
                    </span>
                    <span className="text-slate-400">{showSolution ? "▲" : "▼"}</span>
                  </button>
                  {showSolution && (
                    <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                      <pre className="p-3 bg-slate-900 text-sky-300 rounded font-mono text-xs overflow-x-auto">
                        {currentLesson.challenge.solutionCode}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {leftTab === 'quiz' && (
              <QuizSection
                questions={currentLesson.quizzes}
                lessonId={lessonId}
                onCompleteQuiz={handleQuizCompleted}
                savedScore={progress.quizScores[lessonId]}
              />
            )}
          </div>
        </div>

        {/* Right Zone: Code Editor & Execution Sandboxes (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Editor Header & Action Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                {currentLesson.isReactLesson ? 'React JSX Muharriri' : 'JavaScript Muharriri'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current text-slate-600" />
                <span>{isRunning ? "Ishlamoqda..." : "Ishga tushirish"}</span>
              </button>

              <button
                onClick={handleRunTests}
                disabled={isTesting}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isTesting ? "Tekshirilmoqda..." : "Testlarni Tekshirish"}</span>
              </button>
            </div>
          </div>

          {/* Main Code Editor */}
          <CodeEditor
            value={code}
            onChange={setCode}
            onReset={handleResetCode}
            minHeight="280px"
            label={currentLesson.isReactLesson ? 'React JSX' : 'JavaScript'}
          />

          {/* Bottom Tabs: Terminal Console vs Live Preview vs Test Results */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 text-xs">
              <button
                onClick={() => setRightTab('console')}
                className={`py-2 px-3 font-medium border-b-2 flex items-center gap-1.5 transition-colors ${
                  rightTab === 'console'
                    ? 'border-slate-900 text-slate-900 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Terminal / Konsol</span>
              </button>

              {currentLesson.isReactLesson && (
                <button
                  onClick={() => setRightTab('preview')}
                  className={`py-2 px-3 font-medium border-b-2 flex items-center gap-1.5 transition-colors ${
                    rightTab === 'preview'
                      ? 'border-slate-900 text-slate-900 font-semibold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5 text-sky-600" />
                  <span>Jonli React Ko'rinishi</span>
                </button>
              )}

              {testResults && (
                <button
                  onClick={() => setRightTab('tests')}
                  className={`py-2 px-3 font-medium border-b-2 flex items-center gap-1.5 transition-colors ${
                    rightTab === 'tests'
                      ? 'border-slate-900 text-slate-900 font-semibold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Test Natijalari ({testResults.filter((t) => t.passed).length}/{testResults.length})</span>
                </button>
              )}
            </div>

            {rightTab === 'console' && (
              <ConsoleOutput
                logs={logs}
                onClear={() => setLogs([])}
                resultValue={execResult}
                error={execError}
              />
            )}

            {rightTab === 'preview' && currentLesson.isReactLesson && (
              <ReactLivePreview code={code} />
            )}

            {rightTab === 'tests' && testResults && (
              <TestResultsPanel
                testResults={testResults}
                allPassed={allPassed}
                xpEarned={currentLesson.xp}
                onNextLesson={() => nextLesson && onSelectLesson(nextLesson.id)}
                hasNextLesson={Boolean(nextLesson)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
