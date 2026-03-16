import i18next, {  } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/translations/locales/en.json';
import hi from '@/translations/locales/hi.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { storage } from '@/utils';

const STORE_LANGUAGE_KEY = 'settings.lang';

const resources = {
	en: { translation: en },
	hi: {translation: hi}
};

const languageDetectorPlugin = {
	type: 'languageDetector',
	async: true,
	init: () => {},
	detect: async (callback) => {
		try{
		 await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
                if(language) callback(language);
                else return callback('en');
            });
        }catch (error){
            console.log("Error while reading language", error);
        }
	},
	cacheUserLanguage: async (lang)=>{
        try {
            await AsyncStorage.setItem(STORE_LANGUAGE_KEY, lang);
        }catch(error){
            console.log('Unable to cache the user language, ', error);
            
        }
    },
};

i18next
	.use(initReactI18next)
	.use(languageDetectorPlugin)
	.init({
		resources,
		lng: 'en',
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18next;
