import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV();

export const storage = {
    setItem: (key: string, value: string) => {
        mmkv.set(key, value);
        return Promise.resolve(true);
    },
    getItem: (key: string) => {
        const value = mmkv.getString(key);
        return Promise.resolve(value);
    },
    removeItem: (key: string) => {
        mmkv.delete(key);
        return Promise.resolve();
    },
};
