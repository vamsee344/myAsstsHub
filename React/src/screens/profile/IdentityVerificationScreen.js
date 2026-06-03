import React, { useState } from 'react';
import { 
    View, Text, StyleSheet, ScrollView, 
    Image, TouchableOpacity, Alert, ActivityIndicator 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import profileService from '../../api/profileService';
import AppButton from '../../components/common/AppButton';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const IdentityVerificationScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [docs, setDocs] = useState({
        aadhar: null,
        pan: null,
    });

    const pickDocument = async (type) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setDocs({ ...docs, [type]: result.assets[0].uri });
        }
    };

    const handleUpload = async () => {
        if (!docs.aadhar && !docs.pan) {
            Alert.alert('Selection Required', 'Please select at least one document to upload.');
            return;
        }

        setLoading(true);
        try {
            const response = await profileService.uploadIdentityMedia(docs);
            if (response.status === 'success') {
                Alert.alert('Verification Started', 'Your documents have been submitted for verification.', [
                    { text: 'Great', onPress: () => navigation.goBack() }
                ]);
            }
        } catch (error) {
            Alert.alert('Upload Failed', error.message || 'Could not upload documents');
        } finally {
            setLoading(false);
        }
    };

    const renderDocPicker = (label, type, icon) => (
        <View style={styles.pickerSection}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity 
                style={[styles.picker, docs[type] && styles.pickerSelected]} 
                onPress={() => pickDocument(type)}
            >
                {docs[type] ? (
                    <Image source={{ uri: docs[type] }} style={styles.preview} />
                ) : (
                    <View style={styles.pickerContent}>
                        <MaterialIcons name={icon} size={40} color={colors.primary} />
                        <Text style={styles.pickerText}>Upload Photo</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>KYC Verification</Text>
            <Text style={styles.subtitle}>
                To list your properties safely, we require a copy of your valid identity documents.
            </Text>

            {renderDocPicker('Aadhar Card (Front/Back)', 'aadhar', 'credit-card')}

            <View style={{ height: 20 }} />

            {renderDocPicker('PAN Card', 'pan', 'badge')}

            <View style={styles.infoBox}>
                <MaterialIcons name="info-outline" size={20} color={colors.secondary} />
                <Text style={styles.infoText}>
                    Documents are used only for internal verification and are not shared with third parties.
                </Text>
            </View>

            <AppButton 
                title="Submit for Verification"
                onPress={handleUpload}
                loading={loading}
                style={{ marginTop: 30 }}
            />

            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 25 },
    title: { fontSize: 22, fontFamily: typography.fontFamily.bold, color: colors.primary, marginBottom: 10 },
    subtitle: { fontSize: 14, color: colors.text.secondary, marginBottom: 30, lineHeight: 20 },
    pickerSection: { marginBottom: 20 },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: colors.text.secondary },
    picker: {
        width: '100%',
        height: 180,
        backgroundColor: colors.surface,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colors.border,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    pickerSelected: { borderStyle: 'solid', borderColor: colors.primary },
    preview: { width: '100%', height: '100%' },
    pickerContent: { alignItems: 'center' },
    pickerText: { marginTop: 10, color: colors.primary, fontWeight: 'bold' },
    infoBox: { flexDirection: 'row', backgroundColor: colors.secondary + '15', padding: 15, borderRadius: 12, marginTop: 10 },
    infoText: { flex: 1, marginLeft: 10, fontSize: 12, color: colors.secondary, lineHeight: 18 }
});

export default IdentityVerificationScreen;
