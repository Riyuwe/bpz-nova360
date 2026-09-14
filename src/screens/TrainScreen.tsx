import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { trainingSessions } from '../data/mockData';
import { TrainingSession } from '../types';

const typeColors: Record<TrainingSession['type'], string> = {
  breathing: '#7C3AED',
  focus: '#3B82F6',
  recovery: '#10B981',
};

const SessionCard: React.FC<{
  session: TrainingSession;
  onStart: () => void;
}> = ({ session, onStart }) => {
  const color = typeColors[session.type];
  return (
    <View style={[styles.sessionCard, { borderLeftColor: color }]}>
      <View style={styles.sessionHeader}>
        <View>
          <Text style={styles.sessionType}>{session.type.toUpperCase()}</Text>
          <Text style={styles.sessionTitle}>{session.title}</Text>
        </View>
        <View style={styles.sessionDuration}>
          <Text style={styles.sessionMin}>{session.duration}</Text>
          <Text style={styles.sessionMinLabel}>min</Text>
        </View>
      </View>
      <Text style={styles.sessionDesc}>{session.description}</Text>
      <TouchableOpacity
        style={[
          styles.sessionBtn,
          { backgroundColor: session.completed ? '#1E3A2E' : color },
        ]}
        onPress={onStart}
        disabled={session.completed}
      >
        <Text style={[styles.sessionBtnText, { color: session.completed ? '#10B981' : '#FFF' }]}>
          {session.completed ? '✓ Completed' : 'Start Session'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const BreathingExercise: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(5);
  const [cycles, setCycles] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      if (phase === 'inhale') {
        Animated.timing(scaleAnim, {
          toValue: 1.4,
          duration: 5000,
          useNativeDriver: true,
        }).start();
      } else if (phase === 'exhale') {
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }).start();
      }
    };
    animate();
  }, [phase]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          setPhase((p) => {
            if (p === 'inhale') return 'hold';
            if (p === 'hold') {
              return 'exhale';
            }
            setCycles((cy) => cy + 1);
            return 'inhale';
          });
          return phase === 'hold' ? 2 : 5;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const phaseColor: Record<string, string> = {
    inhale: '#7C3AED',
    hold: '#F59E0B',
    exhale: '#10B981',
  };

  const phaseLabel: Record<string, string> = {
    inhale: 'Breathe In',
    hold: 'Hold',
    exhale: 'Breathe Out',
  };

  return (
    <View style={styles.breathingContainer}>
      <Text style={styles.breathingTitle}>Heart Coherence Breathing</Text>
      <Text style={styles.breathingSubtitle}>Cycles completed: {cycles}</Text>

      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.breathCircleOuter,
            {
              borderColor: phaseColor[phase],
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={[styles.breathCircleInner, { backgroundColor: `${phaseColor[phase]}33` }]}>
            <Text style={[styles.breathPhase, { color: phaseColor[phase] }]}>
              {phaseLabel[phase]}
            </Text>
            <Text style={[styles.breathCount, { color: phaseColor[phase] }]}>{count}</Text>
          </View>
        </Animated.View>
      </View>

      <Text style={styles.breathingTip}>
        Breathe at 5 seconds in, 5 seconds out to optimise your heart rate variability.
      </Text>

      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeBtnText}>End Session</Text>
      </TouchableOpacity>
    </View>
  );
};

