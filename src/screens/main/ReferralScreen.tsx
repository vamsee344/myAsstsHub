import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/auth.store';
import { AppButton } from '../../components/shared/AppComponents';

const ReferralScreen = ({ navigation }: any) => {
  const { user } = useAuthStore();

  const handleShareCode = () => {
    Alert.alert('Invite Shared', 'Your invite code "MYASSETS50" has been copied.');
  };

  const referrals = [
    { id: 1, refereeName: 'Sarah Vance', status: 'deal_closed', amount: 250, refereeEmail: 'sarah@mail.com' },
    { id: 2, refereeName: 'James Murdock', status: 'kyc_verified', amount: 50, refereeEmail: 'james@mail.com' }
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.navBack}>← Dashboard</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.walletCard}>
          <Text style={styles.walletTitle}>Total Referral Earnings</Text>
          <Text style={styles.walletBalance}>$300</Text>
          <Text style={styles.walletXp}>Level 1 Tier Member</Text>
        </View>

        <View style={styles.shareCard}>
          <Text style={styles.shareTitle}>Refer & Earn Rewards</Text>
          <Text style={styles.shareSubtitle}>
            Earn $50 when a friend signs up, and $200 more when they complete KYC verification.
          </Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>MYASSETS50</Text>
          </View>
          <AppButton title="Share Referral Link" onPress={handleShareCode} />
        </View>

        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Referral History</Text>
          {referrals.map(ref => (
            <View key={ref.id} style={styles.refRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.refName}>{ref.refereeName}</Text>
                <Text style={styles.refEmail}>{ref.refereeEmail}</Text>
              </View>
              <View style={styles.statusCol}>
                <Text style={styles.refReward}>+${ref.amount}</Text>
                <Text style={styles.refStatus}>{ref.status.replace('_', ' ').toUpperCase()}</Text>
              </View>
            </View>
          ))}
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
  walletCard: {
    backgroundColor: '#1A56DB',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  walletTitle: {
    fontSize: 13,
    color: '#E5E7EB',
    fontWeight: '600',
  },
  walletBalance: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  walletXp: {
    fontSize: 12,
    color: '#E5E7EB',
  },
  shareCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  shareTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  shareSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  codeBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#1A56DB',
    marginBottom: 12,
  },
  codeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A56DB',
    letterSpacing: 2,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  historyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  refRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 12,
  },
  refName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  refEmail: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusCol: {
    alignItems: 'flex-end',
  },
  refReward: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0E9F6E',
  },
  refStatus: {
    fontSize: 9,
    fontWeight: '700',
    color: '#9CA3AF',
    marginTop: 2,
  }
});

export default ReferralScreen;

