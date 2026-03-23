import axios from 'axios';
import { getTimeZone } from 'react-native-localize';
import { storage } from '@/services/mmkv/storage';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { resetTo } from '@/utils/navigationUtils';

export const getCurrentTimezone = () => {
  const timezone = getTimeZone();
  console.log('get current timezone', timezone);
  return timezone;
};

const AxiosBase = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    timezone: getCurrentTimezone(),
  },
});
AxiosBase.interceptors.request.use(
  async config => {
    const token = storage.getString(STORAGE_KEYS.TOKEN);
    config.headers.token = token;
    // console.log(JSON.stringify(config), 'request data');
    console.log(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
AxiosBase.interceptors.response.use(
  response => {
    return response?.data;
  },
  async error => {
    const { response } = error;
    // console.log(JSON.stringify(response), 'response data');
    // console.log(response?.status, typeof response?.status, 'response status');
    if (response && response?.status === 401) {
      console.log('Unauthorized access, logging out user');
      storage.delete(STORAGE_KEYS.TOKEN);
      storage.delete(STORAGE_KEYS.USER_DATA);
        console.log('Resetting navigation to AuthNavigator');
        resetTo('Login');
    }
    return Promise.reject(error);
  },
);
export default AxiosBase;
