const BASE_URL = 'https://backend-api-services-173368161554.asia-southeast2.run.app';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export function extractGuestSessionId(apiResult, fallbackQr = null) {
  if (!apiResult || typeof apiResult !== 'object') return fallbackQr || null
  const d = apiResult.data !== undefined ? apiResult.data : apiResult.message?.data
  const node = d && typeof d === 'object' ? d : apiResult
  return node?.guestSessionId || apiResult?.guestSessionId || fallbackQr || null
}

export function extractTicketId(apiResult) {
  if (!apiResult || typeof apiResult !== 'object') return null
  const d = apiResult.data !== undefined ? apiResult.data : apiResult.message?.data
  const node = d && typeof d === 'object' ? d : apiResult
  return (
    node?.ticketId
    || node?.ticket?.id
    || node?.ticket?.ticketId
    || apiResult?.ticketId
    || null
  )
}

export function extractReservationId(res) {
  if (!res || typeof res !== 'object') return null
  const d = res.data !== undefined ? res.data : res.message?.data
  const node = d && typeof d === 'object' ? d : res
  return (
    node?.id
    || node?.reservationId
    || node?.reservation?.id
    || res?.id
    || res?.reservationId
    || null
  )
}

export { BASE_URL, handleResponse }
