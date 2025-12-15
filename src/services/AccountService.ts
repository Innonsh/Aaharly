import { AxiosResponse } from "axios";
import HttpClient from "./HttpClient";

export const AccountService = {
    createAccount: async (payload: any): Promise<AxiosResponse> => {
        return await HttpClient.post('/account/new', payload);
    },
};
