import api from './axiosInstance';

export const getProjects = async (page = 1, perPage = 10, status = '', search = '') => {
  const response = await api.get(`/api/v1/projects?page=${page}&per_page=${perPage}&status=${status}&search=${search}`);
  return response.data;
};

export const createProject = async (data: any) => {
  const response = await api.post('/api/v1/projects', data);
  return response.data;
};

export const deleteProject = async (id: number) => {
  const response = await api.delete(`/api/v1/projects/${id}`);
  return response.data;
};

export const addSite = async (projectCode: string, siteData: any) => {
  const response = await api.post(`/api/v1/projects/${projectCode}/sites`, siteData);
  return response.data;
};

export const getSites = async (projectCode: string, page = 1, perPage = 10) => {
  const response = await api.get(`/api/v1/projects/${projectCode}/sites?page=${page}&per_page=${perPage}`);
  return response.data;
};
export default { getProjects, createProject, deleteProject, addSite, getSites };
