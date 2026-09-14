import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
  icon?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  color = '#7C3AED',
  icon,
}) => {
  return (
    <View style={[styles.card, { borderTopColor: color }]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.value, { color }]}>
        {value}
        {unit && <Text style={styles.unit}> {unit}</Text>}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    margin: 4,
    borderTopWidth: 3,
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginBottom: 6,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  unit: {
    fontSize: 12,
    fontWeight: '400',
  },
  label: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
});
