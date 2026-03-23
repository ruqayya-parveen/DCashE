import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  updateUserProfile,
} from '@/store/thunks/authThunks';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isLoginLoading: false,
  isRegisterLoading: false,
  isUpdateLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    clearError: state => {
      state.error = null;
    },
    resetAuth: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoginLoading = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload?.message || 'Login failed';
      });

    builder
      .addCase(registerUser.pending, state => {
        state.isRegisterLoading = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegisterLoading = false;
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRegisterLoading = false;
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload?.message || 'Registration failed';
      });

    builder
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Logout failed';
        state.user = null;
        state.isAuthenticated = false;
      });

    builder
      .addCase(getCurrentUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });

    builder
      .addCase(updateUserProfile.pending, state => {
        state.isUpdateLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isUpdateLoading = false;
        state.error = action.payload?.message || 'Update failed';
      });
  },
});

export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
