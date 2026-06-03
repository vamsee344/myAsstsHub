import React, { useState, useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts if they exist
        const fontMap = {
          'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
          'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
          'Montserrat-Bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
        };

        // In a real app, you'd check if these files exist before calling Font.loadAsync
        // or wrap in a try-catch as we've done.
        await Font.loadAsync(fontMap);
      } catch (e) {
        console.warn('Font loading failed, falling back to system fonts:', e.message);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we need this to 
      // stay longer (like for our animated splash screen), we can delay this.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
