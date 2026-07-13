import { BASE_URL, handleResponse } from './apiClient'

export const TicketService = {
  cancelTicket: async ({ ticketId, guestSessionId } = {}) => {
    const body = {}
    if (ticketId) body.ticketId = ticketId
    if (guestSessionId) body.guestSessionId = guestSessionId
    if (!body.ticketId && !body.guestSessionId) {
      throw new Error('ticketId atau guestSessionId wajib diisi untuk membatalkan tiket')
    }
    const response = await fetch(`${BASE_URL}/access/cancelTicket`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  getDownloadAppLink: () => {
    return `${BASE_URL}/system/app/download`;
  },
}
