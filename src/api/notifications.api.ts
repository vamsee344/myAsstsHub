import api from './axiosInstance';

export const getNotifications = async (page = 1, perPage = 10, type = '') => {
  const response = await api.get(`/api/v1/notifications?page=${page}&per_page=${perPage}&type=${type}`);
  return response.data;
};

export const getUnreadNotificationsCount = async () => {
  const response = await api.get('/api/v1/notifications/unread-count');
  return response.data;
};

export const markNotificationRead = async (id: number) => {
  const response = await api.get(`/api/v1/notifications/${id}`);
  return response.data;
};
export default { getNotifications, getUnreadNotificationsCount, markNotificationRead };
