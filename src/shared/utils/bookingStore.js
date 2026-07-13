const KEY = 'pf_active_bookings'

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function saveBooking(booking) {
  const list = getBookings()
  const exists = list.findIndex(b => b.ticketCode === booking.ticketCode)
  if (exists === -1) {
    list.unshift({ ...booking, savedAt: new Date().toISOString() })
  } else {
    list[exists] = { ...booking, savedAt: new Date().toISOString() }
  }
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function cancelBooking(ticketCode) {
  const list = getBookings().map(b =>
    b.ticketCode === ticketCode
      ? { ...b, cancelled: true, expired: true, cancelledAt: new Date().toISOString(), expiredAt: new Date().toISOString() }
      : b
  )
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function expireBooking(ticketCode) {
  const list = getBookings().map(b =>
    b.ticketCode === ticketCode ? { ...b, expired: true, expiredAt: new Date().toISOString() } : b
  )
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function updateBooking(oldTicketCode, updatedBooking) {
  const list = getBookings().map(b =>
    b.ticketCode === oldTicketCode ? { ...b, ...updatedBooking, updatedAt: new Date().toISOString() } : b
  )
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function getActiveBookings() {
  return getBookings().slice(0, 3).filter(b => !b.expired)
}

export function markBookingArrived(ticketCode) {
  const list = getBookings().map(b =>
    b.ticketCode === ticketCode ? { ...b, arrived: true, arrivedAt: new Date().toISOString() } : b
  )
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function markParkingCompleted(ticketCode) {
  const list = getBookings().map(b =>
    b.ticketCode === ticketCode
      ? { ...b, completed: true, completedAt: new Date().toISOString() }
      : b
  )
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function exitParking(ticketCode) {
  const list = getBookings().map(b =>
    b.ticketCode === ticketCode
      ? { ...b, expired: true, exited: true, exitedAt: new Date().toISOString(), expiredAt: new Date().toISOString() }
      : b
  )
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function completeBooking(ticketCode) {
  markParkingCompleted(ticketCode)
}

export function deleteBooking(ticketCode) {
  const list = getBookings().filter(b => b.ticketCode !== ticketCode)
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function clearAllBookings() {
  localStorage.removeItem(KEY)
}
