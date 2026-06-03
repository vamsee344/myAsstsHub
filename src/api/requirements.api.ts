import api from './axiosInstance';

export const createRequirement = async (data: any) => {
  const response = await api.post('/api/v1/requirements', data);
  return response.data;
};

export const getMyRequirements = async (page = 1, perPage = 10) => {
  const response = await api.get(`/api/v1/my-requirements?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const createBooking = async (data: any) => {
  const response = await api.post('/api/v1/bookings', data);
  return response.data;
};

export const getBookings = async (page = 1, perPage = 10) => {
  const response = await api.get(`/api/v1/bookings?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const deleteBooking = async (id: number) => {
  const response = await api.delete(`/api/v1/bookings/${id}`);
  return response.data;
};
export default { createRequirement, getMyRequirements, createBooking, getBookings, deleteBooking };
