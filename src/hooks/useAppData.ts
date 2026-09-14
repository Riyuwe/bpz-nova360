import { useEffect, useState } from 'react';
import { Student, CheckIn, Nudge, TrainingSession, PerformanceMetrics } from '../types';
import {
  fetchCurrentStudent,
  fetchCheckIns,
  fetchPerformanceMetrics,
  fetchNudges,
  fetchTrainingSessions,
  fetchCoherenceTrend,
} from '../services/wordpressApi';

interface AppData {
  student: Student | null;
  checkIns: CheckIn[];
  metrics: PerformanceMetrics | null;
  nudges: Nudge[];
  sessions: TrainingSession[];
  coherenceTrend: { label: string; value: number }[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useAppData(): AppData {
  const [student, setStudent] = useState<Student | null>(null);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [nudges, setNudges] = useState<Nudge[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [coherenceTrend, setCoherenceTrend] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      fetchCurrentStudent(),
      fetchCheckIns(),
      fetchPerformanceMetrics(),
      fetchNudges(),
      fetchTrainingSessions(),
      fetchCoherenceTrend(),
    ])
      .then(([s, ci, m, n, t, ct]) => {
        if (cancelled) return;
        setStudent(s);
        setCheckIns(ci);
        setMetrics(m);
        setNudges(n);
        setSessions(t);
        setCoherenceTrend(ct);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [tick]);

  return {
    student,
    checkIns,
    metrics,
    nudges,
    sessions,
    coherenceTrend,
    loading,
    error,
    refresh: () => setTick((t) => t + 1),
  };
}
