import React from 'react';
import { CheckCircle2, XCircle, Award } from 'lucide-react';
import { TestResult } from '../types';

interface TestResultsPanelProps {
  testResults: TestResult[] | null;
  allPassed: boolean;
  xpEarned?: number;
  onNextLesson?: () => void;
  hasNextLesson?: boolean;
}

export const TestResultsPanel: React.FC<TestResultsPanelProps> = ({
  testResults,
  allPassed,
  xpEarned = 50,
  onNextLesson,
  hasNextLesson,
}) => {
  if (!testResults || testResults.length === 0) {
    return null;
  }

  const passedCount = testResults.filter((t) => t.passed).length;
  const totalCount = testResults.length;

  return (
    <div
      className={`rounded-lg border p-4 transition-all shadow-xs ${
        allPassed
          ? 'bg-emerald-50/70 border-emerald-200'
          : 'bg-rose-50/70 border-rose-200'
      }`}
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          {allPassed ? (
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          )}

          <div>
            <h4
              className={`text-sm font-bold ${
                allPassed ? 'text-emerald-950' : 'text-rose-950'
              }`}
            >
              {allPassed
                ? "A'lo natija! Barcha testlar muvaffaqiyatli o'tdi!"
                : "Ayrim testlar o'tmadi"}
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
              <span>Natija: <strong className="tabular-nums font-semibold">{passedCount} / {totalCount}</strong> test</span>
              {allPassed && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    <Award className="w-3.5 h-3.5" /> +{xpEarned} XP yutdingiz
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {allPassed && onNextLesson && hasNextLesson && (
          <button
            onClick={onNextLesson}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            Keyingi darsga o'tish →
          </button>
        )}
      </div>

      <div className="space-y-2 mt-3 pt-3 border-t border-slate-200/60">
        {testResults.map((t) => (
          <div
            key={t.testId}
            className={`p-2.5 rounded border text-xs font-mono flex items-start gap-2.5 ${
              t.passed
                ? 'bg-white border-emerald-100 text-emerald-900'
                : 'bg-white border-rose-200 text-rose-900'
            }`}
          >
            {t.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}

            <div className="flex-1 space-y-1">
              <div className="font-sans font-medium text-slate-800">
                {t.description}
              </div>

              {!t.passed && (
                <div className="space-y-0.5 text-slate-600 pt-1">
                  {t.error ? (
                    <div className="text-rose-600 font-mono">Xato: {t.error}</div>
                  ) : (
                    <>
                      {t.expected !== undefined && (
                        <div>
                          <span className="text-slate-500 font-sans">Kutilgan:</span>{' '}
                          <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded">
                            {t.expected}
                          </code>
                        </div>
                      )}
                      {t.actual !== undefined && (
                        <div>
                          <span className="text-slate-500 font-sans">Haqiqiy:</span>{' '}
                          <code className="text-rose-600 bg-rose-50 px-1 py-0.5 rounded">
                            {t.actual}
                          </code>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
