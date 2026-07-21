import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaExchangeAlt, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'
import Stepper from '../../../shared/components/Stepper/Stepper'
import { useTheme } from '../../../shared/context/ThemeContext'
import { ParkingService } from '../../parking/services/parkingService'
import { SwapService } from '../services/swapService'
import { updateBooking } from '../../../shared/utils/bookingStore'
import '../../../shared/styles/pages/SwapPage.css'

import scanLightMock from '../../../assets/scan_light_mock.png'

const getSlotName = (slot, index) =>
  slot.slotName || slot.slotNumber || slot.label || `Slot ${index + 1}`

const getSlotAvailable = (slot) => {
  const status = String(slot.appStatus || slot.status || '').toLowerCase()
  return status === 'available' || status === 'empty' || status === 'tersedia'
}

function unwrapList(res) {
  if (res == null) return null
  if (Array.isArray(res)) return res
  if (Array.isArray(res?.data)) return res.data
  if (res?.success !== false && res?.data != null) return res.data
  return null
}

function unwrapArea(res) {
  const raw = unwrapList(res) ?? res
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw
  return null
}

export default function SwapPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const booking = location.state

  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const [step, setStep] = useState(0)

  const [parkings, setParkings] = useState([])
  const [selectedParking, setSelectedParking] = useState(null)

  const [floors, setFloors] = useState([])
  const [floor, setFloor] = useState('')
  const [newSlot, setNewSlot] = useState(null)

  const [swapping, setSwapping] = useState(false)
  const [newTicketCode, setNewTicketCode] = useState('')

  useEffect(() => {
    if (booking?.parking?.id) {
      ParkingService.getAreaById(booking.parking.id)
        .then(res => {
          const p = unwrapArea(res)
          if (p?.id) {
            const formatted = {
              id: p.id,
              name: p.name,
              occupancy: p.totalSlots > 0 ? Math.round(((p.totalSlots - p.availableSlots) / p.totalSlots) * 100) : 0,
              slots: `${p.availableSlots}/${p.totalSlots} Kosong`,
              distance: '300m',
              tag: p.availableSlots > 0 ? (p.availableSlots < p.totalSlots * 0.2 ? 'Ramai' : 'Tersedia') : 'Penuh',
              tagClass: p.availableSlots > 0 ? (p.availableSlots < p.totalSlots * 0.2 ? 'orange' : 'green') : 'red',
              address: p.address || 'Bandar Lampung'
            };
            setParkings([formatted])
            setSelectedParking(formatted)
          }
        })
        .catch(err => console.error("Error fetching area for swap", err))
    }
  }, [booking])

  useEffect(() => {
    if (!selectedParking?.id) return undefined

    let active = true
    ParkingService.getAllSlotsInArea(selectedParking.id)
      .then(res => {
        if (!active) return

        const list = unwrapList(res)
        if (!Array.isArray(list)) {
          setFloors([])
          setFloor('')
          return
        }

        const floorGroups = {}
        list.forEach((slot, index) => {
          const f = slot.floor !== undefined && slot.floor !== null ? `L${slot.floor}` : 'L1'
          const displayName = getSlotName(slot, index)
          const slotKey = String(slot.id ?? `${selectedParking.id}-${f}-${displayName}-${index}`)
          const normalizedSlot = {
            ...slot,
            displayName,
            slotKey,
            isAvailable: getSlotAvailable(slot),
          }

          if (!floorGroups[f]) floorGroups[f] = { id: f, slots: [], available: [], rawSlots: [] }
          floorGroups[f].slots.push(displayName)
          floorGroups[f].available.push(normalizedSlot.isAvailable)
          floorGroups[f].rawSlots.push(normalizedSlot)
        })

        const floorArr = Object.values(floorGroups).sort((a, b) =>
          a.id.localeCompare(b.id, undefined, { numeric: true })
        )
        setFloors(floorArr)
        setFloor(floorArr[0]?.id || '')
      })
      .catch(err => {
        if (!active) return
        console.error("Error fetching slots", err)
        setFloors([])
        setFloor('')
      })

    return () => {
      active = false
    }
  }, [selectedParking?.id])

  if (!booking) {
    return (
      <div style={{ paddingTop: 86, minHeight: '100vh', background: 'var(--pf-bg)', color: 'var(--pf-text)' }}>
        <Container className="py-5 text-center">
          <div style={{ fontSize: 56, marginBottom: 16 }}>⚠️</div>
          <h3>Tidak Ada Sesi Parkir Aktif</h3>
          <p className="mb-4">Anda perlu melakukan booking terlebih dahulu sebelum menukar slot.</p>
          <Button className="btn btn-pf-primary" onClick={() => navigate('/parking')}>
            Pesan Sekarang
          </Button>
        </Container>
      </div>
    )
  }

  const handleConfirmSwap = async () => {
    setSwapping(true)
    try {
      const slotData = newSlot

      if (!booking.reservationId) {
        throw new Error('ID reservasi tidak ditemukan di data lokal.')
      }
      if (!slotData?.id) {
        throw new Error('Pilih slot tujuan baru terlebih dahulu.')
      }

      await SwapService.swapSlot(booking.reservationId, slotData.id)
      const nextTicketCode = `PKF-SW-${Date.now().toString(36).toUpperCase().slice(-6)}`
      setNewTicketCode(nextTicketCode)

      updateBooking(booking.ticketCode, {
        ticketCode: nextTicketCode,
        reservationId: booking.reservationId,
        parking: { ...booking.parking, slot: slotData.displayName, floor }
      })

      setSwapping(false)
      setStep(2)
    } catch (err) {
      console.error("Gagal swap:", err)
      alert(err.message || "Gagal memproses tukar slot parkir.")
      setSwapping(false)
    }
  }

  // --- RENDERING SUB-VIEWS ---

  // STEP 0: SELECT SLOT STEP
  const renderSelectStep = () => (
    <Row className="g-4 animate-fade-up">
      <Col lg={8}>
        {/* Floor selection */}
        <Card className="border-0 shadow-sm p-4 mb-4" style={{ background: 'var(--pf-bg2)', borderRadius: 16, border: '1px solid var(--pf-border)' }}>
          <h5 className="fw-bold mb-3" style={{ color: 'var(--pf-text)' }}>Pilih Slot Baru Tersedia</h5>
          <div className="d-flex gap-2 flex-wrap mb-4">
            {floors.map(floorOption => (
              <Button
                key={floorOption.id}
                onClick={() => { setFloor(floorOption.id); setNewSlot(null) }}
                style={{
                  borderRadius: 8,
                  fontWeight: 'bold',
                  fontSize: 13,
                  background: floorOption.id === floor ? 'var(--pf-accent)' : 'var(--pf-bg3)',
                  color: floorOption.id === floor ? (isDark ? '#0b0d19' : 'white') : 'var(--pf-text)',
                  border: 'none'
                }}
              >
                {floorOption.id}
              </Button>
            ))}
          </div>

          {/* Grid display */}
          <Row className="g-3">
            {currentFloor.rawSlots?.map((slot, index) => {
              const isAvailable = slot.isAvailable
              const isSelected = newSlot?.slotKey === slot.slotKey
              const isCurrent = booking.parking?.slot === slot.displayName && booking.parking?.floor === floor

              let borderC = 'var(--pf-border)'
              let bgC = 'var(--pf-bg3)'
              let textC = 'var(--pf-text3)'

              if (isSelected) {
                borderC = 'var(--pf-accent)'
                bgC = 'var(--pf-accent-glow)'
                textC = 'var(--pf-accent)'
              } else if (isCurrent) {
                borderC = '#e74c3c'
                bgC = 'rgba(231,76,60,0.1)'
                textC = '#e74c3c'
              } else if (isAvailable) {
                borderC = '#27ae60'
                bgC = 'rgba(39,174,96,0.1)'
                textC = '#27ae60'
              }

              return (
                <Col xs={6} sm={4} md={3} key={slot.slotKey}>
                  <button
                    onClick={() => isAvailable && !isCurrent && setNewSlot(slot)}
                    disabled={!isAvailable || isCurrent}
                    className="w-100 p-4 border-0 d-flex flex-column align-items-center justify-content-center gap-1"
                    style={{
                      borderRadius: 12,
                      background: bgC,
                      color: textC,
                      border: `1px solid ${borderC}`,
                      fontWeight: 'bold',
                      cursor: (isAvailable && !isCurrent) ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{slot.displayName}</span>
                    <span style={{ fontSize: 10 }}>
                      {isCurrent ? 'Posisi Anda' : isAvailable ? 'Tersedia' : 'Terisi'}
                    </span>
                  </button>
                </Col>
              )
            })}
          </Row>
        </Card>
      </Col>

      {/* Right Column: Swap Summary */}
      <Col lg={4}>
        <Card className="border-0 shadow-sm p-4 text-start" style={{ background: 'var(--pf-bg2)', borderRadius: 16, border: '1px solid var(--pf-border)' }}>
          <h5 className="fw-bold mb-4" style={{ color: 'var(--pf-text)' }}>Detail Perpindahan</h5>
          <div className="mb-4">
            <div className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: 10 }}>Slot Lama</div>
            <h6 className="fw-bold text-danger">{booking.parking?.slot} ({booking.parking?.floor})</h6>
            <small className="text-muted d-block">{booking.parking?.name}</small>
          </div>

          <div className="mb-4 pt-3 border-top" style={{ borderColor: 'var(--pf-border)' }}>
            <div className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: 10 }}>Slot Baru</div>
            <h6 className="fw-bold text-success">
              {newSlot ? `${newSlot.displayName} (${floor})` : '--'}
            </h6>
            <small className="text-muted d-block">{selectedParking?.name || ''}</small>
          </div>

          <Button
            onClick={() => setStep(1)}
            disabled={!newSlot}
            className="w-100 py-3 font-bold mt-2"
            style={{ borderRadius: 12, fontWeight: 'bold', background: 'var(--pf-accent)', color: isDark ? '#0b0d19' : 'white', border: 'none' }}
          >
            Lanjutkan ke Konfirmasi →
          </Button>
        </Card>
      </Col>
    </Row>
  )

  // STEP 1: CONFIRM SWAP STEP
  const renderConfirmStep = () => (
    <Row className="g-4 animate-fade-up">
      {/* Left Column: Visual Swap and Warning */}
      <Col lg={7}>
        {/* Swap visual card */}
        <Card className="border-0 shadow-sm p-4 mb-4" style={{ background: 'var(--pf-bg2)', borderRadius: 20, border: '1px solid var(--pf-border)' }}>
          <div className="d-flex align-items-center justify-content-between gap-3 text-center my-3">
            <div className="p-3 rounded flex-fill" style={{ borderRadius: 12, background: 'var(--pf-bg3)' }}>
              <div className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: 9 }}>Slot Lama</div>
              <h5 className="fw-bold mb-0" style={{ color: 'var(--pf-text)' }}>{booking.parking?.slot} ({booking.parking?.floor})</h5>
              <small className="text-muted">{booking.parking?.name}</small>
            </div>

            <div className="fs-3" style={{ display: 'flex', color: 'var(--pf-accent)' }}><FaExchangeAlt /></div>

            <div className="p-3 rounded flex-fill" style={{ borderRadius: 12, border: '1.5px solid var(--pf-accent)', background: 'var(--pf-bg3)' }}>
              <div className="text-uppercase fw-bold mb-1" style={{ fontSize: 9, color: 'var(--pf-accent)' }}>Slot Baru</div>
              <h5 className="fw-bold mb-0" style={{ color: 'var(--pf-accent)' }}>{newSlot?.displayName} ({floor})</h5>
              <small className="text-muted">{selectedParking?.name}</small>
            </div>
          </div>

          {/* Warning block */}
          <div className="p-3.5 mt-3 rounded-3 d-flex align-items-start gap-2.5" style={{ background: isDark ? 'rgba(245, 158, 11, 0.1)' : '#fffbeb', border: '1px solid var(--pf-border)' }}>
            <span className="text-warning fs-5" style={{ display: 'flex' }}><FaExclamationTriangle /></span>
            <div>
              <strong className="d-block mb-1" style={{ fontSize: 13.5, color: isDark ? '#fbbf24' : '#b45309' }}>Peringatan Penting</strong>
              <p className="mb-0 text-muted" style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--pf-text2)' }}>
                Mohon pindahkan kendaraan Anda ke slot baru ({floor} / {newSlot?.displayName}) segera setelah menekan tombol konfirmasi. Slot lama Anda akan segera tersedia untuk pengguna lain.
              </p>
            </div>
          </div>
        </Card>

        {/* Location Visualization Image */}
        <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: 20, border: '1px solid var(--pf-border)' }}>
          <div className="position-relative">
            <img src={scanLightMock} alt="Visualisasi Lokasi" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
            <div className="position-absolute w-100 p-3 text-white" style={{ bottom: 0, left: 0, backgroundImage: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
              <div className="fw-bold" style={{ fontSize: 14 }}>Visualisasi Lokasi</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Zonasi Lantai {floor.replace('L', '')}</div>
            </div>
          </div>
        </Card>
      </Col>

      {/* Right Column: Ringkasan Pemesanan */}
      <Col lg={5}>
        <Card className="border-0 shadow-sm p-4 text-start" style={{ background: 'var(--pf-bg2)', borderRadius: 20, border: '1px solid var(--pf-border)' }}>
          <h5 className="fw-bold mb-4" style={{ color: 'var(--pf-text)' }}>Ringkasan Pemesanan</h5>
          {[
            ['Nama Pemesan', booking.name],
            ['Plat Nomor', booking.plate],
            ['Nomor HP', booking.phone],
            ['Kode Tiket', booking.ticketCode],
          ].map(([key, value]) => (
            <div key={key} className="d-flex justify-content-between py-2.5 border-bottom gap-3" style={{ fontSize: 13.5, borderColor: 'var(--pf-border)' }}>
              <span className="text-muted">{key}</span>
              <span className="fw-bold text-end" style={{ maxWidth: 200, color: 'var(--pf-text)' }}>{value}</span>
            </div>
          ))}

          <div className="d-flex flex-column gap-2 mt-4">
            <Button 
              onClick={handleConfirmSwap}
              className="w-100 py-3 font-bold" 
              style={{ borderRadius: 12, fontWeight: 'bold', background: 'var(--pf-accent)', color: isDark ? '#0b0d19' : 'white', border: 'none' }}
              disabled={swapping}
            >
              {swapping ? 'Memproses...' : 'Lanjut Konfirmasi Tukar'}
            </Button>
            <Button 
              variant="link" 
              className="w-100 text-decoration-none text-muted" 
              onClick={() => setStep(0)}
              disabled={swapping}
            >
              Batalkan
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  )

  // STEP 2: SUCCESS SWAP STEP
  const renderSuccessStep = () => (
    <Row className="justify-content-center animate-fade-up">
      <Col lg={6}>
        <Card className="border-0 shadow-sm text-center p-4" style={{ background: 'var(--pf-bg2)', borderRadius: 24, border: '1px solid var(--pf-border)' }}>
          <div className="mx-auto my-3 bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: 64, height: 64, fontSize: 30 }}>
            <FaCheckCircle />
          </div>
          <h3 className="fw-bold text-slate-900 mb-2" style={{ color: 'var(--pf-text)' }}>Penukaran Berhasil!</h3>
          <p className="text-secondary mb-4" style={{ fontSize: 13.5, color: 'var(--pf-text2)' }}>
            Slot parkir Anda telah resmi dipindahkan ke slot baru. Gunakan tiket baru Anda berikut ini.
          </p>

          <div className="p-4 mb-4 text-start" style={{ background: 'var(--pf-bg3)', borderRadius: 16, border: '1px dashed var(--pf-border)' }}>
            <div className="text-center fw-extrabold text-success py-2.5 my-2 border-top border-bottom" style={{ fontSize: '1.8rem', letterSpacing: 1.5, borderColor: 'var(--pf-border)' }}>
              {newTicketCode}
            </div>
            
            <div className="d-flex justify-content-between py-2 border-bottom" style={{ fontSize: 13, borderColor: 'var(--pf-border)' }}>
              <span className="text-muted">Kawasan / Gedung</span>
              <strong style={{ color: 'var(--pf-text)' }}>{selectedParking?.name || ''}</strong>
            </div>
            <div className="d-flex justify-content-between py-2 border-bottom" style={{ fontSize: 13, borderColor: 'var(--pf-border)' }}>
              <span className="text-muted">Lantai / Sektor</span>
              <strong style={{ color: 'var(--pf-text)' }}>{floor}</strong>
            </div>
            <div className="d-flex justify-content-between py-2 border-bottom" style={{ fontSize: 13, borderColor: 'var(--pf-border)' }}>
              <span className="text-muted">Slot Baru Anda</span>
              <strong className="text-primary" style={{ color: 'var(--pf-accent)' }}>{newSlot?.displayName || ''}</strong>
            </div>
          </div>

          <Button className="btn btn-primary px-4 py-2 w-100" style={{ borderRadius: 12, fontWeight: 'bold', background: 'var(--pf-accent)', color: isDark ? '#0b0d19' : 'white', border: 'none' }} onClick={() => navigate('/my-booking')}>
            Kembali ke Status Parkir
          </Button>
        </Card>
      </Col>
    </Row>
  )

  const steps = ['Pilih Slot Baru', 'Konfirmasi Tukar', 'Selesai']

  const currentFloor = floors.find(item => item.id === floor) || { id: floor, slots: [], available: [], rawSlots: [] }

  return (
    <div style={{ paddingTop: 86, minHeight: '100vh', background: 'var(--pf-bg)', color: 'var(--pf-text)', transition: 'background 0.3s ease, color 0.3s ease' }}>
      <Container className="py-4">
        {/* Header Title */}
        <div className="mb-4">
          <h1 className="fw-extrabold mb-1" style={{ color: 'var(--pf-text)' }}>
            Konfirmasi Tukar Slot
          </h1>
          <p className="text-muted" style={{ fontSize: 14 }}>
            Ubah slot parkir Anda ke posisi baru yang tersedia
          </p>
        </div>

        <Stepper steps={steps} step={step} />

        <div className="mt-4">
          {step === 0 && renderSelectStep()}
          {step === 1 && renderConfirmStep()}
          {step === 2 && renderSuccessStep()}
        </div>
      </Container>
    </div>
  )
}
