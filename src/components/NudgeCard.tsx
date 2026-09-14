import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Nudge } from '../types';

const categoryConfig: Record<Nudge['category'], { icon: string; color: string; bg: string }> = {
  sleep: { icon: '🌙', color: '#6366F1', bg: '#1E1B4B' },
  stress: { icon: '🧘', color: '#8B5CF6', bg: '#1E1B2E' },
  exercise: { icon: '🏃', color: '#10B981', bg: '#064E3B' },
  nutrition: { icon: '🥗', color: '#F59E0B', bg: '#451A03' },
  recovery: { icon: '⚡', color: '#EC4899', bg: '#500724' },
  mental: { icon: '🧠', color: '#3B82F6', bg: '#1E3A5F' },
  social: { icon: '🤝', color: '#14B8A6', bg: '#042F2E' },
};

interface NudgeCardProps {
  nudge: Nudge;
}

export const NudgeCard: React.FC<NudgeCardProps> = ({ nudge }) => {
  const config = categoryConfig[nudge.category];

  return (
    <View style={[styles.card, { backgroundColor: config.bg, borderLeftColor: config.color }]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{config.icon}</Text>
        <Text style={[styles.title, { color: config.color }]}>{nudge.title}</Text>
        {nudge.priority === 'high' && (
          <View style={styles.priorityBadge}>
            <Text style={styles.priorityText}>Priority</Text>
          </View>
        )}
      </View>
      <Text style={styles.description}>{nudge.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  icon: {
    fontSize: 18,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  priorityBadge: {
    backgroundColor: '#7C3AED22',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  priorityText: {
    color: '#A78BFA',
    fontSize: 10,
    fontWeight: '600',
  },
  description: {
    color: '#D1D5DB',
    fontSize: 13,
    lineHeight: 19,
  },
});
