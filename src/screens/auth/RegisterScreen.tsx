import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuthStore } from '../../store/auth.store';
import { register } from '../../api/auth.api';
import { AppButton, AppInput } from '../../components/shared/AppComponents';

const RegisterScreen = ({ navigation }: any) => {
  const { login: setSession } = useAuthStore();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fname || !lname || !uname || !email || !password || !phone) {
      Alert.alert('Error', 'Please fill in all standard details.');
      return;
    }
    setLoading(true);
    try {
      await register({ fname, lname, uname, email, password, country_name: 'United States', phone, user_type_id: 1 });
      Alert.alert('Account Created', 'Registration successful! Please log in with your new credentials.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        }
      ]);
    } catch (e: any) {
      Alert.alert('Registration failed', e?.message || 'An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Sign up to join our premier real estate networks</Text>
        </View>

        <AppInput label="First Name" value={fname} onChangeText={setFname} placeholder="John" />
        <AppInput label="Last Name" value={lname} onChangeText={setLname} placeholder="Doe" />
        <AppInput label="Username" value={uname} onChangeText={setUname} placeholder="johndoe" />
        <AppInput label="Email Address" value={email} onChangeText={setEmail} placeholder="john@example.com" keyboardType="email-address" />
        <AppInput label="Password" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
        <AppInput label="Phone Number" value={phone} onChangeText={setPhone} placeholder="5550000000" keyboardType="phone-pad" />

        <AppButton title="Register" onPress={handleRegister} loading={loading} style={styles.btn} />
        <AppButton title="Back to Login" onPress={() => navigation.navigate('Login')} variant="outline" />
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
    padding: 24,
  },
  header: {
    marginBottom: 24,
    marginTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  btn: {
    marginTop: 16,
    marginBottom: 12,
  }
});

export default RegisterScreen;
