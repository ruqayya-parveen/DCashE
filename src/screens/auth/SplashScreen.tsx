/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import BaseView from '@/components/BaseView';
import { SVGS } from '@/constants/imagePath';
import { DIMENSIONS } from '@/constants';
import { replaceTo } from '@/utils/navigationUtils';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      replaceTo('AuthNavigator', { screen: 'Login' });
    }, 2000);
  });

  return (
    <BaseView
      containerStyles={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SVGS.SplashLogo
        width={0.5 * DIMENSIONS.width}
        height={0.4 * DIMENSIONS.width}
      />
    </BaseView>
  );
};

export default SplashScreen;
