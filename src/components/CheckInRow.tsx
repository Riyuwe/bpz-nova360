import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckIn } from '../types';

const zoneColors: Record<CheckIn['zone'], string> = {
  Excellent: '#10B981',
  Good: '#3B82F6',
  Mindfulness: '#8B5CF6',
  Fair: '#F59E0B',
};

interface CheckInRowProps {
  checkIn: CheckIn;
}

export const CheckInRow: React.FC<CheckInRowProps> = ({ checkIn }) => {
  const zoneColor = zoneColors[checkIn.zone];

  return (
    <View style={styles.row}>
      <View style={styles.dayCol}>
        <Text style={styles.dayLabel}>Day {checkIn.day}</Text>
        <Text style={styles.dateLabel}>{checkIn.date}</Text>
      </View>
      <View style={styles.ratingCol}>
        <Text style={[styles.rating, { color: checkIn.rating === 100 ? '#10B981' : '#3B82F6' }]}>
          {checkIn.rating}
        </Text>
      </View>
      <View style={styles.coherenceCol}>
        <Text style={styles.metric}>{checkIn.avgCoherence}</Text>
      </View>
      <View style={styles.bpmCol}>
        <Text style={styles.metric}>{checkIn.avgBPM}</Text>
      </View>
      <View style={[styles.zoneBadge, { backgroundColor: `${zoneColor}22` }]}>
        <Text style={[styles.zoneText, { color: zoneColor }]}>{checkIn.zone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2640',
  },
  dayCol: {
    flex: 1.5,
  },
  dayLabel: {
    color: '#F9FAFB',
    fontSize: 13,
    fontWeight: '600',
  },
  dateLabel: {
    color: '#6B7280',
    fontSize: 11,
    marginTop: 2,
  },
  ratingCol: {
    flex: 0.8,
    alignItems: 'center',
  },
  rating: {
    fontSize: 15,
    fontWeight: '700',
  },
  coherenceCol: {
    flex: 0.8,
    alignItems: 'center',
  },
  bpmCol: {
    flex: 0.8,
    alignItems: 'center',
  },
  metric: {
    color: '#D1D5DB',
    fontSize: 13,
  },
  zoneBadge: {
    flex: 1.2,
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  zoneText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
