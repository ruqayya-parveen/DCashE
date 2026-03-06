import { FONT_SIZES, FONTS } from '@/constants';
import Toast, { ToastType } from 'react-native-toast-message';

export const ToastMessage = ({
	message = '',
	title = 'Something went wrong',
	duration,
	type = 'error',
}: {
	message?: string;
	duration?: number;
	type?: ToastType;
	title: string;
}) => {
	Toast.show({
		type,
		text1: title,
		text2: message,
		visibilityTime: duration,
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
