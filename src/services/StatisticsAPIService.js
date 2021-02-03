import { BASE_BE_URL } from '@constants/general.const';
import axios from 'axios';
import { getAuthToken } from '@utils/StorageUtils';

const baseAuthUrl = `${BASE_BE_URL}/statistics`;

export default {
  async getUserStatistics() {
    const headers = { Authorization: getAuthToken() };
    let response = null;

    try {
      response = await axios({
        method: 'get',
        baseURL: baseAuthUrl,
        url: '',
        headers,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  async postUserStatistic(userScore) {
    const headers = { Authorization: getAuthToken() };
    let response = null;

    try {
      response = await axios({
        method: 'post',
        baseURL: baseAuthUrl,
        url: '',
        data: { score: userScore },
        headers,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
