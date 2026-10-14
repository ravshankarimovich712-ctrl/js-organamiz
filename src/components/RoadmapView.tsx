import React from 'react';
import { CURRICULUM } from '../data/curriculum';
import { UserProgress } from '../types';
import {
  CheckCircle2,
  Play,
  BookOpen,
  Sparkles,
  ArrowRight,
  Code2,
} from 'lucide-react';

interface RoadmapViewProps {
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  progress,
  onSelectLesson,
}) => {
  const totalLessons = CURRICULUM.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Hero Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Noldan Boshlab</span>
              <span aria-hidden="true">·</span>
              <span>JavaScript Asoslari</span>
              <span aria-hidden="true">·</span>
              <span>Zamonaviy React</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
              JavaScriptdan Reactgacha Bosqichma-bosqich O'rganish
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nazariyani o'qing, brauzerda haqiqiy kod yozib sinang, test savollarini yeching va React komponentlarini jonli ishga tushiring.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-4 sm:min-w-[220px] shrink-0">
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium mb-1.5">
              <span>Umumiy O'zlashtirish</span>
              <span className="tabular-nums font-bold text-slate-900">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-slate-900 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
              <span className="tabular-nums font-medium">{completedCount} / {totalLessons} dars</span>
              <span className="tabular-nums font-semibold text-sky-700">{progress.totalXp} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Roadmap Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-lg font-bold text-slate-900">
            Darslar Yo'l Xaritasi (9 ta Modul)
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Ketma-ket bosqichlar
          </span>
        </div>

        <div className="space-y-5">
          {CURRICULUM.map((module, modIndex) => {
            const completedInModule = module.lessons.filter((l) =>
              progress.completedLessons.includes(l.id)
            ).length;
            const isModuleComplete = completedInModule === module.lessons.length;

            return (
              <div
                key={module.id}
                className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 transition-all hover:border-slate-300 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>Modul {modIndex + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{module.lessons.length} ta dars</span>
                      <span aria-hidden="true">·</span>
                      <span>{module.subtitle}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {module.title}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {module.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right text-xs">
                      <span className="text-slate-500 block">Holat:</span>
                      <span className={`font-semibold tabular-nums ${isModuleComplete ? 'text-emerald-700' : 'text-slate-800'}`}>
                        {completedInModule} / {module.lessons.length} tugallandi
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lessons in this module */}
                <div className="mt-4 divide-y divide-slate-100">
                  {module.lessons.map((lesson) => {
                    const isCompleted = progress.completedLessons.includes(lesson.id);
                    const isChallengeSolved = progress.solvedChallenges.includes(lesson.id);
                    const quizScore = progress.quizScores[lesson.id];

                    return (
                      <div
                        key={lesson.id}
                        className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-slate-50/60 px-2 rounded-lg transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => onSelectLesson(lesson.id)}
                            className="mt-0.5 shrink-0 focus:outline-none"
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-slate-300 group-hover:border-slate-400 flex items-center justify-center text-slate-400">
                                <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
                              </div>
                            )}
                          </button>

                          <div>
                            <button
                              onClick={() => onSelectLesson(lesson.id)}
                              className="text-sm font-semibold text-slate-900 group-hover:text-sky-700 transition-colors text-left"
                            >
                              {lesson.title}
                            </button>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                              <span>{lesson.shortDesc}</span>
                              <span aria-hidden="true">·</span>
                              <span>{lesson.readTime}</span>
                              <span aria-hidden="true">·</span>
                              <span className="text-amber-600 font-medium">+{lesson.xp} XP</span>
                              {lesson.isReactLesson && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="text-sky-600 font-semibold">React Live</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 sm:self-center pl-8 sm:pl-0">
                          {isChallengeSolved && (
                            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                              <Code2 className="w-3.5 h-3.5" /> Kod topshirildi
                            </span>
                          )}

                          {quizScore && (
                            <span className="text-xs text-slate-500 font-medium">
                              Test: {quizScore.score}/{quizScore.total}
                            </span>
                          )}

                          <button
                            onClick={() => onSelectLesson(lesson.id)}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors flex items-center gap-1 shrink-0 ml-auto"
                          >
                            <span>{isCompleted ? "Qayta ko'rish" : "Boshlash"}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
