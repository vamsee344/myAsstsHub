import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../../store/auth.store';

const SplashScreen = ({ navigation }: any) => {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        navigation.replace('Login');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏢 My Assets Hub</Text>
      <Text style={styles.tagline}>Real Estate CRM & Networking Wall</Text>
      <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A56DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  tagline: {
    fontSize: 13,
    color: '#E5E7EB',
    fontWeight: '500',
  },
  loader: {
    marginTop: 24,
  }
});

export default SplashScreen;
