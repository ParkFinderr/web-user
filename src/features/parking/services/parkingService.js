import { BASE_URL, handleResponse } from '../../../shared/services/apiClient'

export const ParkingService = {
  getAllAreas: async () => {
    const response = await fetch(`${BASE_URL}/areas`);
    return handleResponse(response);
  },

  getAreaById: async (areaId) => {
    const response = await fetch(`${BASE_URL}/areas/${areaId}`);
    return handleResponse(response);
  },

  getAllSlotsInArea: async (areaId) => {
    const response = await fetch(`${BASE_URL}/areas/${areaId}/slots`);
    return handleResponse(response);
  },
}
