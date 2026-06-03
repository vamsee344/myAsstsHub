import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from '../store/auth.store';

const api = axios.create({
  baseURL: 'https://myassetshub.com',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: inject token and log request details
api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    // secure store fails dynamically on older nodes/emulators
  }

  console.log('[API] Request:', {
    method: config.method,
    baseURL: config.baseURL,
    url: config.url,
    params: config.params,
    data: config.data,
    authorization: config.headers?.Authorization,
    headers: config.headers,
  });

  return config;
});

// Response interceptor: handle 401 → logout and log responses/errors
api.interceptors.response.use(
  (res) => {
    console.log('[API] Response:', {
      status: res.status,
      statusText: res.statusText,
      url: res.config?.url,
      data: res.data,
      headers: res.headers,
    });
    return res;
  },
  async (error) => {
    if (error.response) {
      console.log('[API] Response error:', {
        status: error.response.status,
        baseURL: error.config?.baseURL,
        url: error.config?.url,
        method: error.config?.method,
        authorization: error.config?.headers?.Authorization,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else {
      console.log('[API] Network/Error:', {
        message: error.message,
        config: {
          baseURL: error.config?.baseURL,
          url: error.config?.url,
          method: error.config?.method,
          authorization: error.config?.headers?.Authorization,
        },
      });
    }

    if (error.response?.status === 401) {
      try {
        await SecureStore.deleteItemAsync('auth_token');
      } catch (e) {}
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

export default api;
