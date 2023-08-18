import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";


export const loginThunk = createAsyncThunk(
    "user/login",
    async (credentials, { rejectWithValue }) => {
      try {
        const user = await authService.login(credentials);
        return user;
      }
      catch (error) {
        return rejectWithValue(error.response.data);
      }

    }
);

export const profileThunk = createAsyncThunk(
    'auth/profile', async (userId, { rejectWithValue }) => {
      try {
        const response = await authService.profile();
        return response.data;
      } catch (error) {
        // Check if error.response and error.response.data exist, and if error.response.data contains a message property
        if (error.response && error.response.data && error.response.data.message) {
          return rejectWithValue(error.response.data); // Reject with the error message from the server
        } else {
          // If the error response does not have a message, reject with a generic message
          return rejectWithValue({ message: 'An error occurred while fetching the profile.' });
        }
      }
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout", async () => {
      return await authService.logout();
    });

export const updateUserThunk = createAsyncThunk(
    "user/updateUser",
    async (user, { rejectWithValue }) => {
      try {
        await authService.updateUser(user);
        return user;
      }
      catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          return rejectWithValue(error.response.data); // Reject with the error message from the server
        } else {
          // If the error response does not have a message, reject with a generic message
          return rejectWithValue({ message: 'An error occurred while updating the user.' });
        }
      }
    }
);

export const registerThunk = createAsyncThunk(
    "user/register",
    async (credentials, { rejectWithValue }) => {
      try {
        const user = await authService.register(credentials);
        return user;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          return rejectWithValue(error.response.data); // Reject with the error message from the server
        } else {
          // If the error response does not have a message, reject with a generic message
          return rejectWithValue({ message: 'An error occurred while registering the user.' });
        }
      }
    }
);

