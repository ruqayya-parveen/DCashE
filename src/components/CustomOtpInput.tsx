import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomInput from './CustomInput';
import { OTP_LENGTH, SIZES } from '@/constants';

interface CustomOtpInputProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
  error?: boolean;
}

export default function CustomOtpInput({
  length = OTP_LENGTH,
  value,
  onChange,
  error
}: CustomOtpInputProps) {
  const inputs = useRef<(typeof CustomInput)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = value.split('');

    newOtp[index] = text;
    const updatedOtp = newOtp.join('');

    onChange(updatedOtp);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <CustomInput
          key={index}
          ref={ref => {
            if (ref) inputs.current[index] = ref;
          }}
          inputStyle={{
            ...styles.input,
          }}
          keyboardType="number-pad"
          maxLength={1}
          value={value[index] || ''}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          hasError={error}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.four,
  },

  input: {
    width: SIZES.fifty,
    height: SIZES.fifty,
    borderRadius: SIZES.eight,
    textAlign: 'left',
    paddingLeft: SIZES.four,
    fontSize: SIZES.eighteen,
    color: '#fff',
  },
});
