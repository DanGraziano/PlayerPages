import { createSlice } from "@reduxjs/toolkit";
import {loginThunk, profileThunk, logoutThunk, updateUserThunk,registerThunk}
  from "../services/auth-thunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
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
    },

    [loginThunk.rejected]: (state, { payload, error }) => {
      state.errorMessage = payload.message;
    },

    [logoutThunk.fulfilled]: (state) => {
      state.currentUser = null;
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
    },

    [registerThunk.rejected]: (state, { payload }) => { // Add this block
      state.errorMessage = payload.message;
    }
  }
});

export const { resetRegistrationSuccess, resetLoginSuccess } = authSlice.actions;

export default authSlice.reducer;