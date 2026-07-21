import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { 
  FaRocket, 
  FaFlag, 
  FaApple, 
  FaAndroid 
} from 'react-icons/fa'
import { useTheme } from '../../../shared/context/ThemeContext'
import LandingFooter from '../../../shared/components/LandingFooter/LandingFooter'
import commonAvatar from '../../../assets/common_avatar.png'
import parkingBuildingElektro from '../../../assets/parking_building_elektro.png'
import scanDarkMock from '../../../assets/scan_dark_mock.png'

const CDN = 'https://storage.googleapis.com/parkfinderbucket'

export default function AboutProjectPage() {
  const navigate = useNavigate()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const developers = [
    {
      name: 'Imam Ariadi',
      role: 'Frontend Developer',
      focus: 'React UI, routing, dan UX flow',
    },
    {
      name: 'Tim Backend',
      role: 'Integrasi API & Sistem',
      focus: 'Reservasi, verifikasi tiket, dan layanan data parkir',
    },
    {
      name: 'Tim Produk',
      role: 'Produk & Riset',
      focus: 'Validasi kebutuhan pengguna dan roadmap fitur',
    },
  ]

  return (
    <div className="about-layout animate-fade-in" style={{ 
      background: 'var(--pf-bg)', 
      color: 'var(--pf-text)', 
      paddingTop: 86, 
      minHeight: '100vh',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      <Container className="py-5">
        <Row className="align-items-center g-5 mb-5 animate-fade-up">
          <Col lg={7}>
            <span className="text-primary fw-bold text-uppercase mb-2 d-block" style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--pf-accent)' }}>
              Kisah Kami
            </span>
            <h1 className="fw-extrabold mb-4" style={{ color: 'var(--pf-text)' }}>
              Mendefinisikan Ulang Mobilitas Perkotaan Melalui Parkir Pintar
            </h1>
            <p className="mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--pf-text2)' }}>
              ParkFinder lahir dari rasa frustrasi sederhana: berputar-putar tanpa henti di blok kota untuk mencari tempat parkir. Kami membangun platform yang menjembatani kesenjangan antara infrastruktur dan teknologi, membuat kehidupan kota lebih lancar bagi semua orang.
            </p>
            <Row className="g-3">
              <Col md={6}>
                <Card className="border-0 shadow-sm p-3 h-100" style={{ 
                  background: isDark ? 'rgba(96, 165, 250, 0.1)' : '#e0f2fe', 
                  borderRadius: 12, 
                  border: '1px solid var(--pf-border)' 
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 6, color: 'var(--pf-accent)', display: 'flex' }}><FaRocket /></div>
                  <h6 className="fw-bold mb-1" style={{ color: isDark ? '#60a5fa' : '#0284c7' }}>Visi</h6>
                  <p className="mb-0 text-secondary" style={{ fontSize: 13, color: 'var(--pf-text2)' }}>
                    Menghilangkan stres parkir secara global melalui data waktu nyata.
                  </p>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="border-0 shadow-sm p-3 h-100" style={{ 
                  background: isDark ? 'rgba(34, 197, 94, 0.1)' : '#f0fdf4', 
                  borderRadius: 12, 
                  border: '1px solid var(--pf-border)' 
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 6, color: '#22c55e', display: 'flex' }}><FaFlag /></div>
                  <h6 className="fw-bold mb-1" style={{ color: '#22c55e' }}>Misi</h6>
                  <p className="mb-0 text-secondary" style={{ fontSize: 13, color: 'var(--pf-text2)' }}>
                    Menyediakan parkir yang mudah diakses, transparan, dan efisien bagi semua.
                  </p>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg={5}>
            <img src={parkingBuildingElektro} alt="Kisah Kami" className="w-100 rounded-4 shadow-sm" style={{ border: '1px solid var(--pf-border)' }} />
          </Col>
        </Row>

        <div className="text-center my-5 animate-fade-up delay-1">
          <h2 className="fw-bold">Temui Para Inovator</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: 600, color: 'var(--pf-text3)' }}>
            Tim beragam yang terdiri dari insinyur, desainer, dan perencana kota yang berdedikasi untuk menyelesaikan tantangan transportasi dunia nyata.
          </p>
        </div>

        <Row className="g-4 mb-5 justify-content-center animate-fade-up delay-2">
          {developers.map((dev, index) => (
            <Col key={index} md={4}>
              <Card className="h-100 text-center border-0 shadow-sm p-4" style={{ borderRadius: 16, background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)' }}>
                <img src={commonAvatar} alt={dev.name} className="mx-auto mb-3 rounded-circle" style={{ width: 70, height: 70, border: '3px solid var(--pf-border)' }} />
                <h5 className="fw-bold mb-1">{dev.name}</h5>
                <div className="fw-bold mb-3" style={{ fontSize: 13, color: 'var(--pf-accent)' }}>{dev.role}</div>
                <p className="mb-0 text-muted" style={{ fontSize: 13.5, color: 'var(--pf-text2)' }}>{dev.focus}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Download App Promo */}
        <Row className="align-items-center g-5 py-5 border-top animate-fade-up delay-3" style={{ borderColor: 'var(--pf-border) !important' }}>
          <Col lg={7}>
            <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-pill mb-3 d-inline-block" style={{ fontSize: 11, fontWeight: 'bold', color: 'var(--pf-accent)' }}>
              Aplikasi Mobile ParkFinder
            </span>
            <h2 className="fw-extrabold mb-3" style={{ fontSize: '2.5rem' }}>
              Bawa Kemudahan Parkir Bersamamu
            </h2>
            <p className="mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--pf-text2)' }}>
              Gunakan aplikasi mobile kami untuk memindai tiket, melihat peta okupansi gedung, dan mengelola reservasi parkir aktif Anda dengan jauh lebih cepat dan praktis.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Button className="btn btn-dark d-flex align-items-center gap-2 px-4 py-3" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)', borderRadius: 14 }}>
                <FaApple style={{ fontSize: 20, color: 'var(--pf-text)' }} />
                <div className="text-start">
                  <div style={{ fontSize: 9, textTransform: 'uppercase', color: 'var(--pf-text3)' }}>Unduh di</div>
                  <div style={{ fontWeight: 'bold', fontSize: 13, color: 'var(--pf-text)' }}>App Store</div>
                </div>
              </Button>
              <Button className="btn btn-dark d-flex align-items-center gap-2 px-4 py-3" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)', borderRadius: 14 }}>
                <FaAndroid style={{ fontSize: 20, color: 'var(--pf-text)' }} />
                <div className="text-start">
                  <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#94a3b8', color: 'var(--pf-text3)' }}>Tersedia di</div>
                  <div style={{ fontWeight: 'bold', fontSize: 13, color: 'var(--pf-text)' }}>Google Play</div>
                </div>
              </Button>
            </div>
          </Col>
          <Col lg={5}>
            <div className="p-4 rounded-4" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)' }}>
              <img src={scanDarkMock} alt="Aplikasi ParkFinder" className="w-100 rounded-3 shadow" />
            </div>
          </Col>
        </Row>
      </Container>
      <LandingFooter cdn={CDN} onNavigate={path => navigate(path)} />
    </div>
  )
}
