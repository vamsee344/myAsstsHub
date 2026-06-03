import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import profileService from '../../api/profileService';
import AppButton from '../../components/common/AppButton';
import AppInput from '../../components/common/AppInput';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const ChangePasswordScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        password: '',
        newpassword: '',
        confpassword: ''
    });

    const handleUpdate = async () => {
        if (!form.password || !form.newpassword || !form.confpassword) {
            return Alert.alert('Error', 'All fields are required.');
        }
        if (form.newpassword !== form.confpassword) {
            return Alert.alert('Error', 'New passwords do not match.');
        }

        setLoading(true);
        try {
            const res = await profileService.changePassword(form);
            if (res.status === 'success') {
                Alert.alert('Success', 'Password updated successfully!', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            }
        } catch (err) {
            Alert.alert('Update Failed', err.message || 'Check your current password and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Text style={styles.title}>Update Password</Text>
            <Text style={styles.subtitle}>Keep your account secure with a strong password.</Text>

            <View style={styles.form}>
                <AppInput 
                    label="Current Password" 
                    secureTextEntry 
                    value={form.password} 
                    onChangeText={t => setForm({...form, password: t})} 
                />
                <AppInput 
                    label="New Password" 
                    secureTextEntry 
                    value={form.newpassword} 
                    onChangeText={t => setForm({...form, newpassword: t})} 
                />
                <AppInput 
                    label="Confirm New Password" 
                    secureTextEntry 
                    value={form.confpassword} 
                    onChangeText={t => setForm({...form, confpassword: t})} 
                />

                <AppButton 
                    title="Update Password" 
                    onPress={handleUpdate} 
                    loading={loading}
                    style={{ marginTop: 20 }}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 25 },
    title: { fontSize: 24, fontFamily: typography.fontFamily.bold, color: colors.primary, marginBottom: 10 },
    subtitle: { fontSize: 14, color: colors.text.secondary, marginBottom: 30 },
    form: { marginTop: 10 }
});

export default ChangePasswordScreen;
