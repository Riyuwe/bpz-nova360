export interface Student {
  id: string;
  name: string;
  school: string;
  totalPoints: number;
  currentDay: number;
  streak: number;
}

export interface CheckIn {
  day: number;
  date: string;
  rating: number;
  thankfulFor: string;
  avgCoherence: number;
  coherencePts: number;
  avgBPM: number;
  zone: 'Excellent' | 'Good' | 'Mindfulness' | 'Fair';
  notes?: string;
}

export interface PerformanceMetrics {
  rating: number;
  hrvCoherence: number;
  coherencePoints: number;
  avgBPM: number;
  totalRecords: number;
}

export interface Nudge {
  category: 'sleep' | 'stress' | 'exercise' | 'nutrition' | 'recovery' | 'mental' | 'social';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface TrainingSession {
  duration: number;
  type: 'breathing' | 'focus' | 'recovery';
  title: string;
  description: string;
  completed: boolean;
}

export type TimeRange = '24h' | '7d' | '28d';
