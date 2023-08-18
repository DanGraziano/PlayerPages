import { createSlice } from "@reduxjs/toolkit";
import {loginThunk, profileThunk, logoutThunk, updateUserThunk,registerThunk}
  from "../services/auth-thunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    currentUser: null,
    errorMessage: null,
    registrationSuccess: false,
    loginSuccess: false,
  },
  reducers: {
    resetRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
    resetLoginSuccess: (state) => {
      state.loginSuccess = false;
    }
  },
  extraReducers: {
    [loginThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      state.errorMessage = null;
      state.loginSuccess = true;
      state.isLoggedIn = true;
    },

    [loginThunk.rejected]: (state, { payload, error }) => {
      state.errorMessage = payload.message;
      state.isLoggedIn = false;
    },

    [logoutThunk.fulfilled]: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },

    [profileThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },

    [profileThunk.rejected]: (state, { payload }) => {
      state.currentUser = null;
      state.errorMessage = payload.message;
    },

    [profileThunk.pending]: (state, action) => {
      state.currentUser = null;
    },

    [updateUserThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },

    [updateUserThunk.rejected]: (state, { payload }) => {
      state.errorMessage = payload.message;
    },

    [registerThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      state.registrationSuccess = true;
      state.errorMessage = '';
      state.isLoggedIn = false;
    },

    [registerThunk.rejected]: (state, { payload }) => { // Add this block
      state.errorMessage = payload.message;
      state.isLoggedIn = false;
    }
  }
});

export const { resetRegistrationSuccess, resetLoginSuccess } = authSlice.actions;

export default authSlice.reducer;