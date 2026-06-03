/**
 * Request Interceptor for Axios
 * Injects Authorization token if available in storage or redux state
 */
export const requestInterceptor = async (config) => {
  // TODO: Retrieve token from AsyncStorage or Redux state
  const token = null; 

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Log requests in development
  if (__DEV__) {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
  }

  return config;
};

export const requestErrorInterceptor = (error) => {
  return Promise.reject(error);
};
