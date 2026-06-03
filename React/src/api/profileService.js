import axiosClient from './client/axiosClient';

/**
 * Profile Service
 * Manage user profile, identity uploads, and experience/education
 */
const profileService = {
  /**
   * Get authenticated user's profile details
   */
  getProfile: async () => {
    try {
      return await axiosClient.get('/profile');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update personal profile information
   * @param {Object} profileData 
   */
  updateProfile: async (profileData) => {
    try {
      return await axiosClient.put('/profile', profileData);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Toggle mobile visibility status
   * @param {string} status - '1' for show, '0' for hide
   */
  toggleMobileStatus: async (status) => {
    try {
      return await axiosClient.put('/profile/mobile-visibility', { mobilestatus: status });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload profile avatar image
   * @param {string} imageUri - File path/URI
   */
  uploadProfileImage: async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', {
        uri: imageUri,
        name: 'profile.jpg',
        type: 'image/jpeg',
      });

      return await axiosClient.post('/profile/profile-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload profile cover image
   */
  uploadCoverImage: async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: 'cover.jpg',
        type: 'image/jpeg',
      });

      return await axiosClient.post('/profile/cover-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload Identity Documents (Aadhar or PAN)
   * /api/v1/profile/identity-media
   */
  uploadIdentityMedia: async (data) => {
    try {
      const formData = new FormData();
      if (data.aadhar) {
         formData.append('aadhar', { uri: data.aadhar, name: 'aadhar.jpg', type: 'image/jpeg' });
      }
      if (data.pan) {
         formData.append('pan', { uri: data.pan, name: 'pan.jpg', type: 'image/jpeg' });
      }

      return await axiosClient.post('/profile/identity-media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * EXPERIENCE CRUD
   */
  addExperience: async (data) => axiosClient.post('/profile/experience', data),
  updateExperience: async (id, data) => axiosClient.put(`/profile/experience/${id}`, data),
  deleteExperience: async (id) => axiosClient.delete(`/profile/experience/${id}`),

  /**
   * EDUCATION CRUD
   */
  addEducation: async (data) => axiosClient.post('/profile/education', data),
  updateEducation: async (id, data) => axiosClient.put(`/profile/education/${id}`, data),
  deleteEducation: async (id) => axiosClient.delete(`/profile/education/${id}`),

  /**
   * SECURITY
   */
  changePassword: async (data) => axiosClient.put('/profile/password', data),
  deactivateAccount: async () => axiosClient.delete('/profile'),

  /**
   * SOCIAL / NETWORKING
   */
  getFriends: async () => axiosClient.get('/friends'),
  getFriendRequests: async () => axiosClient.get('/friend-requests'),
  sendFriendRequest: async (username) => axiosClient.post(`/agents/${username}/friend-request`),
  handleFriendAction: async (id, action) => axiosClient.post(`/friend-requests/${id}/${action}`), // accept/reject

  /**
   * REVIEWS
   */
  getPublicProfile: async (username) => axiosClient.get(`/agents/${username}`),
  submitReview: async (username, data) => axiosClient.post(`/agents/${username}/reviews`, data),
  deleteReview: async (id) => axiosClient.delete(`/reviews/${id}`),

  /**
   * MEMBERSHIP / PLANS
   */
  getPackages: async () => axiosClient.get('/packages'),
  purchasePackage: async (data) => axiosClient.post('/purchase', data),
  getTransactions: async () => axiosClient.get('/transactions'),
};

export default profileService;
