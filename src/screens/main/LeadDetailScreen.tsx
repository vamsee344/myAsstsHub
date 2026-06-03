import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton, AppInput } from '../../components/shared/AppComponents';

const LeadDetailScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [newNote, setNewNote] = useState('');
  const [status, setStatus] = useState('New');

  const lead = {
    id,
    clientName: 'Robert Langdon',
    clientPhone: '+1 (555) 234-9876',
    clientEmail: 'robert.langdon@university.edu',
    value: 1250000,
    notes: ['Pre-approved for $1.5M mortgage.']
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    Alert.alert('Note Added', 'Note registered successfully.');
    setNewNote('');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.navBack}>← CRM Board</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.clientName}>{lead.clientName}</Text>
          <Text style={styles.leadValue}>Opportunity: ${lead.value.toLocaleString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Contact</Text>
          <Text style={styles.infoText}>✉ {lead.clientEmail}</Text>
          <Text style={styles.infoText}>📞 {lead.clientPhone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status Management</Text>
          <Text style={styles.infoText}>Current Status: {status}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          {lead.notes.map((note, idx) => (
            <Text key={idx} style={styles.infoText}>• {note}</Text>
          ))}
          <AppInput value={newNote} onChangeText={setNewNote} placeholder="Write note details..." />
          <AppButton title="Save Note" onPress={handleAddNote} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  navHeader: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  navBack: {
    fontSize: 15,
    color: '#1A56DB',
    fontWeight: '600',
  },
  container: {
    padding: 16,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  clientName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  leadValue: {
    fontSize: 15,
    color: '#1A56DB',
    fontWeight: '600',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  }
});

export default LeadDetailScreen;

