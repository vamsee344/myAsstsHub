import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialIcons } from '@expo/vector-icons';

const AppInput = ({ 
    label, 
    placeholder, 
    value, 
    onChangeText, 
    icon, 
    error, 
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    ...props 
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[
                styles.inputWrapper,
                isFocused && styles.inputFocused,
                error && styles.inputError
            ]}>
                {icon && (
                    <MaterialIcons 
                        name={icon} 
                        size={20} 
                        color={isFocused ? colors.primary : colors.text.light} 
                        style={styles.icon} 
                    />
                )}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={colors.text.light}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    {...props}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: typography.fontFamily.bold,
        color: colors.text.secondary,
        marginBottom: 8,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: colors.border,
        paddingHorizontal: 15,
        height: 56,
        transition: 'border-color 0.2s',
    },
    inputFocused: {
        borderColor: colors.primary,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    inputError: {
        borderColor: colors.error,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: colors.text.primary,
        fontSize: 16,
        fontFamily: typography.fontFamily.regular,
    },
    errorText: {
        color: colors.error,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    }
});

export default AppInput;
