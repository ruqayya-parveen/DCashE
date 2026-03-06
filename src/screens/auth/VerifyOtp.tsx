/* eslint-disable react-native/no-inline-styles */
import BaseView from '@/components/BaseView';
import CustomHeader from '@/components/CustomHeader';
import CustomText from '@/components/CustomText';
import { COLORS, FONT_SIZES, FONTS, SIZES } from '@/constants';
import { useTheme } from '@/hooks/useTheme';
import { AuthScreensRouteList } from '@/types/navigationTypes';
import { useRoute } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Switch } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';

export default function VerifyOtp() {
  const route = useRoute<AuthScreensRouteList<'VerifyOtp'>>();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const phoneNumber = route.params?.phoneNumber;
  const otpInput = useRef(null);

  const [whatsapp, setWhatsapp] = useState(true);

  const handleOtpChange = (code: string) => {
    if (code.length === 4) {
      console.log('OTP:', code);
      verifyOtp(code);
    }
  };

  const verifyOtp = (code: string) => {
    console.log(code);
  };

  return (
    <BaseView removeTopPadding containerStyles={styles.container}>
      <CustomHeader title={t('auth.otpVerification')} />
      <View style={{ paddingHorizontal: SIZES.twenty }}>
        <CustomText fontSize={FONT_SIZES.twentyEight} style={styles.title}>
          {t('auth.letsVerifyYourNumber')}
        </CustomText>

        <CustomText fontSize={FONT_SIZES.fourteen} style={styles.subtitle}>
          {t('auth.weHaveSentaCode', { phoneNumber })}
        </CustomText>

        <OTPTextInput
          ref={otpInput}
          inputCount={4}
          handleTextChange={handleOtpChange}
          containerStyle={{ justifyContent: 'center' }}
          textInputStyle={styles.otpBox}
          tintColor="#D8A96D"
          offTintColor="#444"
        />

        <CustomText fontSize={FONT_SIZES.fourteen} style={styles.timer}>
          {t('auth.youCanRequestOtpAgain')}
        </CustomText>

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
      </View>
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