export const TrainScreen: React.FC = () => {
  const [activeSession, setActiveSession] = useState(false);

  if (activeSession) {
    return (
      <SafeAreaView style={styles.safe}>
        <BreathingExercise onClose={() => setActiveSession(false)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Train Daily</Text>
          <Text style={styles.subtitle}>10-minute brain & nervous system sessions</Text>
        </View>

        {/* Today's Recommended */}
        <View style={styles.recommendedCard}>
          <View style={styles.recommendedBadge}>
            <Text style={styles.recommendedBadgeText}>⭐ TODAY'S RECOMMENDATION</Text>
          </View>
          <Text style={styles.recommendedTitle}>Heart Coherence Breathing</Text>
          <Text style={styles.recommendedDesc}>
            Based on your recent check-in data, resonant frequency breathing will help optimise your HRV and bring you into a high-coherence state before your next challenge.
          </Text>
          <View style={styles.recommendedStats}>
            {[
              { label: 'Duration', value: '10 min' },
              { label: 'Difficulty', value: 'Easy' },
              { label: 'Benefit', value: 'HRV +12%' },
            ].map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => setActiveSession(true)}
          >
            <Text style={styles.startBtnText}>▶  Start Now</Text>
          </TouchableOpacity>
        </View>

        {/* All Sessions */}
        <Text style={styles.sectionTitle}>All Training Sessions</Text>
        {trainingSessions.map((session, i) => (
          <SessionCard key={i} session={session} onStart={() => setActiveSession(true)} />
        ))}

        {/* Connect Devices */}
        <View style={styles.connectCard}>
          <Text style={styles.connectTitle}>🔗 Connect Your Devices</Text>
          <Text style={styles.connectDesc}>
            With your permission, NOVA360 can sync data from your phone, smartwatch or wellness apps for more personalised training.
          </Text>
          <View style={styles.deviceRow}>
            {['Apple Health', 'Garmin', 'Fitbit', 'WHOOP'].map((app) => (
              <TouchableOpacity key={app} style={styles.deviceBtn}>
                <Text style={styles.deviceBtnText}>{app}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  sectionTitle: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  recommendedCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#7C3AED44',
  },
  recommendedBadge: {
    backgroundColor: '#7C3AED22',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  recommendedBadgeText: { color: '#A78BFA', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  recommendedTitle: { color: '#F9FAFB', fontSize: 20, fontWeight: '700', marginBottom: 8 },
  recommendedDesc: { color: '#9CA3AF', fontSize: 13, lineHeight: 20, marginBottom: 16 },
  recommendedStats: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  statItem: { alignItems: 'center' },
  statValue: { color: '#A78BFA', fontSize: 16, fontWeight: '700' },
  statLabel: { color: '#6B7280', fontSize: 11, marginTop: 2 },
  startBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  startBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  sessionCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  sessionType: { color: '#6B7280', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  sessionTitle: { color: '#F9FAFB', fontSize: 15, fontWeight: '600', marginTop: 2 },
  sessionDuration: { alignItems: 'center' },
  sessionMin: { color: '#A78BFA', fontSize: 22, fontWeight: '700' },
  sessionMinLabel: { color: '#6B7280', fontSize: 10 },
  sessionDesc: { color: '#9CA3AF', fontSize: 13, lineHeight: 19, marginBottom: 12 },
  sessionBtn: {
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  sessionBtnText: { fontSize: 13, fontWeight: '600' },
  connectCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  connectTitle: { color: '#F9FAFB', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  connectDesc: { color: '#9CA3AF', fontSize: 13, lineHeight: 19, marginBottom: 16 },
  deviceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  deviceBtn: {
    backgroundColor: '#0F0D1A',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  deviceBtnText: { color: '#9CA3AF', fontSize: 13 },
  breathingContainer: {
    flex: 1,
    backgroundColor: '#0F0D1A',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathingTitle: {
    color: '#F9FAFB',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  breathingSubtitle: { color: '#6B7280', fontSize: 13, marginBottom: 48 },
  circleContainer: { width: 220, height: 220, justifyContent: 'center', alignItems: 'center' },
  breathCircleOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathCircleInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathPhase: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  breathCount: { fontSize: 40, fontWeight: '800', marginTop: 4 },
  breathingTip: {
    color: '#9CA3AF',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 48,
    marginBottom: 32,
  },
  closeBtn: {
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#374151',
  },
  closeBtnText: { color: '#9CA3AF', fontSize: 15, fontWeight: '600' },
});
