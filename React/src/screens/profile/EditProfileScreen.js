import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, ScrollView, 
    Alert, ActivityIndicator, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile as updateReduxProfile } from '../../redux/slices/authSlice';
import profileService from '../../api/profileService';
import AppButton from '../../components/common/AppButton';
import AppInput from '../../components/common/AppInput';
import CategoryChip from '../../components/common/CategoryChip';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const EditProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [userTypes, setUserTypes] = useState(['Individual', 'Agent', 'Builder']); // Default fallback

    const [form, setForm] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        gender: user?.gender || 'male',
        dob: user?.dob || '',
        city: user?.city || '',
        state: user?.state || '',
        country: user?.country || '',
        about: user?.about || '',
        user_type: user?.user_type || 'Individual',
        bankname: user?.bankname || '',
        accountno: user?.accountno || '',
        ifsccode: user?.ifsccode || '',
    });

    useEffect(() => {
        // Fetch real user types from API if possible
        const fetchTypes = async () => {
            try {
                // This is a placeholder for the /user-types endpoint
                // const types = await profileService.getUserTypes();
                // if (types.data) setUserTypes(types.data);
            } catch (err) {}
        };
        fetchTypes();
    }, []);

    const handleInputChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleUpdate = async () => {
        if (!form.first_name || !form.last_name) {
            Alert.alert('Error', 'First and Last name are required.');
            return;
        }

        setLoading(true);
        try {
            const response = await profileService.updateProfile(form);
            if (response.status === 'success') {
                dispatch(updateReduxProfile({ ...user, ...form }));
                Alert.alert('Success', 'Profile updated successfully!', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            }
        } catch (error) {
            Alert.alert('Update Failed', error.message || 'Could not update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: colors.background }} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <AppInput label="First Name" value={form.first_name} onChangeText={(t) => handleInputChange('first_name', t)} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <AppInput label="Last Name" value={form.last_name} onChangeText={(t) => handleInputChange('last_name', t)} />
                    </View>
                </View>

                <Text style={styles.label}>Gender</Text>
                <View style={styles.row}>
                    {['male', 'female', 'other'].map((g) => (
                        <CategoryChip 
                            key={g}
                            label={g.toUpperCase()}
                            selected={form.gender === g}
                            onPress={() => handleInputChange('gender', g)}
                        />
                    ))}
                </View>

                <AppInput label="Date of Birth" placeholder="YYYY-MM-DD" value={form.dob} onChangeText={(t) => handleInputChange('dob', t)} />
                <AppInput label="About Me" placeholder="Brief bio..." value={form.about} onChangeText={(t) => handleInputChange('about', t)} multiline />

                <Text style={styles.sectionTitle}>User Type</Text>
                <View style={styles.row}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {userTypes.map((type) => (
                            <CategoryChip 
                                key={type}
                                label={type}
                                selected={form.user_type === type}
                                onPress={() => handleInputChange('user_type', type)}
                            />
                        ))}
                    </ScrollView>
                </View>

                <Text style={styles.sectionTitle}>Location Details</Text>
                <AppInput label="City" value={form.city} onChangeText={(t) => handleInputChange('city', t)} />
                <AppInput label="State" value={form.state} onChangeText={(t) => handleInputChange('state', t)} />
                <AppInput label="Country" value={form.country} onChangeText={(t) => handleInputChange('country', t)} />

                <Text style={styles.sectionTitle}>Bank Account (For Payouts)</Text>
                <AppInput label="Bank Name" value={form.bankname} onChangeText={(t) => handleInputChange('bankname', t)} />
                <AppInput label="Account Number" value={form.accountno} onChangeText={(t) => handleInputChange('accountno', t)} keyboardType="numeric" />
                <AppInput label="IFSC Code" value={form.ifsccode} onChangeText={(t) => handleInputChange('ifsccode', t)} autoCapitalize="characters" />

                <AppButton 
                    title="Save Changes"
                    onPress={handleUpdate}
                    loading={loading}
                />

                <View style={{ height: 40 }} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    sectionTitle: { fontSize: 18, fontFamily: typography.fontFamily.bold, color: colors.primary, marginTop: 25, marginBottom: 15 },
    label: { fontSize: 14, fontFamily: typography.fontFamily.bold, color: colors.text.secondary, marginBottom: 8, marginLeft: 4 },
    row: { flexDirection: 'row', marginBottom: 20 }
});

export default EditProfileScreen;
