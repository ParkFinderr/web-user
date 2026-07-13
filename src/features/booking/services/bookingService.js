import { BASE_URL, handleResponse } from '../../../shared/services/apiClient'

export const BookingService = {
  createReservation: async (data) => {
    const response = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  arriveInSlot: async (reservationId) => {
    const response = await fetch(`${BASE_URL}/reservations/${reservationId}/arrive`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  },

  completeReservation: async (reservationId) => {
    const response = await fetch(`${BASE_URL}/reservations/${reservationId}/complete`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  },

  cancelReservation: async (reservationId) => {
    const response = await fetch(`${BASE_URL}/reservations/${reservationId}/cancel`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  },
}
