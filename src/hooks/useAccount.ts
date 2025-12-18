// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//     AccountService,
//     BasicProfilePayload,
//     PhysicalStatsPayload,
//     GoalPreferencesPayload
// } from "../services/AccountService";
// import Toast from "react-native-toast-message";

// /* ================= ACCOUNTOptions ================= */

// export const useCreateAccount = () =>
//     useMutation({
//         mutationFn: AccountService.createAccount,
//         onError: (error: any) => {
//             console.error("Create Account Error:", error);
//         }
//     });

// /* ================= PROFILE ================= */

// export const useProfile = () =>
//     useQuery({
//         queryKey: ["profile"],
//         queryFn: AccountService.getProfile,
//         staleTime: 1000 * 60 * 5, // 5 minutes
//     });

// export const useUpdateBasicProfile = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: AccountService.updateBasicProfile,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["profile"] });
//             Toast.show({ type: "success", text1: "Profile Updated" });
//         },
//         onError: (error: any) => {
//             Toast.show({ type: "error", text1: "Update Failed", text2: error.message });
//         }
//     });
// };

// export const useUpdatePhysicalStats = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: AccountService.updatePhysicalStats,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["profile"] });
//             Toast.show({ type: "success", text1: "Stats Updated" });
//         },
//         onError: (error: any) => {
//             Toast.show({ type: "error", text1: "Update Failed", text2: error.message });
//         }
//     });
// };

// export const useUpdateGoalPreferences = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: AccountService.updateGoalPreferences,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["profile"] });
//             Toast.show({ type: "success", text1: "Goals Updated" });
//         },
//         onError: (error: any) => {
//             Toast.show({ type: "error", text1: "Update Failed", text2: error.message });
//         }
//     });
// };
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    AccountService,
    BasicProfilePayload,
    PhysicalStatsPayload,
    GoalPreferencesPayload,
} from "../services/AccountService";
import Toast from "react-native-toast-message";

/* ================= UTIL ================= */

const getErrorMessage = (error: any): string =>
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong";

/* ================= ACCOUNT ================= */

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

/* ================= PROFILE ================= */

export const useProfile = () =>
    useQuery({
        queryKey: ["profile"],
        queryFn: AccountService.getProfile,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

export const useUpdateBasicProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: BasicProfilePayload) =>
            AccountService.updateBasicProfile(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            Toast.show({
                type: "success",
                text1: "Profile Updated",
            });
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
            Toast.show({
                type: "success",
                text1: "Stats Updated",
            });
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
            Toast.show({
                type: "success",
                text1: "Goals Updated",
            });
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
