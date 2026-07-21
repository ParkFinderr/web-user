import { BASE_URL, handleResponse } from '../../../shared/services/apiClient'

export const LandingService = {
  getDashboardStats: async () => {
    const response = await fetch(`${BASE_URL}/stats/dashboard`);
    return handleResponse(response);
  },
  getAllUsers: async () => {
    const response = await fetch(`${BASE_URL}/users`);
    return handleResponse(response);
  },
}
