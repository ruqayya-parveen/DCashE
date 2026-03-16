import { Text } from 'react-native';
import React from 'react';
import { FONTS } from '@/constants/fonts';
import { FONT_SIZES } from '@/constants/size';
import { useTheme } from '@/hooks/useTheme';
import { COLORS } from '@/constants';

const CustomText = ({
  children,
  style = {},
  fontFamily,
  fontSize,
  color,
  lineHeight,
  type = 'primary',
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <Text
      style={[
        {
          fontFamily: fontFamily ?? FONTS.POPPINS_REGULAR,
          fontSize: fontSize ?? FONT_SIZES.sixteen,
          color:
            color ??
            (type === 'primary'
              ? COLORS.text?.[theme]
              : COLORS.secondaryText?.[theme]),
          lineHeight:
            lineHeight ?? (fontSize ? fontSize * 1.25 : FONT_SIZES.twenty),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;
