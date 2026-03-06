/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { AuthScreensParamList } from '@/types/navigationTypes';
import { COLORS, FONT_SIZES, FONTS, SIZES } from '@/constants';
import BaseView from '@/components/BaseView';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import CustomInput from '@/components/CustomInput';
import CustomText from '@/components/CustomText';
import CustomButton from '@/components/CustomButton';
import Toast from 'react-native-toast-message';

const phoneRegex = /^[6-9]\d{9}$/;

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegex, 'Enter valid mobile number')
    .required('Mobile number is required'),
});

export default function Login() {
  const navigation = useNavigation<AuthScreensParamList<'Login'>>();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const onSubmit = values => {
    navigation.navigate('VerifyOtp', { phoneNumber: values.phone });
    Toast.show({
      type: 'customToast',
      text1: 'Verification code sent',
      text2: 'Verification code successfully sent to your phone number',
      position: 'bottom',
      visibilityTime: 10000,
      props: { msgType: 'success' },
    });
  };

  return (
    <BaseView containerStyles={styles.container}>
      <View style={styles.inner}>
        <CustomText style={styles.title}>{t('auth.welcome')}</CustomText>
        <CustomText style={styles.subtitle}>
          {t('auth.getStartedSecurely')}
        </CustomText>

        <Formik
          initialValues={{ phone: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
              <View>
                <CustomInput
                  placeholder={t('auth.mobileNumber')}
                  keyboardType="number-pad"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                />

                {touched.phone && errors.phone && (
                  <Text style={styles.error}>{errors.phone}</Text>
                )}
              </View>

              <CustomButton text={t('auth.getOtp')} onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    </BaseView>
  );
}

const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background?.[theme],
    },

    inner: {
      padding: SIZES.twentyFour,
      gap: SIZES.eight,
      flex: 1,
    },

    formContainer: {
      justifyContent: 'space-between',
      flex: 1,
    },

    title: {
      fontSize: SIZES.thirtyTwo,
      color: COLORS.text?.[theme],
      marginTop: SIZES.forty,
      fontFamily: FONTS.POPPINS_BOLD,
    },

    subtitle: {
      fontSize: FONT_SIZES.sixteen,
      color: COLORS.secondaryText?.[theme],
      marginTop: SIZES.six,
      marginBottom: SIZES.forty,
    },

    error: {
      color: COLORS.critical,
      marginTop: SIZES.six,
    },

    button: {
      backgroundColor: COLORS?.primary,
      padding: SIZES.eighteen,
      borderRadius: SIZES.twelve,
      alignItems: 'center',
      marginTop: SIZES.forty,
    },

    buttonText: {
      fontSize: SIZES.sixteen,
    },
  });
