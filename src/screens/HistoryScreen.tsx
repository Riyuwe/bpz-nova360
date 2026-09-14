import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { CheckInRow } from '../components/CheckInRow';
import { recentCheckIns } from '../data/mockData';

export const HistoryScreen: React.FC = () => {
  const [page, setPage] = useState(1);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Check-In History</Text>
          <Text style={styles.subtitle}>Track your progress over time</Text>
        </View>

        <View style={styles.summaryRow}>
          {[
            { label: 'Total Days', value: '133', color: '#7C3AED' },
            { label: 'Avg Rating', value: '99.2', color: '#10B981' },
            { label: 'Avg Coherence', value: '4.1', color: '#3B82F6' },
          ].map((s) => (
            <View key={s.label} style={styles.summaryCard}>
              <Text style={[styles.summaryValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.summaryLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.colHeader, { flex: 1.5 }]}>Day</Text>
            <Text style={[styles.colHeader, { flex: 0.8, textAlign: 'center' }]}>Rating</Text>
            <Text style={[styles.colHeader, { flex: 0.8, textAlign: 'center' }]}>Coh.</Text>
            <Text style={[styles.colHeader, { flex: 0.8, textAlign: 'center' }]}>BPM</Text>
            <Text style={[styles.colHeader, { flex: 1.2, textAlign: 'center' }]}>Zone</Text>
          </View>

          {recentCheckIns.map((checkIn, i) => (
            <CheckInRow key={i} checkIn={checkIn} />
          ))}
        </View>

        <View style={styles.pagination}>
          <TouchableOpacity
            style={[styles.pageBtn, page === 1 && styles.pageBtnDisabled]}
            onPress={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <Text style={styles.pageBtnText}>← Prev</Text>
          </TouchableOpacity>
          <Text style={styles.pageInfo}>Page {page} of 14</Text>
          <TouchableOpacity
            style={styles.pageBtn}
            onPress={() => setPage((p) => Math.min(14, p + 1))}
          >
            <Text style={styles.pageBtnText}>Next →</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.exportBtn}>
          <Text style={styles.exportBtnText}>📥 Generate Progress Report</Text>
        </TouchableOpacity>

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
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  summaryValue: { fontSize: 22, fontWeight: '700' },
  summaryLabel: { color: '#6B7280', fontSize: 11, marginTop: 4, textAlign: 'center' },
  tableCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    paddingHorizontal: 4,
  },
  colHeader: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pageBtn: {
    backgroundColor: '#1E1B2E',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pageBtnDisabled: { opacity: 0.4 },
  pageBtnText: { color: '#9CA3AF', fontSize: 13, fontWeight: '600' },
  pageInfo: { color: '#6B7280', fontSize: 13 },
  exportBtn: {
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  exportBtnText: { color: '#A78BFA', fontSize: 14, fontWeight: '600' },
});
