import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    AccountService,
    BasicProfilePayload,
    PhysicalStatsPayload,
    GoalPreferencesPayload,
} from "../services/AccountService";
import Toast from "react-native-toast-message";

const getErrorMessage = (error: any): string =>
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong";

export const useCreateAccount = () =>
    useMutation({
        mutationFn: AccountService.createAccount,
        onError: (error: any) => {
            console.error("Create Account Error:", error);
            Toast.show({
                type: "error",
                text1: "Account Creation Failed",
                text2: getErrorMessage(error),
            });
        },
    });


export const useProfile = () =>
    useQuery({
        queryKey: ["profile"],
        queryFn: AccountService.getProfile,
        staleTime: 1000 * 60 * 5,
    });

export const useProfileAnalysis = () =>
    useQuery({
        queryKey: ["profileAnalysis"],
        queryFn: AccountService.getProfileAnalysis,
        staleTime: 1000 * 60 * 5,
    });

export const useUpdateBasicProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: BasicProfilePayload) =>
            AccountService.updateBasicProfile(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            queryClient.invalidateQueries({ queryKey: ["profileAnalysis"] });
        },

        onError: (error: any) => {
            Toast.show({
                type: "error",
                text1: "Update Failed",
                text2: getErrorMessage(error),
            });
        },
    });
};

export const useUpdatePhysicalStats = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: PhysicalStatsPayload) =>
            AccountService.updatePhysicalStats(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            queryClient.invalidateQueries({ queryKey: ["profileAnalysis"] });
        },

        onError: (error: any) => {
            Toast.show({
                type: "error",
                text1: "Update Failed",
                text2: getErrorMessage(error),
            });
        },
    });
};

export const useUpdateGoalPreferences = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: GoalPreferencesPayload) =>
            AccountService.updateGoalPreferences(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            queryClient.invalidateQueries({ queryKey: ["profileAnalysis"] });
        },

        onError: (error: any) => {
            Toast.show({
                type: "error",
                text1: "Update Failed",
                text2: getErrorMessage(error),
            });
        },
    });
};

export const useUpdateFcmToken = () => {
    return useMutation({
        mutationFn: (fcmToken: string) =>
            AccountService.updateFcmToken(fcmToken),

        onSuccess: () => {
            console.log('[FCM] Token successfully synced to backend');
        },

        onError: (error: any) => {
            console.error('[FCM] Failed to sync token:', getErrorMessage(error));
        },
    });
};
