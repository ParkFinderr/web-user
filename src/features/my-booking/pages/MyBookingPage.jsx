import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaCheckCircle, 
  FaExchangeAlt, 
  FaExclamationTriangle,
  FaFolderOpen
} from 'react-icons/fa'
import { useTheme } from '../../../shared/context/ThemeContext'
import LandingFooter from '../../../shared/components/LandingFooter/LandingFooter'
import { BookingService } from '../../booking/services/bookingService'
import { 
  cancelBooking, 
  clearAllBookings, 
  deleteBooking, 
  getBookings, 
  markBookingArrived, 
  markParkingCompleted,
  saveBooking
} from '../../../shared/utils/bookingStore'
import { saveVerifiedTicket } from '../../../shared/utils/guestTicketStore'
import '../../../shared/styles/pages/MyBookingPage.css'

const CDN = 'https://storage.googleapis.com/parkfinderbucket'

export default function MyBookingPage() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState(() => getBookings().slice(0, 3))
  const [filter, setFilter] = useState('active')
  
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

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
      alert('ID reservasi tidak ditemukan di data lokal.')
      return
    }
    if (!booking.arrived) {
      alert('Ketuk tombol "Sudah Sampai" di slot terlebih dahulu.')
      return
    }
    if (!window.confirm('Selesaikan sesi parkir Anda? Slot akan segera dikosongkan.')) return

    try {
      await BookingService.completeReservation(booking.reservationId)
      markParkingCompleted(booking.ticketCode)
      reload()
      alert('Sesi parkir diselesaikan. Slot dikosongkan. Klik "Keluar Parkir" saat keluar area.')
    } catch (error) {
      console.error('Error complete park:', error)
      alert(error?.message || 'Gagal menyelesaikan parkir.')
    }
  }

  const handleCheckout = (booking) => {
    if (!booking.completed) {
      alert('Selesaikan parkir terlebih dahulu untuk mengosongkan slot sebelum checkout.')
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
      alert('ID reservasi tidak ditemukan di data lokal.')
      return
    }
    if (!window.confirm('Batalkan reservasi ini? Slot Anda akan dilepaskan.')) return

    try {
      await BookingService.cancelReservation(booking.reservationId)
      cancelBooking(booking.ticketCode)
      saveVerifiedTicket({
        ticketId: booking.ticketId || null,
        guestSessionId: booking.ticketCode || booking.reservationId || null,
        qrCode: booking.ticketCode || booking.ticketId || booking.reservationId || null,
      })
      reload()
      alert('Reservasi berhasil dibatalkan. Tiket Anda tetap aktif.')
    } catch (error) {
      console.error('Error cancel reservation:', error)
      alert(error?.message || 'Gagal membatalkan reservasi.')
    }
  }

  const handleArrive = async (booking) => {
    const reservationId = booking.reservationId
    if (!reservationId) {
      alert('ID reservasi tidak ditemukan di data lokal.')
      return
    }

    try {
      await BookingService.arriveInSlot(reservationId)
      markBookingArrived(booking.ticketCode)
      reload()
      alert('Kedatangan Anda dikonfirmasi. Anda telah tiba di slot.')
    } catch (error) {
      console.error('Error marking as arrived:', error)
      alert(error?.message || 'Gagal mengirim konfirmasi kedatangan.')
    }
  }

  const handleClearAll = () => {
    if (!window.confirm('Hapus seluruh riwayat pemesanan lokal?')) return
    clearAllBookings()
    reload()
  }

  const renderBookingItem = (booking) => (
    <Row className="g-4 mb-5 animate-fade-up" key={booking.ticketCode}>
      {/* Left Column: Duration & Swap Box */}
      <Col lg={5}>
        <Card className="border-0 shadow-sm p-4 mb-4 text-center" style={{ background: 'var(--pf-bg2)', borderRadius: 20, border: '1px solid var(--pf-border)' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Badge bg="success" className="px-2.5 py-1" style={{ fontSize: 10 }}>● Aktif</Badge>
            <span style={{ fontSize: 13, color: 'var(--pf-text3)', fontWeight: 'bold' }}>Parkir Aktif</span>
          </div>
          <div className="text-uppercase text-muted fw-bold" style={{ fontSize: 10, letterSpacing: 1 }}>Durasi</div>
          <h1 className="fw-extrabold my-3" style={{ fontSize: '2.8rem', color: 'var(--pf-accent)' }}>00:45:25</h1>
          <div className="text-muted" style={{ fontSize: 12, color: 'var(--pf-text2)' }}>Menghitung waktu parkir Anda</div>
        </Card>

        <Card className="border-0 shadow-sm p-4 text-start" style={{ background: 'var(--pf-bg2)', borderRadius: 20, border: '1px solid var(--pf-border)' }}>
          <h6 className="fw-bold mb-2" style={{ color: 'var(--pf-text)' }}>Manajemen Slot</h6>
          <p className="mb-4" style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--pf-text2)' }}>
            Butuh tempat lain? Anda bisa menukar posisi slot dalam 15 menit pertama kunjungan Anda.
          </p>
          <Button 
            onClick={() => handleSwap(booking)}
            className="w-100 py-2.5 font-bold d-flex align-items-center justify-content-center gap-2"
            style={{ 
              borderRadius: 10, 
              border: '2px solid var(--pf-accent)', 
              color: isDark ? '#0b0d19' : 'var(--pf-accent)', 
              background: isDark ? 'var(--pf-accent)' : 'transparent',
              fontWeight: 'bold' 
            }}
            disabled={booking.completed}
          >
            <FaExchangeAlt /> Tukar Slot
          </Button>
        </Card>
      </Col>

      {/* Right Column: ID & Details Box */}
      <Col lg={7}>
        {/* ID block */}
        <div className="p-4 mb-4 text-white d-flex justify-content-between align-items-center" style={{ background: 'var(--pf-accent)', color: isDark ? '#0b0d19' : 'white', borderRadius: 16 }}>
          <div>
            <div className="text-uppercase fw-bold" style={{ fontSize: 10, letterSpacing: 1, color: isDark ? 'rgba(11,13,25,0.7)' : 'rgba(255,255,255,0.8)' }}>ID Reservasi</div>
            <h3 className="fw-extrabold mb-0 mt-1" style={{ color: isDark ? '#0b0d19' : 'white' }}>{booking.ticketCode}</h3>
          </div>
          {!booking.arrived && (
            <Button 
              onClick={() => handleArrive(booking)}
              className="btn px-4 py-2.5 font-bold" 
              style={{ 
                borderRadius: 10, 
                fontWeight: 'bold', 
                background: isDark ? '#0b0d19' : 'white', 
                border: 'none', 
                color: isDark ? '#60a5fa' : 'var(--pf-accent)' 
              }}
            >
              Sudah Sampai
            </Button>
          )}
        </div>

        {/* Details Card */}
        <Card className="border-0 shadow-sm p-4 mb-4" style={{ background: 'var(--pf-bg2)', borderRadius: 20, border: '1px solid var(--pf-border)' }}>
          <Row className="g-3">
            {[
              ['Pemesanan', booking.name],
              ['Plat Nomor', booking.plate],
              ['Slot Parkir', booking.parking?.slot || 'A-42 (VIP)', true],
              ['Gedung', booking.parking?.name || 'Menara Digital'],
              ['Lantai', booking.parking?.floor || 'Ground Floor'],
              ['Waktu Booking', '08:30 WIB'],
            ].map(([key, value, highlight]) => (
              <Col xs={6} key={key}>
                <div style={{ fontSize: 12, color: 'var(--pf-text3)', marginBottom: 2 }}>{key}</div>
                <div className="fw-bold" style={{ fontSize: 14.5, color: highlight ? 'var(--pf-accent)' : 'var(--pf-text)' }}>{value}</div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* Lower Actions Block */}
        <Row className="g-3">
          <Col xs={6}>
            <Card className="h-100 border-0 p-3 text-start" style={{ background: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2', borderRadius: 14, border: '1px solid var(--pf-border)' }}>
              <h6 className="fw-bold text-danger mb-1" style={{ fontSize: 13 }}>Batalkan Reservasi?</h6>
              <p className="mb-3" style={{ fontSize: 11, color: 'var(--pf-text2)' }}>Tindakan ini tidak dapat dibatalkan. Slot yang dipesan akan dilepas kembali ke publik.</p>
              <Button 
                onClick={() => handleCancel(booking)}
                variant="outline-danger" 
                className="w-100 py-2" 
                style={{ borderRadius: 8, fontSize: 12.5, fontWeight: 'bold' }}
                disabled={booking.completed}
              >
                Batalkan Reservasi
              </Button>
            </Card>
          </Col>
          <Col xs={6}>
            <Card className="h-100 border-0 p-3 text-start" style={{ background: 'var(--pf-bg3)', borderRadius: 14, border: '1px solid var(--pf-border)' }}>
              <h6 className="fw-bold mb-1" style={{ fontSize: 13, color: 'var(--pf-text)' }}>Selesaikan Parkir</h6>
              <p className="mb-3" style={{ fontSize: 11, color: 'var(--pf-text2)' }}>Gunakan tombol ini jika Anda sudah berada di gerbang keluar.</p>
              {!booking.completed ? (
                <Button 
                  onClick={() => handleCompletePark(booking)}
                  className="w-100 py-2 btn-pf-primary" 
                  style={{ borderRadius: 8, fontSize: 12.5, fontWeight: 'bold' }}
                >
                  Selesai Parkir
                </Button>
              ) : (
                <Button 
                  onClick={() => handleCheckout(booking)}
                  className="w-100 py-2 btn-success btn" 
                  style={{ borderRadius: 8, fontSize: 12.5, fontWeight: 'bold', background: '#10b981', border: 'none' }}
                >
                  Keluar Parkir
                </Button>
              )}
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )

  return (
    <div className="my-booking-page" style={{ 
      paddingTop: 86, 
      minHeight: '100vh', 
      background: 'var(--pf-bg)', 
      color: 'var(--pf-text)', 
      transition: 'background 0.3s ease, color 0.3s ease' 
    }}>
      <Container className="py-4">
        {/* Header section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-extrabold mb-1" style={{ color: 'var(--pf-text)' }}>
              Status Parkir
            </h1>
            <p className="text-muted mb-0" style={{ fontSize: 13.5 }}>
              Pantau reservasi slot dan sisa durasi parkir Anda secara real-time.
            </p>
          </div>
          {bookings.length > 0 && (
            <Button variant="outline-danger" size="sm" onClick={handleClearAll} style={{ borderRadius: 8 }}>Hapus Semua</Button>
          )}
        </div>

        {displayed.length === 0 ? (
          // Custom beautiful empty state
          <Card className="border-0 shadow-sm text-center py-5" style={{ background: 'var(--pf-bg2)', borderRadius: 16, border: '1px solid var(--pf-border)' }}>
            <Card.Body className="py-5">
              <span className="fs-1 mb-3 d-block text-slate-400" style={{ display: 'flex', justifyContent: 'center' }}><FaFolderOpen /></span>
              <h5 className="fw-bold text-slate-800" style={{ color: 'var(--pf-text)' }}>Belum Ada Reservasi Aktif</h5>
              <p className="text-muted mx-auto mb-4" style={{ maxWidth: 350, fontSize: 13.5 }}>
                Anda tidak memiliki pemesanan aktif yang tersimpan saat ini.
              </p>
              <div className="d-flex gap-2 justify-content-center">
                <Button className="btn btn-primary" style={{ borderRadius: 10 }} onClick={() => navigate('/parking')}>
                  Cari Gedung Parkir
                </Button>
              </div>
            </Card.Body>
          </Card>
        ) : (
          displayed.map(b => renderBookingItem(b))
        )}
      </Container>
    </div>
  )
}
