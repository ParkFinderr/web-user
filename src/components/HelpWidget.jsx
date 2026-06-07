import { useState } from 'react'
import { Nav } from 'react-bootstrap'
import '../styles/HelpWidget.css'

export default function HelpWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('booking')

  const toggleOpen = () => setIsOpen(!isOpen)
  const handleSelectTab = (key) => setActiveTab(key)

  return (
    <div className="help-widget-wrapper">
      {/* Floating Popover Panel */}
      <div className={`help-popover-panel ${isOpen ? 'open' : ''}`}>
        <div className="help-popover-header">
          <span className="help-popover-title">Bantuan &amp; Tutorial</span>
          <button className="help-popover-close" onClick={toggleOpen} aria-label="Tutup">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="help-popover-body">
          {/* Navigation Bar/Tabs */}
          <Nav 
            variant="tabs" 
            activeKey={activeTab} 
            onSelect={handleSelectTab} 
            className="help-tabs mb-3"
          >
            <Nav.Item>
              <Nav.Link eventKey="booking" className="help-tab-link">Booking</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="swap" className="help-tab-link">Swap</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="checkout" className="help-tab-link">Keluar</Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Active Tutorial Content */}
          <div className="help-content-area">
            {activeTab === 'booking' && (
              <div className="tutorial-section">
                <h6 className="tutorial-header">Pemesanan (Booking)</h6>
                <div className="help-warning-note">
                  <span className="help-warning-icon">⚠️</span>
                  <p className="help-warning-text">
                    <strong>Penting: Wajib Scan Masuk!</strong> Setelah booking selesai, Anda wajib melakukan scan QR tiket Anda di gerbang masuk parkir untuk mengaktifkan sesi parkir Anda.
                  </p>
                </div>
                <p className="tutorial-desc">
                  Cara memesan slot parkir sebelum tiba di lokasi:
                </p>
                <ul className="tutorial-steps">
                  <li>
                    <span className="step-num">1</span>
                    <div className="step-text">
                      <strong>Cari Tempat Parkir</strong>
                      <p>Pilih menu 'Cari Parkir' lalu tentukan gedung.</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">2</span>
                    <div className="step-text">
                      <strong>Pilih Slot</strong>
                      <p>Pilih lantai dan ketuk slot hijau yang tersedia.</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">3</span>
                    <div className="step-text">
                      <strong>Isi Informasi</strong>
                      <p>Masukkan Nama, Plat Kendaraan, dan Nomor Telepon.</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">4</span>
                    <div className="step-text">
                      <strong>Konfirmasi</strong>
                      <p>Klik 'Pesan Sekarang' dan simpan tiket digital Anda.</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'swap' && (
              <div className="tutorial-section">
                <h6 className="tutorial-header">Tukar Slot (Swap)</h6>
                <div className="help-warning-note">
                  <span className="help-warning-icon">⚠️</span>
                  <p className="help-warning-text">
                    <strong>Wajib Scan Masuk!</strong> Fitur ini hanya dapat digunakan setelah tiket Anda di-scan di gerbang masuk parkir.
                  </p>
                </div>
                <p className="tutorial-desc">
                  Cara mengganti posisi slot yang sudah dipesan:
                </p>
                <ul className="tutorial-steps">
                  <li>
                    <span className="step-num">1</span>
                    <div className="step-text">
                      <strong>Buka Tiket Aktif</strong>
                      <p>Masuk ke menu 'Parkiran Aktif' di navigasi.</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">2</span>
                    <div className="step-text">
                      <strong>Mulai Swap</strong>
                      <p>Ketuk tombol 'Tukar Slot' pada kartu pemesanan.</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">3</span>
                    <div className="step-text">
                      <strong>Pilih Slot Baru</strong>
                      <p>Pilih slot kosong pengganti lalu konfirmasi.</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'checkout' && (
              <div className="tutorial-section">
                <h6 className="tutorial-header">Keluar Parkir (Checkout)</h6>
                <div className="help-warning-note">
                  <span className="help-warning-icon">⚠️</span>
                  <p className="help-warning-text">
                    <strong>Wajib Scan Masuk!</strong> Fitur ini hanya dapat digunakan setelah tiket Anda di-scan di gerbang masuk parkir.
                  </p>
                </div>
                <p className="tutorial-desc">
                  Proses checkout dan pembayaran tiket parkir:
                </p>
                <ul className="tutorial-steps">
                  <li>
                    <span className="step-num">1</span>
                    <div className="step-text">
                      <strong>Selesai Parkir</strong>
                      <p>Di kartu booking aktif, ketuk tombol 'Selesai Parkir'.</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">2</span>
                    <div className="step-text">
                      <strong>Checkout</strong>
                      <p>Ketuk tombol 'Keluar Parkir' untuk melihat tagihan.</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">3</span>
                    <div className="step-text">
                      <strong>Pembayaran</strong>
                      <p>Lakukan pembayaran sesuai metode yang Anda pilih.</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Small arrow indicator pointing to FAB */}
        <div className="help-popover-arrow"></div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button 
        className={`help-fab-btn ${isOpen ? 'active' : ''}`} 
        onClick={toggleOpen} 
        aria-label="Bantuan dan Tutorial"
        title="Bantuan &amp; Tutorial"
      >
        {isOpen ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="rotate-icon"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        )}
      </button>
    </div>
  )
}
