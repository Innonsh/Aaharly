import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import api from '../services/HttpClient';
import { saveFcmToken, selectFcmTokenFromStore } from '../store/reducer/userSlice';

export const useFcmTokenSync = () => {
    const dispatch = useDispatch();
    const storedToken = useSelector(selectFcmTokenFromStore);

    useEffect(() => {
        const syncFcmToken = async () => {
            console.log('[FCM] Starting token sync...');
            const firebaseToken = await messaging().getToken();
            console.log('[FCM] Firebase token:', firebaseToken ? 'Retrieved' : 'Not available');
            console.log('[FCM] Stored token:', storedToken ? 'Exists' : 'Not found');

            if (!firebaseToken) return;

            if (firebaseToken !== storedToken) {
                console.log('[FCM] Token changed. Calling API: POST /account/fcm-token');
                console.log('[FCM] Request body:', JSON.stringify({ fcmToken: firebaseToken }));

                await api.post("/account/fcm-token", {
                    fcmToken: firebaseToken
                });

                console.log('[FCM] Token successfully synced to backend');
                dispatch(saveFcmToken(firebaseToken));
                console.log('[FCM] Token saved to Redux store');
            } else {
                console.log('[FCM] Token unchanged. Skipping API call.');
            }
        };

        syncFcmToken();
    }, [dispatch, storedToken]);
};
