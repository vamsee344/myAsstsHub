import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '../../store/auth.store';
import { AppButton, AppInput } from '../../components/shared/AppComponents';

const OTPVerificationScreen = ({ route, navigation }: any) => {
  const { login: setSession } = useAuthStore();
  const phone = route.params?.phone || 'your phone number';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (code.length !== 6) {
      Alert.alert('Error', 'OTP must be a 6-digit code.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('OTP Verified', 'Please proceed to login with your registered account.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Code</Text>
      <Text style={styles.subtitle}>
        We sent an SMS with a 6-digit code to {phone}. Enter "123456" to bypass verification.
      </Text>

      <AppInput
        label="Enter OTP"
        value={code}
        onChangeText={setCode}
        placeholder="123456"
        keyboardType="numeric"
        style={styles.input}
      />

      <AppButton
        title="Verify & Continue"
        onPress={handleVerify}
        loading={loading}
        style={styles.verifyBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 22,
  },
  input: {
    marginBottom: 24,
  },
  verifyBtn: {
    marginBottom: 12,
  }
});

export default OTPVerificationScreen;
