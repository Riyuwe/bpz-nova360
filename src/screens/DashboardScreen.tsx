import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MetricCard } from '../components/MetricCard';
import { CoherenceChart } from '../components/CoherenceChart';
import { currentStudent, performanceMetrics, weeklyCoherence, weeklyLabels } from '../data/mockData';
import { TimeRange } from '../types';

const timeRanges: TimeRange[] = ['24h', '7d', '28d'];

export const DashboardScreen: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('7d');

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting()},</Text>
            <Text style={styles.name}>{currentStudent.name.split(' ')[0]} 👋</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakText}>{currentStudent.streak} day streak</Text>
          </View>
        </View>

        {/* Brain Performance Score */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreLeft}>
            <Text style={styles.scoreLabel}>Brain Performance Score</Text>
            <Text style={styles.scoreValue}>{performanceMetrics.rating}</Text>
            <Text style={styles.scoreSubLabel}>Day {currentStudent.currentDay} of your journey</Text>
          </View>
          <View style={styles.scoreRight}>
            <View style={styles.ring}>
              <Text style={styles.ringPercent}>{performanceMetrics.rating}%</Text>
              <Text style={styles.ringLabel}>Excellent</Text>
            </View>
          </View>
        </View>

        {/* Metrics Row */}
        <Text style={styles.sectionTitle}>Performance Averages</Text>
        <View style={styles.metricsRow}>
          <MetricCard
            label="HRV Coherence"
            value={performanceMetrics.hrvCoherence}
            color="#7C3AED"
            icon="💜"
          />
          <MetricCard
            label="Coherence Pts"
            value={performanceMetrics.coherencePoints}
            color="#10B981"
            icon="⚡"
          />
        </View>
        <View style={styles.metricsRow}>
          <MetricCard
            label="Avg BPM"
            value={performanceMetrics.avgBPM}
            color="#3B82F6"
            icon="❤️"
          />
          <MetricCard
            label="Total Records"
            value={performanceMetrics.totalRecords}
            color="#F59E0B"
            icon="📊"
          />
        </View>

        {/* Coherence Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>HRV Coherence Trend</Text>
            <View style={styles.rangeToggle}>
              {timeRanges.map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.rangeBtn,
                    selectedRange === r && styles.rangeBtnActive,
                  ]}
                  onPress={() => setSelectedRange(r)}
                >
                  <Text
                    style={[
                      styles.rangeBtnText,
                      selectedRange === r && styles.rangeBtnTextActive,
                    ]}
                  >
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <CoherenceChart data={weeklyCoherence} labels={weeklyLabels} color="#7C3AED" />
        </View>

        {/* 360 Wellness Pillars */}
        <Text style={styles.sectionTitle}>Your 360° Overview</Text>
        <View style={styles.pillarsGrid}>
          {[
            { icon: '😴', label: 'Sleep', score: 82, color: '#6366F1' },
            { icon: '🏃', label: 'Activity', score: 91, color: '#10B981' },
            { icon: '🥗', label: 'Nutrition', score: 74, color: '#F59E0B' },
            { icon: '🧘', label: 'Stress', score: 88, color: '#8B5CF6' },
            { icon: '❤️', label: 'Health', score: 95, color: '#EC4899' },
            { icon: '📱', label: 'Screen Time', score: 65, color: '#3B82F6' },
          ].map((pillar) => (
            <View key={pillar.label} style={styles.pillarCard}>
              <Text style={styles.pillarIcon}>{pillar.icon}</Text>
              <View
                style={[
                  styles.pillarBar,
                  { backgroundColor: `${pillar.color}33` },
                ]}
              >
                <View
                  style={[
                    styles.pillarFill,
                    {
                      width: `${pillar.score}%` as any,
                      backgroundColor: pillar.color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.pillarLabel}>{pillar.label}</Text>
              <Text style={[styles.pillarScore, { color: pillar.color }]}>
                {pillar.score}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0F0D1A',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  name: {
    color: '#F9FAFB',
    fontSize: 24,
    fontWeight: '700',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1B2E',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  streakIcon: {
    fontSize: 16,
  },
  streakText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
  },
  scoreCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#7C3AED44',
  },
  scoreLeft: {
    flex: 1,
  },
  scoreLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 4,
  },
  scoreValue: {
    color: '#7C3AED',
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -2,
  },
  scoreSubLabel: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
  scoreRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringPercent: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '700',
  },
  ringLabel: {
    color: '#10B981',
    fontSize: 9,
  },
  sectionTitle: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  chartCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rangeToggle: {
    flexDirection: 'row',
    backgroundColor: '#0F0D1A',
    borderRadius: 8,
    padding: 2,
  },
  rangeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rangeBtnActive: {
    backgroundColor: '#7C3AED',
  },
  rangeBtnText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '600',
  },
  rangeBtnTextActive: {
    color: '#FFF',
  },
  pillarsGrid: {
    gap: 10,
  },
  pillarCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pillarIcon: {
    fontSize: 22,
    width: 30,
    textAlign: 'center',
  },
  pillarBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  pillarFill: {
    height: '100%',
    borderRadius: 3,
  },
  pillarLabel: {
    color: '#9CA3AF',
    fontSize: 13,
    width: 70,
  },
  pillarScore: {
    fontSize: 15,
    fontWeight: '700',
    width: 30,
    textAlign: 'right',
  },
  bottomPad: {
    height: 24,
  },
});
