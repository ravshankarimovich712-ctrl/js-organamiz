export interface TestCase {
  id: string;
  description: string;
  testFn: string; // JavaScript code returning boolean or throwing
  expectedValue?: string;
}

export interface Challenge {
  title: string;
  instructions: string;
  starterCode: string;
  solutionCode: string;
  hint: string;
  testCases: TestCase[];
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  shortDesc: string;
  readTime: string;
  xp: number;
  theory: string; // Detailed educational text with formatted examples
  challenge: Challenge;
  quizzes: QuizQuestion[];
  isReactLesson?: boolean;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  color: string;
  lessons: Lesson[];
}

export interface ConsoleLogEntry {
  type: 'log' | 'info' | 'warn' | 'error' | 'success';
  content: string;
  timestamp: number;
}

export interface TestResult {
  testId: string;
  description: string;
  passed: boolean;
  actual?: string;
  expected?: string;
  error?: string;
}

export interface UserProgress {
  completedLessons: string[]; // lesson ids
  solvedChallenges: string[]; // lesson ids
  quizScores: Record<string, { total: number; score: number }>; // lessonId -> score
  totalXp: number;
  streakDays: number;
  lastActiveDate: string;
  savedCode: Record<string, string>; // lessonId -> code
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requiredXp?: number;
  requiredModule?: string;
}
