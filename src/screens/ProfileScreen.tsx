import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { currentStudent } from '../data/mockData';

const achievements = [
  { icon: '🔥', label: '7-Day Streak', unlocked: true },
  { icon: '💯', label: '100 Perfect Scores', unlocked: true },
  { icon: '🧠', label: 'Coherence Master', unlocked: true },
  { icon: '⚡', label: '50 Training Sessions', unlocked: false },
  { icon: '🏆', label: '200 Days Strong', unlocked: false },
  { icon: '🌙', label: 'Sleep Optimiser', unlocked: false },
];

export const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {currentStudent.name.split(' ').map((n) => n[0]).join('')}
            </Text>
          </View>
          <Text style={styles.name}>{currentStudent.name}</Text>
          <Text style={styles.school}>{currentStudent.school}</Text>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>⭐ {currentStudent.totalPoints} Total Points</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.cardTitle}>Journey Progress</Text>
          <View style={styles.progressBarOuter}>
            <View
              style={[
                styles.progressBarInner,
                { width: `${(currentStudent.currentDay / 200) * 100}%` as any },
              ]}
            />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabelLeft}>Day {currentStudent.currentDay}</Text>
            <Text style={styles.progressLabelRight}>Goal: Day 200</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsGrid}>
          {achievements.map((a) => (
            <View
              key={a.label}
              style={[styles.achievementCard, !a.unlocked && styles.achievementLocked]}
            >
              <Text style={[styles.achievementIcon, !a.unlocked && { opacity: 0.3 }]}>
                {a.icon}
              </Text>
              <Text style={[styles.achievementLabel, !a.unlocked && { color: '#374151' }]}>
                {a.label}
              </Text>
              {a.unlocked && <Text style={styles.achievementCheck}>✓</Text>}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsCard}>
          {[
            { icon: '🔔', label: 'Notifications', sublabel: 'Daily reminders at 8:00 AM' },
            { icon: '📱', label: 'Connected Devices', sublabel: '0 devices connected' },
            { icon: '🔒', label: 'Privacy', sublabel: 'Manage your data permissions' },
            { icon: '📊', label: 'Data Export', sublabel: 'Download your history as CSV' },
            { icon: '🎯', label: 'Goals', sublabel: 'Set your wellness targets' },
          ].map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.settingRow, i > 0 && styles.settingRowBorder]}
              onPress={() => Alert.alert(item.label, `${item.sublabel} — coming soon!`)}
            >
              <Text style={styles.settingIcon}>{item.icon}</Text>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>{item.label}</Text>
                <Text style={styles.settingSub}>{item.sublabel}</Text>
              </View>
              <Text style={styles.settingChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>NOVA360</Text>
          <Text style={styles.infoSubtitle}>Neuro Optimization Virtual Assistant</Text>
          <Text style={styles.infoDesc}>
            Powered by Brain Performance Zone · brainperformancezone.com
          </Text>
          <Text style={styles.infoVersion}>Version 1.0.0</Text>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0D1A' },
  container: { flex: 1, paddingHorizontal: 16 },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#FFF', fontSize: 28, fontWeight: '700' },
  name: { color: '#F9FAFB', fontSize: 22, fontWeight: '700' },
  school: { color: '#6B7280', fontSize: 13, marginTop: 4 },
  pointsBadge: {
    backgroundColor: '#7C3AED22',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
  },
  pointsText: { color: '#A78BFA', fontSize: 14, fontWeight: '600' },
  progressCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  cardTitle: { color: '#F9FAFB', fontSize: 15, fontWeight: '600', marginBottom: 16 },
  progressBarOuter: {
    backgroundColor: '#0F0D1A',
    borderRadius: 6,
    height: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarInner: {
    backgroundColor: '#7C3AED',
    height: '100%',
    borderRadius: 6,
  },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabelLeft: { color: '#A78BFA', fontSize: 12, fontWeight: '600' },
  progressLabelRight: { color: '#6B7280', fontSize: 12 },
  sectionTitle: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 4,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  achievementCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 14,
    width: '30%',
    alignItems: 'center',
    gap: 6,
    position: 'relative',
  },
  achievementLocked: { opacity: 0.6 },
  achievementIcon: { fontSize: 28 },
  achievementLabel: { color: '#9CA3AF', fontSize: 10, textAlign: 'center' },
  achievementCheck: {
    position: 'absolute',
    top: 6,
    right: 8,
    color: '#10B981',
    fontSize: 12,
    fontWeight: '700',
  },
  settingsCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  settingRowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#2D2640',
  },
  settingIcon: { fontSize: 20, width: 28 },
  settingContent: { flex: 1 },
  settingLabel: { color: '#F9FAFB', fontSize: 14, fontWeight: '500' },
  settingSub: { color: '#6B7280', fontSize: 12, marginTop: 2 },
  settingChevron: { color: '#374151', fontSize: 20 },
  infoCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7C3AED22',
  },
  infoTitle: { color: '#A78BFA', fontSize: 18, fontWeight: '700' },
  infoSubtitle: { color: '#6B7280', fontSize: 12, marginTop: 4 },
  infoDesc: { color: '#6B7280', fontSize: 11, marginTop: 8, textAlign: 'center' },
  infoVersion: { color: '#374151', fontSize: 11, marginTop: 8 },
});
