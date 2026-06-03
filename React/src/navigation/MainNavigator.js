import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './MainTabs';
import PropertyDetailsScreen from '../screens/properties/PropertyDetailsScreen';
import MyAssetsScreen from '../screens/properties/MyAssetsScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import IdentityVerificationScreen from '../screens/profile/IdentityVerificationScreen';
import SearchScreen from '../screens/home/SearchScreen';
import ExperienceListScreen from '../screens/profile/ExperienceListScreen';
import EducationListScreen from '../screens/profile/EducationListScreen';
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen';
import NetworkingScreen from '../screens/profile/NetworkingScreen';
import MembershipPlansScreen from '../screens/profile/MembershipPlansScreen';
import TransactionHistoryScreen from '../screens/profile/TransactionHistoryScreen';
import ReviewListScreen from '../screens/profile/ReviewListScreen';
import PublicProfileScreen from '../screens/profile/PublicProfileScreen';
import { colors } from '../theme/colors';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: colors.surface,
                },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen 
                name="PropertyDetails" 
                component={PropertyDetailsScreen} 
                options={{ 
                    headerShown: true, 
                    headerTitle: 'Property Details',
                    headerBackTitleVisible: false 
                }} 
            />
            <Stack.Screen 
                name="Search" 
                component={SearchScreen} 
                options={{ 
                    headerShown: false,
                }} 
            />
            <Stack.Screen 
                name="MyAssets" 
                component={MyAssetsScreen} 
                options={{ 
                    headerShown: false,
                }} 
            />
            <Stack.Screen 
                name="EditProfile" 
                component={EditProfileScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Edit Profile'
                }} 
            />
            <Stack.Screen 
                name="IdentityVerification" 
                component={IdentityVerificationScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Identity Verification'
                }} 
            />
            <Stack.Screen 
                name="ExperienceList" 
                component={ExperienceListScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Experience'
                }} 
            />
            <Stack.Screen 
                name="EducationList" 
                component={EducationListScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Education'
                }} 
            />
            <Stack.Screen 
                name="ChangePassword" 
                component={ChangePasswordScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Change Password'
                }} 
            />
            <Stack.Screen 
                name="Networking" 
                component={NetworkingScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Networking'
                }} 
            />
            <Stack.Screen 
                name="MembershipPlans" 
                component={MembershipPlansScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Membership'
                }} 
            />
            <Stack.Screen 
                name="TransactionHistory" 
                component={TransactionHistoryScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Transactions'
                }} 
            />
            <Stack.Screen 
                name="ReviewList" 
                component={ReviewListScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Reviews'
                }} 
            />
            <Stack.Screen 
                name="PublicProfile" 
                component={PublicProfileScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Profile'
                }} 
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;
