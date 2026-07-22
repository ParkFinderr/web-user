import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { 
  FaSearch, 
  FaBolt, 
  FaMobileAlt, 
  FaMapMarkedAlt, 
  FaBell, 
  FaLock, 
  FaCheck, 
  FaArrowRight 
} from 'react-icons/fa'
import { useTheme } from '../../../shared/context/ThemeContext'
import LandingFooter from '../../../shared/components/LandingFooter/LandingFooter'
import { ParkingService } from '../../parking/services/parkingService'

import landingHeroCampus from '../../../assets/landing/landing_hero_campus.png'
import landingHeroNature from '../../../assets/landing/landing_hero_nature.png'

const CDN = 'https://storage.googleapis.com/parkfinderbucket'

const FEATURES = [
  { icon: <FaSearch />, title: 'Cari Parkir Real-time',  desc: 'Temukan slot parkir tersedia di sekitar Anda secara real-time.' },
  { icon: <FaBolt />, title: 'Booking Instan',         desc: 'Amankan slot parkir favorit Anda dalam hitungan detik.' },
  { icon: <FaMobileAlt />, title: 'QR Ticket Digital',      desc: 'Scan QR code tiket parkir digital. Tanpa kertas, tanpa antre.' },
  { icon: <FaMapMarkedAlt />, title: 'Panduan Navigasi',       desc: 'Panduan langkah demi langkah menuju slot parkir Anda.' },
  { icon: <FaBell />, title: 'Notifikasi Aktif',       desc: 'Pengingat otomatis sebelum waktu booking Anda habis.' },
  { icon: <FaLock />, title: 'Slot Terjamin Aman',     desc: 'Slot yang sudah di-booking tidak bisa diambil orang lain.' },
]

