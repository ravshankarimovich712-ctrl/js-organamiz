import React, { useState } from 'react';
import { UserProgress } from '../types';
import { calculateLevel, getAchievementsStatus } from '../utils/storage';
import { Award, Trophy, Sparkles, Flame, CheckCircle, Download, Printer } from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';

interface AchievementsViewProps {
  progress: UserProgress;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ progress }) => {
  const { level, nextLevelXp, progressPercent } = calculateLevel(progress.totalXp);
  const achievements = getAchievementsStatus(progress);
  const totalLessons = CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [userName, setUserName] = useState('O\'quvchi');

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Level and Stats Overview */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Shaxsiy Natijalar</span>
              <span aria-hidden="true">·</span>
              <span>O'quv Statistikasi</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Mening Yutuqlarim va Darajam
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Har bir dars, test va topshiriq sizni tajribali dasturchi darajasiga yaqinlashtiradi.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-sky-400 font-mono font-bold flex flex-col items-center justify-center text-sm shadow-xs">
              <span className="text-[10px] text-slate-400 font-sans">Level</span>
              <span className="text-lg leading-tight font-extrabold">{level}</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900">
                {progress.totalXp} XP to'plandi
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Keyingi darajagacha {nextLevelXp - progress.totalXp} XP
              </div>
              <div className="w-32 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-slate-900 h-full rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Counters (natural text with tabular numbers) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-xs text-slate-500 block">Tugallangan Darslar</span>
            <span className="text-xl font-bold text-slate-900 tabular-nums">
              {progress.completedLessons.length} / {totalLessons}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-xs text-slate-500 block">Yechilgan Mashqlar</span>
            <span className="text-xl font-bold text-slate-900 tabular-nums">
              {progress.solvedChallenges.length} ta
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-xs text-slate-500 block">Uzluksiz Seriya</span>
            <span className="text-xl font-bold text-amber-600 tabular-nums flex items-center gap-1">
              <Flame className="w-4 h-4 fill-current" /> {progress.streakDays} kun
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-xs text-slate-500 block">Ochilgan Nishonlar</span>
            <span className="text-xl font-bold text-sky-700 tabular-nums">
              {unlockedCount} / {achievements.length}
            </span>
          </div>
        </div>
      </div>

      {/* Badges / Achievements Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Yutuq Nishonlari (Badges)</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {unlockedCount} ta ochildi
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-xl border transition-all ${
                ach.unlocked
                  ? 'bg-white border-slate-300 shadow-xs'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center shrink-0 ${
                    ach.unlocked ? 'bg-slate-100 shadow-xs' : 'bg-slate-200 grayscale'
                  }`}
                >
                  {ach.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">
                      {ach.title}
                    </h3>
                    {ach.unlocked && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-sky-700 font-semibold uppercase tracking-wider">
              Rasmiy Sertifikat
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              JavaScript & React Kursi Bitiruvchisi Sertifikati
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Barcha darslar va mashqlarni yakunlagach, o'z ism-familiyangiz tushirilgan sertifikatni olishingiz mumkin.
            </p>
          </div>

          <button
            onClick={() => setShowCertificate(!showCertificate)}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>{showCertificate ? "Sertifikatni yopish" : "Sertifikatni Ko'rish"}</span>
          </button>
        </div>

        {showCertificate && (
          <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-slate-700">
                Ism va familiyangiz:
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="Ismingizni kiriting"
              />
            </div>

            {/* Printable Certificate Frame */}
            <div className="p-8 sm:p-12 border-4 border-slate-900 rounded-2xl bg-gradient-to-b from-white via-slate-50 to-white text-center space-y-4 shadow-md relative overflow-hidden">
              <div className="text-xs tracking-widest uppercase font-bold text-slate-400">
                JS USTOZ AKADEMIYASI
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif">
                SERTIFIKAT
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Ushbu sertifikat quyidagi shaxs "JavaScriptdan Reactgacha" to'liq o'quv dasturi, mashq va testlarini muvaffaqiyatli tamomlaganligini tasdiqlaydi:
              </p>

              <div className="py-2">
                <span className="text-xl sm:text-3xl font-bold text-slate-900 border-b-2 border-slate-900 pb-1 px-4 inline-block">
                  {userName || "Dasturchi"}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-500 pt-4">
                <span>Topshirilgan mashqlar: <strong>{progress.solvedChallenges.length} ta</strong></span>
                <span aria-hidden="true">·</span>
                <span>To'plangan tajriba: <strong>{progress.totalXp} XP</strong></span>
                <span aria-hidden="true">·</span>
                <span>Sana: {new Date().toLocaleDateString('uz-UZ')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
