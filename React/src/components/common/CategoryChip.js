import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const CategoryChip = ({ 
    icon, 
    label, 
    selected = false, 
    onPress 
}) => {
    return (
        <TouchableOpacity 
            style={[styles.chip, selected && styles.activeChip]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {icon && <Image source={icon} style={styles.icon} resizeMode="contain" />}
            <Text style={[styles.text, selected && styles.activeText]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: colors.border,
    },
    activeChip: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 8,
    },
    text: {
        fontSize: 14,
        fontFamily: typography.fontFamily.medium,
        color: colors.primary,
    },
    activeText: {
        color: colors.surface,
    }
});

export default CategoryChip;
