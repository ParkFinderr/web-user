import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaApple, FaAndroid, FaStar } from 'react-icons/fa'
import { useTheme } from '../../../shared/context/ThemeContext'
import LandingFooter from '../../../shared/components/LandingFooter/LandingFooter'
import scanLightMock from '../../../assets/scan/scan_light_mock.png'
import scanDarkMock from '../../../assets/scan/scan_dark_mock.png'

const CDN = 'https://storage.googleapis.com/parkfinderbucket'

export default function DownloadMobilePage() {
  const navigate = useNavigate()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const cards = [
    { title: "Scan Cepat", desc: "Verifikasi tiket masuk secara instan langsung dari kamera ponsel Anda." },
    { title: "Status Real-time", desc: "Pantau ketersediaan slot parkir terupdate dan status sesi parkir aktif Anda." },
    { title: "Notifikasi Cerdas", desc: "Dapatkan pengingat otomatis sebelum batas waktu pemesanan slot Anda berakhir." }
  ]

  return (
    <div style={{ 
      paddingTop: 86, 
      minHeight: '100vh', 
      background: 'var(--pf-bg)', 
      color: 'var(--pf-text)',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      <Container className="py-5">
        <Row className="align-items-center g-5 mb-5 animate-fade-up">
          <Col lg={7}>
            <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-pill mb-3 d-inline-block" style={{ fontSize: 11, fontWeight: 'bold', color: 'var(--pf-accent)' }}>
              Aplikasi Seluler ParkFinder
            </span>
            <h1 className="fw-extrabold mb-3">
              Kemudahan Parkir di Genggaman Anda
            </h1>
            <p className="mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--pf-text2)' }}>
              Gunakan aplikasi mobile kami untuk memindai tiket, melihat peta okupansi gedung, dan mengelola reservasi parkir aktif Anda dengan jauh lebih cepat dan praktis.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Button className="btn btn-dark d-flex align-items-center gap-2 px-4 py-3" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)', borderRadius: 14, color: 'var(--pf-text)' }}>
                <FaApple style={{ fontSize: 20 }} />
                <div className="text-start">
                  <div style={{ fontSize: 9, textTransform: 'uppercase', color: 'var(--pf-text3)' }}>Unduh di</div>
                  <div style={{ fontWeight: 'bold', fontSize: 13 }}>App Store</div>
                </div>
              </Button>
              <Button className="btn btn-dark d-flex align-items-center gap-2 px-4 py-3" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)', borderRadius: 14, color: 'var(--pf-text)' }}>
                <FaAndroid style={{ fontSize: 20 }} />
                <div className="text-start">
                  <div style={{ fontSize: 9, textTransform: 'uppercase', color: 'var(--pf-text3)' }}>Tersedia di</div>
                  <div style={{ fontWeight: 'bold', fontSize: 13 }}>Google Play</div>
                </div>
              </Button>
            </div>
          </Col>
          <Col lg={5}>
            <div className="p-4 rounded-4" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)' }}>
              <img src={isDark ? scanDarkMock : scanLightMock} alt="Mobile App" className="w-100 rounded-3 shadow" />
            </div>
          </Col>
        </Row>

        <h3 className="fw-bold text-center mb-4 mt-5">Keunggulan Fitur Seluler</h3>
        <Row className="g-4 mb-5 animate-fade-up delay-2">
          {cards.map((c, index) => (
            <Col key={index} md={4}>
              <Card className="h-100 border-0 p-4 shadow-sm" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)', borderRadius: 16 }}>
                <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-3 p-3 mb-3" style={{ width: 45, height: 45, fontSize: '1.2rem' }}>
                  <FaStar style={{ color: 'var(--pf-accent)' }} />
                </div>
                <h5 className="fw-bold mb-2">{c.title}</h5>
                <p className="mb-0" style={{ fontSize: 13.5, color: 'var(--pf-text2)' }}>{c.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <LandingFooter cdn={CDN} onNavigate={path => navigate(path)} />
    </div>
  )
}
