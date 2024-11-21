import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserProfile } from '../types';

const initialState: UserState = {
  profile: {
    name: '',
    trainingPlan: '',
  },
  isLoading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk<UserProfile>(
  'user/fetchProfile',
  async () => {
    const response = await fetch('/api/profile');
    return response.json();
  }
);

export const updateUserProfile = createAsyncThunk<UserProfile, UserProfile>(
  'user/updateProfile',
  async (profile: UserProfile) => {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state: UserState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state: UserState, action: PayloadAction<UserProfile>) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      .addCase(updateUserProfile.pending, (state: UserState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state: UserState, action: PayloadAction<UserProfile>) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update profile';
      });
  },
});

export default userSlice.reducer; 