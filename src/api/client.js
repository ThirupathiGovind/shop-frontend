import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  withCredentials: true,
  timeout: Number(process.env.REACT_APP_API_TIMEOUT || 15000),
});

api.interceptors.request.use((config) => {
  const userInfo = sessionStorage.getItem('userInfo');

  if (userInfo) {
    try {
      const { token } = JSON.parse(userInfo);
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      sessionStorage.removeItem('userInfo');
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.dispatchEvent(new Event('auth:expired'));
    }

    return Promise.reject(error);
  },
);

export const getApiError = (error) => {
  if (error.code === 'ECONNABORTED' || !error.response) {
    return 'Unable to reach the server. Check your connection and try again.';
  }

  return error.response.data && error.response.data.message
    ? error.response.data.message
    : 'Something went wrong. Please try again.';
};

export const createRequestController = () => new AbortController();

export default api;
