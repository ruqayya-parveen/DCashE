import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Home from '@/screens/app/Home';
import Invest from '@/screens/app/Invest';
import Offers from '@/screens/app/Offers';
import Portfolio from '@/screens/app/Portfolio';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SVGS } from '@/constants/imagePath';
import { COLORS, DIMENSIONS, SIZES } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import TabBarBg from '@/components/TabBarBg';

const Tabs = createBottomTabNavigator();

const screens = [
  {
    name: 'Home',
    component: Home,
    iconActive: SVGS.homeSolid,
    iconInActive: SVGS.homeOutline,
  },
  {
    name: 'Invest',
    component: Invest,
    iconActive: SVGS.investSolid,
    iconInActive: SVGS.investOutline,
  },
  {
    name: 'Offers',
    component: Offers,
    iconActive: SVGS.offerSolid,
    iconInActive: SVGS.offerOutline,
  },
  {
    name: 'Portfolio',
    component: Portfolio,
    iconActive: SVGS.portfolioSolid,
    iconInActive: SVGS.portfolioOutline,
  },
];

const AppStackNavigator = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarAllowFontScaling: false,
          tabBarStyle: {
            height: SIZES.seventy + insets.bottom + SIZES.ten,
            paddingTop: 3,
            width: DIMENSIONS.width * 0.92,
            maxWidth: 600,
            alignSelf: 'center',
            position: 'absolute',
            elevation: 0,
            borderTopWidth: 0,
            transform: [
              {
                translateX:
                  (DIMENSIONS.width - Math.min(600, DIMENSIONS.width * 0.92)) /
                  2,
              },
            ],
          },
          tabBarItemStyle: {
            height: SIZES.sixtySix,
            marginHorizontal: SIZES.two,
            borderRadius: 100,
            overflow: 'hidden',
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.secondaryText?.[theme],
          tabBarActiveBackgroundColor: COLORS.secondaryBackground?.[theme],
          tabBarBackground: () => <TabBarBg />,
        };
      }}
    >
      {screens.map(screen => (
        <Tabs.Screen
          name={screen.name}
          component={screen.component}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              const Icon = focused ? screen.iconActive : screen.iconInActive;
              return (
                <View>
                  <Icon />
                </View>
              );
            },
          }}
        />
      ))}
    </Tabs.Navigator>
  );
};

export default AppStackNavigator;

const styles = StyleSheet.create({});
