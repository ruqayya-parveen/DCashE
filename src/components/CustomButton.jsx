/* eslint-disable react-native/no-inline-styles */
import {
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { FONT_SIZES, SIZES } from '@/constants/size';
import { FONTS } from '@/constants/fonts';
import { useTheme } from '@/hooks/useTheme';
import { COLORS } from '@/constants';


const CustomButton = ({
  text,
  wrapperStyle,
  textStyle,
  onPress = () => {},
  disabled = false,
  type = 'filled',
  borderWidth = 1,
  loading,
  leftChildren,
  rightChildren,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: SIZES.fourteen,
          borderRadius: SIZES.eight,
          backgroundColor: type === 'filled' ? COLORS.primary : 'transparent',
          borderWidth: borderWidth || 1,
          borderColor: type === 'filled' ? 'transparent' : COLORS.primary,
          gap: SIZES.twelve,
          justifyContent: 'center',
          borderCurve: 'circular',
          minHeight: SIZES.fortySix,
          opacity: disabled ? 0.6 : 1,
        },
        wrapperStyle,
      ]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={
            type === 'outlined' ? COLORS.primary : COLORS.background?.[theme]
          }
        />
      ) : (
        <>
          {leftChildren}
          {text && (
            <CustomText
              fontFamily={FONTS.POPPINS_REGULAR}
              fontSize={FONT_SIZES.sixteen}
              color={type === 'filled' ? COLORS.text?.[theme] : COLORS.primary}
              style={textStyle}
            >
              {text}
            </CustomText>
          )}
          {rightChildren}
        </>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
