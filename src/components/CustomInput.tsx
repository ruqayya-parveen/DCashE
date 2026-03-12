/* eslint-disable react-native/no-inline-styles */
import { FONTS } from '@/constants/fonts';
import { SIZES } from '@/constants/size';
import React, { forwardRef, useMemo, useState } from 'react';
import { TextInputProps, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { TextInput, TextInputIconProps } from 'react-native-paper';
import { useTheme } from '@/hooks/useTheme';
import { COLORS } from '@/constants';
import CustomText from './CustomText';
import GradientBorderWrapper from './GlowGradientWrapper';

interface CustomInputProps extends TextInputProps {
  label?: string;
  value?: string;
  outlineColor?: string;
  borderRadius?: number;
  activeOutlineColor?: string;
  onChangeText?: (text: string) => void;
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
  containerStyle?: ViewStyle;
  parentWrapperStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  hideLabel?: boolean;
  isPassword?: boolean;
  showCharCount?: boolean;
  maxCharacters?: number;
  /** Error handling props */
  hasError?: boolean;
  error?: string;
  errorTextStyle?: TextStyle;
}

const CustomInput = forwardRef<TextInputIconProps, CustomInputProps>(
  (
    {
      label,
      value,
      inputStyle,
      outlineColor,
      borderRadius,
      activeOutlineColor,
      onChangeText,
      leftChild,
      rightChild,
      isPassword = false,
      showCharCount = false,
      maxCharacters = 200,
      hasError,
      // error,
      // errorTextStyle,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const [showValue, setShowValue] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    // const [valueText, setValueText] = useState(value)

    return (
      <GradientBorderWrapper
        focused={isFocused}
        error={hasError}
        colors={{
          background: COLORS.background?.[theme],
          solidError: COLORS.critical,
          solidNormal: COLORS.secondaryBackground?.[theme],
          gradientPrimary: COLORS.primary,
          gradientSecondary: COLORS.border?.[theme],
        }}
      >
        <TextInput
          ref={ref}
          mode="outlined"
          label={
            label && (
              <CustomText
                style={{
                  backgroundColor: COLORS.background?.[theme],
                  // paddingHorizontal: SIZES.twenty,
                  // marginHorizontal: SIZES.twenty,
                }}
              >
                {label}
              </CustomText>
            )
          }
          left={leftChild}
          right={rightChild}
          outlineColor={outlineColor || COLORS.secondaryBackground?.[theme]}
          activeOutlineColor={activeOutlineColor || COLORS.border?.[theme]}
          outlineStyle={{
            borderColor: COLORS.transparent,
            outlineColor: COLORS.transparent,
          }}
          textColor={COLORS.text?.[theme]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          cursorColor={COLORS.primary as ColorValue}
          theme={{
            colors: {
              // onSurfaceVariant: 'green',
              background: COLORS.background?.[theme],
            },
          }}
          style={[
            styles.input,
            {
              // height: props.multiline ? SIZES.twoHundred : 'auto',
              // textAlignVertical: 'top',
              borderRadius: borderRadius,
              backgroundColor: COLORS.background?.[theme],
              marginTop: label ? -SIZES.six : 0,
            },
            inputStyle,
          ]}
          placeholderTextColor={COLORS.secondaryText?.[theme]}
          value={value}
          maxLength={maxCharacters}
          secureTextEntry={isPassword && !showValue}
          onChangeText={val => {
            if (showCharCount && (val?.length ?? 0) > maxCharacters) {
              return;
            }
            onChangeText ? onChangeText(val) : console.log(val);
          }}
          {...props}
        />
      </GradientBorderWrapper>
    );
  },
);

export default CustomInput;

const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    wrapper: {
      // width: '100%',
      gap: SIZES.six,
    },
    label: {
      fontSize: SIZES.sixteen,
      color: COLORS.text?.[theme],
      fontFamily: FONTS.POPPINS_SEMI_BOLD,
      paddingLeft: SIZES.four,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: SIZES.ten,
      paddingHorizontal: SIZES.ten,
      minHeight: SIZES.fortyEight,
      backgroundColor: COLORS.background?.[theme],
    },
    input: {
      // flex: 1,
      fontSize: SIZES.sixteen,
      color: COLORS.text?.[theme],
      fontFamily: FONTS.POPPINS_LIGHT,
      textAlignVertical: 'center',
      borderRadius: SIZES.fourteen,
      backgroundColor: COLORS.background?.[theme],
    },
    sideChild: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: COLORS.critical,
      fontSize: SIZES.twelve,
      marginLeft: SIZES.four,
      marginTop: 2,
    },
  });
