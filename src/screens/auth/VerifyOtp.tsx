/* eslint-disable react-native/no-inline-styles */
import BaseView from '@/components/BaseView';
import CustomHeader from '@/components/CustomHeader';
import CustomOtpInput from '@/components/CustomOtpInput';
import CustomText from '@/components/CustomText';
import {
  COLORS,
  FONT_SIZES,
  FONTS,
  RESEND_OTP_INTERVAL_IN_SECONDS,
  SIZES,
} from '@/constants';
import { useTheme } from '@/hooks/useTheme';
import { AuthScreensRouteList } from '@/types/navigationTypes';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Switch, ScrollView, Keyboard } from 'react-native';
// import OTPTextInput from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';

export default function VerifyOtp() {
  const route = useRoute<AuthScreensRouteList<'VerifyOtp'>>();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const phoneNumber = route.params?.phoneNumber;
  const [resendTime, setResendTime] = useState(RESEND_OTP_INTERVAL_IN_SECONDS);
  const [otp, setOpt] = useState('');
  const [isOtpValid, setIsOtpValid] = useState(true);
  const otpInput = useRef(null);

  const [whatsapp, setWhatsapp] = useState(true);

  useEffect(() => {
    if (resendTime === 0) return;
    const timeInterval = setInterval(() => {
      if (resendTime > 0) {
        setResendTime(resendTime - 1);
      } else {
        setResendTime(0);
      }
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [resendTime]);

  const handleOtpChange = (code: string) => {
    setOpt(code);
    if (code.length === 4) {
      console.log('OTP:', code);
      verifyOtp(code);
    }
  };

  const verifyOtp = (code: string) => {
    Keyboard.dismiss();
    if (code === '2222') {
      setIsOtpValid(true);
      console.log(code);
    } else {
      setIsOtpValid(false);
      Toast.show({
        type: 'customToast',
        text1: t('toastMessage.otpInvalid'),
        props: { msgType: 'error' },
        position: 'bottom',
      });
    }
  };

  const resendOtp = () => {
    setResendTime(RESEND_OTP_INTERVAL_IN_SECONDS);
    setOpt('');
    Toast.show({
      type: 'customToast',
      props: { msgType: 'success' },
      text1: t('toastMessage.optSentSuccessfully'),
      position: 'bottom',
    });
  };

  return (
    <BaseView removeTopPadding containerStyles={styles.container}>
      <CustomHeader title={t('auth.otpVerification')} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: SIZES.twenty }}>
        <CustomText fontSize={FONT_SIZES.twentyEight} style={styles.title}>
          {t('auth.letsVerifyYourNumber')}
        </CustomText>

        <CustomText fontSize={FONT_SIZES.fourteen} style={styles.subtitle}>
          {t('auth.weHaveSentaCode', { phoneNumber })}
        </CustomText>

        <CustomOtpInput
          ref={otpInput}
          inputCount={4}
          value={otp}
          error={!isOtpValid}
          onChange={handleOtpChange}
          containerStyle={{ justifyContent: 'center' }}
          textInputStyle={styles.otpBox}
          tintColor="#D8A96D"
          offTintColor="#444"
        />

        {resendTime ? (
          <CustomText fontSize={FONT_SIZES.fourteen} style={styles.timer}>
            {t('auth.youCanRequestOtpAgain', { seconds: resendTime })}
          </CustomText>
        ) : (
          <CustomText onPress={resendOtp} style={styles.timer}>
            {t('auth.didntReceiveOtp')}
            <CustomText> {t('auth.resendOtp')}</CustomText>
          </CustomText>
        )}

        <View style={styles.whatsappRow}>
          <CustomText
            fontSize={FONT_SIZES.fourteen}
            style={styles.whatsappText}
          >
            {t('auth.getUpdatesOverWhatsApp')}
          </CustomText>

          <Switch
            value={whatsapp}
            onValueChange={() => setWhatsapp(!whatsapp)}
            thumbColor={COLORS.text?.[theme]}
            trackColor={{
              false: COLORS.toggle.inactive,
              true: COLORS.toggle.active,
            }}
          />
        </View>
      </ScrollView>
    </BaseView>
  );
}

const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background?.[theme],
      //   padding: SIZES.twentyFour,
    },

    title: {
      fontFamily: FONTS.POPPINS_SEMI_BOLD,
      color: COLORS.text?.[theme],
      marginTop: SIZES.twenty,
    },

    subtitle: {
      color: COLORS.secondaryText?.[theme],
      marginTop: SIZES.ten,
      marginBottom: SIZES.forty,
    },

    otpBox: {
      width: SIZES.forty,
      height: SIZES.forty,
      borderWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#444',
      borderRadius: SIZES.four,
      color: '#fff',
      fontSize: FONT_SIZES.sixteen,
    },

    timer: {
      color: COLORS.secondaryText?.[theme],
      marginTop: 30,
      textAlign: 'center',
    },

    whatsappRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    },

    whatsappText: {
      color: '#fff',
    },
  });
