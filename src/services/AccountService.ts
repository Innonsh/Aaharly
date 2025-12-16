import { AxiosResponse } from "axios";
import HttpClient from "./HttpClient";

export interface CreateAccountPayload {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    loginMethod: 'phone' | 'google' | 'email';
}
export interface BasicProfilePayload {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
}

export interface PhysicalStatsPayload {
    height: number;
    weight: number;
    activityLevel: 'sedentary' | 'active' | 'moderate' | 'high';
}

export interface GoalPreferencesPayload {
    goal: string;
    targetWeight?: number;
    weeklyGoal?: string;
}

export const AccountService = {
    createAccount: async (payload: CreateAccountPayload): Promise<void> => {
        const response = await HttpClient.post('/account/new', payload);
    },
    getAccount: async (): Promise<AxiosResponse> => {
        return await HttpClient.get('/account');
    },
    updateBasicProfile: async (payload: BasicProfilePayload): Promise<void> => {
        await HttpClient.post('/profile/basic', payload);
    },
    updatePhysicalStats: async (payload: PhysicalStatsPayload): Promise<void> => {
        await HttpClient.post('/profile/physical-stats', payload);
    },
    updateGoalPreferences: async (payload: GoalPreferencesPayload): Promise<void> => {
        await HttpClient.post('/profile/goal-pref', payload);
    },
};


