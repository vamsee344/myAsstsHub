import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice';
import AppButton from '../../components/common/AppButton';
import AppInput from '../../components/common/AppInput';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referid: 'MAHREF78491A', // Default from Postman
  });

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async () => {
    if (!form.email || !form.password || !form.firstName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const resultAction = await dispatch(registerUser(form));
    
    if (registerUser.fulfilled.match(resultAction)) {
       // Navigation handled by AppNavigator
    } else {
       Alert.alert('Registration Failed', resultAction.payload || 'Something went wrong');
    }
  };

  const renderInput = (icon, placeholder, name, props = {}) => (
    <View style={styles.inputWrapper}>
      <MaterialIcons name={icon} size={20} color={colors.text.light} style={styles.inputIcon} />
      <TextInput
        style={styles.field}
        placeholder={placeholder}
        placeholderTextColor={colors.text.light}
        value={form[name]}
        onChangeText={(text) => handleInputChange(name, text)}
        {...props}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Start your real estate journey with us</Text>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
             <AppInput
                placeholder="First Name"
                value={form.firstName}
                onChangeText={(t) => handleInputChange('firstName', t)}
             />
          </View>
          <View style={{ flex: 1 }}>
             <AppInput
                placeholder="Last Name"
                value={form.lastName}
                onChangeText={(t) => handleInputChange('lastName', t)}
             />
          </View>
        </View>

        <AppInput icon="person-outline" placeholder="Username" value={form.username} onChangeText={(t) => handleInputChange('username', t)} />
        <AppInput icon="mail-outline" placeholder="Email Address" value={form.email} onChangeText={(t) => handleInputChange('email', t)} keyboardType="email-address" />
        <AppInput icon="phone" placeholder="Phone Number" value={form.phone} onChangeText={(t) => handleInputChange('phone', t)} keyboardType="phone-pad" />
        <AppInput icon="lock-outline" placeholder="Password" value={form.password} onChangeText={(t) => handleInputChange('password', t)} secureTextEntry />
        <AppInput icon="lock-outline" placeholder="Confirm Password" value={form.confirmPassword} onChangeText={(t) => handleInputChange('confirmPassword', t)} secureTextEntry />
        <AppInput icon="group-add" placeholder="Referral ID (Optional)" value={form.referid} onChangeText={(t) => handleInputChange('referid', t)} />

        <AppButton 
           title="Sign Up"
           onPress={handleRegister}
           loading={loading}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: colors.background,
  },
  backBtn: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontFamily: typography.fontFamily.heading,
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 10,
  },
  field: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  footerText: {
    color: colors.text.secondary,
  },
  linkText: {
    color: colors.primary,
    fontWeight: 'bold',
  }
});

export default RegisterScreen;
