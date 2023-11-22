import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreenTabs from './HomeScreenTabs';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import BroadCastIndicator from '../components/BroadCastIndicator';
import UserProfileScreen from './UserProfileScreen';
import EditProfileScreen from './EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='RegisterScreen'
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='BroadCast'
        component={BroadCastIndicator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='HomeScreenTabs'
        component={HomeScreenTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='MapScreen'
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='UserProfileScreen'
        component={UserProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='EditProfileScreen'
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
