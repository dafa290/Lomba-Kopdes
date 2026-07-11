"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-10">
      <Carousel items={cards} />
    </div>
  );
}

const KoperasiContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl font-sans max-w-3xl mx-auto mb-6">
        <span className="font-bold text-neutral-700 dark:text-neutral-200 block text-2xl mb-4">
          Pantau kesehatan finansial seluruh ekosistem dalam satu layar.
        </span>
        Fitur khusus untuk admin koperasi agar mudah mengelola dan memantau perkembangan koperasi secara holistik:
      </p>
      <ul className="list-disc pl-5 max-w-3xl mx-auto space-y-3 text-neutral-600 dark:text-neutral-400">
        <li><strong>Manajemen Anggota:</strong> Integrasi database pelaku UMKM kuliner, status keanggotaan, dan verifikasi merchant baru.</li>
        <li><strong>Integrasi QRIS & Gateway:</strong> Pengaturan satu gerbang pembayaran QRIS koperasi untuk mendeteksi semua transaksi masuk.</li>
        <li><strong>Sistem Pembukuan Otomatis:</strong> Pencatatan kas masuk-keluar koperasi secara otomatis dari potongan transaksi merchant.</li>
        <li><strong>Analitik Transaksi Real-Time:</strong> Grafik volume transaksi harian, total omzet ekosistem, dan tren pertumbuhan koperasi.</li>
        <li><strong>Laporan Keuangan Otomatis:</strong> Generator laporan laba rugi, neraca, dan Sisa Hasil Usaha (SHU) siap cetak.</li>
      </ul>
    </div>
  );
};

const MerchantContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl font-sans max-w-3xl mx-auto mb-6">
        <span className="font-bold text-neutral-700 dark:text-neutral-200 block text-2xl mb-4">
          Kelola toko cerdas dengan bantuan Asisten AI.
        </span>
        Didesain khusus untuk pedagang makanan mengelola toko dan berinteraksi dengan AI secara mulus:
      </p>
      <ul className="list-disc pl-5 max-w-3xl mx-auto space-y-3 text-neutral-600 dark:text-neutral-400">
        <li><strong>Smart POS (Aplikasi Kasir):</strong> Pencatatan pesanan dine-in maupun takeaway, manajemen stok bahan baku, dan cetak struk.</li>
        <li><strong>Dynamic Pricing Input:</strong> Kolom input harga modal/riil makanan, di mana sistem otomatis menghitung harga jual ideal untuk tiap ojek online/kanal digital.</li>
        <li><strong>Pusat Kendali AI (AI Growth Agent):</strong> Halaman khusus berformat rekomendasi visual atau chatbot yang menampilkan saran strategi bisnis dari AI.</li>
        <li><strong>Manajemen Promosi Otomatis:</strong> Tombol persetujuan strategi AI (misal: "Aktifkan Bundling Paket A & B") yang langsung mengeksekusi promo ke sistem POS.</li>
        <li><strong>Laporan Profitabilitas Merchant:</strong> Grafik performa menu terlaris, margin keuntungan bersih, dan efektivitas diskon yang telah berjalan.</li>
      </ul>
    </div>
  );
};

const InfrastrukturContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl font-sans max-w-3xl mx-auto mb-6">
        <span className="font-bold text-neutral-700 dark:text-neutral-200 block text-2xl mb-4">
          Pondasi teknologi yang menyatukan seluruh fitur.
        </span>
        Infrastruktur di balik layar yang membuat KOPDES berjalan cerdas secara otomatis:
      </p>
      <ul className="list-disc pl-5 max-w-3xl mx-auto space-y-3 text-neutral-600 dark:text-neutral-400">
        <li><strong>AI Engine Linker:</strong> Jembatan data (pipeline) yang menyalurkan riwayat transaksi POS merchant ke model AI untuk dianalisis menggunakan siklus Observe-to-Learn.</li>
        <li><strong>Sistem Notifikasi:</strong> Pengingat otomatis untuk merchant jika ada bahan baku menipis atau ada rekomendasi strategi baru dari AI.</li>
      </ul>
    </div>
  );
};

const data = [
  {
    category: "Sisi Koperasi",
    title: "Dashboard Pengelola Koperasi",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    content: <KoperasiContent />,
  },
  {
    category: "Sisi Kuliner",
    title: "Dashboard Merchant UMKM",
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    content: <MerchantContent />,
  },
  {
    category: "Infrastruktur Utama",
    title: "Fitur Pendukung Ekosistem",
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    content: <InfrastrukturContent />,
  }
];
