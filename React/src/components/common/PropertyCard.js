import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PropertyCard = ({ property, onPress, horizontal = false }) => {
    const isHorizontal = horizontal;

    return (
        <TouchableOpacity 
            style={[styles.card, isHorizontal ? styles.horizontalCard : styles.verticalCard]}
            onPress={() => onPress(property.l_id || property.id)}
            activeOpacity={0.9}
        >
            <View style={isHorizontal ? styles.hImageWrapper : styles.vImageWrapper}>
                <View style={styles.placeholderImg}>
                    <MaterialIcons name="image" size={isHorizontal ? 40 : 50} color={colors.text.light} opacity={0.3} />
                </View>
                {property.properfor && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{property.properfor.toUpperCase()}</Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {property.title || property.ptitle}
                </Text>
                
                <View style={[styles.inlineRow, { marginBottom: 4 }]}>
                    <MaterialIcons name="location-pin" size={14} color={colors.primary} />
                    <Text style={styles.location} numberOfLines={1}>
                        {property.location || property.city}
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.price}>₹ {property.price}</Text>
                    {property.nobed && (
                        <View style={styles.meta}>
                            <MaterialCommunityIcons name="bed-double-outline" size={14} color={colors.text.light} />
                            <Text style={styles.metaText}>{property.nobed}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: 'hidden',
        marginBottom: 15,
    },
    verticalCard: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
    },
    horizontalCard: {
        width: width * 0.7,
        marginRight: 15,
    },
    vImageWrapper: {
        width: 100,
        height: 100,
        backgroundColor: colors.ads.background,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hImageWrapper: {
        width: '100%',
        height: 150,
        backgroundColor: colors.ads.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderImg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontFamily: typography.fontFamily.bold,
        color: colors.text.primary,
        marginBottom: 4,
    },
    inlineRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        fontSize: 12,
        color: colors.text.light,
        fontFamily: typography.fontFamily.regular,
        marginLeft: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
    },
    price: {
        fontSize: 15,
        fontFamily: typography.fontFamily.bold,
        color: colors.secondary,
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    metaText: {
        fontSize: 11,
        color: colors.text.light,
        marginLeft: 3,
        fontWeight: '600',
    },
    badge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: colors.primary + 'CC',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        color: colors.surface,
        fontSize: 10,
        fontWeight: 'bold',
    }
});

export default PropertyCard;
