import axios from 'axios';
import { requestInterceptor, requestErrorInterceptor } from '../interceptors/requestInterceptor';
import { responseInterceptor, responseErrorInterceptor } from '../interceptors/responseInterceptor';

const API_BASE_URL = 'https://myassetshub.com/api/v1'; // Fallback to production URL

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Apply interceptors
axiosClient.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
axiosClient.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default axiosClient;
