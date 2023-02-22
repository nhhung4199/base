import axios from 'axios';
import Config from 'react-native-config';
import store from 'state-management/store';
import TokenProvider from 'utilities/authencaticate/TokenProvider';
const DEFAULT_ERROR_MESSAGE = 'Unknown Error';
const request = axios.create({
  baseURL: Config.API_URL,
  timeout: 8000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
// for multiple requests
request.interceptors.request.use(
  async (config: any) => {
    const token = await TokenProvider.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    // Do something with api error
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  async (error: any) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const {response} = error || {};
    const {data} = response || {};
    const {message, status} = data || {};
    if (status === 401 || response?.status === 401) {
      const accessToken = store.getState()?.userReducer?.accessToken;
      if (accessToken) {
        TokenProvider.logOut();
      }
      return Promise.reject({
        message: 'Token_Expired',
      });
    }
    if (message === 'RefreshToken_NotExist') {
      // logout here

      return Promise.reject(error);
    }
    if (error.message === 'Network Error') {
      return Promise.reject({
        message: 'Network Error',
      });
    }

    error.message = message || DEFAULT_ERROR_MESSAGE;
    error.code = status || '';
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({message: error.message, code: error.code});
  },
);

export default request;
