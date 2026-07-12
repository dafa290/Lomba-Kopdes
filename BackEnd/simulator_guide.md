# Panduan Simulator Bot WhatsApp KopDes RentengPay
Dokumentasi ini menjelaskan arsitektur dan panduan penggunaan alat simulasi WhatsApp bot lokal.

## Arsitektur Simulasi
Simulator bekerja dengan membypass library @whiskeysockets/baileys. Ia memotong pengiriman pesan di soket WhatsApp (ctiveSock.sendMessage) dan mengarahkannya kembali ke antrean memori lokal simulatedReplies.
