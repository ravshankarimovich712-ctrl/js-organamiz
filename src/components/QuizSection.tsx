import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizSectionProps {
  questions: QuizQuestion[];
  lessonId: string;
  onCompleteQuiz: (score: number, total: number) => void;
  savedScore?: { total: number; score: number };
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  questions,
  onCompleteQuiz,
  savedScore,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(Boolean(savedScore));

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleCheckAnswers = () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionId) {
        score++;
      }
    });
    setSubmitted(true);
    onCompleteQuiz(score, questions.length);
  };

  const handleRetry = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const allAnswered = questions.every((q) => Boolean(userAnswers[q.id]));
  const correctCount = questions.filter((q) => userAnswers[q.id] === q.correctOptionId).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span>Mavzu Bo'yicha Test Savollari</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            O'rgangan bilimlaringizni sinab ko'ring va xatolardan xulosa chiqaring
          </p>
        </div>

        {submitted && (
          <button
            onClick={handleRetry}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Qayta topshirish</span>
          </button>
        )}
      </div>

      {submitted && (
        <div
          className={`p-4 rounded-lg border ${
            correctCount === questions.length
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="font-bold text-sm">
                  {correctCount === questions.length
                    ? "Ajoyib natija! Barcha savollarga to'g'ri javob berdingiz!"
                    : `Siz ${questions.length} tadan ${correctCount} tasiga to'g'ri javob berdingiz.`}
                </span>
                <div className="text-xs text-slate-600 mt-0.5">
                  Har bir to'g'ri javob uchun +10 XP beriladi.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const selectedOption = userAnswers[q.id];
          const isCorrect = selectedOption === q.correctOptionId;

          return (
            <div
              key={q.id}
              className="p-4 rounded-lg border border-slate-200 bg-white space-y-3 shadow-xs"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                    {q.question}
                  </h4>

                  {q.codeSnippet && (
                    <pre className="mt-2 p-2.5 bg-slate-900 text-sky-300 rounded font-mono text-xs overflow-x-auto">
                      {q.codeSnippet}
                    </pre>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1 pl-7">
                {q.options.map((opt) => {
                  const isThisSelected = selectedOption === opt.id;
                  const isThisCorrect = opt.id === q.correctOptionId;

                  let optionStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50';
                  if (submitted) {
                    if (isThisCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                    } else {
                      optionStyle = 'border-slate-200 opacity-60';
                    }
                  } else if (isThisSelected) {
                    optionStyle = 'border-slate-900 bg-slate-100 text-slate-950 font-medium';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-center justify-between transition-colors ${optionStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-300 text-slate-700 text-xs font-mono font-bold flex items-center justify-center uppercase shrink-0">
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                      </div>

                      {submitted && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {submitted && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {submitted && (
                <div
                  className={`mt-3 p-3 rounded text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-50/70 border border-emerald-200 text-emerald-950'
                      : 'bg-rose-50/70 border border-rose-200 text-rose-950'
                  }`}
                >
                  <span className="font-bold block mb-1">
                    {isCorrect ? "To'g'ri javob!" : "Noto'g'ri javob:"}
                  </span>
                  <span>{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleCheckAnswers}
            disabled={!allAnswered}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
              allAnswered
                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-xs cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {allAnswered ? "Javoblarni Tekshirish" : "Barcha savollarni belgilang"}
          </button>
        </div>
      )}
    </div>
  );
};
