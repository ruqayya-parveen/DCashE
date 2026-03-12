import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackNavigator from './AuthStackNavigator';
import SplashScreen from '@/screens/auth/SplashScreen';
import AppStackNavigator from './AppStackNavigator';
import { navigationRef } from '@/utils/navigationUtils';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'Splash'} component={SplashScreen} />
        <Stack.Screen name={'AuthNavigator'} component={AuthStackNavigator} />
        <Stack.Screen name={'AppNavigator'} component={AppStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
