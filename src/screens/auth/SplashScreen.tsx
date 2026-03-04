import { Text } from 'react-native';
import React from 'react';
import BaseView from '@/components/BaseView';
import { useTranslation } from 'react-i18next';

const SplashScreen = () => {
  const { t } = useTranslation();
  return (
    <BaseView>
      <Text>SplashScreen {t('hello')}</Text>
    </BaseView>
  );
};

export default SplashScreen;

