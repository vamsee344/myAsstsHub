import api from './axiosInstance';

export const getProfile = async () => {
  const response = await api.get('/api/v1/profile');
  return response.data;
};

export const updateProfile = async (profileData: any) => {
  const response = await api.put('/api/v1/profile', profileData);
  return response.data;
};

export const uploadProfileImage = async (uri: string) => {
  const formData = new FormData();
  const filename = uri.split('/').pop()!;
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image/jpeg';
  formData.append('image', { uri, name: filename, type } as any);
  const response = await api.post('/api/v1/profile/profile-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateCoverImage = async (uri: string) => {
  const formData = new FormData();
  const filename = uri.split('/').pop()!;
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image/jpeg';
  formData.append('image', { uri, name: filename, type } as any);
  const response = await api.post('/api/v1/profile/cover-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const setMobileVisibility = async (mobilestatus: '1' | '0') => {
  const response = await api.put('/api/v1/profile/mobile-visibility', { mobilestatus });
  return response.data;
};

export const changePassword = async (data: any) => {
  const response = await api.put('/api/v1/profile/password', data);
  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete('/api/v1/profile');
  return response.data;
};

export const getAgentProfile = async (username: string) => {
  const response = await api.get(`/api/v1/agents/${username}`);
  return response.data;
};

export const getFriendRequests = async (page = 1, perPage = 10) => {
  const response = await api.get(`/api/v1/friend-requests?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const sendFriendRequest = async (username: string) => {
  const response = await api.post(`/api/v1/agents/${username}/friend-request`);
  return response.data;
};

export const acceptFriendRequest = async (username: string) => {
  const response = await api.put(`/api/v1/agents/${username}/friend-request`);
  return response.data;
};

export const declineFriendRequest = async (username: string) => {
  const response = await api.delete(`/api/v1/agents/${username}/friend-request`);
  return response.data;
};

export const unfriend = async (username: string) => {
  const response = await api.delete(`/api/v1/agents/${username}/friend`);
  return response.data;
};
