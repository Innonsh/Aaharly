import axios, { AxiosInstance, AxiosResponse } from 'axios';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import config from '../utils/config';
import { store } from '../store';

class RestClient {
    private client: AxiosInstance;
    static headers: Record<string, string>;

    constructor() {
        RestClient.headers = {
            appVersion: DeviceInfo.getVersion(),
            buildNumber: DeviceInfo.getBuildNumber(),
            os: Platform.OS,
        };

        this.client = axios.create({
            baseURL: config.BASE_URL,
            headers: RestClient.headers
        });
    }

    getCommonHeaders() {
        const token = store.getState().auth.accessToken;
        return {
            Authorization: token ? `Bearer ${token}` : '',
        };
    }

    async get(path: string, headers?: object): Promise<AxiosResponse> {
        return this.client.get(path, {
            headers: { ...this.getCommonHeaders(), ...headers },
        });
    }

    async post(path: string, body: object, headers?: object): Promise<AxiosResponse> {
        return this.client.post(path, body, {
            headers: { ...this.getCommonHeaders(), ...headers },
        });
    }

    async put(path: string, body: object, headers?: object): Promise<AxiosResponse> {
        return this.client.put(path, body, {
            headers: { ...this.getCommonHeaders(), ...headers },
        });
    }

    async delete(path: string, body?: object, headers?: object): Promise<AxiosResponse> {
        return this.client.delete(path, {
            data: body,
            headers: { ...this.getCommonHeaders(), ...headers },
        });
    }
}

export default new RestClient();
