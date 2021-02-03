import { BASE_BE_URL } from '@constants/general.const';
import axios from 'axios';

const baseAuthUrl = `${BASE_BE_URL}/auth`;
import { setAuthToken } from '@utils/StorageUtils';

export default {
  async login(userName, password) {
    let response = null;

    try {
      response = await axios({
        method: 'post',
        baseURL: baseAuthUrl,
        url: '/login',
        data: { userName: userName, password: password },
      });
      setAuthToken(response.data.token);
      return response;
    } catch (error) {
      console.log('login error: ' + error);
      return error.response;
    }
  },
  async register(userName, password) {
    let response = null;

    try {
      response = await axios({
        method: 'post',
        baseURL: baseAuthUrl,
        url: '/register',
        data: { userName: userName, password: password },
      });
      setAuthToken(response.data.token);
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
