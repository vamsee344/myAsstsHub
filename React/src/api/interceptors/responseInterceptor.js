/**
 * Response Interceptor for Axios
 * Handles global error handling, token refresh logic, and API data extraction
 */
export const responseInterceptor = (response) => {
  // Extract data for consistency across components
  const responseData = response.data;

  // Log responses in development
  if (__DEV__) {
    console.log(`[API Response] ${response.status} ${response.config.url}`, responseData);
  }

  // Handle successful responses from API with consistent structure
  if (responseData.status === 'success' || responseData.code === 200) {
    return responseData;
  }

  return responseData;
};

export const responseErrorInterceptor = (error) => {
  if (__DEV__) {
    console.error(`[API Error] ${error.response?.status} ${error.config?.url}`, error.response?.data || error.message);
  }

  const status = error.response ? error.response.status : null;

  if (status === 401) {
    // TODO: Clear session or Redirect to Login via Redux/Navigator
    console.warn('Unauthorized access - potential token expiration');
  }

  return Promise.reject(error.response?.data || error.message);
};
