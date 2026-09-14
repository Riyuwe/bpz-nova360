import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';

const ratingEmojis = [
  { value: 1, emoji: '😔', label: 'Struggling' },
  { value: 2, emoji: '😕', label: 'Below average' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😄', label: 'Excellent' },
];

const breathingCategories = [
  { key: 'sleep', emoji: '😴', label: 'Sleep Quality' },
  { key: 'energy', emoji: '⚡', label: 'Energy Level' },
  { key: 'focus', emoji: '🎯', label: 'Focus' },
  { key: 'stress', emoji: '🧘', label: 'Stress' },
  { key: 'mood', emoji: '❤️', label: 'Mood' },
];

export const CheckInScreen: React.FC = () => {
  const [step, setStep] = useState(1);
  const [overallRating, setOverallRating] = useState<number | null>(null);
  const [thankfulFor, setThankfulFor] = useState('');
  const [categoryRatings, setCategoryRatings] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState('');

  const today = new Date().toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleCategoryRating = (key: string, value: number) => {
    setCategoryRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    Alert.alert(
      'Check-in Complete! 🎉',
      'Your daily brain performance check-in has been recorded. Keep up the great work!',
      [{ text: 'View My Report', onPress: () => setStep(1) }]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Check-In</Text>
          <Text style={styles.date}>{today}</Text>
        </View>

        {/* Step Indicator */}
        <View style={styles.steps}>
          {[1, 2, 3].map((s) => (
            <View key={s} style={styles.stepRow}>
              <View style={[styles.stepDot, step >= s && styles.stepDotActive]}>
                <Text style={[styles.stepNum, step >= s && styles.stepNumActive]}>{s}</Text>
              </View>
              {s < 3 && <View style={[styles.stepLine, step > s && styles.stepLineActive]} />}
            </View>
          ))}
        </View>
        <View style={styles.stepLabels}>
          {['Overall', 'Categories', 'Reflection'].map((l) => (
            <Text key={l} style={styles.stepLabel}>{l}</Text>
          ))}
        </View>

        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.sectionTitle}>How are you feeling overall today?</Text>
            <View style={styles.ratingRow}>
              {ratingEmojis.map((r) => (
                <TouchableOpacity
                  key={r.value}
                  style={[
                    styles.ratingBtn,
                    overallRating === r.value && styles.ratingBtnActive,
                  ]}
                  onPress={() => setOverallRating(r.value)}
                >
                  <Text style={styles.ratingEmoji}>{r.emoji}</Text>
                  <Text style={[
                    styles.ratingLabel,
                    overallRating === r.value && styles.ratingLabelActive,
                  ]}>{r.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>What are you grateful for today?</Text>
            <TextInput
              style={styles.input}
              value={thankfulFor}
              onChangeText={setThankfulFor}
              placeholder="Family, morning coffee, a good night's sleep..."
              placeholderTextColor="#4B5563"
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity
              style={[styles.btn, !overallRating && styles.btnDisabled]}
              onPress={() => overallRating && setStep(2)}
            >
              <Text style={styles.btnText}>Next →</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.sectionTitle}>Rate each area of your wellbeing</Text>
            {breathingCategories.map((cat) => (
              <View key={cat.key} style={styles.catRow}>
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                <Text style={styles.catLabel}>{cat.label}</Text>
                <View style={styles.catRating}>
                  {[1, 2, 3, 4, 5].map((v) => (
                    <TouchableOpacity
                      key={v}
                      style={[
                        styles.catBtn,
                        categoryRatings[cat.key] === v && styles.catBtnActive,
                      ]}
                      onPress={() => handleCategoryRating(cat.key, v)}
                    >
                      <Text style={[
                        styles.catBtnText,
                        categoryRatings[cat.key] === v && styles.catBtnTextActive,
                      ]}>{v}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}

            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.btnSecondary} onPress={() => setStep(1)}>
                <Text style={styles.btnSecondaryText}>← Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => setStep(3)}>
                <Text style={styles.btnText}>Next →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.sectionTitle}>Reflection & Notes</Text>
            <Text style={styles.bodyText}>
              What's one thing you want to focus on improving tomorrow? Any additional observations about your brain or body today?
            </Text>
            <TextInput
              style={[styles.input, { minHeight: 120 }]}
              value={notes}
              onChangeText={setNotes}
              placeholder="I noticed my focus dipped after lunch. Tomorrow I'll try a short walk during my break..."
              placeholderTextColor="#4B5563"
              multiline
            />

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Today's Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Overall Rating</Text>
                <Text style={styles.summaryValue}>
                  {ratingEmojis.find((r) => r.value === overallRating)?.label || 'Not set'}
                </Text>
              </View>
              {Object.entries(categoryRatings).map(([key, val]) => {
                const cat = breathingCategories.find((c) => c.key === key);
                return (
                  <View key={key} style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>{cat?.emoji} {cat?.label}</Text>
                    <Text style={styles.summaryValue}>{val}/5</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.btnSecondary} onPress={() => setStep(2)}>
                <Text style={styles.btnSecondaryText}>← Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnSuccess]} onPress={handleSubmit}>
                <Text style={styles.btnText}>Submit ✓</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

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
  date: { color: '#6B7280', fontSize: 13, marginTop: 4 },
  steps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepRow: { flexDirection: 'row', alignItems: 'center' },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E1B2E',
    borderWidth: 2,
    borderColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDotActive: { borderColor: '#7C3AED', backgroundColor: '#7C3AED' },
  stepNum: { color: '#6B7280', fontSize: 13, fontWeight: '700' },
  stepNumActive: { color: '#FFF' },
  stepLine: { width: 40, height: 2, backgroundColor: '#374151' },
  stepLineActive: { backgroundColor: '#7C3AED' },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  stepLabel: { color: '#6B7280', fontSize: 11 },
  stepContent: {},
  sectionTitle: { color: '#F9FAFB', fontSize: 16, fontWeight: '600', marginBottom: 16 },
  bodyText: { color: '#9CA3AF', fontSize: 14, lineHeight: 21, marginBottom: 16 },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  ratingBtn: {
    flex: 1,
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  ratingBtnActive: { borderColor: '#7C3AED' },
  ratingEmoji: { fontSize: 24, marginBottom: 4 },
  ratingLabel: { color: '#6B7280', fontSize: 9, textAlign: 'center' },
  ratingLabelActive: { color: '#A78BFA' },
  input: {
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 14,
    color: '#F9FAFB',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    gap: 10,
  },
  catEmoji: { fontSize: 20, width: 28 },
  catLabel: { color: '#D1D5DB', fontSize: 13, flex: 1 },
  catRating: { flexDirection: 'row', gap: 6 },
  catBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F0D1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catBtnActive: { backgroundColor: '#7C3AED' },
  catBtnText: { color: '#6B7280', fontSize: 12, fontWeight: '600' },
  catBtnTextActive: { color: '#FFF' },
  btnRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  btn: {
    flex: 1,
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.4 },
  btnSuccess: { backgroundColor: '#10B981' },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
    marginTop: 8,
  },
  btnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  btnSecondaryText: { color: '#9CA3AF', fontSize: 15, fontWeight: '600' },
  summaryCard: {
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  summaryTitle: { color: '#F9FAFB', fontSize: 15, fontWeight: '600', marginBottom: 4 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { color: '#9CA3AF', fontSize: 13 },
  summaryValue: { color: '#A78BFA', fontSize: 13, fontWeight: '600' },
});
