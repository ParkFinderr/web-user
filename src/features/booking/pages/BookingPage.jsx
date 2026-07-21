import { useEffect, useRef, useState } from 'react'
import { Button, Container, Row, Col, Card, Form, Badge } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'
import GuestActiveTicketBar from '../../../shared/components/GuestActiveTicketBar/GuestActiveTicketBar'
import Stepper from '../../../shared/components/Stepper/Stepper'
import { useTheme } from '../../../shared/context/ThemeContext'
import { extractReservationId, extractTicketId } from '../../../shared/services/apiClient'
import { BookingService } from '../services/bookingService'
import { saveBooking } from '../../../shared/utils/bookingStore'
import { getGuestTicketContextForBooking, getVerifiedTicket, saveVerifiedTicketFromApi } from '../../../shared/utils/guestTicketStore'
import '../../../shared/styles/pages/BookingPage.css'

const STEPS = ['Detail Booking', 'Konfirmasi', 'Selesai']

export default function BookingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const parking = location.state || null
  const scannedQrCode = location.state?.scannedQrCode || null
  const apiResult = location.state?.apiResult || null

  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', plate: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [reservationId, setReservationId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const storedTicket = getVerifiedTicket()
  const ticketCtx = getGuestTicketContextForBooking()
  const resolvedTicketId = extractTicketId(apiResult) || storedTicket?.ticketId || ticketCtx.ticketId
  
  const guestSessionRef = useRef(
    apiResult?.data?.guestSessionId
    || apiResult?.guestSessionId
    || scannedQrCode
    || storedTicket?.guestSessionId
    || storedTicket?.qrCode
    || ticketCtx.guestSessionId
    || `PKF-${Date.now().toString(36).toUpperCase().slice(-8)}`
  )
  const guestSessionId = guestSessionRef.current
  const slotId = parking?.slotId

  useEffect(() => {
    if (apiResult && scannedQrCode) {
      saveVerifiedTicketFromApi(apiResult, scannedQrCode)
    }
  }, [apiResult, scannedQrCode])

  if (!parking?.id && !parking?.name) {
    return (
      <div style={{ paddingTop: 86, minHeight: '100vh', background: 'var(--pf-bg)', color: 'var(--pf-text)' }}>
        <Container className="py-5 text-center">
          <div style={{ fontSize: 56, marginBottom: 16, display: 'flex', justifyContent: 'center', color: 'var(--pf-accent)' }}><FaInfoCircle /></div>
          <h3>Pilih Slot Terlebih Dahulu</h3>
          <p className="mb-4">Anda perlu memilih lokasi dan slot sebelum melanjutkan pemesanan.</p>
          <Button className="btn btn-pf-primary" onClick={() => navigate('/parking')}>
            Pilih Lokasi
          </Button>
        </Container>
      </div>
    )
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Nama lengkap wajib diisi'
    if (!form.plate.trim()) nextErrors.plate = 'Nomor kendaraan/plat wajib diisi'
    if (!form.phone.trim()) nextErrors.phone = 'Nomor HP wajib diisi'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const setField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const nextStep = async () => {
    if (step === 0 && !validate()) return

    if (step === 1) {
      if (!resolvedTicketId) {
        alert('Tiket belum terverifikasi. Silakan scan QR tiket terlebih dahulu.')
        navigate('/scan', {
          state: {
            redirect: '/booking',
            parking: parking
              ? {
                  ...parking,
                  scannedQrCode: scannedQrCode || ticketCtx.scannedQrCode,
                  apiResult: apiResult || ticketCtx.apiResult,
                }
              : null,
          },
        })
        return
      }
      if (!slotId) {
        alert('Slot parkir belum dipilih. Kembali dan pilih slot yang tersedia.')
        navigate('/parking')
        return
      }

      setSubmitting(true)
      try {
        const payload = {
          ticketId: resolvedTicketId,
          slotId,
          name: form.name.trim(),
          plateNumber: form.plate.trim(),
        }
        const res = await BookingService.createReservation(payload)
        const resId = extractReservationId(res)
        if (!resId) {
          console.error('[BookingPage] createReservation: ID tidak diterima', res)
          alert('Reservasi berhasil dibuat tetapi ID tidak diterima. Coba hubungi admin.')
          return
        }
        setReservationId(resId)

        saveBooking({
          ticketCode: guestSessionId,
          ticketId: resolvedTicketId,
          reservationId: resId,
          name: form.name,
          plate: form.plate,
          phone: form.phone,
          parking: {
            ...parking,
            id: parking?.id,
            slotId,
          },
        })

        setStep(2)
      } catch (err) {
        console.error('Gagal booking:', err)
        alert(err.message || 'Gagal membuat reservasi')
      } finally {
        setSubmitting(false)
      }
      return
    }

    const target = step + 1
    if (target <= 2) {
      setStep(target)
    }
  }

  // --- RENDERING SUB-VIEWS ---

  // STEP 0: FORM STEP
  const renderFormStep = () => (
    <Row className="g-4 animate-fade-up">
      <Col lg={7}>
        <Card className="border-0 shadow-sm" style={{ background: 'var(--pf-bg2)', borderRadius: 16, border: '1px solid var(--pf-border)' }}>
          <Card.Body className="p-4">
            <h5 className="mb-4 fw-bold" style={{ color: 'var(--pf-text)' }}>
              Informasi Pemesan
            </h5>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--pf-text2)', fontWeight: 600 }}>Nama Lengkap</Form.Label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Masukkan nama lengkap sesuai identitas"
                value={form.name}
                onChange={e => setField('name', e.target.value)}
                style={{ background: 'var(--pf-bg3)', color: 'var(--pf-text)', border: '1.5px solid var(--pf-border)', borderRadius: 10, padding: 10 }}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--pf-text2)', fontWeight: 600 }}>Nomor Plat Kendaraan</Form.Label>
              <input
                type="text"
                className={`form-control ${errors.plate ? 'is-invalid' : ''}`}
                placeholder="Contoh: B 1234 SOK"
                value={form.plate}
                onChange={e => setField('plate', e.target.value.toUpperCase())}
                style={{ background: 'var(--pf-bg3)', color: 'var(--pf-text)', border: '1.5px solid var(--pf-border)', borderRadius: 10, padding: 10 }}
              />
              {errors.plate && <div className="invalid-feedback">{errors.plate}</div>}
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Label style={{ color: 'var(--pf-text2)', fontWeight: 600 }}>Nomor HP</Form.Label>
              <input
                type="tel"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="Contoh: 0812-3456-7890"
                value={form.phone}
                onChange={e => setField('phone', e.target.value)}
                style={{ background: 'var(--pf-bg3)', color: 'var(--pf-text)', border: '1.5px solid var(--pf-border)', borderRadius: 10, padding: 10 }}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </Form.Group>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={5}>
        <Card className="border-0 shadow-sm p-4 mb-3" style={{ background: 'var(--pf-bg2)', borderRadius: 16, border: '1px solid var(--pf-border)' }}>
          <h6 className="fw-bold mb-3" style={{ color: 'var(--pf-text)', fontSize: 14 }}>
            Ringkasan Booking
          </h6>
          {[
            ['Gedung', parking?.name || ''],
            ['Alamat', parking?.address || 'Bandar Lampung'],
            ['Lantai', parking?.floor || ''],
            ['Nomor Slot', parking?.slot || ''],
          ].map(([key, value]) => (
            <div key={key} className="d-flex justify-content-between mb-2.5 pb-2 border-bottom border-pf" style={{ fontSize: 13.5 }}>
              <span style={{ color: 'var(--pf-text2)' }}>{key}</span>
              <strong style={{ color: 'var(--pf-text)', textAlign: 'right' }}>{value}</strong>
            </div>
          ))}
        </Card>

        <Button
          onClick={nextStep}
          className="w-100 py-3 font-bold"
          style={{ 
            borderRadius: 12, 
            fontWeight: 'bold', 
            background: 'var(--pf-accent)', 
            border: 'none',
            color: isDark ? '#0b0d19' : 'white'
          }}
        >
          Lanjutkan ke Konfirmasi →
        </Button>
      </Col>
    </Row>
  )

  // STEP 1: CONFIRM STEP
  const renderConfirmStep = () => (
    <Row className="justify-content-center animate-fade-up">
      <Col lg={7}>
        <Card className="border-0 shadow-sm" style={{ background: 'var(--pf-bg2)', borderRadius: 16, border: '1px solid var(--pf-border)' }}>
          <Card.Body className="p-4">
            <h5 className="mb-4 fw-bold" style={{ color: 'var(--pf-text)' }}>Konfirmasi Booking</h5>
            
            {!resolvedTicketId && (
              <div className="mb-3 p-3 rounded d-flex align-items-center gap-2" style={{ background: '#fef3c7', border: '1px solid #fde68a', fontSize: 12.5, color: '#b45309' }}>
                <FaExclamationTriangle /> Tiket belum diverifikasi. Anda akan diarahkan ke halaman scan saat konfirmasi.
              </div>
            )}

            {[
              ['Nama Lengkap', form.name],
              ['Plat Nomor', form.plate],
              ['Nomor HP', form.phone],
              ['Gedung Parkir', parking?.name || ''],
              ['Slot / Lantai', `${parking?.slot || ''} (${parking?.floor || ''})`],
            ].map(([key, value]) => (
              <div key={key} className="d-flex justify-content-between py-2.5 border-bottom border-pf gap-3" style={{ fontSize: 13.5 }}>
                <span style={{ color: 'var(--pf-text2)' }}>{key}</span>
                <strong style={{ color: 'var(--pf-text)', textAlign: 'right', maxWidth: 300 }}>{value}</strong>
              </div>
            ))}

            <div className="d-flex gap-3 justify-content-end mt-4">
              <Button className="btn btn-light" style={{ borderRadius: 10, border: '1px solid var(--pf-border)', background: 'var(--pf-bg3)', color: 'var(--pf-text)' }} onClick={() => setStep(0)} disabled={submitting}>
                ← Kembali
              </Button>
              <Button className="btn btn-primary" style={{ borderRadius: 10, background: 'var(--pf-accent)', color: isDark ? '#0b0d19' : 'white', border: 'none', fontWeight: 'bold' }} onClick={nextStep} disabled={submitting}>
                {submitting ? 'Memproses...' : 'Konfirmasi Booking'}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )

  // STEP 2: SUCCESS STEP
  const renderSuccessStep = () => {
    const details = [
      ['Nama Pemesan', form.name],
      ['Plat Nomor', form.plate],
      ['Gedung', parking?.name || ''],
      ['Nomor Slot', `${parking?.slot || ''} (${parking?.floor || ''})`],
    ]

    return (
      <Row className="justify-content-center animate-fade-up">
        <Col lg={7} xl={6}>
          <Card className="border-0 shadow-lg text-center p-4" style={{ background: 'var(--pf-bg2)', borderRadius: 24, border: '1px solid var(--pf-border)' }}>
            
            {/* Visual Header */}
            <div className="mx-auto my-3 bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: 64, height: 64, fontSize: 30 }}>
              <FaCheckCircle />
            </div>
            
            <h3 className="fw-bold text-slate-900 mb-2" style={{ color: 'var(--pf-text)' }}>Reservasi Berhasil!</h3>
            <p className="text-secondary mb-4" style={{ fontSize: 14, color: 'var(--pf-text2)' }}>
              Pemesanan Anda telah dikonfirmasi oleh sistem. Simpan kode tiket digital di bawah ini.
            </p>

            {/* Ticket Code Box */}
            <div className="p-4 mb-4 text-start" style={{ background: 'var(--pf-bg3)', borderRadius: 16, border: '1.5px dashed var(--pf-border)' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <strong style={{ color: 'var(--pf-text)', fontSize: 14 }}>ParkFinder Ticket</strong>
                <Badge bg="success" className="px-2.5 py-1" style={{ fontSize: 10 }}>Aktif</Badge>
              </div>

              <div className="text-center fw-extrabold text-primary py-2.5 my-2 border-top border-bottom" style={{ fontSize: '1.8rem', letterSpacing: 1.5, color: 'var(--pf-accent)', borderColor: 'var(--pf-border) !important' }}>
                {guestSessionId}
              </div>

              {details.map(([key, value]) => (
                <div key={key} className="d-flex justify-content-between mb-2" style={{ fontSize: 13 }}>
                  <span className="text-muted">{key}</span>
                  <strong className="text-slate-800 text-end" style={{ color: 'var(--pf-text)' }}>{value}</strong>
                </div>
              ))}

              <div className="text-center mt-3 pt-3 border-top text-muted" style={{ fontSize: 11.5, fontWeight: 500, borderColor: 'var(--pf-border)' }}>
                Tunjukkan kode atau QR tiket ini kepada petugas saat tiba di lokasi.
              </div>
            </div>

            {/* Options Button Row */}
            <div className="d-flex flex-wrap gap-2.5 justify-content-center mt-2">
              <Button className="btn btn-primary px-4 py-2" style={{ borderRadius: 10, fontWeight: 'bold', background: 'var(--pf-accent)', color: isDark ? '#0b0d19' : 'white', border: 'none' }} onClick={() => navigate('/my-booking')}>
                Lihat Reservasi Aktif
              </Button>
              <Button className="btn btn-outline-primary px-4 py-2" style={{ borderRadius: 10, fontWeight: 'bold', border: '2px solid var(--pf-accent)', color: 'var(--pf-accent)', background: 'transparent' }} onClick={() => navigate('/swap', { state: { ticketCode: guestSessionId, reservationId, name: form.name, plate: form.plate, phone: form.phone, parking } })}>
                Tukar Slot
              </Button>
              <Button className="btn btn-outline-danger px-4 py-2" style={{ borderRadius: 10, fontWeight: 'bold' }} onClick={() => navigate('/checkout', { state: { ticketCode: guestSessionId, reservationId, name: form.name, plate: form.plate, phone: form.phone, parking } })}>
                Keluar Parkir
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    )
  }

  return (
    <div style={{ paddingTop: 86, minHeight: '100vh', background: 'var(--pf-bg)', color: 'var(--pf-text)', transition: 'background 0.3s ease, color 0.3s ease' }}>
      <Container className="py-4">
        {/* Title */}
        <div className="mb-4">
          <h1 className="fw-extrabold mb-1" style={{ color: 'var(--pf-text)' }}>
            Booking Parkir
          </h1>
          <p className="text-muted" style={{ fontSize: 14 }}>
            Amankan slot parkir Anda sekarang
          </p>
        </div>

        <Stepper steps={STEPS} step={step} />
        
        {step < 2 && <GuestActiveTicketBar className="mb-4" />}

        {step === 0 && renderFormStep()}
        {step === 1 && renderConfirmStep()}
        {step === 2 && renderSuccessStep()}
      </Container>
    </div>
  )
}
