/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import BaseView from '@/components/BaseView';
import { SVGS } from '@/constants/imagePath';
import { DIMENSIONS } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { RootNavigatorParams } from '@/types/navigationTypes';

const SplashScreen = () => {
  const navigation = useNavigation<RootNavigatorParams<'SplashScreen'>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('AuthNavigator');
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
