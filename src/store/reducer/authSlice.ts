import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  idToken: string | null;
  status: 'idle' | 'loading' | 'authenticated' | 'signed_out';
}

const initialState: AuthState = {
  accessToken: null,
  idToken: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSuccess: (
      state,
      action: PayloadAction<{ accessToken: string; idToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken;
      state.status = 'authenticated';
    },

    signOut(state) {
      state.accessToken = null;
      state.idToken = null;
      state.status = 'signed_out';
    },

    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload ? 'loading' : 'idle';
    },

    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
});

export const { signInSuccess, signOut, setAuthLoading, setAccessToken } =
  authSlice.actions;

export default authSlice.reducer;
