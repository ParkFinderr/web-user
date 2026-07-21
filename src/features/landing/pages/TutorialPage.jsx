import { useState } from 'react'
import { Card, Col, Container, Row, Accordion } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt, FaMobileAlt, FaCar } from 'react-icons/fa'
import { useTheme } from '../../../shared/context/ThemeContext'
import LandingFooter from '../../../shared/components/LandingFooter/LandingFooter'
import '../../../shared/styles/pages/LandingPage.css'

const CDN = 'https://storage.googleapis.com/parkfinderbucket'

const FAQS = [
  { q: "Bagaimana cara melakukan reservasi slot parkir?", a: "Pilih menu 'Cari Parkir' (atau 'Daftar Area' jika sudah masuk), tentukan gedung parkir yang Anda inginkan, pilih lantai, lalu klik salah satu slot kosong berwarna hijau. Isi data kendaraan Anda dan konfirmasi booking." },
  { q: "Berapa lama masa berlaku booking slot parkir?", a: "Setelah reservasi dikonfirmasi, slot Anda akan ditahan selama 15 menit. Anda wajib memindai tiket di gerbang masuk dalam waktu tersebut agar booking tidak hangus." },
  { q: "Apakah saya bisa menukar slot setelah terverifikasi?", a: "Ya. Setelah memindai tiket masuk, buka halaman 'Status Parkir' dan gunakan tombol 'Tukar Slot' untuk memilih slot baru di lantai yang sama dalam 15 menit pertama." },
  { q: "Bagaimana cara keluar dari area parkir?", a: "Saat ingin keluar, klik tombol 'Selesai Parkir' pada halaman 'Status Parkir', lalu klik 'Keluar Parkir' untuk melakukan verifikasi akhir dan membuka pintu gerbang keluar secara otomatis." }
]

export default function TutorialPage() {
  const { resolvedTheme } = useTheme()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = FAQS.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ paddingTop: 86, minHeight: '100vh', background: 'var(--pf-bg)', color: 'var(--pf-text)', transition: 'background 0.3s ease, color 0.3s ease' }}>
      <Container className="py-5">
        {/* Hero Section */}
        <div className="text-center mb-5 animate-fade-up">
          <h1 className="fw-bold mb-3">
            Bagaimana kami bisa membantu Anda hari ini?
          </h1>
          <p className="text-muted mx-auto mb-4" style={{ maxWidth: 600, color: 'var(--pf-text2)' }}>
            Temukan panduan cepat dan jawaban atas pertanyaan Anda mengenai layanan parkir cerdas ParkFinder.
          </p>
          <div className="mt-4 mx-auto" style={{ maxWidth: 500 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Cari bantuan atau pertanyaan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'var(--pf-bg2)',
                border: '1.5px solid var(--pf-border)',
                borderRadius: '30px',
                padding: '12px 24px',
                color: 'var(--pf-text)'
              }}
            />
          </div>
        </div>

        {/* Steps Section */}
        <div className="mb-5 animate-fade-up delay-1">
          <h3 className="text-center fw-bold mb-4" style={{ color: 'var(--pf-text)' }}>
            Tiga Langkah Menuju Tempat Anda
          </h3>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)', borderRadius: 16 }}>
                <Card.Body className="text-center p-4">
                  <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3" style={{ width: 60, height: 60, fontSize: 24 }}>
                    <FaMapMarkerAlt />
                  </div>
                  <div className="text-primary fw-bold text-uppercase mb-1" style={{ fontSize: 11, letterSpacing: 1.5 }}>
                    Langkah 01
                  </div>
                  <h5 className="fw-bold mb-2">Cari Lokasi</h5>
                  <p className="text-muted mb-0" style={{ fontSize: 13.5, color: 'var(--pf-text2)' }}>
                    Buka peta interaktif kami untuk menemukan slot parkir yang tersedia secara real-time di sekitar Anda.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)', borderRadius: 16 }}>
                <Card.Body className="text-center p-4">
                  <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3" style={{ width: 60, height: 60, fontSize: 24 }}>
                    <FaMobileAlt />
                  </div>
                  <div className="text-primary fw-bold text-uppercase mb-1" style={{ fontSize: 11, letterSpacing: 1.5 }}>
                    Langkah 02
                  </div>
                  <h5 className="fw-bold mb-2">Pindai &amp; Masuk</h5>
                  <p className="text-muted mb-0" style={{ fontSize: 13.5, color: 'var(--pf-text2)' }}>
                    Pindai kode QR di gerbang masuk menggunakan kamera ponsel Anda untuk memulai sesi parkir tanpa tiket fisik.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)', borderRadius: 16 }}>
                <Card.Body className="text-center p-4">
                  <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3" style={{ width: 60, height: 60, fontSize: 24 }}>
                    <FaCar />
                  </div>
                  <div className="text-primary fw-bold text-uppercase mb-1" style={{ fontSize: 11, letterSpacing: 1.5 }}>
                    Langkah 03
                  </div>
                  <h5 className="fw-bold mb-2">Parkir Kendaraan</h5>
                  <p className="text-muted mb-0" style={{ fontSize: 13.5, color: 'var(--pf-text2)' }}>
                    Ikuti petunjuk menuju slot parkir yang tersedia dan parkirkan kendaraan Anda. Informasi tiket dapat dipantau melalui web.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Accordion FAQ Section */}
        <div className="mx-auto animate-fade-up delay-2" style={{ maxWidth: 800 }}>
          <h3 className="text-center fw-bold mb-4" style={{ color: 'var(--pf-text)' }}>Pertanyaan yang Sering Diajukan (FAQ)</h3>
          {filteredFaqs.length === 0 ? (
            <div className="text-center text-muted py-4">Tidak ada hasil pencarian yang cocok.</div>
          ) : (
            <Accordion defaultActiveKey="0" className="shadow-sm rounded" style={{ overflow: 'hidden' }}>
              {filteredFaqs.map((faq, index) => (
                <Accordion.Item eventKey={String(index)} key={index} style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)' }}>
                  <Accordion.Header>
                    <span className="fw-bold" style={{ fontSize: 14.5 }}>{faq.q}</span>
                  </Accordion.Header>
                  <Accordion.Body style={{ background: 'var(--pf-bg)', color: 'var(--pf-text2)', fontSize: 13.5 }}>
                    {faq.a}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </div>
      </Container>
      <LandingFooter cdn={CDN} onNavigate={path => navigate(path)} />
    </div>
  )
}
