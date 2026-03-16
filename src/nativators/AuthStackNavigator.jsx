import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@/screens/auth/Login';
import VerifyOtp from '@/screens/auth/VerifyOtp';
const Stack = createStackNavigator();


const screens = [
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

