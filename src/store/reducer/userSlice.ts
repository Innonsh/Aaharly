import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    userId: string;
    authUid?: string;
    name: string;
    email: string;
    phone?: string;
    photo?: string;
    loginMethod?: string;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    height?: number;
    weight?: number;
    activityLevel?: string;
    goal?: string;
}

interface UserState {
    data: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    data: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<User | null>) => {
            state.data = action.payload;
            state.error = null;
        },
        updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
            if (state.data) {
                state.data = { ...state.data, ...action.payload };
            }
        },
        clearUserProfile: (state) => {
            state.data = null;
            state.error = null;
        },
        setUserLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setUserError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    },
});

export const { setUserProfile, updateUserProfile, clearUserProfile, setUserLoading, setUserError } = userSlice.actions;

export default userSlice.reducer;
