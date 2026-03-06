/* eslint-disable react-native/no-inline-styles */
import { FONTS } from '@/constants/fonts';
import { SIZES } from '@/constants/size';
import React, { forwardRef, useMemo, useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  TextStyle,
  ViewStyle,
  TextInput as RNTextInput,
  TouchableOpacity,
} from 'react-native';
import CustomText from './CustomText';
import { useTheme } from '@/hooks/useTheme';
import { COLORS } from '@/constants';

interface CustomInputProps extends TextInputProps {
  label?: string;
  value?: string;
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
  disabled?: boolean;
}

const CustomInput = forwardRef<RNTextInput, CustomInputProps>(
  (
    {
      label,
      value,
      onChangeText,
      leftChild,
      rightChild,
      containerStyle,
      parentWrapperStyle,
      inputStyle,
      labelStyle,
      hideLabel = true,
      hasError = false,
      error,
      isPassword = false,
      errorTextStyle,
      disabled = false,
      showCharCount = false,
      maxCharacters = 200,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const [showValue, setShowValue] = useState(false);
    // const [valueText, setValueText] = useState(value);

    return (
      <View
        style={[
          styles.wrapper,
          parentWrapperStyle,
          { opacity: disabled ? 0.6 : 1 },
        ]}
      >
        {/* Show label only if provided and not hidden */}
        {label && !hideLabel && (
          <CustomText style={[styles.label, labelStyle]}>{label}</CustomText>
        )}

        <View
          style={[
            styles.container,
            {
              borderColor: hasError
                ? COLORS.critical
                : COLORS.secondaryBackground?.[theme],
            },
            containerStyle,
          ]}
        >
          {leftChild && <View style={styles.sideChild}>{leftChild}</View>}

          <TextInput
            ref={ref}
            editable={!disabled}
            style={[
              styles.input,
              inputStyle,
              {
                height: props.multiline ? SIZES.twoHundred : 'auto',
                textAlignVertical: 'top',
              },
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
          {isPassword && (
            <TouchableOpacity
              hitSlop={20}
              onPress={() => setShowValue(!showValue)}
            >
              {showValue ? (
                // <SVGS.eyeOpen
                //   height={SIZES.twentyFour}
                //   width={SIZES.twentyFour}
                // />
                <View />
              ) : (
                // <SVGS.eyeClose
                //   height={SIZES.twentyFour}
                //   width={SIZES.twentyFour}
                // />
                <View />
              )}
            </TouchableOpacity>
          )}
          {rightChild && <View style={styles.sideChild}>{rightChild}</View>}
        </View>

        {showCharCount && (
          <CustomText style={{ textAlign: 'right' }}>
            {value?.length || 0}/{maxCharacters}
          </CustomText>
        )}

        {/* Error message */}
        {hasError && !!error && (
          <CustomText style={[styles.errorText, errorTextStyle]}>
            {error}
          </CustomText>
        )}
      </View>
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
      flex: 1,
      fontSize: SIZES.sixteen,
      color: COLORS.text?.[theme],
      fontFamily: FONTS.POPPINS_LIGHT,
      textAlignVertical: 'center',
      paddingVertical: SIZES.ten,
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
