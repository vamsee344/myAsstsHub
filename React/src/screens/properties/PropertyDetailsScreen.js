import React, { useEffect, useState } from 'react';
import { 
    View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, 
    Dimensions, ActivityIndicator, Linking 
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import propertyService from '../../api/propertyService';

const { width } = Dimensions.get('window');

const PropertyDetailsScreen = ({ route, navigation }) => {
    const { propertyId } = route.params;
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await propertyService.getPropertyById(propertyId);
                if (response.status === 'success') {
                    setProperty(response.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [propertyId]);

    const handleCall = () => {
        if (property?.phone) {
            Linking.openURL(`tel:${property.phone}`);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (!property) {
        return (
            <View style={styles.errorContainer}>
                <Text>Property not found.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image Gallery (Placeholder for now) */}
                <View style={styles.imageContainer}>
                    <View style={styles.placeholderImg}>
                        <MaterialIcons name="home-work" size={100} color={colors.border} />
                    </View>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.surface} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{property.ptitle}</Text>
                            <Text style={styles.location}>
                                <MaterialIcons name="location-pin" size={16} /> {property.city}, {property.state}
                            </Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>₹ {property.price}</Text>
                            <Text style={styles.perSqft}>₹ {Math.round(property.price / property.psqft)}/sqft</Text>
                        </View>
                    </View>

                    {/* Quick Specs */}
                    <View style={styles.specsRow}>
                        <View style={styles.specItem}>
                            <MaterialCommunityIcons name="bed-double-outline" size={24} color={colors.primary} />
                            <Text style={styles.specVal}>{property.nobed} BHK</Text>
                        </View>
                        <View style={styles.specItem}>
                            <MaterialIcons name="straighten" size={24} color={colors.primary} />
                            <Text style={styles.specVal}>{property.psqft} Sqft</Text>
                        </View>
                        <View style={styles.specItem}>
                            <MaterialCommunityIcons name="car-outline" size={24} color={colors.primary} />
                            <Text style={styles.specVal}>{property.park > 0 ? 'Parking' : 'No'}</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{property.description}</Text>

                    {/* Features List */}
                    <Text style={styles.sectionTitle}>Amenities</Text>
                    <View style={styles.amenities}>
                        {property.amenities?.split(',').map((item, index) => (
                            <View key={index} style={styles.amenityChip}>
                                <Text style={styles.amenityText}>{item.trim()}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            {/* Bottom Contact Bar */}
            <View style={styles.contactBar}>
                <TouchableOpacity style={styles.contactBtn} onPress={handleCall}>
                    <MaterialIcons name="phone" size={20} color={colors.surface} />
                    <Text style={styles.contactBtnText}>Call Dealer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.contactBtn, styles.whatsappBtn]}>
                    <MaterialCommunityIcons name="whatsapp" size={20} color={colors.surface} />
                    <Text style={styles.contactBtnText}>WhatsApp</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    imageContainer: { height: 300, backgroundColor: colors.surface },
    placeholderImg: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    backBtn: { position: 'absolute', top: 50, left: 20, padding: 10, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)' },
    content: { padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: colors.background, marginTop: -30 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    title: { fontSize: 24, fontFamily: typography.fontFamily.bold, color: colors.text.primary, marginBottom: 5 },
    location: { fontSize: 14, color: colors.text.secondary },
    priceContainer: { alignItems: 'flex-end' },
    price: { fontSize: 22, color: colors.primary, fontWeight: 'bold' },
    perSqft: { fontSize: 12, color: colors.text.light },
    specsRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20, paddingVertical: 15, backgroundColor: colors.surface, borderRadius: 15 },
    specItem: { alignItems: 'center' },
    specVal: { marginTop: 5, fontSize: 14, fontWeight: '600' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
    description: { fontSize: 15, lineHeight: 22, color: colors.text.secondary },
    amenities: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
    amenityChip: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: colors.secondary + '20', borderRadius: 8, marginRight: 8, marginBottom: 8 },
    amenityText: { fontSize: 13, color: colors.secondary, fontWeight: '600' },
    contactBar: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: colors.surface, flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border },
    contactBtn: { flex: 1, height: 50, backgroundColor: colors.primary, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    whatsappBtn: { backgroundColor: '#25D366' },
    contactBtnText: { color: colors.surface, fontWeight: 'bold', marginLeft: 8 }
});

export default PropertyDetailsScreen;
