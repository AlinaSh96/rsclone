import {BASE_BE_URL} from '@constants/general.const';
import axios from 'axios';
import {setAuthToken} from '@utils/StorageUtils';

const baseAuthUrl = `${BASE_BE_URL}/auth`;

export default {
  async login(userName, password) {
    let response = null;

    try {
      response = await axios({
        method: 'post',
        baseURL: baseAuthUrl,
        url: '/login',
        data: {userName, password},
      });
      setAuthToken(response.data.token);
      return response;
    } catch (error) {
      console.log(`login error: ${error}`);
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
        data: {userName, password},
      });
      setAuthToken(response.data.token);
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
