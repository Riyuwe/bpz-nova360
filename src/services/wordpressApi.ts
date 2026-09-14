/**
 * WordPress REST API service for Brain Performance Zone.
 * Credentials are loaded from environment variables — never hardcoded.
 *
 * Required env vars (set in .env or Expo app.config.js secrets):
 *   EXPO_PUBLIC_WP_BASE_URL   e.g. https://brainperformancezone.com
 *   EXPO_PUBLIC_WP_USER       WordPress username
 *   EXPO_PUBLIC_WP_PASS       WordPress application password
 */

import { Student, CheckIn, Nudge, TrainingSession, PerformanceMetrics } from '../types';
import { mockData } from '../data/mockData';

const BASE_URL = process.env.EXPO_PUBLIC_WP_BASE_URL ?? '';
const WP_USER = process.env.EXPO_PUBLIC_WP_USER ?? '';
const WP_PASS = process.env.EXPO_PUBLIC_WP_PASS ?? '';

function authHeader(): Record<string, string> {
  if (!WP_USER || !WP_PASS) return {};
  const encoded = btoa(`${WP_USER}:${WP_PASS}`);
  return { Authorization: `Basic ${encoded}` };
}

async function wpFetch<T>(path: string): Promise<T | null> {
  if (!BASE_URL) return null;
  try {
    const res = await fetch(`${BASE_URL}/wp-json${path}`, {
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      console.warn(`[WP API] ${path} → ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.warn('[WP API] fetch failed, using mock data:', e);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Student / user profile
// ---------------------------------------------------------------------------

interface WPUser {
  id: number;
  name: string;
  meta?: Record<string, unknown>;
  acf?: {
    school?: string;
    total_points?: number;
    current_day?: number;
    streak?: number;
  };
}

export async function fetchCurrentStudent(): Promise<Student> {
  const user = await wpFetch<WPUser>('/wp/v2/users/me?context=edit');
  if (!user) return mockData.currentStudent;

  return {
    id: String(user.id),
    name: user.name,
    school: user.acf?.school ?? 'Brain Performance Zone',
    totalPoints: user.acf?.total_points ?? 0,
    currentDay: user.acf?.current_day ?? 1,
    streak: user.acf?.streak ?? 0,
  };
}

// ---------------------------------------------------------------------------
// Check-in records (custom post type: nova360_checkin)
// ---------------------------------------------------------------------------

interface WPCheckIn {
  id: number;
  date: string;
  acf?: {
    day?: number;
    rating?: number;
    thankful_for?: string;
    avg_coherence?: number;
    coherence_pts?: number;
    avg_bpm?: number;
    zone?: string;
    notes?: string;
  };
}

function mapWPCheckIn(p: WPCheckIn, index: number): CheckIn {
  const acf = p.acf ?? {};
  return {
    day: acf.day ?? index + 1,
    date: p.date ? new Date(p.date).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
    rating: acf.rating ?? 3,
    thankfulFor: acf.thankful_for ?? '',
    avgCoherence: acf.avg_coherence ?? 0,
    coherencePts: acf.coherence_pts ?? 0,
    avgBPM: acf.avg_bpm ?? 0,
    zone: (acf.zone as CheckIn['zone']) ?? 'Fair',
    notes: acf.notes,
  };
}

export async function fetchCheckIns(page = 1, perPage = 20): Promise<CheckIn[]> {
  const posts = await wpFetch<WPCheckIn[]>(
    `/wp/v2/nova360_checkin?per_page=${perPage}&page=${page}&_fields=id,date,acf&acf_format=standard`,
  );
  if (!posts) return mockData.checkIns;
  return posts.map(mapWPCheckIn);
}

// ---------------------------------------------------------------------------
// Performance metrics (calculated from check-ins or custom endpoint)
// ---------------------------------------------------------------------------

interface WPMetrics {
  rating?: number;
  hrv_coherence?: number;
  coherence_points?: number;
  avg_bpm?: number;
  total_records?: number;
}

export async function fetchPerformanceMetrics(): Promise<PerformanceMetrics> {
  const metrics = await wpFetch<WPMetrics>('/nova360/v1/metrics/current');
  if (!metrics) return mockData.performanceMetrics;
  return {
    rating: metrics.rating ?? 0,
    hrvCoherence: metrics.hrv_coherence ?? 0,
    coherencePoints: metrics.coherence_points ?? 0,
    avgBPM: metrics.avg_bpm ?? 0,
    totalRecords: metrics.total_records ?? 0,
  };
}

// ---------------------------------------------------------------------------
// Nudges (custom post type: nova360_nudge)
// ---------------------------------------------------------------------------

interface WPNudge {
  id: number;
  title: { rendered: string };
  acf?: {
    category?: string;
    description?: string;
    priority?: string;
  };
}

function mapWPNudge(p: WPNudge): Nudge {
  const acf = p.acf ?? {};
  return {
    category: (acf.category as Nudge['category']) ?? 'mental',
    title: p.title.rendered.replace(/&#\d+;/g, (m) => {
      const code = parseInt(m.slice(2, -1));
      return String.fromCharCode(code);
    }),
    description: acf.description ?? '',
    priority: (acf.priority as Nudge['priority']) ?? 'medium',
  };
}

export async function fetchNudges(): Promise<Nudge[]> {
  const posts = await wpFetch<WPNudge[]>(
    '/wp/v2/nova360_nudge?per_page=10&_fields=id,title,acf&acf_format=standard',
  );
  if (!posts) return mockData.nudges;
  return posts.map(mapWPNudge);
}

// ---------------------------------------------------------------------------
// Training sessions (custom post type: nova360_session)
// ---------------------------------------------------------------------------

interface WPSession {
  id: number;
  title: { rendered: string };
  acf?: {
    duration?: number;
    type?: string;
    description?: string;
  };
}

function mapWPSession(p: WPSession): TrainingSession {
  const acf = p.acf ?? {};
  return {
    duration: acf.duration ?? 10,
    type: (acf.type as TrainingSession['type']) ?? 'breathing',
    title: p.title.rendered,
    description: acf.description ?? '',
    completed: false,
  };
}

export async function fetchTrainingSessions(): Promise<TrainingSession[]> {
  const posts = await wpFetch<WPSession[]>(
    '/wp/v2/nova360_session?per_page=10&_fields=id,title,acf&acf_format=standard',
  );
  if (!posts) return mockData.trainingSessions;
  return posts.map(mapWPSession);
}

// ---------------------------------------------------------------------------
// Weekly coherence trend for chart
// ---------------------------------------------------------------------------

interface WPCoherenceTrend {
  labels: string[];
  values: number[];
}

export async function fetchCoherenceTrend(): Promise<{ label: string; value: number }[]> {
  const trend = await wpFetch<WPCoherenceTrend>('/nova360/v1/coherence/trend?period=7d');
  if (!trend) return mockData.weeklyCoherence;
  return trend.labels.map((label, i) => ({ label, value: trend.values[i] ?? 0 }));
}
