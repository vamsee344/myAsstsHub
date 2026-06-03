import api from './axiosInstance';

export const getAlbums = async (page = 1, perPage = 10) => {
  const response = await api.get(`/api/v1/albums?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const createAlbum = async (name: string, description: string) => {
  const response = await api.post('/api/v1/albums', { name, description });
  return response.data;
};

export const getAlbumDetail = async (id: number, page = 1, perPage = 10) => {
  const response = await api.get(`/api/v1/albums/${id}?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const deleteAlbum = async (id: number) => {
  const response = await api.delete(`/api/v1/albums/${id}`);
  return response.data;
};
export default { getAlbums, createAlbum, getAlbumDetail, deleteAlbum };
