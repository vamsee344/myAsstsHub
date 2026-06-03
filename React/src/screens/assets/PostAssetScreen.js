import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, 
    Image, Alert, ActivityIndicator, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { fetchCategories } from '../../redux/slices/propertySlice';
import propertyService from '../../api/propertyService';
import AppButton from '../../components/common/AppButton';
import AppInput from '../../components/common/AppInput';
import CategoryChip from '../../components/common/CategoryChip';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const PostAssetScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.property);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        ptitle: '',
        category: '',
        properfor: 'sale', // Default
        price: '',
        psqft: '',
        description: '',
        city: '',
        address: '',
        filecover: null,
        video_file: null,
        layout: null,
        galleryImages: [],
    });

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch]);

    const pickImage = async (type) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.8,
        });

        if (!result.canceled) {
            setForm({ ...form, [type]: result.assets[0].uri });
        }
    };

    const pickVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            setForm({ ...form, video_file: result.assets[0].uri });
        }
    };

    const pickGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            const uris = result.assets.map(a => a.uri);
            setForm({ ...form, galleryImages: [...form.galleryImages, ...uris] });
        }
    };

    const handleInputChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        if (!form.ptitle || !form.price || !form.category || !form.filecover) {
            Alert.alert('Error', 'Please fill in all required fields and select a cover image.');
            return;
        }

        setLoading(true);
        try {
            const response = await propertyService.addProperty(form);
            if (response.status === 'success') {
                Alert.alert('Success', 'Property listed successfully!', [
                    { text: 'OK', onPress: () => navigation.navigate('Home') }
                ]);
            }
        } catch (error) {
            Alert.alert('Failed', error.message || 'Could not list property');
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
                
                {/* Image Picker */}
                <Text style={styles.sectionTitle}>Required Media</Text>
                <Text style={styles.label}>Cover Image (Best quality first photo)</Text>
                <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage('filecover')}>
                    {form.filecover ? (
                        <Image source={{ uri: form.filecover }} style={styles.previewImage} />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <MaterialIcons name="add-a-photo" size={40} color={colors.primary} />
                            <Text style={styles.imagePlaceholderText}>Upload Home Photo</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Optional Multimedia</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.miniPicker, form.video_file && styles.pickerActive]} onPress={pickVideo}>
                        <MaterialIcons name="videocam" size={24} color={form.video_file ? colors.surface : colors.primary} />
                        <Text style={[styles.miniPickerText, form.video_file && { color: colors.surface }]}>Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.miniPicker, form.layout && styles.pickerActive]} onPress={() => pickImage('layout')}>
                        <MaterialIcons name="layers" size={24} color={form.layout ? colors.surface : colors.primary} />
                        <Text style={[styles.miniPickerText, form.layout && { color: colors.surface }]}>Layout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.miniPicker, form.galleryImages.length > 0 && styles.pickerActive]} onPress={pickGallery}>
                        <MaterialIcons name="collections" size={24} color={form.galleryImages.length > 0 ? colors.surface : colors.primary} />
                        <Text style={[styles.miniPickerText, form.galleryImages.length > 0 && { color: colors.surface }]}>Gallery ({form.galleryImages.length})</Text>
                    </TouchableOpacity>
                </View>

                {/* Property Category Selection (Dropdown/Chips) */}
                <Text style={styles.label}>Category</Text>
                <View style={styles.categoryPicker}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categories.map((cat) => (
                            <CategoryChip 
                                key={cat.c_id}
                                label={cat.category_name}
                                selected={form.category === cat.c_id}
                                onPress={() => handleInputChange('category', cat.c_id)}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Listing Type (Sale vs Rent) */}
                <Text style={styles.label}>Listing Type</Text>
                <View style={styles.row}>
                    {['sale', 'rent'].map((type) => (
                        <CategoryChip 
                            key={type}
                            label={type.toUpperCase()}
                            selected={form.properfor === type}
                            onPress={() => handleInputChange('properfor', type)}
                        />
                    ))}
                </View>

                <AppInput label="Property Title" placeholder="e.g. Modern 3BHK Apartment" value={form.ptitle} onChangeText={(t) => handleInputChange('ptitle', t)} />
                
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <AppInput label="Price (₹)" placeholder="10,00,000" value={form.price} onChangeText={(t) => handleInputChange('price', t)} keyboardType="numeric" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <AppInput label="Area (Sqft)" placeholder="1200" value={form.psqft} onChangeText={(t) => handleInputChange('psqft', t)} keyboardType="numeric" />
                    </View>
                </View>

                <AppInput label="Location/City" placeholder="e.g. Mumbai" value={form.city} onChangeText={(t) => handleInputChange('city', t)} />
                <AppInput label="Full Address" placeholder="Detailed address..." value={form.address} onChangeText={(t) => handleInputChange('address', t)} multiline />
                <AppInput label="Description" placeholder="Property features..." value={form.description} onChangeText={(t) => handleInputChange('description', t)} multiline />

                <AppButton 
                    title="List Property Now"
                    onPress={handleSubmit}
                    loading={loading}
                />

                <View style={{ height: 30 }} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: typography.fontFamily.bold,
        color: colors.primary,
        marginBottom: 15,
    },
    imagePicker: {
        width: '100%',
        height: 200,
        backgroundColor: colors.surface,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colors.border,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 20,
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        alignItems: 'center',
    },
    imagePlaceholderText: {
        marginTop: 10,
        color: colors.text.light,
        fontFamily: typography.fontFamily.medium,
    },
    label: {
        fontSize: 14,
        fontFamily: typography.fontFamily.bold,
        color: colors.text.secondary,
        marginBottom: 8,
    },
    fieldGroup: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: colors.surface,
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        fontSize: 16,
        color: colors.text.primary,
        fontFamily: typography.fontFamily.regular,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    categoryPicker: {
        marginBottom: 20,
    },
    categoryChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: colors.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: 10,
    },
    categoryChipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    categoryChipText: {
        color: colors.primary,
        fontFamily: typography.fontFamily.medium,
    },
    categoryChipTextActive: {
        color: colors.surface,
    },
    typeBtn: {
        flex: 1,
        padding: 12,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 10,
    },
    typeBtnActive: {
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
    },
    typeBtnText: {
        color: colors.text.secondary,
        fontWeight: 'bold',
    },
    typeBtnTextActive: {
        color: colors.surface,
    },
    submitBtn: {
        backgroundColor: colors.primary,
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        elevation: 4,
    },
    submitBtnText: {
        color: colors.surface,
        fontSize: 18,
        fontFamily: typography.fontFamily.bold,
    },
    miniPicker: {
        flex: 1,
        height: 80,
        backgroundColor: colors.surface,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: colors.border,
    },
    miniPickerText: {
        fontSize: 12,
        fontFamily: typography.fontFamily.medium,
        color: colors.text.secondary,
        marginTop: 4,
    },
    pickerActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    }
});

export default PostAssetScreen;
