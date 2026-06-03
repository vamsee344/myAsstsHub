import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { AppButton, AppInput } from '../../components/AppComponents';
import { Typography, Spacing } from '../../theme';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Email Sent',
        'Check your inbox for instructions to reset your password.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your registered email address below, and we'll email you instructions to reset your password.
      </Text>

      <AppInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        placeholder="alex.carter@myassetshub.com"
        keyboardType="email-address"
        style={styles.input}
      />

      <AppButton
        title="Reset Password"
        onPress={handleReset}
        loading={loading}
        style={styles.resetBtn}
      />

      <AppButton
        title="Back to Login"
        variant="outline"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.xl,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.h1.fontSize,
    fontWeight: '700',
    color: '#111827',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodyLarge.fontSize,
    color: '#6B7280',
    marginBottom: Spacing.xxl,
    lineHeight: 24,
  },
  input: {
    marginBottom: Spacing.xl,
  },
  resetBtn: {
    marginBottom: Spacing.md,
  }
});

export default ForgotPasswordScreen;
