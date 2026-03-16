/* eslint-disable react-native/no-inline-styles */
import { SVGS } from '@/constants/imagePath';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { COLORS, FONT_SIZES, SIZES } from '@/constants';
import GradientBorderWrapper from './GlowGradientWrapper';

const toastConfig = {
  customToast: ({
    text1,
    text2,
    props,
  }) => {
    const { msgType = 'success', customIcon, theme } = props;

    const styles = getStyles(theme);
    
    const Icon = () => {
      
      if (customIcon) {
        return customIcon;
      }
      switch (msgType) {
        case 'success':
          return <SVGS.successTick />;
        case 'error':
          return <SVGS.errorCross />;
        case 'info':
          return <SVGS.infoIcon />;
        default:
          return <SVGS.successTick />;
      }
    };

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

const getStyles = (theme = 'dark') => StyleSheet.create({
  container: {
    width: '96%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.sixteen,
    borderRadius: SIZES.eight,
    backgroundColor: COLORS.secondaryBackground?.[theme],
    alignSelf: 'center',
    gap: SIZES.ten,
  },
  text: {
    color: COLORS.text?.[theme],
    fontSize: FONT_SIZES.fourteen,
  },
});

export default toastConfig;