import api from './axiosInstance';

export const getReferralsDashboard = async () => {
  const response = await api.get('/api/v1/referrals/dashboard');
  return response.data;
};

export const getReferralsList = async (page = 1, perPage = 10, level = '') => {
  const response = await api.get(`/api/v1/referrals/list?page=${page}&per_page=${perPage}&level=${level}`);
  return response.data;
};

export const getWithdrawalsList = async (page = 1, perPage = 10, status = '') => {
  const response = await api.get(`/api/v1/withdrawals?page=${page}&per_page=${perPage}&status=${status}`);
  return response.data;
};

export const requestWithdrawal = async (amount: number) => {
  const response = await api.post('/api/v1/withdrawals', { withdraw_amount: amount });
  return response.data;
};

export const getInvoicesList = async (page = 1, perPage = 10) => {
  const response = await api.get(`/api/v1/invoices?page=${page}&per_page=${perPage}`);
  return response.data;
};
export default { getReferralsDashboard, getReferralsList, getWithdrawalsList, requestWithdrawal, getInvoicesList };
