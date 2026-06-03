import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuthStore } from '../../store/auth.store';
import { login } from '../../api/auth.api';
import { AppButton, AppInput } from '../../components/shared/AppComponents';

const LoginScreen = ({ navigation }: any) => {
  const { login: setSession } = useAuthStore();
  const [email, setEmail] = useState('mah5@gmail.com');
  const [password, setPassword] = useState('B654321@Aa');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await login(email, password);
      if (response?.token) {
        await setSession(response.token, response.user || {
          id: 5,
          fname: 'Alex',
          lname: 'Carter',
          uname: 'alexcarter',
          email
        });
      } else {
        Alert.alert('Login failed', 'Unable to retrieve authentication token from the server.');
      }
    } catch (error: any) {
      Alert.alert('Login failed', error?.message || 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Enter email and password to log in to MyAssetsHub</Text>
        </View>

        <AppInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="mah5@gmail.com"
          keyboardType="email-address"
        />

        <AppInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
        />

        <AppButton title="Sign In" onPress={handleLogin} loading={loading} style={styles.btn} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 32,
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
  },
  btn: {
    marginTop: 8,
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    color: '#6B7280',
  },
  link: {
    fontSize: 15,
    color: '#1A56DB',
    fontWeight: '700',
  }
});

export default LoginScreen;
