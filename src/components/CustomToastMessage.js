import { FONT_SIZES, FONTS } from '@/constants';
import { useTheme } from '@/hooks/useTheme';
import Toast from 'react-native-toast-message';

const DEFAULT_DURATION = 3000; 
const DEFAULT_TYPE = 'success';
const DEFAULT_TITLE = 'Success';

export const ToastMessage = ({
  message = '',
  title = DEFAULT_TITLE,
  duration = DEFAULT_DURATION,
  type = DEFAULT_TYPE,
  customIcon = null, 
}) => {
	const {theme} = useTheme();

  Toast.show({
    type: 'customToast',
    text1: title,
    text2: message,
    visibilityTime: duration,
    props: {
      msgType: type,
      customIcon, 
	  theme,
    },
    text1Style: {
      fontFamily: FONTS.POPPINS_REGULAR,
      fontSize: FONT_SIZES.fourteen,
    },
    text2Style: {
      fontFamily: FONTS.POPPINS_REGULAR,
      fontSize: FONT_SIZES.twelve,
    },
  });
};