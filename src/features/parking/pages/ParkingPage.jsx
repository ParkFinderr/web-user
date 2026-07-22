import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Col, Container, Row, Card, Badge, Button } from 'react-bootstrap'
import { 
  FaSearch, 
  FaLightbulb, 
  FaCheck, 
  FaBan, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaCreditCard, 
  FaStar,
  FaBolt
} from 'react-icons/fa'
import GuestActiveTicketBar from '../../../shared/components/GuestActiveTicketBar/GuestActiveTicketBar'
import { extractTicketId } from '../../../shared/services/apiClient'
import { ParkingService } from '../services/parkingService'
import { getGuestTicketContextForBooking, saveVerifiedTicketFromApi } from '../../../shared/utils/guestTicketStore'
import { useTheme } from '../../../shared/context/ThemeContext'
import '../../../shared/styles/pages/ParkingPage.css'

import parkingMapCampus from '../../../assets/parking/parking_map_campus.png'
import parkingBuildingElektro from '../../../assets/parking/parking_building_elektro.png'
import parkingBuildingPerpustakaan from '../../../assets/parking/parking_building_perpustakaan.png'

const getSlotName = (slot, index) =>
  slot.slotName || slot.slotNumber || slot.label || `Slot ${index + 1}`

const getSlotAvailable = (slot) => {
  const status = String(slot.appStatus || slot.status || '').toLowerCase()
  return status === 'available' || status === 'empty' || status === 'tersedia'
}

