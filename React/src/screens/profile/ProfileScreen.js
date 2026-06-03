import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateProfile } from '../../redux/slices/authSlice';
import profileService from '../../api/profileService';
import AppButton from '../../components/common/AppButton';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await profileService.getProfile();
                if (response.status === 'success') {
                    dispatch(updateProfile(response.data.userdetails));
                }
            } catch (error) {
                console.warn('Failed to fetch profile', error.message);
            }
        };
        fetchProfile();
    }, [dispatch]);

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel" },
            { text: "Logout", onPress: () => dispatch(logout()) }
        ]);
    };

    const handleDeactivate = () => {
        Alert.alert("Deactivate Account", "Warning: This action is permanent. Your account will be marked for deletion.", [
            { text: "Cancel" },
            { text: "Deactivate", style: 'destructive', onPress: async () => {
                try {
                    await profileService.deactivateAccount();
                    dispatch(logout());
                } catch (e) {
                    Alert.alert("Error", "Could not process deactivation.");
                }
            }}
        ]);
    };

    const renderOption = (icon, title, onPress, color = colors.text.primary) => (
        <TouchableOpacity style={styles.option} onPress={onPress}>
            <View style={styles.optionLeft}>
                <MaterialIcons name={icon} size={24} color={color} />
                <Text style={[styles.optionText, { color }]}>{title}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.text.light} />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <View style={styles.avatarPlaceholder}>
                    <MaterialIcons name="person" size={50} color={colors.surface} />
                </View>
                <Text style={styles.userName}>{user?.first_name} {user?.last_name || 'My Assets User'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'user@myassetshub.com'}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Settings</Text>
                {renderOption('person-outline', 'Edit Profile', () => navigation.navigate('EditProfile'))}
                {renderOption('work-outline', 'Professional Experience', () => navigation.navigate('ExperienceList'))}
                {renderOption('school', 'Education Background', () => navigation.navigate('EducationList'))}
                {renderOption('people-outline', 'My Connections', () => navigation.navigate('Networking'))}
                {renderOption('verified-user', 'Identity Verification', () => navigation.navigate('IdentityVerification'))}
                {renderOption('workspace-premium', 'Membership Plans', () => navigation.navigate('MembershipPlans'))}
                {renderOption('history', 'Transaction History', () => navigation.navigate('TransactionHistory'))}
                {renderOption('lock-outline', 'Change Password', () => navigation.navigate('ChangePassword'))}
                {renderOption('no-accounts', 'Deactivate Account', handleDeactivate, colors.error)}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Asset Management</Text>
                {renderOption('home-work', 'My Listed Assets', () => navigation.navigate('MyAssets'))}
                {renderOption('favorite-border', 'Wishlist')}
            </View>

            <View style={styles.section}>
                <AppButton 
                    title="Logout"
                    type="outline"
                    onPress={handleLogout}
                    textStyle={{ color: colors.error }}
                    style={{ borderColor: colors.error }}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 50,
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    userName: {
        fontSize: 22,
        fontFamily: typography.fontFamily.bold,
        color: colors.surface,
    },
    userEmail: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
    },
    section: {
        marginTop: 25,
        backgroundColor: colors.surface,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sectionTitle: {
        fontSize: 14,
        color: colors.text.light,
        fontFamily: typography.fontFamily.bold,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        marginLeft: 15,
        fontSize: 16,
        fontFamily: typography.fontFamily.medium,
    },
});

export default ProfileScreen;
