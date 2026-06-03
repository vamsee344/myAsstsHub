import api from './axiosInstance';

export const uploadStory = async (uri: string, caption = '') => {
  const formData = new FormData();
  const filename = uri.split('/').pop()!;
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image/jpeg';
  formData.append('media', { uri, name: filename, type } as any);
  formData.append('caption', caption);
  const response = await api.post('/api/v1/stories/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getActiveStories = async () => {
  const response = await api.get('/api/v1/stories');
  return response.data?.data ?? response.data;
};

export const markStoryViewed = async (storyId: number) => {
  const response = await api.post(`/api/v1/stories/${storyId}/view`);
  return response.data;
};
export default { uploadStory, getActiveStories, markStoryViewed };
