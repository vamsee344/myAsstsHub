import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const AppButton = ({ 
    title, 
    onPress, 
    loading = false, 
    type = 'primary', // 'primary', 'secondary', 'outline'
    style, 
    textStyle,
    disabled = false
}) => {
    const isPrimary = type === 'primary';
    const isOutline = type === 'outline';

    const containerStyle = [
        styles.button,
        isPrimary && styles.primaryButton,
        isOutline && styles.outlineButton,
        (disabled || loading) && styles.disabledButton,
        style
    ];

    const labelStyle = [
        styles.text,
        isPrimary && styles.primaryText,
        isOutline && styles.outlineText,
        textStyle
    ];

    return (
        <TouchableOpacity 
            style={containerStyle} 
            onPress={onPress} 
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? colors.surface : colors.primary} />
            ) : (
                <Text style={labelStyle}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    primaryButton: {
        backgroundColor: colors.primary,
        elevation: 4,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.primary,
    },
    disabledButton: {
        opacity: 0.6,
    },
    text: {
        fontSize: 16,
        fontFamily: typography.fontFamily.bold,
    },
    primaryText: {
        color: colors.surface,
    },
    outlineText: {
        color: colors.primary,
    }
});

export default AppButton;
