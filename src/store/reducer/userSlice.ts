import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
    userId: string;
    basic?: {
        name: string;
        age: number;
        gender: 'male' | 'female' | 'other';
    };
    physicalStats?: {
        height: number;
        weight: number;
        activityLevel: string;
    };
    goalPref?: {
        weightGoal: string;
        dietType: string;
        allergies: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

interface UserState {
    data: UserProfile | null;
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
        setUserProfile: (state, action: PayloadAction<UserProfile | null>) => {
            state.data = action.payload;
            state.error = null;
        },
        updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
            if (state.data) {
                state.data = { ...state.data, ...action.payload };
            } else {
                // If data is null, initialize it with the payload
                // Note: userId might be missing here, we should ensure it exists or allowed to be missing
                state.data = action.payload as any;
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
