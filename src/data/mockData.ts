import { Student, CheckIn, PerformanceMetrics, Nudge, TrainingSession } from '../types';

export const currentStudent: Student = {
  id: '1',
  name: 'Alex Johnson',
  school: 'Genesis Brain Institute',
  totalPoints: 226,
  currentDay: 133,
  streak: 7,
};

export const performanceMetrics: PerformanceMetrics = {
  rating: 99,
  hrvCoherence: 4.1,
  coherencePoints: 226.3,
  avgBPM: 70.7,
  totalRecords: 133,
};

export const recentCheckIns: CheckIn[] = [
  {
    day: 133,
    date: '2026-09-14',
    rating: 100,
    thankfulFor: 'Family, Morning Walks, Problem Free Day',
    avgCoherence: 5.8,
    coherencePts: 2472,
    avgBPM: 72,
    zone: 'Excellent',
  },
  {
    day: 132,
    date: '2026-09-13',
    rating: 100,
    thankfulFor: 'Friends, Gym Session, Good Sleep',
    avgCoherence: 4.2,
    coherencePts: 2350,
    avgBPM: 69,
    zone: 'Excellent',
  },
  {
    day: 131,
    date: '2026-09-12',
    rating: 99,
    thankfulFor: 'Problem Solving, Morning Walks, Persistence',
    avgCoherence: 3.8,
    coherencePts: 2072,
    avgBPM: 77,
    zone: 'Good',
  },
  {
    day: 130,
    date: '2026-09-11',
    rating: 100,
    thankfulFor: "Wolf's Peace, Community, Old Mates",
    avgCoherence: 4.6,
    coherencePts: 3950,
    avgBPM: 14,
    zone: 'Excellent',
  },
  {
    day: 129,
    date: '2026-09-10',
    rating: 98,
    thankfulFor: 'Rest, Business, Family',
    avgCoherence: 3.4,
    coherencePts: 983,
    avgBPM: 70,
    zone: 'Good',
  },
  {
    day: 128,
    date: '2026-09-09',
    rating: 97,
    thankfulFor: 'Probably God, Mornings, New Idea, Stress',
    avgCoherence: 4.1,
    coherencePts: 237,
    avgBPM: 67,
    zone: 'Mindfulness',
  },
];

export const todayNudges: Nudge[] = [
  {
    category: 'sleep',
    title: 'Optimise Recovery Tonight',
    description: 'Your HRV data shows your nervous system needs deliberate restoration. Dim lights after 9PM, no screens after 10PM, and target a cooler bedroom (65–68°F).',
    priority: 'high',
  },
  {
    category: 'exercise',
    title: 'Morning Walk + Resonance Breathing',
    description: 'Start with a 10–30 min morning walk followed by 5 minutes of resonant frequency breathing (5 seconds in, 5 seconds out) to accelerate parasympathetic restoration.',
    priority: 'high',
  },
  {
    category: 'nutrition',
    title: 'Magnesium + Tart Cherry Tonight',
    description: 'Take Magnesium L-Threonate (2g) alongside Tart Cherry extract (480mg). Magnesium supports deep sleep architecture while Tart Cherry accelerates muscle recovery.',
    priority: 'medium',
  },
  {
    category: 'mental',
    title: 'Integration Challenge',
    description: 'Excellent coherence scores — your next growth edge is deploying your coherence state during high-stakes business decisions and difficult conversations.',
    priority: 'medium',
  },
  {
    category: 'stress',
    title: 'Social Connection',
    description: 'Plan a church experience or community gathering this week. Social coherence significantly enhances individual heart-brain synchronisation.',
    priority: 'low',
  },
];

export const trainingSessions: TrainingSession[] = [
  {
    duration: 10,
    type: 'breathing',
    title: 'Heart Coherence Breathing',
    description: 'Guided resonant frequency breathing at 5 seconds in, 5 seconds out to optimise HRV and enter a coherent state.',
    completed: false,
  },
  {
    duration: 10,
    type: 'focus',
    title: 'Focus Enhancement',
    description: 'Neuro-feedback guided session to improve sustained attention and cognitive performance for study or work.',
    completed: true,
  },
  {
    duration: 10,
    type: 'recovery',
    title: 'Stress Recovery Protocol',
    description: 'Parasympathetic activation session to lower cortisol, reduce anxiety and restore nervous system balance.',
    completed: false,
  },
];

export const weeklyCoherence = [4.1, 3.8, 4.6, 5.8, 4.2, 3.4, 4.1];
export const weeklyBPM = [69, 77, 14, 72, 69, 70, 67];
export const weeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Bundled fallback used by wordpressApi.ts when the remote is unreachable
export const mockData = {
  currentStudent,
  performanceMetrics,
  checkIns: recentCheckIns,
  nudges: todayNudges,
  trainingSessions,
  weeklyCoherence: weeklyLabels.map((label, i) => ({ label, value: weeklyCoherence[i] })),
};
