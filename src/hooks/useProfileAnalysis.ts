import { useQuery } from '@tanstack/react-query';
import HttpClient from '../services/HttpClient';

export const useProfileAnalysis = () => {
    return useQuery({
        queryKey: ['profileAnalysis'],
        queryFn: async () => {
            console.log('Calling /profile/analysis API');

            const response = await HttpClient.get('/profile/analysis');

            console.log(' /profile/analysis response:', response.data);


            return response.data;
        },
        retry: false,
    });
};
