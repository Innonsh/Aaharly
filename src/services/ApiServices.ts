import config from '../utils/config'
import RestClient from './HttpClient';

export default class ApiServices {
    static async getProfile() {
        const res = await RestClient.get(`${config.BASE_URL}/profile`);
        return res.data;
    }
}
