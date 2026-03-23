/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { COLORS } from '@/constants';

const BaseView = ({
  children,
  removeBottomPadding,
  removeTopPadding,
  containerStyles,
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: removeTopPadding ? 0 : insets?.top,
          paddingBottom: removeBottomPadding ? 0 : insets?.bottom,
          backgroundColor: COLORS.background?.[theme],
        },
        containerStyles,
      ]}
    >
      {children}
    </View>
  );
};

export default BaseView;
