import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, TextInput, ActivityIndicator } from 'react-native';
import { Typography, Spacing, BorderRadius } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export const AppButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}) => {
  const getColors = (colors: any) => {
    switch (variant) {
      case 'primary': return { bg: colors.primary, text: '#FFFFFF' };
      case 'secondary': return { bg: colors.secondary, text: '#FFFFFF' };
      case 'outline': return { bg: 'transparent', text: colors.primary, border: colors.primary };
      case 'danger': return { bg: colors.error, text: '#FFFFFF' };
      case 'success': return { bg: colors.success, text: '#FFFFFF' };
      default: return { bg: colors.primary, text: '#FFFFFF' };
    }
  };

  const currentTheme = {
    primary: '#1565D8',
    secondary: '#0D47A1',
    error: '#D32F2F',
    success: '#2E7D32',
  };

  const design = getColors(currentTheme);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        { backgroundColor: design.bg },
        design.border ? { borderWidth: 1, borderColor: design.border } : null,
        disabled && { opacity: 0.5 },
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={design.text} />
      ) : (
        <Text style={[styles.btnText, { color: design.text }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: any;
}

export const AppInput: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error,
  keyboardType = 'default',
  style,
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.input, error ? styles.inputError : null]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
  style?: any;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  color = '#1565D8',
  style,
}) => {
  return (
    <View style={[styles.statCard, style]}>
      <View style={[styles.accentBar, { backgroundColor: color }]} />
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
  },
  btnText: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.button.fontSize,
    fontWeight: Typography.button.fontWeight,
  },
  inputContainer: {
    marginBottom: Spacing.md,
    width: '100%',
  },
  label: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodySmall.fontSize,
    fontWeight: '600',
    color: '#374151',
    marginBottom: Spacing.xs,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: '#FFFFFF',
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodyMedium.fontSize,
    color: '#111827',
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  errorText: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.caption.fontSize,
    color: '#D32F2F',
    marginTop: Spacing.xs,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.sm,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  statTitle: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.bodySmall.fontSize,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.h2.fontSize,
    fontWeight: '700',
  },
  statSubtitle: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.caption.fontSize,
    color: '#9CA3AF',
    marginTop: Spacing.xs,
  }
});
