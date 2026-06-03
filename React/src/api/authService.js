import axiosClient from './client/axiosClient';

/**
 * Authentication Service
 * Interacts with /api/v1/auth/*
 */
const authService = {
  /**
   * Login user
   * @param {string} email 
   * @param {string} password 
   */
  login: async (email, password) => {
    try {
      const response = await axiosClient.post('/auth/login', { email, password });
      return response; // Correctly handled by responseInterceptor
    } catch (error) {
      throw error;
    }
  },

  /**
   * Register a new user with extended fields from Postman collection
   * @param {Object} userData 
   */
  register: async (userData) => {
    try {
      const response = await axiosClient.post('/auth/registration', {
        referid: userData.referid || 'MAHREF78491A', // Fallback as identified in Postman
        fname: userData.firstName,
        lname: userData.lastName,
        uname: userData.username,
        email: userData.email,
        country_name: userData.countryName || 'India',
        country_code: userData.countryCode || '+91',
        phone: userData.phone,
        password: userData.password,
        conpassword: userData.confirmPassword,
        ppolicy: '1', // Profile policy
        location: userData.location || 'IND'
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Fetch user types (e.g., real-estate-agent, investor)
   */
  getUserTypes: async () => {
    try {
      return await axiosClient.get('/user-types');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Request password reset link
   */
  forgotPassword: async (email) => {
    try {
      return await axiosClient.post('/auth/forgot-password', { email });
    } catch (error) {
      throw error;
    }
  }
};

export default authService;
