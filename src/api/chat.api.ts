import api from './axiosInstance';

export const getConversation = async (username: string, page = 1, perPage = 10) => {
  const response = await api.get(`/api/v1/chat/${username}?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const sendMessage = async (receiverId: number, message: string) => {
  const response = await api.post('/api/v1/chat/messages', { receiver_id: receiverId, message });
  return response.data;
};

export const deleteMessage = async (messageId: number) => {
  const response = await api.delete(`/api/v1/chat/messages/${messageId}`);
  return response.data;
};

export const clearConversation = async (receiverId: number) => {
  const response = await api.delete(`/api/v1/chat/conversations/${receiverId}`);
  return response.data;
};
export default { getConversation, sendMessage, deleteMessage, clearConversation };
