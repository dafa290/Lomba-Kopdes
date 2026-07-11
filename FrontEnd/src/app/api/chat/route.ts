import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

const SYSTEM_INSTRUCTION = `
Bekerjalah sebagai "Asisten AI", seorang Asisten Virtual yang bijaksana, sangat ramah, penuh perhatian, namun tetap profesional untuk Koperasi "Renteng" (AI-Powered Supply Chain & Cooperative Growth Platform) di Indonesia.
Karakter Anda adalah seorang pengurus koperasi yang hangat, dihormati di desa, suka membantu, jujur, dan bersemangat meningkatkan ekonomi pedesaan secara gotong royong dengan memasok bahan pangan langsung ke Dapur Program Makan Bergizi Gratis (SPPG) guna memotong jalur tengkulak.

Gaya Komunikasi:
- Gunakan bahasa Indonesia yang santun, hangat, dan sangat ramah. Sapa pengguna dengan panggilan hangat seperti "Bapak", "Ibu", "Mas", "Mbak", atau "Sahabat Koperasi".
- Sesekali sisipkan sapaan akrab khas pedesaan yang sopan (misal "sugeng raras", "guyub rukun").
- Hindari bahasa teknis kaku. Jelaskan hal keuangan/HPP dengan perumpamaan sederhana.
- Berikan format markdown (tebal, daftar poin) agar nyaman dibaca.

Topik Pelayanan & Aturan Khusus:
1. UU PDP No. 27/2022: Warga wajib memberikan persetujuan (Opt-In Consent) sebelum kita mengelola data mereka. Jika mereka belum menyetujui, ingatkan mereka secara santun untuk membalas atau mengonfirmasi "SETUJU".
2. Program SPPG: Menyuplai telur, tempe, beras, dan cabai ke Dapur Makan Bergizi Gratis. Jamin margin bersih warga tetap tinggi (di atas 60%).
3. Kalkulator HPP: Jika ditanya tentang HPP (Harga Pokok Produksi), bantu hitung: HPP = (Biaya Bahan Baku + Tenaga Kerja + Overhead) / Jumlah Unit. Lalu tambahkan margin minimal 60% untuk harga jual akhir ke SPPG.
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history, phone = "081234567890" } = body;

    if (!message) {
      return NextResponse.json({ error: "Pesan tidak boleh kosong" }, { status: 400 });
    }

    const db = readDb();
    let member = db.tb_anggota_warga.find(m => m.no_whatsapp === phone);

    // If member not found, create a temporary one for demo
    if (!member) {
      member = {
        id_anggota: `A00${db.tb_anggota_warga.length + 1}`,
        id_koperasi: "K001",
        nama: "Tamu Desa",
        no_whatsapp: phone,
        kategori_usaha: "Tamu",
        komoditas: "Beras",
        opt_in_consent: false,
        status: "Aktif"
      };
      db.tb_anggota_warga.push(member);
      writeDb(db);
    }

    // 1. Check UU PDP Consent State
    if (!member.opt_in_consent) {
      if (message.toUpperCase() === "SETUJU") {
        member.opt_in_consent = true;
        writeDb(db);
        return NextResponse.json({
          text: `Maturnuwun sanget Bapak/Ibu **${member.nama}**! 🙏

Persetujuan data Anda telah berhasil diaktifkan sesuai *Undang-Undang Pelindungan Data Pribadi (UU PDP)*. Sekarang saya bisa membantu Bapak/Ibu mengakses data Koperasi Renteng Anda.

Ada yang bisa saya bantu hari ini? Bapak/Ibu bisa menanyakan tentang:
1. **Harga Komoditas Tani** saat ini
2. **Kalkulator Hilirisasi (HPP)** untuk menghitung untung jual tempe/telur ke Dapur SPPG
3. **Simulasi Pengajuan Permodalan Yarnen**`
        });
      } else {
        return NextResponse.json({
          text: `Halo, selamat datang di layanan WhatsApp **Renteng**! 🌾 Saya **Asisten AI**, asisten virtual Koperasi Desa Anda.

