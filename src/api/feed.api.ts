import api from './axiosInstance';

export const getFeed = async (page = 1, perPage = 10, filter = '', mediaType = '', userId = '') => {
  const response = await api.get(`/api/v1/feed?page=${page}&per_page=${perPage}&filter=${filter}&media_type=${mediaType}&user_id=${userId}`);
  return response.data?.data?.posts ?? response.data?.posts ?? response.data;
};

export const getPost = async (postId: number) => {
  const response = await api.get(`/api/v1/feed/${postId}`);
  return response.data;
};

export const createPost = async (data: any) => {
  const response = await api.post('/api/v1/feed', data);
  return response.data;
};

export const updatePost = async (postId: number, data: any) => {
  const response = await api.post(`/api/v1/feed/${postId}`, data);
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await api.delete(`/api/v1/feed/${postId}`);
  return response.data;
};

export const toggleLikePost = async (postId: number) => {
  const response = await api.post(`/api/v1/feed/${postId}/like`, {});
  return response.data;
};

export const savePost = async (postId: number) => {
  const response = await api.post(`/api/v1/feed/${postId}/save`);
  return response.data;
};

export const unsavePost = async (postId: number) => {
  const response = await api.delete(`/api/v1/feed/${postId}/save`);
  return response.data;
};

export const getComments = async (postId: number, page = 1, perPage = 10) => {
  const response = await api.get(`/api/v1/feed/${postId}/comments?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const createComment = async (postId: number, comment: string) => {
  const response = await api.post(`/api/v1/feed/${postId}/comments`, { comment });
  return response.data;
};

export const deleteComment = async (commentId: number) => {
  const response = await api.delete(`/api/v1/comments/${commentId}`);
  return response.data;
};
export default { getFeed, getPost, createPost, updatePost, deletePost, toggleLikePost, savePost, unsavePost, getComments, createComment, deleteComment };
