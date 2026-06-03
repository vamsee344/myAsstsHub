import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LeadCrmScreen = ({ navigation }: any) => {
  const leads = [
    {
      id: 'lead-1',
      clientName: 'Robert Langdon',
      propertyTitle: 'Skyline Heights Penthouse',
      status: 'Qualified',
      value: 1250000,
      lastFollowUp: '2026-05-29T14:30:00Z'
    },
    {
      id: 'lead-2',
      clientName: 'Diana Prince',
      propertyTitle: 'Modernist Forest Retreat',
      status: 'Negotiation',
      value: 2450000,
      lastFollowUp: '2026-05-30T11:00:00Z'
    }
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>CRM Pipelines</Text>
        
        <FlatList
          data={leads}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('LeadDetail', { id: item.id })}
              style={styles.leadCard}
            >
              <View style={styles.leadHeader}>
                <Text style={styles.clientName}>{item.clientName}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
              <Text style={styles.leadProperty} numberOfLines={1}>{item.propertyTitle}</Text>
              <View style={styles.leadFooter}>
                <Text style={styles.leadValue}>${item.value.toLocaleString()}</Text>
                <Text style={styles.leadDate}>{new Date(item.lastFollowUp).toLocaleDateString()}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  leadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  clientName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4B5563',
  },
  leadProperty: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  leadFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leadValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  leadDate: {
    fontSize: 11,
    color: '#9CA3AF',
  }
});

export default LeadCrmScreen;

