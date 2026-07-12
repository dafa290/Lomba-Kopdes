# Panduan Simulator Bot WhatsApp KopDes RentengPay
Dokumentasi ini menjelaskan arsitektur dan panduan penggunaan alat simulasi WhatsApp bot lokal.

## Arsitektur Simulasi
Simulator bekerja dengan membypass library @whiskeysockets/baileys. Ia memotong pengiriman pesan di soket WhatsApp (ctiveSock.sendMessage) dan mengarahkannya kembali ke antrean memori lokal simulatedReplies.

## Antarmuka Dual POV (Farmer & SPPG)
Simulator memisahkan tampilan interaksi menjadi dua kolom utama:
- **Kiri (Petani)**: Untuk menguji pesan dari supplier komoditas.
- **Kanan (Admin SPPG)**: Untuk menguji aksi pembeli/admin koperasi.

## Daftar Endpoint Simulator
API pendukung simulator:
- GET /wa/simulator/users: Mengambil daftar anggota koperasi dari database.
- POST /wa/simulate-receive: Mengirim pesan uji coba ke engine bot.
- POST /wa/simulator/reset: Mengosongkan riwayat percakapan simulasi.
