import axios, { AxiosResponse } from 'axios';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import config from '../utils/config';
import { store } from '../store';

class RestClient {
    static headers: Record<string, string>;

    constructor() {
        RestClient.headers = {
            appVersion: DeviceInfo.getVersion(),
            buildNumber: DeviceInfo.getBuildNumber(),
            os: Platform.OS,
        };
    }

    getCommonHeaders() {
        const token = store.getState().auth.accessToken;
        return {
            ...RestClient.headers,
            Authorization: token ? `Bearer ${token}` : '',
        };
    }

    async get(path: string, headers?: object): Promise<AxiosResponse> {
        return axios.get(`${config.BASE_URL}${path}`, {
            headers: { ...this.getCommonHeaders(), ...headers },
        });
    }

    async post(path: string, body: object, headers?: object): Promise<AxiosResponse> {
        return axios.post(`${config.BASE_URL}${path}`, body, {
            headers: { ...this.getCommonHeaders(), ...headers },
        });
    }

    async put(path: string, body: object, headers?: object): Promise<AxiosResponse> {
        return axios.put(`${config.BASE_URL}${path}`, body, {
            headers: { ...this.getCommonHeaders(), ...headers },
        });
    }

    async delete(path: string, body?: object, headers?: object): Promise<AxiosResponse> {
        return axios.delete(`${config.BASE_URL}${path}`, {
            data: body,
            headers: { ...this.getCommonHeaders(), ...headers },
        });
    }
}

export default new RestClient();
