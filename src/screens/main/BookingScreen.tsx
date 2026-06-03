import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton, AppInput } from '../../components/AppComponents';
import { Typography, Spacing, BorderRadius } from '../../theme';

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM'];

const BookingScreen = ({ route, navigation }: any) => {
  const propertyTitle = route.params?.propertyTitle || 'Skyline Heights Penthouse';
  
  const [clientName, setClientName] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBook = () => {
    if (!clientName || !selectedSlot) {
      Alert.alert('Error', 'Please fill in the client name and select a time slot.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success',
        `Viewing scheduled for ${clientName} at ${selectedSlot} is confirmed.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.navBack}>← Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Schedule Property Tour</Text>
        <Text style={styles.propertyVal}>Property: {propertyTitle}</Text>

        <AppInput
          label="Client Name"
          value={clientName}
          onChangeText={setClientName}
          placeholder="Robert Langdon"
          style={styles.input}
        />

        <Text style={styles.label}>Select Time Slot</Text>
        <View style={styles.slotGrid}>
          {TIME_SLOTS.map(slot => (
            <TouchableOpacity
              key={slot}
              style={[
                styles.slotItem,
                selectedSlot === slot ? styles.activeSlotItem : null
              ]}
              onPress={() => setSelectedSlot(slot)}
            >
              <Text style={[styles.slotText, selectedSlot === slot ? styles.activeSlotText : null]}>
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <AppInput
          label="Meeting Notes"
          value={notes}
          onChangeText={setNotes}
          placeholder="Client wants to view parking space..."
          style={styles.input}
        />

        <AppButton
          title="Confirm Booking"
          onPress={handleBook}
          loading={loading}
          style={styles.confirmBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  navHeader: {
    padding: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  navBack: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodyLarge.fontSize,
    color: '#1565D8',
    fontWeight: '600',
  },
  container: {
    padding: Spacing.lg,
  },
  title: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.h2.fontSize,
    fontWeight: '700',
    color: '#111827',
    marginBottom: Spacing.xs,
  },
  propertyVal: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodyMedium.fontSize,
    color: '#1565D8',
    fontWeight: '600',
    marginBottom: Spacing.xl,
  },
  input: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodySmall.fontSize,
    fontWeight: '600',
    color: '#374151',
    marginBottom: Spacing.sm,
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing.xl,
  },
  slotItem: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: '30%',
    alignItems: 'center',
  },
  activeSlotItem: {
    backgroundColor: '#1565D8',
    borderColor: '#1565D8',
  },
  slotText: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.caption.fontSize,
    color: '#4B5563',
    fontWeight: '600',
  },
  activeSlotText: {
    color: '#FFFFFF',
  },
  confirmBtn: {
    marginTop: Spacing.md,
  }
});

export default BookingScreen;

