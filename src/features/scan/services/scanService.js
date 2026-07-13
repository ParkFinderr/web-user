import { BASE_URL, handleResponse } from '../../../shared/services/apiClient'

export const ScanService = {
  verifyTicket: async (qrCode) => {
    const payload = { qrCode: String(qrCode || '').trim() }
    console.log('[API] verifyTicket -> request payload:', payload);
    const response = await fetch(`${BASE_URL}/access/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const respText = await response.clone().text().catch(() => null);
    console.log('[API] verifyTicket -> status:', response.status, 'responseText:', respText);
    return handleResponse(response);
  },

  verifyTicketForce: async (qrCode) => {
    const payload = { qrCode: String(qrCode || '').trim() }
    console.log('[API] verifyTicketForce -> request payload:', payload);
    const response = await fetch(`${BASE_URL}/access/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const respText = await response.clone().text().catch(() => null);
    console.log('[API] verifyTicketForce -> status:', response.status, 'responseText:', respText);
    return handleResponse(response);
  },
}
