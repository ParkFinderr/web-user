import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LandingDownloadCta from '../components/pages/LandingPage/LandingDownloadCta'
import LandingFeatures from '../components/pages/LandingPage/LandingFeatures'
import LandingFooter from '../components/pages/LandingPage/LandingFooter'
import LandingHero from '../components/pages/LandingPage/LandingHero'
import LandingStats from '../components/pages/LandingPage/LandingStats'
import LandingSteps from '../components/pages/LandingPage/LandingSteps'
import { GuestService } from '../services/api'
import '../styles/pages/LandingPage.css'

const CDN = 'https://storage.googleapis.com/parkfinderbucket'

const FEATURES = [
  { icon: '🔍', title: 'Cari Parkir Real-time',  desc: 'Temukan slot parkir tersedia di sekitar Anda secara real-time.' },
  { icon: '⚡', title: 'Booking Instan',         desc: 'Amankan slot parkir favorit Anda dalam hitungan detik.' },
  { icon: '📱', title: 'QR Ticket Digital',      desc: 'Scan QR code tiket parkir digital. Tanpa kertas, tanpa antre.' },
  { icon: '🗺️', title: 'Panduan Navigasi',       desc: 'Panduan langkah demi langkah menuju slot parkir Anda.' },
  { icon: '🔔', title: 'Notifikasi Aktif',       desc: 'Pengingat otomatis sebelum waktu booking Anda habis.' },
  { icon: '🔒', title: 'Slot Terjamin Aman',     desc: 'Slot yang sudah di-booking tidak bisa diambil orang lain.' },
]

// Steps now use icons only – no CDN dependency
const STEPS = [
  {
    num: '01',
    title: 'Cari Gedung Parkir',
    desc: 'Gunakan pencarian untuk menemukan gedung parkir terdekat dan lihat slot secara real-time.',
  },
  {
    num: '02',
    title: 'Pilih & Booking Slot',
    desc: 'Pilih lantai dan nomor slot tersedia, lalu booking untuk amankan tempat Anda.',
  },
  {
    num: '03',
    title: 'Scan & Masuk',
    desc: 'Tiba di lokasi, scan QR tiket digital Anda untuk mengaktifkan sesi parkir.',
  },
  {
    num: '04',
    title: 'Selesai & Keluar',
    desc: 'Setelah selesai parkir, tekan "Selesai" dan keluar area dengan mudah.',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState([
    { value: '6+', label: 'Gedung Parkir' },
    { value: '50K+', label: 'Pengguna Aktif' },
    { value: '99%',  label: 'Tingkat Keberhasilan' },
    { value: '24/7', label: 'Layanan Tersedia' },
  ])

  useEffect(() => {
    let active = true

    const fetchStats = async () => {
      let dashboardData = null
      try {
        const res = await GuestService.getDashboardStats()
        if (res && res.success && res.data) {
          dashboardData = res.data
        } else if (res && res.totalParkings !== undefined) {
          dashboardData = res
        }
      } catch (err) {
        console.warn('Failed to fetch dashboard stats from API:', err)
      }

      let totalParkings = null
      try {
        const res = await GuestService.getAllAreas()
        if (res && res.success && res.data) {
          totalParkings = res.data.length
        }
      } catch (err) {
        console.warn('Failed to fetch areas for stats:', err)
      }

      if (!active) return

      const finalTotalParkings = totalParkings !== null ? `${totalParkings}+` : (dashboardData?.totalParkings ? `${dashboardData.totalParkings}+` : '6+')
      const finalTotalUsers = dashboardData?.totalUsers 
        ? (dashboardData.totalUsers >= 1000 ? `${(dashboardData.totalUsers / 1000).toFixed(0)}K+` : `${dashboardData.totalUsers}+`)
        : '50K+'
      const finalSuccessRate = dashboardData?.successRate 
        ? `${parseFloat(dashboardData.successRate).toFixed(1)}%` 
        : '99%'

      setStats([
        { value: finalTotalParkings, label: 'Gedung Parkir' },
        { value: finalTotalUsers, label: 'Pengguna Aktif' },
        { value: finalSuccessRate, label: 'Tingkat Keberhasilan' },
        { value: '24/7', label: 'Layanan Tersedia' },
      ])
    }

    fetchStats()

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="landing">
      <LandingHero
        onPrimaryCta={() => navigate('/scan', { state: { redirect: '/parking' } })}
      />
      <LandingStats stats={stats} />
      <LandingFeatures features={FEATURES} />
      <LandingSteps steps={STEPS} />
      <LandingDownloadCta cdn={CDN} />
      <LandingFooter cdn={CDN} onNavigate={path => navigate(path)} />
    </div>
  )
}
