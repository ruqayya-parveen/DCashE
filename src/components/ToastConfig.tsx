/* eslint-disable react-native/no-inline-styles */
import { SVGS } from '@/constants/imagePath';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ToastConfigParams } from 'react-native-toast-message';
import CustomText from './CustomText';
import { FONT_SIZES, SIZES } from '@/constants';

type CustomToastProps = {
  msgType: 'success' | 'error' | 'info';
};

const toastConfig = {
  customToast: ({
    text1,
    text2,
    props,
  }: ToastConfigParams<CustomToastProps>) => {
    const { msgType } = props;
    const Icon = () =>
      msgType === 'success' ? (
        <SVGS.successTick />
      ) : msgType === 'error' ? (
        <SVGS.errorCross />
      ) : (
        <SVGS.infoIcon />
      );
    return (
      <View style={styles.container}>
        <Icon />
        <View style={{ flexShrink: 1, gap: SIZES.two }}>
          {text1 && <CustomText style={styles.text}>{text1}</CustomText>}
          {text2 && <CustomText style={styles.text}>{text2}</CustomText>}
        </View>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    width: '96%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.sixteen,
    borderRadius: SIZES.eight,
    backgroundColor: '#1C1C1E',
    alignSelf: 'center',
    gap: SIZES.ten,
  },
  text: {
    color: '#fff',
    fontSize: FONT_SIZES.fourteen,
  },
});

export default toastConfig;
