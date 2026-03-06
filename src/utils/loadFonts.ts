// import { FONTS } from '@/constants';

// export const loadFonts = async ({
// 	onFontLoaded = () => {},
// 	onError = () => {},
// }: {
// 	onFontLoaded?: () => void;
// 	onError?: (error: Error) => void;
// } = {}) => {
// 	try {
// 		await Font.loadAsync({
// 			[FONTS.ROBOTO_MEDIUM]: require('@/assets/fonts/Roboto-Medium.ttf'),
// 			[FONTS.DM_SANS_MEDIUM]: require('@/assets/fonts/DMSans-Medium.ttf'),
// 			[FONTS.ROBOTO_LIGHT]: require('@/assets/fonts/Roboto-Light.ttf'),
// 			[FONTS.ROBOTO_CONDENSED_THIN]: require('@/assets/fonts/RobotoCondensed-Thin.ttf'),
// 			[FONTS.ROBOTO_CONDENSED_BOLD]: require('@/assets/fonts/RobotoCondensed-Bold.ttf'),
// 			[FONTS.ROBOTO_CONDENSED_LIGHT]: require('@/assets/fonts/RobotoCondensed-Light.ttf'),
// 			[FONTS.ROBOTO_REGULAR]: require('@/assets/fonts/Roboto-Regular.ttf'),
// 			[FONTS.BEBAS_NEUE_REGULAR]: require('@/assets/fonts/BebasNeue-Regular.ttf'),
// 			[FONTS.ROBOTO_CONDENSED_SEMI_BOLD]: require('@/assets/fonts/RobotoCondensed-SemiBold.ttf'),
// 			[FONTS.ROBOTO_CONDENSED_MEDIUM]: require('@/assets/fonts/RobotoCondensed-Medium.ttf'),
// 			[FONTS.ROBOTO_CONDENSED_REGULAR]: require('@/assets/fonts/RobotoCondensed-Regular.ttf'),
// 			[FONTS.ROBOTO_EXTRA_BOLD]: require('@/assets/fonts/Roboto-ExtraBold.ttf'),
// 			[FONTS.ROBOTO_CONDENSED_EXTRA_BOLD]: require('@/assets/fonts/RobotoCondensed-ExtraBold.ttf'),
// 			[FONTS.ROBOTO_SEMI_BOLD]: require('@/assets/fonts/Roboto-SemiBold.ttf'),
// 			[FONTS.ROBOTO_BOLD]: require('@/assets/fonts/Roboto-Bold.ttf'),
// 			[FONTS.ROBOTO_THIN]: require('@/assets/fonts/Roboto-Thin.ttf'),
// 		});
// 		onFontLoaded();
// 	} catch (error) {
// 		console.log(error);
// 		onError(error as Error);
// 	}
// };
