import { useQuery } from '@tanstack/react-query';
import { AccountService, ProfileAnalysisData } from '../services/AccountService';

export const useProfileAnalysis = () => {
    return useQuery<ProfileAnalysisData>({
        queryKey: ['profileAnalysis'],
        queryFn: AccountService.getProfileAnalysis,
        retry: false,
    });
};

