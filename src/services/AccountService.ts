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
    createAccount: async (payload: CreateAccountPayload): Promise<any> => {
        const response = await HttpClient.post('/account/new', payload);
        return response.data;
    },
    getAccount: async (): Promise<AxiosResponse> => {
        return await HttpClient.get('/account');
    },
    getProfile: async () => {
        const response = await HttpClient.get('/profile');
        return response.data;
    },
    updateBasicProfile: async (payload: BasicProfilePayload): Promise<any> => {
        const response = await HttpClient.post('/profile/basic', payload);
        return response.data;
    },
    updatePhysicalStats: async (payload: PhysicalStatsPayload): Promise<any> => {
        const response = await HttpClient.post('/profile/physical-stats', payload);
        return response.data;
    },
    updateGoalPreferences: async (payload: GoalPreferencesPayload): Promise<any> => {
        const response = await HttpClient.post('/profile/goal-pref', payload);
        return response.data;
    },
};


