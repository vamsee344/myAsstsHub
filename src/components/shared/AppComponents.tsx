import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, TextInput, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useAppStore } from '../../store/app.store';

// AppButton Component
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
  const getColors = () => {
    switch (variant) {
      case 'primary': return { bg: '#1A56DB', text: '#FFFFFF' };
      case 'secondary': return { bg: '#FF6B35', text: '#FFFFFF' };
      case 'outline': return { bg: 'transparent', text: '#1A56DB', border: '#1A56DB' };
      case 'danger': return { bg: '#F05252', text: '#FFFFFF' };
      case 'success': return { bg: '#0E9F6E', text: '#FFFFFF' };
      default: return { bg: '#1A56DB', text: '#FFFFFF' };
    }
  };
  const design = getColors();
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

// AppInput Component
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

// EmptyState Component
interface EmptyStateProps {
  title: string;
  subtitle?: string;
}
export const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.emptyIcon}>📦</Text>
      <Text style={styles.emptyTitle}>{title}</Text>
      {subtitle && <Text style={styles.emptySubtitle}>{subtitle}</Text>}
    </View>
  );
};

// ErrorView Component
interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}
export const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTextVal}>{message}</Text>
      {onRetry && (
        <AppButton title="Retry Connection" onPress={onRetry} variant="outline" style={styles.retryBtn} />
      )}
    </View>
  );
};

// Avatar Component
interface AvatarProps {
  uri?: string;
  size?: number;
  fallback?: string;
}
export const Avatar: React.FC<AvatarProps> = ({ uri, size = 40, fallback = 'U' }) => {
  return uri ? (
    <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />
  ) : (
    <View style={[styles.fallbackContainer, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={styles.fallbackText}>{fallback[0].toUpperCase()}</Text>
    </View>
  );
};

// Skeleton Component
export const SkeletonLoader: React.FC = () => {
  return (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: '#111827',
  },
  inputError: {
    borderColor: '#F05252',
  },
  errorText: {
    fontSize: 11,
    color: '#F05252',
    marginTop: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorTextVal: {
    fontSize: 15,
    color: '#F05252',
    textAlign: 'center',
    fontWeight: '600',
  },
  retryBtn: {
    marginTop: 16,
    width: 200,
  },
  fallbackContainer: {
    backgroundColor: '#1A56DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  skeletonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  skeletonImage: {
    height: 120,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 12,
  },
  skeletonContent: {
    gap: 8,
  },
  skeletonTitle: {
    height: 20,
    width: '40%',
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  skeletonText: {
    height: 16,
    width: '80%',
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  }
});
