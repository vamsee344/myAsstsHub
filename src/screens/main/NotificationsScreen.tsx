import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_NOTIFICATIONS } from '../../constants/mockData';
import { Typography, Spacing } from '../../theme';

const NotificationsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.navBack}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        <FlatList
          data={MOCK_NOTIFICATIONS}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.notificationCard, !item.isRead ? styles.unreadCard : null]}>
              <View style={styles.row}>
                <Text style={styles.notifIcon}>
                  {item.type === 'lead' ? '👥' : item.type === 'booking' ? '📅' : '💬'}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.notifTitle}>{item.title}</Text>
                  <Text style={styles.notifBody}>{item.body}</Text>
                  <Text style={styles.notifTime}>{item.timestamp}</Text>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No notifications received.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerTitle: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: '700',
    color: '#111827',
  },
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  unreadCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notifIcon: {
    fontSize: 22,
    marginRight: Spacing.md,
    marginTop: 2,
  },
  notifTitle: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodyMedium.fontSize,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  notifBody: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodySmall.fontSize,
    color: '#4B5563',
    lineHeight: 16,
    marginBottom: 4,
  },
  notifTime: {
    fontFamily: Typography.fontFamily,
    fontSize: 9,
    color: '#9CA3AF',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodyMedium.fontSize,
    color: '#6B7280',
  }
});

export default NotificationsScreen;