const STEPS = [
  { num: '01', title: 'Cari Lokasi', desc: 'Masukkan tujuan Anda untuk melihat gedung parkir terdekat.' },
  { num: '02', title: 'Pilih Slot',  desc: 'Lihat peta okupansi visual dan pilih slot favorit Anda.' },
  { num: '03', title: 'Pesan Instan',desc: 'Isi data kendaraan Anda dan dapatkan tiket QR digital secara instan.' },
  { num: '04', title: 'Check-in',    desc: 'Scan tiket Anda di pintu masuk. Sistem otomatis membuka gerbang.' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const [stats, setStats] = useState([
    { label: 'Total Slot', value: '-' },
    { label: 'Gedung Terintegrasi', value: '-' }
  ])

  useEffect(() => {
    let active = true

    const fetchStats = async () => {
      try {
        const res = await ParkingService.getAllAreas()
        if (!active) return
        if (res.success && Array.isArray(res.data)) {
          const areas = res.data
          let totalSlots = 0
          let availableSlots = 0

          areas.forEach(p => {
            totalSlots += Number(p.totalSlots || p.total_slots || 0)
            availableSlots += Number(p.availableSlots || p.available_slots || 0)
          })

          const totalAreas = areas.length

          setStats([
            { label: 'Total Slot', value: `${totalSlots}` },
            { label: 'Gedung Terintegrasi', value: `${totalAreas}` }
          ])
        }
      } catch (err) {
        console.warn('Failed to load real landing stats', err)
      }
    }

    fetchStats()

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="landing-layout animate-fade-in" style={{ 
      background: 'var(--pf-bg)', 
      color: 'var(--pf-text)', 
      minHeight: '100vh', 
      paddingTop: '100px',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      <Container className="py-5">
        <Row className="align-items-center g-5 mb-5">
          <Col lg={6}>
            <div className="animate-fade-up">
              <span className="section-label mb-3 d-inline-block" style={{ 
                background: isDark ? 'rgba(96, 165, 250, 0.15)' : '#e0f2fe', 
                color: isDark ? '#60a5fa' : '#0284c7', 
                padding: '6px 16px', 
                borderRadius: '30px', 
                fontWeight: 'bold', 
                fontSize: 12 
              }}>
                ● SISTEM PARKIR PINTAR
              </span>
              <h1 className="fw-extrabold mb-4" style={{ fontSize: '3rem', lineHeight: '1.2', color: 'var(--pf-text)' }}>
                Parkir Pintar<br />
                <span style={{ color: 'var(--pf-accent)' }}>jadi Mudah.</span>
              </h1>
              <p className="mb-5" style={{ fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '520px', color: 'var(--pf-text2)' }}>
                ParkFinder adalah platform parkir pintar yang membantu pengemudi menemukan, memesan, dan mengelola slot parkir secara instan. Jelajahi solusi tanpa hambatan kami dan amankan tempat Anda sebelum tiba.
              </p>
              <div className="d-flex gap-3">
                <Button className="btn btn-primary btn-lg px-4 py-3 d-flex align-items-center gap-2" style={{ borderRadius: 12, fontWeight: 'bold', background: 'var(--pf-accent)', border: 'none', color: isDark ? '#0b0d19' : 'white' }} onClick={() => navigate('/scan', { state: { redirect: '/parking' } })}>
                  <FaMobileAlt /> Pindai &amp; Pesan Parkir
                </Button>
                <Button className="btn btn-light btn-lg px-4 py-3" style={{ borderRadius: 12, fontWeight: 'bold', border: '1px solid var(--pf-border)', background: 'var(--pf-bg2)', color: 'var(--pf-text)' }} onClick={() => navigate('/tentang-project')}>
                  Pelajari Selengkapnya <FaArrowRight className="ms-1" />
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={6} className="position-relative animate-fade-up delay-2">
            <div className="hero-img-wrapper" style={{ borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--pf-nav-shadow)', border: '1px solid var(--pf-border)' }}>
              <img src={isDark ? landingHeroNature : landingHeroCampus} alt="Sistem Parkir Pintar" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            {/* Float badge */}
            <div className="position-absolute p-3 rounded-4 shadow-lg d-flex align-items-center gap-12" style={{ 
              top: 30, 
              right: 30, 
              background: 'var(--pf-bg2)', 
              border: '1px solid var(--pf-border)', 
              zIndex: 10,
              gap: 12
            }}>
              <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: 24, height: 24 }}>
                <FaCheck style={{ color: 'white', fontSize: 10 }} />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: 12, color: 'var(--pf-text3)' }}>Ketersediaan Langsung</div>
                <div style={{ fontWeight: 'extrabold', fontSize: 14, color: 'var(--pf-text)' }}>Slot B-42 Tersedia</div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Stats Row */}
        <Row className="g-4 mb-5 pt-5 animate-fade-up delay-3">
          {stats.map((s, idx) => (
            <Col key={idx} xs={6} md={6}>
              <Card className="text-center p-4 border-0 shadow-sm" style={{ background: 'var(--pf-bg2)', borderRadius: 16 }}>
                <h2 className="fw-extrabold mb-1" style={{ fontSize: '2.2rem', color: 'var(--pf-accent)' }}>{s.value}</h2>
                <div className="text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '1px', color: 'var(--pf-text3)' }}>{s.label}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Features, Steps, Footer */}
      <section style={{ background: 'var(--pf-bg2)', py: 80, borderTop: '1px solid var(--pf-border)', borderBottom: '1px solid var(--pf-border)', padding: '60px 0' }}>
        <Container>
          <h2 className="text-center fw-bold mb-5">Fitur Unggulan</h2>
          <Row className="g-4">
            {FEATURES.map((f, idx) => (
              <Col key={idx} md={4}>
                <Card className="h-100 p-3 border-0 shadow-sm" style={{ borderRadius: 14, background: 'var(--pf-bg3)', border: '1px solid var(--pf-border)' }}>
                  <Card.Body>
                    <div style={{ fontSize: '2rem', marginBottom: 12, color: 'var(--pf-accent)', display: 'flex' }}>{f.icon}</div>
                    <h5 className="fw-bold mb-2">{f.title}</h5>
                    <p className="mb-0" style={{ fontSize: 13.5, color: 'var(--pf-text2)' }}>{f.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5" style={{ background: 'var(--pf-bg)' }}>
        <Container>
          <h2 className="text-center fw-bold mb-5">Cara Penggunaan</h2>
          <Row className="g-4">
            {STEPS.map((s, idx) => (
              <Col key={idx} md={3}>
                <Card className="h-100 p-3 border-0 shadow-sm" style={{ borderRadius: 14, background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)' }}>
                  <Card.Body>
                    <div className="fw-extrabold mb-3" style={{ fontSize: '2rem', color: 'var(--pf-accent)' }}>{s.num}</div>
                    <h5 className="fw-bold mb-2">{s.title}</h5>
                    <p className="mb-0" style={{ fontSize: 13.5, color: 'var(--pf-text2)' }}>{s.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <LandingFooter cdn={CDN} onNavigate={path => navigate(path)} />
    </div>
  )
}
