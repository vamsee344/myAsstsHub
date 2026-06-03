import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { AppButton, AppInput } from '../../components/AppComponents';
import { Typography, Spacing } from '../../theme';

const SignupScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all details.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Route user to OTP confirmation step
      navigation.navigate('OTP', { phone });
    }, 1000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join My Assets Hub to list and acquire real estate properties</Text>
      </View>

      <AppInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        placeholder="John Doe"
      />

      <AppInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        placeholder="john.doe@example.com"
        keyboardType="email-address"
      />

      <AppInput
        label="Phone Number"
        value={phone}
        onChangeText={setPhone}
        placeholder="+1 (555) 000-0000"
        keyboardType="phone-pad"
      />

      <AppInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
      />

      <AppInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="••••••••"
        secureTextEntry
      />

      <AppButton
        title="Register"
        onPress={handleSignup}
        loading={loading}
        style={styles.signupBtn}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Spacing.xl,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
  },
  header: {
    marginBottom: Spacing.xl,
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
  },
  signupBtn: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodyMedium.fontSize,
    color: '#6B7280',
  },
  loginText: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodyMedium.fontSize,
    color: '#1565D8',
    fontWeight: '700',
  }
});

export default SignupScreen;
