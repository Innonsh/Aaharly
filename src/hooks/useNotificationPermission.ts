import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';

export const requestNotificationPermission = async (): Promise<boolean> => {
    try {
        if (Platform.OS === "ios") {
            const authStatus = await messaging().requestPermission();
            const granted =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (granted) {
                await messaging().registerDeviceForRemoteMessages();
            }
            return granted;
        }

        if (Platform.OS === "android" && Platform.Version >= 33) {
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );

            const granted = result === PermissionsAndroid.RESULTS.GRANTED;
            if (granted) {
                await messaging().registerDeviceForRemoteMessages();
            }
            return granted;
        }

        await messaging().registerDeviceForRemoteMessages();
        return true;

    } catch (error) {
        return false;
    }
};

export const useNotificationPermission = () => {
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        const init = async () => {
            const hasPermission = await requestNotificationPermission();
            setPermissionGranted(hasPermission);
        };
        init();
    }, []);

    return permissionGranted;
};
