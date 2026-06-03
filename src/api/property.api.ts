import api from './axiosInstance';

export const getProperties = async (page = 1, perPage = 10, category = '', properfor = '', city = '', status = '', search = '') => {
  const response = await api.get(`/api/v1/properties?page=${page}&per_page=${perPage}&category=${category}&properfor=${properfor}&city=${city}&status=${status}&search=${search}`);
  return response.data;
};

export const createProperty = async (data: any) => {
  const response = await api.post('/api/v1/properties', data);
  return response.data;
};

export const updateProperty = async (id: number, data: any) => {
  const response = await api.put(`/api/v1/properties/${id}`, data);
  return response.data;
};

export const deleteProperty = async (id: number) => {
  const response = await api.delete(`/api/v1/properties/${id}`);
  return response.data;
};

export const uploadPropertyImages = async (id: number, uri: string) => {
  const formData = new FormData();
  const filename = uri.split('/').pop()!;
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image/jpeg';
  formData.append('image', { uri, name: filename, type } as any);
  const response = await api.post(`/api/v1/properties/${id}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
export default { getProperties, createProperty, updateProperty, deleteProperty, uploadPropertyImages };
