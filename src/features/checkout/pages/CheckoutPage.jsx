import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import CheckoutConfirmStep from '../components/CheckoutConfirmStep'
import CheckoutHeader from '../components/CheckoutHeader'
import Stepper from '../../../shared/components/Stepper/Stepper'
import CheckoutSuccessStep from '../components/CheckoutSuccessStep'
import { TicketService } from '../../../shared/services/ticketService'
import { exitParking } from '../../../shared/utils/bookingStore'
import { clearVerifiedTicket, getVerifiedTicket } from '../../../shared/utils/guestTicketStore'
import '../../../shared/styles/pages/CheckoutPage.css'

const CHECKOUT_STEPS = ['Konfirmasi Keluar', 'Selesai']

export default function CheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const booking = location.state

  const [step, setStep] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [checkoutTime] = useState(new Date())

  if (!booking) {
    return (
      <div style={{ paddingTop: 86, minHeight: '100vh' }}>
        <Container className="py-5 text-center">
          <div style={{ fontSize: 56, marginBottom: 16 }}>{'\u26A0\uFE0F'}</div>
          <h3 style={{ color: 'var(--pf-text)' }}>Tidak Ada Tiket Aktif</h3>
          <p className="mb-4">Anda tidak memiliki tiket parkir aktif untuk diproses.</p>
          <Button className="btn-pf-primary btn" onClick={() => navigate('/parking')}>Ke Beranda</Button>
        </Container>
      </div>
    )
  }

  const handleCheckout = async () => {
    if (!booking.completed) {
      alert('Selesaikan parkir dulu (tombol "Selesai Parkir") sebelum keluar area. Slot harus dikosongkan terlebih dahulu.')
      return
    }

    setProcessing(true)
    try {
      const stored = getVerifiedTicket()
      const ticketId = booking.ticketId || stored?.ticketId
      const guestSessionId = booking.ticketCode || stored?.guestSessionId || stored?.qrCode
      await TicketService.cancelTicket({ ticketId, guestSessionId })
      clearVerifiedTicket()
      exitParking(booking.ticketCode)
      setStep(1)
    } catch (err) {
      console.error('Gagal keluar parkir:', err)
      alert(err.message || 'Gagal memproses keluar dari area parkir')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div style={{ paddingTop: 86, minHeight: '100vh' }}>
      <Container className="py-4">
        <CheckoutHeader step={step} onBack={() => navigate(-1)} />
        <Stepper steps={CHECKOUT_STEPS} step={step} />

        {step === 0 && (
          <CheckoutConfirmStep
            booking={booking}
            onBack={() => navigate(-1)}
            onConfirm={handleCheckout}
            processing={processing}
          />
        )}

        {step === 1 && (
          <CheckoutSuccessStep
            booking={booking}
            checkoutTime={checkoutTime}
            onHome={() => navigate('/parking')}
          />
        )}
      </Container>
    </div>
  )
}
