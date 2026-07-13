import { BASE_URL, handleResponse } from '../../../shared/services/apiClient'

export const SwapService = {
  swapSlot: async (reservationId, newSlotId) => {
    const response = await fetch(`${BASE_URL}/reservations/${reservationId}/swap`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newSlotId }),
    });
    return handleResponse(response);
  },
}
