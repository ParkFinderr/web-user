import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AppNavbar from './AppNavbar'
import HelpWidget from './HelpWidget'
import LandingNavbar from './LandingNavbar'
import { ThemeProvider } from '../shared/context/ThemeContext'
import LandingPage from '../features/landing/pages/LandingPage'
import AboutProjectPage from '../features/landing/pages/AboutProjectPage'
import DownloadMobilePage from '../features/landing/pages/DownloadMobilePage'
import ScanPage from '../features/scan/pages/ScanPage'
import ParkingPage from '../features/parking/pages/ParkingPage'
import BookingPage from '../features/booking/pages/BookingPage'
import SwapPage from '../features/swap/pages/SwapPage'
import CheckoutPage from '../features/checkout/pages/CheckoutPage'
import MyBookingPage from '../features/my-booking/pages/MyBookingPage'
import '../shared/styles/index.css'

function AppShell() {
  const location = useLocation()
  const isMarketingPage = ['/', '/tentang-project', '/download-mobile'].includes(location.pathname)

  return (
    <>
      {isMarketingPage ? <LandingNavbar /> : <AppNavbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tentang-project" element={<AboutProjectPage />} />
        <Route path="/download-mobile" element={<DownloadMobilePage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/parking" element={<ParkingPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/swap" element={<SwapPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/my-booking" element={<MyBookingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isMarketingPage && <HelpWidget />}
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeProvider>
  )
}
