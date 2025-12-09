import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  idToken: string | null;
  user: User | null;
  status: 'idle' | 'loading' | 'authenticated' | 'signed_out';
}

const initialState: AuthState = {
  accessToken: null,
  idToken: null,
  user: null,
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

    setUserProfile: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    signOut(state) {
      state.accessToken = null;
      state.idToken = null;
      state.user = null;
      state.status = 'signed_out';
    },

    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload ? 'loading' : 'idle';
    },
  },
});

export const { signInSuccess, setUserProfile, signOut, setAuthLoading } =
  authSlice.actions;

export default authSlice.reducer;
