/* eslint-disable react-native/no-inline-styles */
import {
  StatusBar,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomText from './CustomText';
import { SIZES } from '@/constants/size';
import { useNavigation } from '@react-navigation/native';
import { FONTS } from '@/constants/fonts';
import { useTheme } from '@/hooks/useTheme';
import { COLORS } from '@/constants';

type Props = {
  leftChild?: ReactNode;
  rightChild?: ReactNode;
  bottomChild?: ReactNode;
  renderCustomTitleComponent?: ReactNode;
  title?: string;
  showBack?: boolean;
  showTitle?: boolean;
  leftOnPress?: () => void;
  customContainerStyles?: ViewStyle;
  customTextStyle?: TextStyle;
};

const CustomHeader: React.FC<Props> = ({
  leftChild,
  rightChild,
  bottomChild,
  renderCustomTitleComponent,
  title,
  showBack = true,
  showTitle = true,
  leftOnPress,
  customContainerStyles,
  customTextStyle,
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleLeftOnPress = () => {
    if (leftOnPress) {
      leftOnPress();
    } else {
      navigation.goBack();
    }
  };
  return (
    <View
      style={{
        paddingTop: insets.top + SIZES.ten,
        backgroundColor: COLORS.background?.[theme],
        elevation: 8,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: COLORS.secondaryBackground?.[theme],
        shadowOpacity: 0.1,
        zIndex: 99,
        shadowRadius: 10,
        ...customContainerStyles,
        // shadowColor: theme.colors.gray300
      }}
    >
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: SIZES.twelve,
          padding: SIZES.twenty,
          paddingTop: 0,
        }}
      >
        {showBack ? (
          leftChild ? (
            leftChild
          ) : (
            <TouchableOpacity hitSlop={20} onPress={handleLeftOnPress}>
              {/* <SVGS.arrowLeftGray/> */}
              <CustomText>Back</CustomText>
            </TouchableOpacity>
          )
        ) : (
          <View />
        )}
        {renderCustomTitleComponent ? (
          renderCustomTitleComponent
        ) : (
          <CustomText
            style={{ fontFamily: FONTS.POPPINS_REGULAR, ...customTextStyle }}
          >
            {showTitle ? title || 'HeaderTitle' : ''}
          </CustomText>
        )}
        {rightChild ? (
          rightChild
        ) : (
          <View style={{ height: SIZES.twentyFour, width: SIZES.twentyFour }} />
        )}
      </View>
      {bottomChild}
    </View>
  );
};

export default CustomHeader;
