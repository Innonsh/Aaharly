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
                const firebaseToken = await messaging().getToken();

                if (!firebaseToken) return;

                if (firebaseToken !== storedToken) {
                    await fcmMutation.mutateAsync(firebaseToken);
                    dispatch(saveFcmToken(firebaseToken));
                }
            } catch (error) {
            }
        };

        syncFcmToken();
    }, [dispatch, storedToken, fcmMutation]);
};
