import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import MyBookingEmptyState from '../components/MyBookingEmptyState'
import MyBookingFilters from '../components/MyBookingFilters'
import MyBookingHeader from '../components/MyBookingHeader'
import MyBookingList from '../components/MyBookingList'
import MyBookingStats from '../components/MyBookingStats'
import { BookingService } from '../../booking/services/bookingService'
import { cancelBooking, clearAllBookings, deleteBooking, getBookings, markBookingArrived, markParkingCompleted } from '../../../shared/utils/bookingStore'
import { saveVerifiedTicket } from '../../../shared/utils/guestTicketStore'
import '../../../shared/styles/pages/MyBookingPage.css'

const CDN = 'https://storage.googleapis.com/parkfinderbucket'

export default function MyBookingPage() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState(() => getBookings().slice(0, 3))
  const [filter, setFilter] = useState('active')

  const reload = () => setBookings(getBookings().slice(0, 3))

  const displayed = filter === 'active'
    ? bookings.filter(item => !item.expired)
    : bookings

  const activeCount = bookings.filter(item => !item.expired).length
  const expiredCount = bookings.filter(item => item.expired).length

  const fmtDate = (iso) => {
    if (!iso) return '-'
    const date = new Date(iso)
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
      + ' ' + date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  }

  const handleSwap = (booking) => {
    navigate('/swap', {
      state: {
        ticketCode: booking.ticketCode,
        reservationId: booking.reservationId,
        name: booking.name,
        plate: booking.plate,
        phone: booking.phone,
        parking: booking.parking,
      },
    })
  }

  const handleCompletePark = async (booking) => {
    if (!booking.reservationId) {
      alert('ID reservasi tidak ada. Buat reservasi baru lalu coba lagi.')
      return
    }
    if (!booking.arrived) {
      alert('Konfirmasi "Sudah Sampai" di slot terlebih dahulu.')
      return
    }
    if (!window.confirm('Selesai parkir? Slot akan dikosongkan. Tiket tetap aktif sampai Anda keluar dari area.')) return

    try {
      await BookingService.completeReservation(booking.reservationId)
      markParkingCompleted(booking.ticketCode)
      reload()
      alert('Parkir selesai. Slot dikosongkan. Saat keluar area, tekan "Keluar Parkir".')
    } catch (error) {
      console.error('Error complete park:', error)
      alert(error?.message || 'Gagal menyelesaikan parkir.')
    }
  }

  const handleCheckout = (booking) => {
    if (!booking.completed) {
      alert('Tekan "Selesai Parkir" terlebih dahulu untuk mengosongkan slot, baru keluar area.')
      return
    }
    navigate('/checkout', {
      state: {
        ticketCode: booking.ticketCode,
        ticketId: booking.ticketId,
        reservationId: booking.reservationId,
        completed: booking.completed,
        name: booking.name,
        plate: booking.plate,
        phone: booking.phone,
        parking: booking.parking,
      },
    })
  }

  const handleCancel = async (booking) => {
    if (!booking.reservationId) {
      alert('ID reservasi tidak ada. Reservasi lama tidak bisa dibatalkan lewat API.')
      return
    }
    if (!window.confirm('Batalkan reservasi parkir ini? Slot akan dilepas, tetapi tiket tetap aktif.')) return

    try {
      await BookingService.cancelReservation(booking.reservationId)
      cancelBooking(booking.ticketCode)
      saveVerifiedTicket({
        ticketId: booking.ticketId || null,
        guestSessionId: booking.ticketCode || booking.reservationId || null,
        qrCode: booking.ticketCode || booking.ticketId || booking.reservationId || null,
      })
      reload()
      alert('Reservasi berhasil dibatalkan. Tiket tetap aktif, jadi Anda tidak perlu scan ulang.')
    } catch (error) {
      console.error('Error cancel reservation:', error)
      alert(error?.message || 'Gagal membatalkan reservasi.')
    }
  }

  const handleArrive = async (booking) => {
    const reservationId = booking.reservationId
    if (!reservationId) {
      alert(
        'ID reservasi tidak ada di data ini. Buat reservasi ulang dari alur parkir, lalu tekan "Sudah Sampai" lagi.'
      )
      return
    }

    try {
      await BookingService.arriveInSlot(reservationId)
      markBookingArrived(booking.ticketCode)
      reload()
      alert('Anda sudah tiba di slot parkir.')
    } catch (error) {
      console.error('Error marking as arrived:', error)
      alert(error?.message || 'Gagal mengirim konfirmasi ke server. Periksa jaringan atau coba lagi.')
    }
  }

  const handleDelete = (booking) => {
    if (!booking.expired) {
      if (!window.confirm('Transaksi ini masih aktif. Menghapus dari riwayat lokal tidak membatalkan sesi di server. Hapus?')) return
    } else if (!window.confirm('Hapus item riwayat ini?')) {
      return
    }
    deleteBooking(booking.ticketCode)
    reload()
  }

  const handleClearAll = () => {
    if (!window.confirm('Hapus seluruh riwayat reservasi?')) return
    clearAllBookings()
    reload()
  }

  return (
    <div className="my-booking-page" style={{ paddingTop: 86, minHeight: '100vh' }}>
      <Container className="py-4">
        <MyBookingHeader />
        <MyBookingStats activeCount={activeCount} expiredCount={expiredCount} totalCount={bookings.length} />
        <MyBookingFilters filter={filter} onChange={setFilter} activeCount={activeCount} totalCount={bookings.length} onClearAll={handleClearAll} />

        {displayed.length === 0 ? (
          <MyBookingEmptyState filter={filter} onBooking={() => navigate('/parking')} />
        ) : (
          <MyBookingList
            bookings={displayed}
            onSwap={handleSwap}
            onCheckout={handleCheckout}
            onCompletePark={handleCompletePark}
            onCancel={handleCancel}
            onArrive={handleArrive}
            onDelete={handleDelete}
            formatDate={fmtDate}
            cdn={CDN}
          />
        )}
      </Container>
    </div>
  )
}
