import axios from 'axios';
const DEFAULT_ERROR_MESSAGE = 'Unknown Error';
const request = axios.create({
  baseURL: '',
  timeout: 8000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
request.interceptors.request.use(
  async (config: any) => {
    const token = null;
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
    const {response} = error || {};
    const {data} = response || {};
    const {message, code} = data || {};
    if (code === 401) {
      return Promise.reject({
        message: 'Token_Expired',
      });
    }
    error.message = message || DEFAULT_ERROR_MESSAGE;
    error.code = code || '';
    return Promise.reject({message: error.message, code: error.code});
  },
);

export default request;
