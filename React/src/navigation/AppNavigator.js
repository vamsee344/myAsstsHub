import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import MainNavigator from './MainNavigator';

const AppNavigator = () => {
    // Determine the authentication state from Redux
    const { isAuthenticated } = useSelector((state) => state.auth);

    return (
        <NavigationContainer>
            {isAuthenticated ? <MainNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;
