import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NudgeCard } from '../components/NudgeCard';
import { todayNudges } from '../data/mockData';
import { TimeRange } from '../types';

const timeRanges: { key: TimeRange; label: string }[] = [
  { key: '24h', label: 'Last 24h' },
  { key: '7d', label: '7 Days' },
  { key: '28d', label: '28 Days' },
];

const progressReport = `Based on your last 7 days of data, you're maintaining an excellent coherence baseline (avg 4.1) with a consistent perfect-100 daily rating streak. Your HRV shows strong parasympathetic activity — your nervous system is resilient and adaptable.

Key trends:
• Sleep quality has improved by 18% week-over-week
• Mid-week energy dips are resolving with consistent morning walks
• Social coherence events (church, family time) correlate with your highest coherence scores

Your biggest opportunity: maintaining coherence during high-cognitive-load periods (business decisions, study sprints). The data shows you're already naturally reaching Zone 3 — the next step is sustaining it.`;

export const NudgeScreen: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('7d');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Nudges</Text>
          <Text style={styles.subtitle}>Personalised next steps from NOVA360</Text>
        </View>

        <View style={styles.rangeRow}>
          {timeRanges.map((r) => (
            <TouchableOpacity
              key={r.key}
              style={[styles.rangeBtn, selectedRange === r.key && styles.rangeBtnActive]}
              onPress={() => setSelectedRange(r.key)}
            >
              <Text
                style={[
                  styles.rangeBtnText,
                  selectedRange === r.key && styles.rangeBtnTextActive,
                ]}
              >
                {r.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.reportCard}>
          <View style={styles.reportHeader}>
            <Text style={styles.reportBadge}>🤖 AI ANALYSIS</Text>
            <Text style={styles.reportRange}>
              {selectedRange === '24h' ? 'Last 24 hours' : selectedRange === '7d' ? 'Past 7 days' : 'Past 28 days'}
            </Text>
          </View>
          <Text style={styles.greeting}>Hi Alex,</Text>
          <Text style={styles.reportText}>{progressReport}</Text>
        </View>

        <View style={styles.nudgesHeader}>
          <Text style={styles.sectionTitle}>Today's Personalised Nudges</Text>
          <View style={styles.nudgeCount}>
            <Text style={styles.nudgeCountText}>{todayNudges.length}</Text>
          </View>
        </View>

        {todayNudges.map((nudge, i) => (
          <NudgeCard key={i} nudge={nudge} />
        ))}

        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Focus Areas This Week</Text>
        <View style={styles.categoriesGrid}>
          {[
            { icon: '😴', label: 'Sleep', trend: '+18%', positive: true },
            { icon: '🏃', label: 'Exercise', trend: 'On track', positive: true },
            { icon: '🥗', label: 'Nutrition', trend: 'Needs work', positive: false },
            { icon: '🧘', label: 'Stress', trend: 'Improving', positive: true },
            { icon: '🤝', label: 'Social', trend: 'Good week', positive: true },
            { icon: '🧠', label: 'Mental', trend: 'Excellent', positive: true },
          ].map((cat) => (
            <View key={cat.label} style={styles.catCard}>
              <Text style={styles.catIcon}>{cat.icon}</Text>
              <Text style={styles.catLabel}>{cat.label}</Text>
              <Text style={[styles.catTrend, { color: cat.positive ? '#10B981' : '#F59E0B' }]}>
                {cat.trend}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0D1A' },
  container: { flex: 1, paddingHorizontal: 16 },
  header: { paddingTop: 20, paddingBottom: 16 },
  title: { color: '#F9FAFB', fontSize: 26, fontWeight: '700' },
  subtitle: { color: '#6B7280', fontSize: 13, marginTop: 4 },
  rangeRow: {
    flexDirection: 'row',
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  rangeBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  rangeBtnActive: { backgroundColor: '#7C3AED' },
  rangeBtnText: { color: '#6B7280', fontSize: 13, fontWeight: '600' },
  rangeBtnTextActive: { color: '#FFF' },
  reportCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#7C3AED33',
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportBadge: { color: '#A78BFA', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  reportRange: { color: '#6B7280', fontSize: 11 },
  greeting: { color: '#F9FAFB', fontSize: 15, fontWeight: '600', marginBottom: 8 },
  reportText: { color: '#D1D5DB', fontSize: 13, lineHeight: 21 },
  nudgesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  sectionTitle: { color: '#F9FAFB', fontSize: 16, fontWeight: '600' },
  nudgeCount: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nudgeCountText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  catCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 14,
    width: '30%',
    alignItems: 'center',
    gap: 4,
  },
  catIcon: { fontSize: 24 },
  catLabel: { color: '#9CA3AF', fontSize: 11 },
  catTrend: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
});
