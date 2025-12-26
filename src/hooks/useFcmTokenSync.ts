import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { saveFcmToken, selectFcmTokenFromStore } from '../store/reducer/userSlice';
import { useUpdateFcmToken } from './useAccount';

export const useFcmTokenSync = () => {
    const dispatch = useDispatch();
    const storedToken = useSelector(selectFcmTokenFromStore);
    const fcmMutation = useUpdateFcmToken();

    useEffect(() => {
        const syncFcmToken = async () => {
            try {
                console.log('[FCM] Starting token sync...');
                const firebaseToken = await messaging().getToken();
                console.log('[FCM] Firebase token:', firebaseToken ? 'Retrieved' : 'Not available');
                console.log('[FCM] Stored token:', storedToken ? 'Exists' : 'Not found');

                if (!firebaseToken) return;

                if (firebaseToken !== storedToken) {
                    console.log('[FCM] Token changed. Calling API: POST /account/fcm-token');
                    console.log('[FCM] Request body:', JSON.stringify({ fcmToken: firebaseToken }));

                    // Use mutation - onSuccess will be called only if API succeeds
                    await fcmMutation.mutateAsync(firebaseToken);

                    // Only update local state after successful API call
                    dispatch(saveFcmToken(firebaseToken));
                    console.log('[FCM] Token saved to Redux store');
                } else {
                    console.log('[FCM] Token unchanged. Skipping API call.');
                }
            } catch (error) {
                console.error('[FCM] Error syncing token:', error);
            }
        };

        syncFcmToken();
    }, [dispatch, storedToken, fcmMutation]);
};
