import axios, { AxiosInstance, AxiosResponse } from 'axios';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import config from '../utils/config';
import { store } from '../store';

class RestClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: config.BASE_URL,
            headers: {
                appVersion: DeviceInfo.getVersion(),
                buildNumber: DeviceInfo.getBuildNumber(),
                os: Platform.OS,
                'Content-Type': 'application/json',
            },
        });

        // Attach token ONLY if it exists (fixes "Missing token")
        this.client.interceptors.request.use(request => {
            const token = store.getState().auth.accessToken;

            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }

            console.log(
                `[HTTP] Request: ${request.method?.toUpperCase()} ${request.url}`,
                `\n[HTTP] Auth Header: ${request.headers.Authorization ? 'PRESENT' : 'MISSING'}`,
                request.data ? JSON.stringify(request.data) : ''
            );

            return request;
        });

        // Response + Error logging (unchanged)
        this.client.interceptors.response.use(
            response => {
                console.log(
                    `[HTTP] Response: ${response.status} ${response.config.url}`,
                    JSON.stringify(response.data)
                );
                return response;
            },
            error => {
                const status = error.response?.status;
                const data = error.response?.data;
                const url = error.config?.url;

                // Handle HTML error pages (e.g. ngrok or server default 404s)
                const isHtml = typeof data === 'string' && data.trim().startsWith('<!DOCTYPE html>');
                const errorMessage = isHtml
                    ? `HTML Error ${status}: Target endpoint not found or server error.`
                    : data ? JSON.stringify(data) : error.message;

                // CLEAN CONSOLE: Don't log full error for expected 404s (like missing profile on first login)
                if (status === 404 && url?.includes('/profile')) {
                    console.log(`[HTTP] Info: Profile not yet created (404 ${url})`);
                } else {
                    console.error(
                        `[HTTP] Error: ${status} ${url}`,
                        errorMessage
                    );
                }
                return Promise.reject(error);
            }
        );
    }

    async get(path: string, headers?: object): Promise<AxiosResponse> {
        return this.client.get(path, { headers });
    }

    async post(path: string, body: object, headers?: object): Promise<AxiosResponse> {
        return this.client.post(path, body, { headers });
    }

    async put(path: string, body: object, headers?: object): Promise<AxiosResponse> {
        return this.client.put(path, body, { headers });
    }

    async delete(path: string, body?: object, headers?: object): Promise<AxiosResponse> {
        return this.client.delete(path, {
            data: body,
            headers,
        });
    }
}

export default new RestClient();
