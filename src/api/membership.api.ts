import api from './axiosInstance';

export const getPackages = async () => {
  const response = await api.get('/api/v1/packages');
  return response.data;
};

export const initiateMembership = async (packageId: number, packageName: string) => {
  const response = await api.post('/api/v1/memberships/initiate', { package_id: packageId, package_name: packageName });
  return response.data;
};

export const verifyMembership = async (verificationData: any) => {
  const response = await api.post('/api/v1/memberships/verify', verificationData);
  return response.data;
};

export const getMembershipStatus = async () => {
  const response = await api.get('/api/v1/memberships/status');
  return response.data;
};

export const getTransactions = async (page = 1, perPage = 10) => {
  const response = await api.get(`/api/v1/memberships/transactions?page=${page}&per_page=${perPage}`);
  return response.data;
};
export default { getPackages, initiateMembership, verifyMembership, getMembershipStatus, getTransactions };