export default function ParkingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const scannedQrCode = location.state?.scannedQrCode || null
  const apiResult = location.state?.apiResult || null

  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(location.state?.id ? location.state : null)
  const [floor, setFloor] = useState('')
  const [selectedSlot, setSelectedSlot] = useState(null)

  const [parkings, setParkings] = useState([])
  const [floors, setFloors] = useState([])
  const [ticketBarKey, setTicketBarKey] = useState(0)

  useEffect(() => {
    if (apiResult && scannedQrCode) {
      saveVerifiedTicketFromApi(apiResult, scannedQrCode)
    }
  }, [apiResult, scannedQrCode])

  useEffect(() => {
    ParkingService.getAllAreas()
      .then(res => {
        if (res.success && res.data) {
          const formatted = res.data.map(p => ({
            id: p.id,
            name: p.name,
            occupancy: p.totalSlots > 0 ? Math.round(((p.totalSlots - p.availableSlots) / p.totalSlots) * 100) : 0,
            slots: `${p.availableSlots}/${p.totalSlots} Kosong`,
            tag: p.availableSlots > 0 ? (p.availableSlots < p.totalSlots * 0.2 ? 'Ramai' : 'Tersedia') : 'Penuh',
            tagClass: p.availableSlots > 0 ? (p.availableSlots < p.totalSlots * 0.2 ? 'orange' : 'green') : 'red',
            address: p.address || 'Bandar Lampung'
          }))
          setParkings(formatted)
        }
      })
      .catch(err => console.error("Error fetching areas", err))
  }, [])

  useEffect(() => {
    if (!selected?.id) return undefined

    let active = true
    ParkingService.getAllSlotsInArea(selected.id)
      .then(res => {
        if (!active) return
        if (res.success && res.data) {
          const floorGroups = {}
          res.data.forEach((slot, index) => {
            const f = slot.floor !== undefined && slot.floor !== null ? `L${slot.floor}` : 'L1'
            const displayName = getSlotName(slot, index)
            const slotKey = String(slot.id ?? `${selected.id}-${f}-${displayName}-${index}`)
            const normalizedSlot = {
              ...slot,
              displayName,
              slotKey,
              isAvailable: getSlotAvailable(slot),
              isReserved: !getSlotAvailable(slot)
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
        }
      })
      .catch(err => {
        if (active) console.error("Error fetching slots", err)
      })

    return () => {
      active = false
    }
  }, [selected?.id])

  const filtered = parkings.filter(parking => parking.name.toLowerCase().includes(search.toLowerCase()))
  const currentFloor = floors.find(item => item.id === floor) || { id: floor, slots: [], available: [], rawSlots: [] }

  const handleSearch = (value) => {
    setSearch(value)
    setSelected(null)
    setSelectedSlot(null)
    setFloors([])
    setFloor('')
  }

  const handleBook = () => {
    if (!selectedSlot) return
    const slotData = selectedSlot
    const ticketCtx = getGuestTicketContextForBooking()
    const effectiveApiResult = apiResult || ticketCtx.apiResult
    const effectiveQr = scannedQrCode || ticketCtx.scannedQrCode
    if (!extractTicketId(effectiveApiResult) && !ticketCtx.ticketId) {
      navigate('/scan', {
        state: {
          redirect: '/parking',
          parking: {
            ...selected,
            slot: slotData?.displayName,
            slotId: slotData?.id,
            floor,
          },
        },
      })
      return
    }
    navigate('/booking', {
      state: {
        ...selected,
        slot: slotData?.displayName,
        slotId: slotData?.id,
        floor,
        scannedQrCode: effectiveQr,
        apiResult: effectiveApiResult,
      },
    })
  }

  const isSelectedMode = !!selected

  return (
    <div className="parking-layout animate-fade-in" style={{ 
      paddingTop: 86, 
      minHeight: '100vh', 
      background: 'var(--pf-bg)', 
      color: 'var(--pf-text)',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      <Container className="py-4">
        {!isSelectedMode ? (
          // Unifed Default View: Split screen map-building list
          <Row className="g-4">
            {/* Left Column: Search & Lists */}
            <Col lg={5} className="animate-fade-up">
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control py-2.5 px-4"
                  placeholder="Cari parkir gedung..."
                  value={search}
                  onChange={e => handleSearch(e.target.value)}
                  style={{ 
                    borderRadius: 12, 
                    border: '1px solid var(--pf-border)', 
                    background: 'var(--pf-bg2)',
                    color: 'var(--pf-text)'
                  }}
                />
              </div>

              {/* Active Ticket Notification Bar */}
              <GuestActiveTicketBar key={ticketBarKey} onCancelled={() => setTicketBarKey(k => k + 1)} className="mb-4" />

              {/* Filters Row */}
              <div className="d-flex gap-2 mb-4 overflow-auto pb-1" style={{ whiteSpace: 'nowrap' }}>
                <span className="border px-3 py-2 fw-semibold" style={{ background: 'var(--pf-bg2)', color: 'var(--pf-text)', borderRadius: 8, cursor: 'pointer', fontSize: 12 }}>Slot Kosong Terbanyak</span>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-5 text-muted">Tidak ditemukan hasil.</div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {filtered.map((p, idx) => (
                    <Card 
                      key={p.id} 
                      onClick={() => setSelected(p)}
                      className="border-0 overflow-hidden shadow-sm" 
                      style={{ background: 'var(--pf-bg2)', borderRadius: 16, border: '1px solid var(--pf-border)', cursor: 'pointer' }}
                    >
                      <Row className="g-0 align-items-center">
                        <Col xs={4}>
                          <img src={idx % 2 === 0 ? parkingBuildingElektro : parkingBuildingPerpustakaan} alt={p.name} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                        </Col>
                        <Col xs={8}>
                          <Card.Body className="p-3">
                            <div className="d-flex justify-content-between">
                              <h6 className="fw-bold mb-1" style={{ color: 'var(--pf-text)' }}>{p.name}</h6>
                            </div>
                            <p className="text-muted mb-2" style={{ fontSize: 11, color: 'var(--pf-text2)' }}>{p.address}</p>
                            
                            <div className="d-flex gap-2 mb-2">
                              <span style={{ background: 'var(--pf-green-bg)', color: 'var(--pf-green)', fontSize: 9, padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>TERSEDIA</span>
                            </div>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </div>
              )}
            </Col>

            {/* Right Column: Map Preview */}
            <Col lg={7} className="animate-fade-up delay-1">
              <Card className="h-100 border-0 overflow-hidden shadow-sm" style={{ background: 'var(--pf-bg2)', borderRadius: 20, minHeight: 480, border: '1px solid var(--pf-border)' }}>
                <div className="position-relative" style={{ height: '100%', width: '100%' }}>
                  <img src={parkingMapCampus} alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <Button 
                    className="position-absolute text-white border-0 px-4 py-2 shadow d-flex align-items-center gap-2" 
                    style={{ bottom: 30, left: '50%', transform: 'translateX(-50%)', borderRadius: 30, background: 'var(--pf-accent)', color: isDark ? '#0b0d19' : 'white', fontWeight: 'bold' }}
                    onClick={() => setSelected(filtered[0])}
                    disabled={filtered.length === 0}
                  >
                    <FaCreditCard /> Pesan Gedung Parkir
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        ) : (
          // Unified Selected View: Slot Grid
          <Row className="g-4">
            <Col lg={8} className="animate-fade-up">
              {/* Back button and title */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <Button 
                  variant="link" 
                  className="text-decoration-none p-0" 
                  style={{ color: 'var(--pf-text)' }}
                  onClick={() => { setSelected(null); setSelectedSlot(null); setFloors([]); setFloor('') }}
                >
                  ← KEMBALI KE DETAIL PARKIR
                </Button>
              </div>
              <h1 className="fw-bold mb-1" style={{ color: 'var(--pf-text)' }}>Pilih Slot Parkir</h1>
              <p className="text-muted mb-4" style={{ fontSize: 13, color: 'var(--pf-text2)' }}>
                {selected.name} • {floor} • Lantai Premium
              </p>

              {/* Legend bar */}
              <Card className="border-0 p-3 mb-4 text-start shadow-sm" style={{ background: 'var(--pf-bg2)', borderRadius: 12, border: '1px solid var(--pf-border)' }}>
                <div className="d-flex gap-4 flex-wrap">
                  <div className="d-flex align-items-center gap-2" style={{ fontSize: 12.5 }}>
                    <span style={{ width: 14, height: 14, border: '1px solid var(--pf-border)', background: 'var(--pf-bg3)', borderRadius: 3, display: 'inline-block' }} /> Tersedia
                  </div>
                  <div className="d-flex align-items-center gap-2" style={{ fontSize: 12.5 }}>
                    <span style={{ width: 14, height: 14, background: 'var(--pf-accent)', borderRadius: 3, display: 'inline-block' }} /> Terpilih
                  </div>
                  <div className="d-flex align-items-center gap-2" style={{ fontSize: 12.5 }}>
                    <span style={{ width: 14, height: 14, background: '#d97706', borderRadius: 3, display: 'inline-block' }} /> Terisi
                  </div>
                </div>
              </Card>

              {/* Floor selection selector */}
              <Card className="border-0 p-4 mb-4 shadow-sm" style={{ background: 'var(--pf-bg2)', borderRadius: 16, border: '1px solid var(--pf-border)' }}>
                <h6 className="fw-bold mb-3" style={{ color: 'var(--pf-text)' }}>Pilih Lantai/Sektor:</h6>
                <div className="d-flex gap-2">
                  {floors.map(floorOption => (
                    <Button
                      key={floorOption.id}
                      onClick={() => { setFloor(floorOption.id); setSelectedSlot(null) }}
                      className="px-3 py-1.5 font-bold"
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
              </Card>

              {/* Slot Selection Visual Grid */}
              <Card className="border-0 p-5 text-center shadow-sm" style={{ background: 'var(--pf-bg2)', borderRadius: 20, border: '1px solid var(--pf-border)' }}>
                <div className="text-uppercase text-muted fw-bold mb-4" style={{ fontSize: 10, letterSpacing: 2, color: 'var(--pf-text3)' }}>
                  ⬇ PINTU MASUK
                </div>

                <Row className="g-3 justify-content-center">
                  {currentFloor.rawSlots?.map((slot, index) => {
                    const isAvailable = slot.isAvailable
                    const isSelected = selectedSlot?.slotKey === slot.slotKey
                    const isReserved = slot.isReserved

                    let bgC = 'var(--pf-bg3)'
                    let borderC = 'var(--pf-border)'
                    let textC = 'var(--pf-text2)'

                    if (isSelected) {
                      bgC = 'var(--pf-accent-glow)'
                      borderC = 'var(--pf-accent)'
                      textC = 'var(--pf-accent)'
                    } else if (!isAvailable || isReserved) {
                      bgC = 'rgba(217, 119, 6, 0.1)'
                      borderC = '#d97706'
                      textC = '#d97706'
                    }

                    return (
                      <Col xs={6} sm={4} md={3} key={slot.slotKey}>
                        <button
                          onClick={() => isAvailable && !isReserved && setSelectedSlot(slot)}
                          className="w-100 p-4 border-0 d-flex flex-column align-items-center justify-content-center gap-1"
                          disabled={!isAvailable || isReserved}
                          style={{
                            background: bgC,
                            color: textC,
                            borderRadius: 12,
                            fontWeight: 'bold',
                            fontSize: 16,
                            cursor: (isAvailable && !isReserved) ? 'pointer' : 'not-allowed',
                            border: `2px solid ${borderC}`,
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <span>{slot.displayName}</span>
                        </button>
                      </Col>
                    )
                  })}
                </Row>
              </Card>
            </Col>

            {/* Right Column: Ringkasan Reservasi */}
            <Col lg={4} className="animate-fade-up delay-1">
              <Card className="border-0 p-4 text-start shadow-sm" style={{ background: 'var(--pf-bg2)', borderRadius: 20, border: '1px solid var(--pf-border)' }}>
                <h4 className="fw-bold mb-4" style={{ color: 'var(--pf-text)' }}>Ringkasan Reservasi</h4>

                <div className="d-flex justify-content-between py-2.5 border-bottom" style={{ fontSize: 13.5, borderColor: 'var(--pf-border)' }}>
                  <span className="text-muted">Slot Terpilih</span>
                  <span className="fw-bold" style={{ color: 'var(--pf-text)' }}>{selectedSlot ? `${selectedSlot.displayName}` : '--'}</span>
                </div>
                <div className="d-flex justify-content-between py-2.5 border-bottom" style={{ fontSize: 13.5, borderColor: 'var(--pf-border)' }}>
                  <span className="text-muted">Zona Parkir</span>
                  <span className="fw-bold" style={{ color: 'var(--pf-text)' }}>{floor}, Zona A</span>
                </div>
                <div className="d-flex justify-content-between py-2.5 border-bottom" style={{ fontSize: 13.5, borderColor: 'var(--pf-border)' }}>
                  <span className="text-muted">Estimasi Durasi</span>
                  <span className="fw-bold" style={{ color: 'var(--pf-text)' }}>Sesuai Jam Masuk</span>
                </div>

                <div className="my-4 p-3 rounded d-flex align-items-start gap-2.5" style={{ background: isDark ? 'rgba(96,165,250,0.1)' : '#f0fdf4', border: '1px solid var(--pf-border)' }}>
                  <span style={{ fontSize: 16, color: 'var(--pf-accent)', display: 'flex' }}><FaLightbulb /></span>
                  <p className="mb-0 text-muted" style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--pf-text2)' }}>
                    Reservasi Anda akan ditahan selama 15 menit setelah konfirmasi untuk kedatangan Anda.
                  </p>
                </div>

                <Button
                  onClick={handleBook}
                  className="w-100 py-3 mt-2"
                  style={{ borderRadius: 12, background: 'var(--pf-accent)', color: isDark ? '#0b0d19' : 'white', fontWeight: 'bold', border: 'none' }}
                  disabled={!selectedSlot}
                >
                  Konfirmasi Reservasi →
                </Button>

                <div className="text-center text-muted mt-3" style={{ fontSize: 11 }}>
                  Pembatalan gratis tersedia sebelum Anda check-in ke gerbang masuk.
                </div>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  )
}
