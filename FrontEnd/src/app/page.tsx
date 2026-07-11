'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, Users, Sprout, ArrowRight, CheckCircle2, 
  MapPin, Phone, Mail, Award, ShieldCheck, HeartHandshake, Leaf,
  MessageSquare, Sparkles, ChevronRight, Menu, X, ShoppingBag,
  Compass, Play
} from 'lucide-react';
import Image from 'next/image';

import LoanCalculator from '@/components/LoanCalculator';
import CommodityTracker from '@/components/CommodityTracker';
import AiConsultant from '@/components/AiConsultant';
import AdminDashboard from '@/components/AdminDashboard';

function WhatsAppMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000);
    const timer2 = setTimeout(() => setStep(2), 3500);
    const timer3 = setTimeout(() => setStep(3), 6500);
    const timer4 = setTimeout(() => setStep(0), 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [step === 0]);

  return (
    <div className="w-full max-w-[310px] bg-[#efeae2] rounded-[36px] p-0 shadow-xl border-[6px] border-slate-800 relative overflow-hidden aspect-[9/16] flex flex-col font-sans text-left">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-3.5 bg-slate-800 rounded-b-xl z-20 flex items-center justify-center">
        <div className="w-10 h-0.5 bg-slate-900 rounded-full" />
      </div>

      {/* WhatsApp Header */}
      <div className="bg-[#0C683B] text-white pt-6 pb-2.5 px-4 flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-full bg-[#EAF4EE] text-[#0C683B] flex items-center justify-center font-bold text-xs shrink-0 mt-1">
          RP
        </div>
        <div className="flex flex-col mt-1">
          <span className="text-[13px] font-bold">AI Renteng KUD</span>
          <span className="text-[10px] text-[#EAF4EE]/80">Online & Terverifikasi</span>
        </div>
      </div>

      {/* WhatsApp Chat Body */}
      <div className="flex-1 bg-[#efeae2] py-3 px-3 space-y-2.5 overflow-y-auto relative flex flex-col justify-start min-h-[280px]">
        {/* Chat Background Graphic Watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* System Date Badge */}
        <div className="self-center bg-white/80 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs relative z-10 uppercase tracking-wider">
          Hari Ini
        </div>

        {/* Bubble 1: AI (Left) */}
        {step >= 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="self-start max-w-[96%] bg-white rounded-xl rounded-tl-none py-2.5 px-3 shadow-sm text-[13px] text-slate-800 leading-normal relative z-10"
          >
            <p className="font-bold text-[#0C683B] text-[10px] mb-0.5">📢 Distribusi Rantai Pasok SPPG</p>
            Dapur SPPG Sleman membutuhkan <strong>200 kg Telur Ayam</strong> untuk besok pagi dengan pagu <strong>Rp26.000/kg</strong>. Apakah Ibu Siti sanggup menyuplai sebagian?
            <span className="block text-right text-[9px] text-slate-400 mt-1 font-mono">08:15</span>
          </motion.div>
        )}

        {/* Bubble 2: Ibu Siti (Right) */}
        {step >= 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="self-end max-w-[96%] bg-[#D9FDD3] rounded-xl rounded-tr-none py-2.5 px-3 shadow-sm text-[13px] text-slate-800 leading-normal relative z-10 border border-[#e1f7de]"
          >
            Saya sanggup menyuplai <strong>30 kg Telur</strong>. NIK saya sudah terdaftar terverifikasi koperasi ya.
            <span className="block text-right text-[9px] text-slate-400 mt-1 font-mono">08:16</span>
          </motion.div>
        )}

        {/* Bubble 3: AI Confirm (Left) */}
        {step >= 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="self-start max-w-[96%] bg-white rounded-xl rounded-tl-none py-2.5 px-3 shadow-sm text-[13px] text-slate-800 leading-normal relative z-10"
          >
            <p className="font-bold text-[#0C683B] text-[10px] mb-0.5">✓ Konfirmasi AI Matching</p>
            Baik Ibu Siti Rahma, kuota <strong>30 kg Telur Ayam</strong> berhasil didaftarkan! AI mencatat tingkat kesesuaian suplai Anda sebesar <strong>92%</strong> (NIK Valid & Lokasi Terdekat).
            <br/><br/>
            Sistem sekarang mengirimkan rekomendasi ini ke Kotak Kuning KUD untuk disetujui Bu Sari. Terima kasih!
            <span className="block text-right text-[9px] text-slate-400 mt-1 font-mono">08:16</span>
          </motion.div>
        )}
      </div>

      {/* WhatsApp Input Field Mockup */}
      <div className="bg-[#efeae2] px-3 pb-3 pt-1 flex items-center gap-1.5 shrink-0 border-t border-slate-200/50">
        <div className="flex-1 bg-white rounded-full px-2.5 py-1 flex items-center justify-between shadow-xs">
          <span className="text-slate-400 text-[11px]">Ketik pesan...</span>
          <span className="text-slate-300 text-[12px] font-bold">☺</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#0C683B] text-white flex items-center justify-center shadow-xs">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isConsultantOpen, setIsConsultantOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'yarnen' | 'simpan' | 'pasar' | 'umkm'>('yarnen');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems = [
    { name: "Profil", href: "#profil" },
    { name: "Solusi Desa", href: "#solusi" },
    { name: "Simulasi", href: "#kalkulator" },
    { name: "Harga Tani", href: "#harga-komoditas" },
    { name: "Kisah Sukses", href: "#cerita" }
  ];

  // Cek status sesi login saat awal masuk halaman
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const isParamAdmin = params.get('admin') === 'true';
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (isParamAdmin) {
        setIsAdminOpen(true);
      } else if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.role === 'pengurus' || user.role === 'admin') {
            setIsAdminOpen(true);
          }
        } catch (e) {
          console.error("Gagal membaca data sesi", e);
        }
      }
    }
  }, []);

  // Success story testimonials (real, authentic village entrepreneurs)
  const testimonials = [
    {
      name: "Pak Wayan Sudarma",
      role: "Ketua Kelompok Tani Sari Bumi",
      story: "Dulu kami sering terjebak tengkulak menjelang masa pupuk tiba karena tidak punya modal tunai. Berkat program Yarnen (Bayar Setelah Panen) dari Koperasi Desa, kami bisa mengambil pupuk premium tepat waktu dan baru membayar saat gabah dibeli koperasi dengan harga yang adil. Hasil panen kami naik 30% tahun ini!",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Ibu Siti Rahma",
      role: "Pengrajin Tenun Serat Alam Lestari",
      story: "Koperasi membantu usaha tenun saya dari skala rumahan kecil hingga sekarang bisa mengirim produk ke galeri kota. Melalui pembinaan UMKM dan kredit lunak khusus usaha wanita, saya bisa membeli alat tenun baru dan mempekerjakan tetangga-tetangga sekitar rumah.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Pak Joko Susilo",
      role: "Peternak Ayam Petelur Sejahtera",
      story: "Menyuplai telur ayam langsung ke Dapur SPPG Sleman lewat Koperasi memotong mata rantai spekulasi tengkulak. Dulu harga dipermainkan, kini harga beli dijamin stabil dan pembayaran langsung masuk tabungan Koperasi.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Ibu Sri Wahyuni",
      role: "Produsen Tempe Higienis Sleman",
      story: "Dulu ragi dan kedelai beli eceran mahal sekali. Dengan modal input dari Koperasi, saya bisa beli bahan baku jumlah besar dan langsung melakukan hilirisasi. Alhamdulillah, sekarang kapasitas produksi naik 2 kali lipat.",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
    }
  ];

  if (isAdminOpen) {
    return (
      <AdminDashboard 
        onBack={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAdminOpen(false);
          // Bersihkan parameter admin di URL jika ada
          if (window.location.search.includes('admin=')) {
            window.location.href = '/';
          }
        }} 
        onRefreshPublicPrices={() => setRefreshTrigger(prev => prev + 1)}
        initialTab={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('tab') || undefined : undefined}
      />
    );
  }

  return (
    <main className="min-h-screen bg-art-beige text-art-charcoal font-sans selection:bg-art-sage/20 selection:text-art-charcoal">
      {/* HEADER / NAVIGATION */}
      <header className="header">
        <div className="logo-container" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="logo-icon">
            <img src="/logo.png" alt="Logo Koperasi Renteng" className="w-[72px] h-[72px] object-contain" />
          </div>

        </div>

        {/* Desktop Navigation */}
        <nav 
          className="nav hidden lg:flex relative items-center gap-1"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navItems.map((item, idx) => (
            <a 
              key={idx}
              href={item.href} 
              className="nav-link relative px-4 py-1.5 transition-colors duration-200"
              onMouseEnter={() => setHoveredIndex(idx)}
            >
              {hoveredIndex === idx && (
                <motion.div
                  layoutId="navHoverBg"
                  className="absolute -inset-x-4 inset-y-1 bg-[#0C683B]/10 rounded-[8px] -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">

          <button 
            id="btn-admin-header" 
            onClick={() => {
              const token = localStorage.getItem('token');
              if (token) {
                setIsAdminOpen(true);
              } else {
                window.location.href = '/login';
              }
            }}
            className="btn-login"
          >
            Portal Pengurus
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#334155] hover:text-[#0C683B] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-24 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-xl z-50">
          <a href="#profil" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-[#334155] rounded-xl hover:bg-[#EAF4EE] hover:text-[#0C683B] transition-all">Profil</a>
          <a href="#solusi" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-[#334155] rounded-xl hover:bg-[#EAF4EE] hover:text-[#0C683B] transition-all">Solusi Desa</a>
          <a href="#kalkulator" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-[#334155] rounded-xl hover:bg-[#EAF4EE] hover:text-[#0C683B] transition-all">Simulasi</a>
          <a href="#harga-komoditas" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-[#334155] rounded-xl hover:bg-[#EAF4EE] hover:text-[#0C683B] transition-all">Harga Tani</a>
          <a href="#cerita" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-[#334155] rounded-xl hover:bg-[#EAF4EE] hover:text-[#0C683B] transition-all">Kisah Sukses</a>
          <hr className="border-gray-100/60" />

          <button
            type="button"
            id="btn-mobile-admin"
            onClick={() => { 
              setMobileMenuOpen(false); 
              const token = localStorage.getItem('token');
              if (token) {
                setIsAdminOpen(true);
              } else {
                window.location.href = '/login';
              }
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#0C683B] text-white hover:bg-[#074e2a] py-3.5 rounded-[10px] text-xs uppercase tracking-wider font-bold transition-all"
          >
            <span>Portal Pengurus</span>
          </button>
        </div>
      )}

      {/* HERO SECTION */}
      <section id="profil" className="hero-section-custom">
        {/* Parallax Layers */}
        <div className="layer layer-bg">
          <img src="/Untitled design (7).svg" alt="Background Desa" className="bg-img" />
        </div>
        
        <div className="layer layer-sun">
          <img src="/matahari.png" alt="Matahari" className="sun-img" />
        </div>
        
        <div className="layer layer-clouds">
          <img src="/awan.png" alt="Awan 1" className="cloud-img cloud-1" />
          <img src="/awan.png" alt="Awan 2" className="cloud-img cloud-2" />
          <img src="/awan.png" alt="Awan 3" className="cloud-img cloud-3" />
        </div>

        <div className="layer layer-birds">
          <img src="/burung.png" alt="Burung" className="birds-img" />
        </div>

        <div className="layer layer-building">
          <img src="/bangunanKopdes.png" alt="Bangunan Kopdes" className="building-img" />
        </div>

        <div className="layer layer-people">
          <img src="/Untitled design (6).svg" alt="Masyarakat Desa" className="people-img" />
        </div>

        {/* Foreground Content Overlay */}
        <div className="hero-content-custom">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0C683B] mb-4">Pusat Komando Rantai Pasok Desa 2026</p>
          <h1 className="hero-title-custom leading-[0.95] tracking-tight text-black">
            Rantai Pasok Berbasis AI & <br/>
            <span className="text-black">Pertumbuhan Koperasi</span>
          </h1>
          
          <div className="cta-group-custom">
            <a href="#solusi" className="btn-explore-custom">
              Jelajahi Solusi
            </a>
            <a href="#kalkulator" className="btn-about-custom">
              <span className="play-icon-wrapper-custom">
                <Play className="play-icon-custom" fill="currentColor" />
              </span>
              Simulasi Permodalan
            </a>
          </div>
        </div>

        {/* Gradient overlay untuk transisi halus ke section bawah */}
        <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>

        {/* Floating Features Card Overlay */}
        <div className="features-card-custom relative z-20">
          <div className="feature-item-custom">
            <div className="feature-icon-wrapper-custom">
              <Users className="feature-icon-custom" />
            </div>
            <div className="feature-text-custom">
              <h3>Gotong Royong</h3>
              <p>Kebersamaan untuk desa yang lebih maju</p>
            </div>
          </div>

          <div className="feature-item-custom">
            <div className="feature-icon-wrapper-custom">
              <HeartHandshake className="feature-icon-custom" />
            </div>
            <div className="feature-text-custom">
              <h3>Kesejahteraan</h3>
              <p>Meningkatkan ekonomi masyarakat desa</p>
            </div>
          </div>

          <div className="feature-item-custom">
            <div className="feature-icon-wrapper-custom">
              <Leaf className="feature-icon-custom" />
            </div>
            <div className="feature-text-custom">
              <h3>Keberlanjutan</h3>
              <p>Mengelola sumber daya secara berkelanjutan</p>
            </div>
          </div>

          <div className="feature-item-custom">
            <div className="feature-icon-wrapper-custom">
              <ShoppingBag className="feature-icon-custom" />
            </div>
            <div className="feature-text-custom">
              <h3>Produk Desa</h3>
              <p>Dukungan untuk UMKM dan produk lokal</p>
            </div>
          </div>
        </div>
      </section>

      {/* transition divider from hero to section 2 (white) */}
      <div className="h-10 bg-white" />

      {/* 2. PILAR GOTONG ROYONG SECTION */}
      <section className="py-20 bg-white" id="solusi">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-art-sage block">Platform Pertumbuhan Koperasi Desa</span>
            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-art-charcoal tracking-tight">
              Pilar Rantai Pasok <span className="font-normal not-italic text-art-sage">Renteng</span>
            </h2>
            <p className="text-sm text-art-charcoal/60 leading-relaxed">
              Menghubungkan hilirisasi produk pangan desa langsung ke Dapur Makan Bergizi Gratis (SPPG), mempercepat perputaran uang lokal, dan melindungi dari kebocoran nilai.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left side dynamic drawing and card */}
            <div className="lg:col-span-6 relative flex flex-col justify-between gap-6">
              <div className="relative rounded-3xl overflow-hidden border border-art-charcoal/10 shadow-lg bg-[#efeae2] p-10 md:p-12 flex flex-col items-center justify-center">
                <WhatsAppMockup />
                <div className="mt-4 text-center">
                  <p className="font-serif italic text-sm leading-tight text-slate-800">Simulasi Alur Blast & Match WA</p>
                  <p className="text-[10px] text-slate-500 mt-1">Sistem AI Renteng menghubungi petani secara otomatis via chat WhatsApp.</p>
                </div>
              </div>
            </div>

            {/* Right side: Interactive showcase with tabs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Tab navigation buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#F3F1EA] p-1.5 rounded-xl border border-art-charcoal/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('yarnen')}
                  className="relative py-3 px-3 rounded-lg text-[9px] uppercase tracking-widest font-bold text-center cursor-pointer transition-colors"
                >
                  {activeTab === 'yarnen' && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-art-charcoal rounded-lg shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-200 ${activeTab === 'yarnen' ? 'text-[#F9F7F2]' : 'text-art-charcoal/60 hover:text-art-charcoal'}`}>
                    Yarnen Hilirisasi
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('simpan')}
                  className="relative py-3 px-3 rounded-lg text-[9px] uppercase tracking-widest font-bold text-center cursor-pointer transition-colors"
                >
                  {activeTab === 'simpan' && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-art-charcoal rounded-lg shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-200 ${activeTab === 'simpan' ? 'text-[#F9F7F2]' : 'text-art-charcoal/60 hover:text-art-charcoal'}`}>
                    Velocity of Money
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('pasar')}
                  className="relative py-3 px-3 rounded-lg text-[9px] uppercase tracking-widest font-bold text-center cursor-pointer transition-colors"
                >
                  {activeTab === 'pasar' && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-art-charcoal rounded-lg shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-200 ${activeTab === 'pasar' ? 'text-[#F9F7F2]' : 'text-art-charcoal/60 hover:text-art-charcoal'}`}>
                    Agregator SPPG
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('umkm')}
                  className="relative py-3 px-3 rounded-lg text-[9px] uppercase tracking-widest font-bold text-center cursor-pointer transition-colors"
                >
                  {activeTab === 'umkm' && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-art-charcoal rounded-lg shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-200 ${activeTab === 'umkm' ? 'text-[#F9F7F2]' : 'text-art-charcoal/60 hover:text-art-charcoal'}`}>
                    Hilirisasi Pangan
                  </span>
                </button>
              </div>

              {/* Dynamic tab description card */}
              <div className="bg-[#F3F1EA] border border-art-charcoal/10 rounded-3xl p-6 md:p-8 min-h-[280px] flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      {activeTab === 'yarnen' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-art-sage">
                            <Sprout className="w-5 h-5" />
                            <h4 className="font-serif italic text-xl font-bold text-art-charcoal">Pembiayaan Yarnen Hilirisasi</h4>
                          </div>
                          <p className="text-art-charcoal/85 text-xs leading-relaxed">
                            Kami sadar bahwa produsen pangan desa membutuhkan modal awal untuk hilirisasi. Melalui sistem <strong>Yarnen Hilirisasi</strong>, anggota dapat mengambil bahan baku seperti benih/pakan unggul di awal secara kredit. Pelunasan dilakukan 100% setelah produk olahan disalurkan dan dibeli oleh Koperasi untuk Dapur SPPG.
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-art-charcoal/70">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Bunga rendah flat 0.5% sebulan</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Tanpa denda jika terjadi force majeure cuaca</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Pembelian input pertanian terjamin asli</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Pendampingan teknis mutu pangan KUD</li>
                          </ul>
                        </div>
                      )}

                      {activeTab === 'simpan' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-art-sage">
                            <Users className="w-5 h-5" />
                            <h4 className="font-serif italic text-xl font-bold text-art-charcoal">Mengunci Velocity of Money di Desa</h4>
                          </div>
                          <p className="text-art-charcoal/85 text-xs leading-relaxed">
                            Uang negara dari Dapur SPPG harus tetap berputar di dalam desa. Melalui tabungan Koperasi Renteng, seluruh hasil keuntungan transaksi dikelola secara transparan dan dialokasikan untuk pembiayaan usaha produktif warga, mencegah *Value Leakage* lari ke luar daerah.
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-art-charcoal/70">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Bagi hasil simpanan sukarela kompetitif</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Dana bergulir aman dikelola secara lokal</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Bebas potongan biaya administrasi bulanan</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Hak partisipasi penuh Rapat Anggota (RAT)</li>
                          </ul>
                        </div>
                      )}

                      {activeTab === 'pasar' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-art-sage">
                            <Leaf className="w-5 h-5" />
                            <h4 className="font-serif italic text-xl font-bold text-art-charcoal">Agregasi Rantai Pasok SPPG (Skip Tengkulak)</h4>
                          </div>
                           <p className="text-art-charcoal/85 text-xs leading-relaxed">
                            Koperasi bertindak sebagai agregator rantai pasok. Ketika Dapur SPPG membutuhkan ratusan unit lauk-pauk harian, sistem AI Renteng secara otomatis membagi kuota produksi tersebut secara adil kepada seluruh anggota yang siap menyuplai, memotong rantai tengkulak yang merugikan.
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-art-charcoal/70">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Harga beli terjamin (Price Floor Guarantee)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Sistem timbangan digital terintegrasi</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Pencatatan transaksi real-time & transparan</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Keputusan aman Human-in-the-Loop</li>
                          </ul>
                        </div>
                      )}

                      {activeTab === 'umkm' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-art-sage">
                            <Award className="w-5 h-5" />
                            <h4 className="font-serif italic text-xl font-bold text-art-charcoal">Hilirisasi Pangan Bernilai Tinggi</h4>
                          </div>
                          <p className="text-art-charcoal/85 text-xs leading-relaxed">
                            Meningkatkan nilai tambah hasil tani mentah menjadi pangan olahan siap saji (seperti kedelai menjadi tempe kemasan, padi menjadi beras kemasan prima). Koperasi membantu kemasan modern, sertifikasi PIRT/Halal, dan akses langsung ke dapur nasional.
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-art-charcoal/70">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Pelatihan sertifikasi pangan & kebersihan</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Bantuan desain kemasan produk hilirisasi</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Akses langsung offtaker tanpa tengkulak</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-art-sage shrink-0" /> Kredit modal kerja mikro super ringan</li>
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-6 pt-4 border-t border-art-charcoal/10 flex items-center justify-between">
                  <p className="text-[11px] text-art-charcoal/60">Bapak/Ibu tertarik dengan pilar solusi ini?</p>
                  <button
                    type="button"
                    onClick={() => setIsConsultantOpen(true)}
                    className="text-xs font-bold text-art-sage flex items-center gap-1 hover:text-art-charcoal cursor-pointer transition-colors"
                  >
                    Tanya Asisten AI <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 STATISTIK MAKRO & DIFERENSIASI SECTION */}
      <section className="py-20 bg-white border-t border-art-charcoal/5" id="dampak-makro">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left side: KDKMP & SIMKOPDES Stats */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-art-sage block">Kondisi SIMKOPDES Nasional</span>
              <h2 className="font-serif italic text-3xl sm:text-4xl text-art-charcoal tracking-tight">
                Menjembatani Kesenjangan <span className="font-normal not-italic text-art-sage">Digitalisasi Desa</span>
              </h2>
              <p className="text-xs text-art-charcoal/85 leading-relaxed">
                Berdasarkan data SIMKOPDES per Juni 2026, terdapat <strong>83.362 Koperasi Desa (KDKMP)</strong> berbadan hukum. Namun, hanya <strong>1.061 unit</strong> yang beroperasi penuh secara nyata di lapangan, dan kurang dari 1% (795 unit) yang aktif bertransaksi digital.
              </p>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-art-charcoal/10">
                <div className="text-left">
                  <p className="text-2xl font-serif italic text-[#0C683B]">83K+</p>
                  <p className="text-[9px] uppercase tracking-wider text-art-charcoal/50 font-bold mt-1">Desa Terdaftar</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-serif italic text-[#0C683B]">1.061</p>
                  <p className="text-[9px] uppercase tracking-wider text-art-charcoal/50 font-bold mt-1">Beroperasi</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-serif italic text-[#0C683B]">&lt;1%</p>
                  <p className="text-[9px] uppercase tracking-wider text-art-charcoal/50 font-bold mt-1">Aktif Digital</p>
                </div>
              </div>
            </div>

            {/* Right side: Difference & Bappenas SROI */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#F3F1EA] border border-art-charcoal/10 rounded-[10px] p-6 space-y-3">
                <h4 className="font-serif italic text-base font-bold text-art-charcoal">Target SROI Bappenas 3.5x</h4>
                <p className="text-xs text-art-charcoal/85 leading-relaxed">
                  Dalam target percontohan 90 hari, Koperasi Renteng menyasar bantuan modal kerja kepada <strong>312 petani kecil</strong>, meningkatkan harga terima komoditas sebesar <strong>15%</strong>, dan menghasilkan pengembalian sosial-ekonomi (SROI) sebesar <strong>3.5 kali lipat</strong> dari dana bergulir.
                </p>
              </div>

              <div className="bg-[#F3F1EA] border border-art-charcoal/10 rounded-[10px] p-6 space-y-3">
                <h4 className="font-serif italic text-base font-bold text-art-charcoal">Conversational Front-End</h4>
                <p className="text-xs text-art-charcoal/85 leading-relaxed">
                  Renteng tidak membuat silo database baru. Sistem kami bertindak sebagai gerbang percakapan WhatsApp yang mempermudah pengisian menu pinjaman, penjualan, dan off-taker resmi pada platform SIMKOPDES/SPBE milik Kemenkop secara otomatis.
                </p>
              </div>

              <div className="bg-[#F3F1EA] border border-art-charcoal/10 rounded-[10px] p-6 space-y-3">
                <h4 className="font-serif italic text-base font-bold text-art-charcoal">Push Model vs Katalog Pasif</h4>
                <p className="text-xs text-art-charcoal/85 leading-relaxed">
                  Berbeda dari e-commerce katalog pasif biasa, sistem AI Renteng secara proaktif mendeteksi kebutuhan harian Dapur SPPG Sleman dan langsung mem-blast tender spesifik ke WhatsApp petani terdekat dalam radius &lt;10 KM.
                </p>
              </div>

              <div className="bg-[#F3F1EA] border border-art-charcoal/10 rounded-[10px] p-6 space-y-3">
                <h4 className="font-serif italic text-base font-bold text-art-charcoal">Kolaborasi Anti-Kanibalisme</h4>
                <p className="text-xs text-art-charcoal/85 leading-relaxed">
                  Menghindari perang harga antar-desa melalui skema <strong>OVOP</strong> (Spesialisasi Komoditas Desa), <strong>B2B Cross-Sourcing</strong> untuk melengkapi kebutuhan dapur antar-KUD, serta pembagian peran Economic Readiness Level (ERL).
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* transition divider from section 2.5 (white) to section 3 (beige) */}
      <div className="h-24 bg-gradient-to-b from-white to-[#F9F7F2]" />

      {/* 3. CALCULATOR SECTION */}
      <section className="py-20 bg-[#F9F7F2]" id="kalkulator">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-art-sage block">Simulasi Mandiri</span>
            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-art-charcoal tracking-tight">
              Hitung Estimasi Angsuran & Permodalan
            </h2>
            <p className="text-sm text-art-charcoal/60 leading-relaxed">
              Gunakan kalkulator interaktif kami untuk mensimulasikan rencana pembiayaan pupuk atau modal usaha Bapak/Ibu. Sepenuhnya transparan tanpa ada biaya tersembunyi.
            </p>
          </div>
          <LoanCalculator />

          {/* Stress-Testing & WA Kuorum info panel */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-art-charcoal/10 rounded-[10px] p-6 space-y-3 shadow-sm">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-art-sage block">Jaminan Sosial</span>
              <h4 className="font-serif italic text-lg font-bold text-art-charcoal">Kuorum Persetujuan 50%</h4>
              <p className="text-xs text-art-charcoal/80 leading-relaxed">
                Pencairan pinjaman tanpa agunan fisik digantikan oleh reputasi sosial kelompok (*Social Collateral*). Minimal 50% rekan kelompok terdaftar wajib membalas <strong>SETUJU</strong> via blast WhatsApp untuk persetujuan.
              </p>
            </div>
            
            <div className="bg-white border border-art-charcoal/10 rounded-[10px] p-6 space-y-3 shadow-sm">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-art-sage block">Analisis Kelayakan</span>
              <h4 className="font-serif italic text-lg font-bold text-art-charcoal">Ketahanan Guncangan -20%</h4>
              <p className="text-xs text-art-charcoal/80 leading-relaxed">
                Uji sensitivitas finansial menjamin kas Koperasi tetap tangguh (NPV proyek tetap bernilai positif) meskipun terjadi penurunan kapasitas produksi hasil tani wilayah hingga 20% akibat cuaca buruk.
              </p>
            </div>

            <div className="bg-white border border-art-charcoal/10 rounded-[10px] p-6 space-y-3 shadow-sm">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-art-sage block">Manajemen Risiko NPL</span>
              <h4 className="font-serif italic text-lg font-bold text-art-charcoal">Switching Value Kas 10%</h4>
              <p className="text-xs text-art-charcoal/80 leading-relaxed">
                Sistem otonom membatasi plafon pinjaman aman warga desa secara real-time apabila tingkat kredit macet (NPL) simpan-pinjam wilayah melonjak hingga 10% guna menjaga integritas kas KUD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* transition divider from section 3 (beige) to section 4 (white) */}
      <div className="h-24 bg-gradient-to-b from-[#F9F7F2] to-white" />

      {/* 4. LIVE COMMODITY PRICES TRACKER SECTION */}
      <section className="py-20 bg-white" id="harga-komoditas">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-art-sage block">Pantauan Pasar</span>
            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-art-charcoal tracking-tight">
              Pusat Informasi Harga Komoditas Desa
            </h2>
            <p className="text-sm text-art-charcoal/60 leading-relaxed">
              Koperasi Unit Desa hadir melindungi petani dari fluktuasi harga yang tidak sehat. Berikut adalah referensi harga beli gabah dan hasil bumi terbaru di tingkat wilayah desa kita.
            </p>
          </div>
          <CommodityTracker refreshTrigger={refreshTrigger} />
        </div>
      </section>

      {/* transition divider from section 4 (white) to section 5 (beige) */}
      <div className="h-24 bg-gradient-to-b from-white to-[#F9F7F2]" />

      {/* 5. SUCCESS STORIES SECTION */}
      <section className="py-20 bg-[#F9F7F2]" id="cerita">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-art-sage block">Kisah Anggota</span>
            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-art-charcoal tracking-tight">
              Tumbuh Bersama Secara Gotong Royong
            </h2>
            <p className="text-sm text-art-charcoal/60 leading-relaxed">
              Koperasi Unit Desa bukan sekadar lembaga keuangan, melainkan wadah perjuangan ekonomi warga desa. Dengarkan cerita langsung dari para anggota aktif kami.
            </p>
          </div>

          {/* Infinite Testimonials Marquee with Framer Motion */}
          <div className="relative w-full overflow-hidden py-4 mask-marquee-custom">
            <motion.div
              className="flex gap-6 w-max"
              animate={{ x: [0, "-50%"] }}
              transition={{
                ease: "linear",
                duration: 35,
                repeat: Infinity,
              }}
            >
              {/* Double the array for infinite seamless looping */}
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-art-charcoal/10 rounded-3xl p-6 md:p-8 shadow-sm flex gap-6 hover:shadow-md transition-all w-[380px] sm:w-[450px] shrink-0"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#F5F4EF] shrink-0 border border-art-charcoal/10">
                    <img 
                      src={t.img} 
                      alt={`Foto profil ${t.name}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3 flex flex-col justify-between flex-1 text-left">
                    <blockquote className="text-art-charcoal/80 italic text-xs leading-relaxed">
                      "{t.story}"
                    </blockquote>
                    <div>
                      <h4 className="font-serif italic text-sm font-bold text-art-charcoal">{t.name}</h4>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-art-sage">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Prompt to join */}
          <div className="mt-16 bg-art-charcoal rounded-3xl p-8 md:p-12 text-center text-[#faf9f6] relative overflow-hidden shadow-lg border border-art-charcoal/10">
            <div className="absolute top-0 left-0 w-24 h-24 bg-art-sage/10 rounded-full blur-xl" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#faf9f6]">Ayo Bergabung Menjadi Anggota Koperasi!</h3>
              <p className="text-xs sm:text-sm text-[#FAF9F6]/75 max-w-md mx-auto leading-relaxed">
                Dapatkan fasilitas permodalan Yarnen, jaminan harga hasil bumi terpadu, serta bagi hasil Sisa Hasil Usaha (SHU) tahunan yang adil.
              </p>
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsConsultantOpen(true)}
                  className="bg-art-sage hover:bg-[#5b7360] text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  Daftar Anggota Sekarang <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-art-charcoal text-[#faf9f6]/70 pt-16 pb-8 border-t border-[#faf9f6]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-[#faf9f6]/10">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo_text.png" alt="Logo Koperasi Renteng" className="h-10 object-contain" />
            </div>
            <p className="text-xs text-[#faf9f6]/60 leading-relaxed max-w-sm">
              Membangun kedaulatan pangan, permodalan tani yang sehat, dan digitalisasi usaha desa secara terpadu melalui sistem ekonomi kekeluargaan yang modern.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-art-sage">
              <ShieldCheck className="w-4 h-4 text-art-sage" />
              <span>Diawasi Kementerian Koperasi & UMKM RI</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[#faf9f6] text-[10px] font-bold uppercase tracking-[0.2em] font-sans">Navigasi Halaman</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#faf9f6]/60">
              <a href="#profil" className="hover:text-white transition-colors">Profil KUD</a>
              <a href="#solusi" className="hover:text-white transition-colors">Pilar Solusi</a>
              <a href="#kalkulator" className="hover:text-white transition-colors">Simulasi Pinjaman</a>
              <a href="#harga-komoditas" className="hover:text-white transition-colors">Info Harga Gabah</a>
              <a href="#cerita" className="hover:text-white transition-colors">Kisah Sukses</a>
              <button 
                type="button" 
                onClick={() => setIsConsultantOpen(true)} 
                className="text-left hover:text-white transition-colors cursor-pointer text-[#faf9f6]/60"
              >
                Konsultasi AI
              </button>
              <button 
                type="button" 
                onClick={() => setIsAdminOpen(true)} 
                className="text-left hover:text-emerald-300 transition-colors cursor-pointer text-emerald-400 font-semibold flex items-center gap-1"
              >
                🔒 Portal Pengurus
              </button>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4 text-xs text-[#faf9f6]/60">
            <h4 className="text-[#faf9f6] text-[10px] font-bold uppercase tracking-[0.2em] font-sans">Kantor Koperasi Desa</h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-art-sage shrink-0 mt-0.5" />
                <span>Jl. Raya Kemakmuran Tani No. 42, Desa Subur Makmur, Kabupaten Sleman, D.I. Yogyakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-art-sage shrink-0" />
                <span>+62 (274) 889-4242</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-art-sage shrink-0" />
                <span>info@koperasidesadigital.id</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-wider text-[#faf9f6]/40 font-sans">
          <p>© {new Date().getFullYear()} Koperasi Unit Desa Digital. Semua hak cipta dilindungi undang-undang.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#faf9f6]/70">Kebijakan Privasi</a>
            <span>•</span>
            <a href="#" className="hover:text-[#faf9f6]/70">Syarat Anggota</a>
          </div>
        </div>
      </footer>



      {/* AI CONSULTANT DRAWER SIDE PANEL */}
      <AiConsultant 
        isOpen={isConsultantOpen} 
        onClose={() => setIsConsultantOpen(false)} 
      />
    </main>
  );
}
