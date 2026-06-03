import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Colors, Shadows } from '../theme';

export const useTheme = () => {
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(systemScheme === 'dark');
  }, [systemScheme]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const colors = isDarkMode ? Colors.dark : Colors.light;
  const shadow = isDarkMode ? Shadows.dark : Shadows.light;

  return {
    isDarkMode,
    colors,
    shadow,
    toggleTheme,
    scheme: isDarkMode ? 'dark' : 'light' as 'dark' | 'light',
  };
};
