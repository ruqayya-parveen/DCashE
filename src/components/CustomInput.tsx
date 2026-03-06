import { FONTS } from '@/constants/fonts';
import { SIZES } from '@/constants/size';
import React, { forwardRef, useMemo, useState } from 'react';
import {
  TextInputProps,
  StyleSheet,
  TextStyle,
  ViewStyle,
  View,
} from 'react-native';
import { TextInput, TextInputIconProps } from 'react-native-paper';
import { useTheme } from '@/hooks/useTheme';
import { COLORS } from '@/constants';
import { ColorValue } from 'react-native/types_generated/index';

interface CustomInputProps extends TextInputProps {
  label?: string;
  value?: string;
  outlineColor?: string;
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
  disabled?: boolean;
}

const CustomInput = forwardRef<TextInputIconProps, CustomInputProps>(
  (
    {
      label,
      value,
      inputStyle,
      outlineColor,
      activeOutlineColor,
      onChangeText,
      leftChild,
      rightChild,
      isPassword = false,
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
        style={{
          // backgroundColor: 'red',
          padding: SIZES.two,
          borderRadius: SIZES.eight,
        }}
      >
        <TextInput
          ref={ref}
          mode="outlined"
          label={label}
          editable={!disabled}
          left={leftChild}
          right={rightChild}
          outlineColor={outlineColor || COLORS.secondaryBackground?.[theme]}
          activeOutlineColor={
            activeOutlineColor || COLORS.secondaryText?.[theme]
          }
          textColor={COLORS.text?.[theme]}
          cursorColor={COLORS.primary as ColorValue}
          theme={{
            colors: {
              // onSurfaceVariant: 'green',
            },
          }}
          style={[
            styles.input,
            inputStyle,
            // {
            //   height: props.multiline ? SIZES.twoHundred : 'auto',
            //   textAlignVertical: 'top',
            // },
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
