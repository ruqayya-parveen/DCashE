import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosBase from '@/services/api/axiosBase';
import { storage } from '@/services/mmkv/storage';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { API_PATHS } from '@/constants/apiPaths';

export const loginUser = createAsyncThunk(
  API_PATHS.login,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await AxiosBase.post(API_PATHS.login, {
        email,
        password,
      });

      const { user, token } = response;

      storage.set(STORAGE_KEYS.TOKEN, token);
      storage.set(STORAGE_KEYS.USER_DATA, JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Login failed',
        status: error.response?.status,
      });
    }
  },
);

export const registerUser = createAsyncThunk(
  API_PATHS.register,
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await AxiosBase.post(API_PATHS.register, {
        email,
        password,
        name,
      });

      const { user, token } = response;

      storage.set(STORAGE_KEYS.TOKEN, token);
      storage.set(STORAGE_KEYS.USER_DATA, JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Registration failed',
        status: error.response?.status,
      });
    }
  },
);

export const logoutUser = createAsyncThunk(
  API_PATHS.logout,
  async (_, { rejectWithValue }) => {
    try {
      await AxiosBase.post(API_PATHS.logout, {});

      storage.delete(STORAGE_KEYS.TOKEN);
      storage.delete(STORAGE_KEYS.USER_DATA);

      return null;
    } catch (error) {
      storage.delete(STORAGE_KEYS.TOKEN);
      storage.delete(STORAGE_KEYS.USER_DATA);

      return rejectWithValue({
        message: 'Logout failed but cleared local data',
      });
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  API_PATHS.getUserProfile,
  async (_, { rejectWithValue }) => {
    try {
      const token = storage.getString(STORAGE_KEYS.TOKEN);

      if (!token) {
        return null;
      }
      const response = await AxiosBase.get(API_PATHS.getUserProfile);
      return response;
    } catch (error) {
      storage.delete(STORAGE_KEYS.TOKEN);
      storage.delete(STORAGE_KEYS.USER_DATA);
      return null;
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  API_PATHS.updateUserProfile,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await AxiosBase.put(
        API_PATHS.updateUserProfile,
        userData,
      );
      storage.set(STORAGE_KEYS.USER_DATA, JSON.stringify(response));

      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Update failed',
      });
    }
  },
);
