import { Html5Qrcode } from 'html5-qrcode'
import { useEffect, useRef, useState } from 'react'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaLightbulb, 
  FaQuestionCircle, 
  FaShieldAlt, 
  FaBolt, 
  FaHistory 
} from 'react-icons/fa'
import { useTheme } from '../../../shared/context/ThemeContext'
import { saveVerifiedTicketFromApi } from '../../../shared/utils/guestTicketStore'
import '../../../shared/styles/pages/ScanPage.css'

function finishVerifyNavigate(navigate, redirect, parkingData, result, qrCode) {
  saveVerifiedTicketFromApi(result, qrCode)
  navigate(redirect, { state: { ...parkingData, apiResult: result, scannedQrCode: qrCode } })
}

export default function ScanPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.state?.redirect || '/parking'
  const parkingData = location.state?.parking || null

  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [error, setError] = useState('')

  const scanningRef = useRef(false)
  const scannedRef = useRef(false)

  const [manualCode, setManualCode] = useState('')
  const [lastCode, setLastCode] = useState('')
  const [forceLoading, setForceLoading] = useState(false)

  useEffect(() => {
    let html5QrCode;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode("qr-reader");
        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          onScanSuccess,
          (err) => { }
        );
      } catch (err) {
        console.error("Failed to start scanner automatically:", err);
      }
    };

    const onScanSuccess = async (decodedText) => {
      if (scanningRef.current || scannedRef.current) return;

      let finalCode = ''

      scanningRef.current = true;
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.pause()
      }
      setError('')
      setScanning(true)

      try {
        finalCode = String(decodedText || '').trim()
        setLastCode(finalCode)

        const { ScanService } = await import('../services/scanService')
        const result = await ScanService.verifyTicket(finalCode)
        scanningRef.current = false;
        scannedRef.current = true;
        setScanning(false)
        setScanned(true)

        if (html5QrCode && html5QrCode.isScanning) {
          await html5QrCode.stop()
        }

        setTimeout(() => {
          finishVerifyNavigate(navigate, redirect, parkingData, result, finalCode)
        }, 1500)
      } catch (err) {
        console.error('[SCAN] verify failed:', err)

        try {
          setForceLoading(true)
          const { ScanService } = await import('../services/scanService')
          const forceResult = await ScanService.verifyTicketForce(finalCode)
          setForceLoading(false)
          scannedRef.current = true;
          setScanned(true)
          if (html5QrCode && html5QrCode.isScanning) {
            await html5QrCode.stop()
          }
          setTimeout(() => {
            finishVerifyNavigate(navigate, redirect, parkingData, forceResult, finalCode)
          }, 1500)
          return
        } catch (forceErr) {
          setForceLoading(false)
          scanningRef.current = false;
          setScanning(false)
          setError(forceErr.message || err.message || 'Gagal verifikasi tiket')
          setTimeout(() => {
            if(html5QrCode && html5QrCode.isScanning) {
              html5QrCode.resume()
            }
          }, 2000)
        }
      }
    }

    startScanner();

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
          html5QrCode.clear();
        }).catch(err => console.error("Failed to clear scanner", err));
      }
    };
  }, [navigate, redirect, parkingData]);

  const handleManualSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!manualCode.trim() || scanningRef.current || scannedRef.current) return;

    let normalizedCode = ''

    scanningRef.current = true;
    setError('')
    setScanning(true)

    try {
      normalizedCode = String(manualCode || '').trim()
      setLastCode(normalizedCode)
      const { ScanService } = await import('../services/scanService')
      const result = await ScanService.verifyTicket(normalizedCode)
      scanningRef.current = false;
      scannedRef.current = true;
      setScanning(false)
      setScanned(true)

      setTimeout(() => {
        finishVerifyNavigate(navigate, redirect, parkingData, result, normalizedCode)
      }, 1500)
    } catch (err) {
      console.error('[SCAN] manual verify failed:', err)

      try {
        setForceLoading(true)
        const { ScanService } = await import('../services/scanService')
        const forceResult = await ScanService.verifyTicketForce(normalizedCode)
        setForceLoading(false)
        scannedRef.current = true;
        setScanned(true)
        setTimeout(() => {
          finishVerifyNavigate(navigate, redirect, parkingData, forceResult, normalizedCode)
        }, 1500)
        return
      } catch (forceErr) {
        setForceLoading(false)
        scanningRef.current = false;
        setScanning(false)
        setError(forceErr.message || err.message || 'Gagal verifikasi tiket')
      }
    }
  }

  const handleForceActivate = () => {
    if (!lastCode) return;
    setForceLoading(true)
    setError('')
    import('../services/scanService').then(async ({ ScanService }) => {
      try {
        const result = await ScanService.verifyTicketForce(lastCode)
        setForceLoading(false)
        scannedRef.current = true;
        setScanned(true)
        setTimeout(() => {
          finishVerifyNavigate(navigate, redirect, parkingData, result, lastCode)
        }, 800)
      } catch (err) {
        setForceLoading(false)
        setError('Aktivasi paksa gagal: ' + (err.message || 'unknown'))
      }
    })
  }

  const handleLocalActivate = () => {
    if (!lastCode) return;
    scannedRef.current = true;
    setScanned(true)
    const fakeResult = { ok: true, data: { localActivated: true, qrCode: lastCode } }
    setTimeout(() => {
      navigate(redirect, { state: { ...parkingData, apiResult: fakeResult, scannedQrCode: lastCode } })
    }, 800)
  }

  return (
    <div className="scan-page" style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: 'var(--pf-bg)', color: 'var(--pf-text)', transition: 'background 0.3s ease, color 0.3s ease' }}>
      <Container className="py-4 animate-fade-in">
        <Row className="justify-content-center">
          <Col lg={10}>
            {/* Header */}
            <div className="mb-5 animate-fade-up text-center text-lg-start">
              <h1 className="fw-extrabold mb-2" style={{ color: 'var(--pf-text)' }}>Pindai Tiket Parkir</h1>
              <p className="text-muted" style={{ fontSize: 14.5, color: 'var(--pf-text2)' }}>
                Pindai QR code tiket digital Anda atau masukkan kode pemesanan secara manual di bawah ini.
              </p>
            </div>

            <Row className="g-4 align-items-center mb-5">
              {/* Left Box: Scanning Status */}
              <Col md={5} className="animate-fade-up delay-1">
                <Card className="border-0 shadow-sm p-4 h-100 text-center" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)', borderRadius: 16 }}>
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center py-5">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 mb-3 d-flex align-items-center justify-content-center" style={{ width: 64, height: 64, background: 'var(--pf-accent-glow)', color: 'var(--pf-accent)' }}>
                      <span className="spinner-border spinner-border-sm" style={{ width: 24, height: 24, color: 'var(--pf-accent)' }} />
                    </div>
                    <h5 className="fw-bold mb-2">Memindai...</h5>
                    <p className="text-muted mb-0" style={{ fontSize: 13, color: 'var(--pf-text2)' }}>Mencari kode QR yang valid</p>
                  </Card.Body>
                </Card>
              </Col>

              {/* Right Box: Live Camera Viewport */}
              <Col md={7} className="animate-fade-up delay-2">
                <div className="position-relative overflow-hidden shadow-sm" style={{ borderRadius: 20, border: '4px solid var(--pf-bg2)', background: '#000' }}>
                  <div id="qr-reader" style={{ width: '100%', minHeight: 300 }}></div>
                  <div className="position-absolute w-100 text-center py-2 text-white bg-dark bg-opacity-70" style={{ bottom: 0, left: 0, fontSize: 12 }}>
                    Posisikan kode QR di dalam bingkai
                  </div>
                </div>
              </Col>
            </Row>

            {/* Manual Input Block */}
            <Card className="border-0 shadow-sm p-4 mb-5 animate-fade-up delay-3" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)', borderRadius: 16 }}>
              <h6 className="fw-bold mb-3 text-center" style={{ color: 'var(--pf-text)' }}>Atau masukkan kode tiket manual:</h6>
              <form onSubmit={handleManualSubmit} className="d-flex gap-2 mx-auto" style={{ maxWidth: 500, width: '100%' }}>
                <input
                  type="text"
                  className="form-control px-4 py-2"
                  placeholder="Contoh: PKF-123456"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  disabled={scanning || scanned}
                  style={{ borderRadius: 10, background: 'var(--pf-bg3)', color: 'var(--pf-text)', border: '1.5px solid var(--pf-border)' }}
                />
                <Button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={scanning || scanned || !manualCode.trim()}
                  style={{ borderRadius: 10, fontWeight: 'bold', background: 'var(--pf-accent)', border: 'none', color: isDark ? '#0b0d19' : 'white' }}
                >
                  Cek Tiket
                </Button>
              </form>

              {error && (
                <div className="text-danger text-center mt-3 animate-fade-up" style={{ fontSize: 14, fontWeight: 500 }}>
                  <FaExclamationTriangle className="me-1" /> {error}
                </div>
              )}
              {error && lastCode && !scanned && (
                <div className="text-center mt-3">
                  {!forceLoading ? (
                    <>
                      <Button variant="outline-warning" className="me-2" size="sm" onClick={handleForceActivate}>Aktivasi Paksa</Button>
                      <Button variant="outline-secondary" size="sm" onClick={handleLocalActivate}>Aktivasi Lokal (Demo)</Button>
                    </>
                  ) : (
                    <div className="text-info" style={{ fontSize: 13.5 }}>
                      <span className="spinner-border spinner-border-sm me-2" /> Mengaktifkan...
                    </div>
                  )}
                </div>
              )}
              {scanning && (
                <div className="text-info text-center mt-3 animate-fade-up" style={{ fontSize: 14, fontWeight: 500 }}>
                  <span className="spinner-border spinner-border-sm me-2" /> Memverifikasi tiket...
                </div>
              )}
              {scanned && (
                <div className="text-success text-center mt-3 animate-fade-up" style={{ fontSize: 16, fontWeight: 'bold' }}>
                  <FaCheckCircle className="me-1" /> Tiket Terverifikasi!
                </div>
              )}

              <hr style={{ borderColor: 'var(--pf-border)', margin: '24px 0' }} />

              {/* Quick Actions Row */}
              <Row className="g-3 text-center justify-content-center" style={{ maxWidth: 500, margin: '0 auto' }}>
                <Col xs={6}>
                  <div className="p-3 rounded-3" style={{ background: 'var(--pf-bg3)', border: '1px solid var(--pf-border)', cursor: 'pointer' }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: 4, display: 'flex', justifyContent: 'center', color: 'var(--pf-accent)' }}><FaBolt /></div>
                    <div className="fw-bold" style={{ fontSize: 12, color: 'var(--pf-text)' }}>Senter</div>
                    <div className="text-muted" style={{ fontSize: 10, color: 'var(--pf-text2)' }}>Aktifkan untuk cahaya rendah</div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="p-3 rounded-3" style={{ background: 'var(--pf-bg3)', border: '1px solid var(--pf-border)', cursor: 'pointer' }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: 4, display: 'flex', justifyContent: 'center', color: 'var(--pf-accent)' }}><FaHistory /></div>
                    <div className="fw-bold" style={{ fontSize: 12, color: 'var(--pf-text)' }}>Riwayat</div>
                    <div className="text-muted" style={{ fontSize: 10, color: 'var(--pf-text2)' }}>Lihat pemindai terakhir</div>
                  </div>
                </Col>
              </Row>
            </Card>

            {/* Helpline / Lower Tips Grid */}
            <Row className="g-4 animate-fade-up delay-4">
              <Col md={4}>
                <Card className="h-100 border-0 p-3 shadow-sm" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)', borderRadius: 12 }}>
                  <Card.Body>
                    <div className="fs-3 mb-2" style={{ display: 'flex', color: 'var(--pf-accent)' }}><FaLightbulb /></div>
                    <h6 className="fw-bold mb-2">Tips Memindai</h6>
                    <p className="text-muted mb-0" style={{ fontSize: 12.5, color: 'var(--pf-text2)' }}>
                      Pastikan lensa kamera bersih dan tiket dalam posisi datar untuk pembacaan yang lebih cepat.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 border-0 p-3 shadow-sm" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)', borderRadius: 12 }}>
                  <Card.Body>
                    <div className="fs-3 mb-2" style={{ display: 'flex', color: 'var(--pf-accent)' }}><FaQuestionCircle /></div>
                    <h6 className="fw-bold mb-2">Butuh Bantuan?</h6>
                    <p className="text-muted mb-0" style={{ fontSize: 12.5, color: 'var(--pf-text2)' }}>
                      Jika tiket tidak terbaca, hubungi petugas parkir di gerbang keluar atau tekan tombol bantuan.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 border-0 p-3 shadow-sm" style={{ background: 'var(--pf-bg2)', border: '1px solid var(--pf-border)', borderRadius: 12 }}>
                  <Card.Body>
                    <div className="fs-3 mb-2" style={{ display: 'flex', color: 'var(--pf-accent)' }}><FaShieldAlt /></div>
                    <h6 className="fw-bold mb-2">Keamanan Data</h6>
                    <p className="text-muted mb-0" style={{ fontSize: 12.5, color: 'var(--pf-text2)' }}>
                      Sistem kami menggunakan enkripsi SSL untuk menjamin keamanan dan kerahasiaan data akses parkir Anda.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Helpline bottom text */}
            <div className="animate-fade-up delay-5 text-center text-muted mt-4" style={{ fontSize: 13 }}>
              Mengalami kendala? <span className="fw-bold" style={{ cursor: 'pointer', color: 'var(--pf-accent)' }}>Hubungi Bantuan Gerbang</span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
