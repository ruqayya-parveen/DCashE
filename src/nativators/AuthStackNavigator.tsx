import { StyleSheet, Text, View } from 'react-native';
import React, { ComponentType } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParamList } from '@/types/navigationTypes';
import Login from '@/screens/auth/Login';
import VerifyOtp from '@/screens/auth/VerifyOtp';
const Stack = createStackNavigator<AuthParamList>();

type TScreenItem = {
  name: keyof AuthParamList;
  component: ComponentType<any>;
};

const screens: TScreenItem[] = [
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'VerifyOtp',
    component: VerifyOtp,
  },
];

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {screens.map(screen => (
        <Stack.Screen name={screen.name} component={screen.component} />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;

const styles = StyleSheet.create({});
