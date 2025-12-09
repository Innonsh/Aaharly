import config from '../utils/config'
import RestClient from './HttpClient';

export default class ApiServices {
    static async getProfile() {
        const res = await RestClient.get(`${config.BASE_URL}/user/profile`);
        return res.data;
    }
}
