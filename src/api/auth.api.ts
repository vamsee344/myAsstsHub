import api from './axiosInstance';

export const login = async (email: string, password: string) => {
  const response = await api.post('/api/v1/auth/login', { email, password });
  return response.data?.data ?? response.data;
};

export const register = async (data: any) => {
  const response = await api.post('/api/v1/auth/registration', data);
  return response.data?.data ?? response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/api/v1/auth/logout');
  return response.data;
};

export const getUserTypes = async () => {
  const response = await api.get('/api/v1/user-types');
  return response.data;
};

export const getPropertyCategories = async () => {
  const response = await api.get('/api/v1/categories');
  return response.data;
};
export default { login, register, logoutUser, getUserTypes, getPropertyCategories };