Demi keamanan dan kepatuhan terhadap **Undang-Undang Pelindungan Data Pribadi (UU No. 27/2022)**, kami memerlukan persetujuan Bapak/Ibu sebelum memproses NIK dan data kapasitas produksi tani Anda di sistem.

Silakan balas pesan ini dengan mengetik **SETUJU** untuk mengaktifkan layanan dan mulai bertransaksi gotong-royong dengan Dapur SPPG. Terima kasih, guyub rukun selalu! 🙏`
        });
      }
    }

    // 2. Intercept HPP pricing inputs (Pricing Engine simulation)
    const lowercaseMsg = message.toLowerCase();
    if (lowercaseMsg.includes("hpp") || lowercaseMsg.includes("hitung") || lowercaseMsg.includes("tempe") && (lowercaseMsg.includes("bahan") || lowercaseMsg.includes("harga"))) {
      // Simulate pricing engine response
      return NextResponse.json({
        text: `**[Mesin AI Pricing Engine Renteng]** 

Tentu, Bapak/Ibu! Mari kita hitung rencana HPP (Harga Pokok Produksi) hilirisasi tempe Bapak/Ibu agar untungnya mantap saat disetor ke Dapur SPPG:

*   **Bahan Baku (Kedelai)**: Rp12.000 / kg
*   **Tenaga Kerja & Ragi**: Rp3.000
*   **Overhead (Gas/Kemasan)**: Rp1.000
*   **Total HPP (untuk 15 potong tempe)**: Rp16.000 (~Rp1.066 per potong)

**Rekomendasi Harga Jual ke Dapur SPPG (Margin Bersih 87%):**
Kami rekomendasikan harga jual **Rp2.000 per potong**.
*   **Harga Jual SPPG**: Rp2.000
*   **Bagi Hasil Koperasi (3%)**: Rp60
*   **Keuntungan Bersih Bapak/Ibu**: Rp874 per potong (Sangat aman di atas target 60%!)

Apakah Bapak/Ibu ingin saya daftarkan suplai tempe ini ke kebutuhan tender SPPG besok?`
      });
    }

    // 3. Gemini REST API Call
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const contents = [];
        if (history && Array.isArray(history)) {
          history.forEach((msg: any) => {
            contents.push({
              role: msg.role === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            });
          });
        }
        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: contents,
              systemInstruction: {
                parts: [{ text: SYSTEM_INSTRUCTION }]
              },
              generationConfig: {
                temperature: 0.7
              }
            })
          }
        );

        if (res.ok) {
          const json = await res.json();
          const reply = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ text: reply });
          }
        }
      } catch (err) {
        console.error("Gemini API REST Call failed, falling back:", err);
      }
    }

    // Friendly Fallback Response
    return NextResponse.json({
      text: `**[Mode Demo - Kunci API Belum Dikonfigurasi]**

Halo, Bapak/Ibu **${member.nama}**! Saya **Asisten AI**, virtual asisten Koperasi Renteng.

Karena kunci API belum terpasang, saya berjalan dalam mode demo lokal. Koperasi Renteng saat ini memegang kontrak penyaluran pangan utama ke **Dapur SPPG (Makan Bergizi Gratis)**. 

Bapak/Ibu memiliki beberapa program unggulan:
1. **Pemberdayaan Rantai Pasok**: Menyalurkan hasil hilirisasi tempe, telur, dan cabai langsung ke dapur program nasional dengan keuntungan bersih terjamin >60%.
2. **Skema Yarnen (Bayar Setelah Panen)**: Mengambil pupuk/bibit di awal dan bayar saat panen terjual ke koperasi.
3. **Kalkulator Pricing**: Hitung HPP dan margin secara transparan.

Ketik **"hitung tempe"** untuk melihat simulasi kalkulator HPP kami, atau ajukan pertanyaan lainnya! Semoga usaha Bapak/Ibu berkah dan melimpah ruah! 🙏`
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
