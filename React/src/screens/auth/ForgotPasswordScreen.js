import React, { useState } from 'react';
import { 
    View, Text, StyleSheet, TouchableOpacity, 
    Alert, ActivityIndicator, KeyboardAvoidingView, Platform 
} from 'react-native';
import authService from '../../api/authService';
import AppButton from '../../components/common/AppButton';
import AppInput from '../../components/common/AppInput';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleResetRequest = async () => {
        if (!email || !email.includes('@')) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.forgotPassword(email);
            if (response.status === 'success') {
                setIsSent(true);
            }
        } catch (error) {
            Alert.alert('Request Failed', error.message || 'Could not process password reset at this time.');
        } finally {
            setLoading(false);
        }
    };

    if (isSent) {
        return (
            <View style={styles.container}>
                <View style={styles.successIcon}>
                    <MaterialIcons name="mark-email-read" size={80} color={colors.primary} />
                </View>
                <Text style={styles.title}>Email Sent!</Text>
                <Text style={styles.subtitle}>
                    If an account exists for {email}, you will receive a password reset link shortly.
                </Text>
                <AppButton 
                    title="Back to Login"
                    onPress={() => navigation.navigate('Login')}
                    style={{ marginTop: 20 }}
                />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableOpacity 
                style={styles.backBtn} 
                onPress={() => navigation.goBack()}
            >
                <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>
                    Enter the email associated with your account and we'll send a link to reset your password.
                </Text>
            </View>

            <AppInput 
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                icon="mail-outline"
            />

            <AppButton 
                title="Send Reset Link"
                onPress={handleResetRequest}
                loading={loading}
            />
            
            <View style={{ flex: 1 }} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 30 },
    backBtn: { marginTop: 30, marginBottom: 40 },
    header: { marginBottom: 40 },
    title: { fontSize: 28, fontFamily: typography.fontFamily.bold, color: colors.primary, marginBottom: 15 },
    subtitle: { fontSize: 16, color: colors.text.secondary, lineHeight: 24 },
    successIcon: { alignItems: 'center', marginTop: 100, marginBottom: 30 },
});

export default ForgotPasswordScreen;
