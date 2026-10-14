import { UserProgress, Achievement } from '../types';

const STORAGE_KEY = 'js_ustoz_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  completedLessons: [],
  solvedChallenges: [],
  quizScores: {},
  totalXp: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  savedCode: {},
};

export const ACHIEVEMENTS: Omit<Achievement, 'unlocked'>[] = [
  {
    id: 'first_step',
    title: 'Ilk Qadam',
    description: 'Birinchi JavaScript darsini muvaffaqiyatli yakunladingiz!',
    icon: '🌱',
    requiredXp: 50,
  },
  {
    id: 'code_warrior',
    title: 'Kod Jangchisi',
    description: '5 ta dasturlash mashqini bexato bajardingiz.',
    icon: '⚔️',
  },
  {
    id: 'loop_master',
    title: 'Sikllar Ustasi',
    description: "Sikllar va shart operatorlari bo'yicha barcha vazifalarni yechdingiz.",
    icon: '🔄',
  },
  {
    id: 'array_sorcerer',
    title: 'Massivlar Sehrgari',
    description: 'map, filter va reduce metodlarini professional tarzda qo\'lladingiz.',
    icon: '🧙‍♂️',
  },
  {
    id: 'async_hero',
    title: 'Asinxron Qahramon',
    description: 'Promislar va async/await mexanizmini to\'liq o\'zlashtirdingiz.',
    icon: '⚡',
  },
  {
    id: 'react_developer',
    title: 'React Dasturchi',
    description: 'React asoslari va useState bilan ishlaydigan birinchi komponentingizni yaratdingiz!',
    icon: '⚛️',
  },
  {
    id: 'centurion',
    title: '1000 XP Chempion',
    description: '1000 dan ortiq tajriba ballarini jamg\'ardingiz!',
    icon: '🏆',
    requiredXp: 1000,
  },
];

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw) as UserProgress;

    // Check streak
    const today = new Date().toISOString().split('T')[0];
    const lastActive = parsed.lastActiveDate;
    if (lastActive) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastActive === yesterday) {
        // active yesterday, keep streak
      } else if (lastActive !== today) {
        // missed day, reset streak to 1
        parsed.streakDays = 1;
      }
    }
    parsed.lastActiveDate = today;
    return parsed;
  } catch {
    return INITIAL_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
}

export function calculateLevel(xp: number): { level: number; nextLevelXp: number; progressPercent: number } {
  // Each level requires 150 * level XP
  let currentLevel = 1;
  let accumulatedXp = 0;
  let nextThreshold = 200;

  while (xp >= nextThreshold) {
    accumulatedXp = nextThreshold;
    currentLevel++;
    nextThreshold += currentLevel * 180;
  }

  const currentLevelProgress = xp - accumulatedXp;
  const currentLevelRange = nextThreshold - accumulatedXp;
  const progressPercent = Math.min(100, Math.round((currentLevelProgress / currentLevelRange) * 100));

  return {
    level: currentLevel,
    nextLevelXp: nextThreshold,
    progressPercent,
  };
}

export function getAchievementsStatus(progress: UserProgress): Achievement[] {
  return ACHIEVEMENTS.map((ach) => {
    let unlocked = false;

    if (ach.id === 'first_step') {
      unlocked = progress.completedLessons.length >= 1;
    } else if (ach.id === 'code_warrior') {
      unlocked = progress.solvedChallenges.length >= 5;
    } else if (ach.id === 'loop_master') {
      unlocked = progress.solvedChallenges.filter((id) => id.startsWith('mod3_') || id.startsWith('mod2_')).length >= 3;
    } else if (ach.id === 'array_sorcerer') {
      unlocked = progress.solvedChallenges.filter((id) => id.startsWith('mod5_')).length >= 2;
    } else if (ach.id === 'async_hero') {
      unlocked = progress.solvedChallenges.filter((id) => id.startsWith('mod8_')).length >= 2;
    } else if (ach.id === 'react_developer') {
      unlocked = progress.solvedChallenges.filter((id) => id.startsWith('mod9_')).length >= 2;
    } else if (ach.requiredXp) {
      unlocked = progress.totalXp >= ach.requiredXp;
    }

    return {
      ...ach,
      unlocked,
    };
  });
}
