export const Colors = {
  light: {
    primary: '#1565D8',
    secondary: '#0D47A1',
    success: '#2E7D32',
    error: '#D32F2F',
    warning: '#ED6C02',
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#111827',
    textMuted: '#6B7280',
    border: '#E2E8F0',
    notification: '#EF4444',
  },
  dark: {
    primary: '#3B82F6',
    secondary: '#1D4ED8',
    success: '#4ADE80',
    error: '#F87171',
    warning: '#FBBF24',
    background: '#0F172A',
    card: '#1E293B',
    text: '#F9FAFB',
    textMuted: '#9CA3AF',
    border: '#334155',
    notification: '#F87171',
  }
};

export const Typography = {
  fontFamily: 'Poppins',
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 36 },
  h2: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  bodyLarge: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodyMedium: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  bodySmall: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  button: { fontSize: 14, fontWeight: '600' as const, lineHeight: 20 },
  caption: { fontSize: 10, fontWeight: '400' as const, lineHeight: 12 },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

export const Shadows = {
  light: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dark: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  }
};
