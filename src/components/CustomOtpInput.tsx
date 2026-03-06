import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomInput from './CustomInput';
import { OTP_LENGTH, SIZES } from '@/constants';

interface CustomOtpInputProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
}

export default function CustomOtpInput({
  length = OTP_LENGTH,
  value,
  onChange,
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
          inputStyle={{ width: SIZES.forty, height: SIZES.forty }}
          keyboardType="number-pad"
          maxLength={1}
          value={value[index] || ''}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
});
